import { Injectable } from '@nestjs/common';
import { SubscribeReqDto } from './dto/req/subscribe.req.dto';
import { UserRepository } from 'src/user/user.respository';
import * as admin from 'firebase-admin';
import { RegisterDeviceReqDto } from './dto/req/register-device.req.dto';
import * as serviceAccount from './firebase.json';

@Injectable()
export class AlramService {
  constructor(private readonly userRepository: UserRepository) {
    // app initialize
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
    });
  }

  async subscribe(subscribeReqDto: SubscribeReqDto) {
    // SenderID -> ReceiverID
    const { sender_id, receiver_id } = subscribeReqDto;
    const senderName = (await this.userRepository.findOneBy({ id: sender_id }))
      .name;
    const receiverName = (
      await this.userRepository.findOneBy({ id: receiver_id })
    ).name;

    // Message 생성
    const message = `${senderName}님이 ${receiverName}님을 집으로 불렀습니다.`;

    // ReceiverID로 토큰 조회
    const userTokens = await this.findTokenByUserIdFromFireStore(receiver_id);
    // null인 토큰 제거
    const updatedTokens = userTokens.filter(
      (token) => token.device_token !== null,
    );
    // 푸시 알림 전송
    this.sendPushNotification(message, updatedTokens);
  }

  async sendPushNotification(payload, tokens) {
    const message = {
      data: {
        message: payload,
      },
      tokens: tokens.map((token) => token.device_token),
    };
    console.log('message', message);
    // Send a message to the device corresponding to the provided
    // registration token.
    admin
      .messaging()
      .sendMulticast(message)
      .then((response) => {
        // Response is a message ID string.
        console.log('Successfully sent message:', response);
      })
      .catch((error) => {
        console.log('Error sending message:', error);
      });
  }

  async findTokenByUserIdFromFireStore(userId: string) {
    try {
      const users = await admin
        // firestore에서 user_token 컬렉션의 모든 문서를 조회해서,
        // user_id가 userId인 문서를 조회한 후, 모두 가져오기
        .firestore()
        .collection('user_token')
        .where('user_id', '==', userId)
        .get();

      let userTokens = [];
      users.forEach((doc) => {
        userTokens.push(doc.data());
      });
      return userTokens;
    } catch (error) {
      console.error('유저 토큰 조회 중 오류 발생:', error);
    }
  }

  async registerDeviceToken(
    userId: string,
    registerDeviceReqDto: RegisterDeviceReqDto,
  ) {
    const { deviceToken } = registerDeviceReqDto;
    // firestore에 user_token 컬렉션에 문서를 생성
    // userId와 deviceToken을 저장
    try {
      await admin.firestore().collection('user_token').doc().set({
        user_id: userId,
        device_token: deviceToken,
      });
      console.log('디바이스 토큰이 성공적으로 등록되었습니다');
    } catch (error) {
      console.error('디바이스 토큰 등록 중 오류 발생:', error);
    }
  }
}
