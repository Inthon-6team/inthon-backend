import { ApiProperty } from '@nestjs/swagger';

export class SubscribeReqDto {
  @ApiProperty({ example: 'admin1', description: '보내는 사람 아이디' })
  sender_id: string;

  @ApiProperty({ example: 'admin', description: '받는 사람 아이디' })
  receiver_id: string;
}
