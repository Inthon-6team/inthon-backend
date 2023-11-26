import { ApiProperty } from '@nestjs/swagger';

export class RegisterDeviceReqDto {
  @ApiProperty({
    example: 'fbvjkbafsdvbafhdvb1234432',
    description: '기기 토큰',
  })
  deviceToken: string;
}
