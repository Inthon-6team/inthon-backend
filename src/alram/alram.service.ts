import { Injectable } from '@nestjs/common';
import { SubscribeReqDto } from './dto/req/subscribe.req.dto';
import { UserRepository } from 'src/user/user.respository';
import * as admin from 'firebase-admin';

@Injectable()
export class AlramService {
  constructor(private readonly userRepository: UserRepository) {
    // app initialize
    admin.initializeApp({
      credential: admin.credential.cert('src/alram/firebase.json'),
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
    const payload = {
      notification: {
        title: '집에 돌아오세요 ㅠㅠ',
        body: message,
      },
    };

    console.log('payload', payload);

    // ReceiverID로 토큰 조회
    const userTokens: String[] = await this.findTokenByUserIdFromFireStore(
      receiver_id,
    );

    console.log('userTokens', userTokens);

    // 토큰으로 알림 전송
    this.sendPushNotification(payload, userTokens);
  }

  async sendPushNotification(payload, token) {
    try {
      await admin.messaging().sendToDevice(token, payload);
      console.log('알림이 성공적으로 전송되었습니다');
    } catch (error) {
      console.error('알림 전송 중 오류 발생:', error);
    }
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
}
