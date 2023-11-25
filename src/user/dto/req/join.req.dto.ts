import { ApiProperty, PickType } from '@nestjs/swagger';
import { User } from '../../entities/user.entity';

export class JoinReqDto extends PickType(User, [
  'id',
  'password',
  'name',
  'profile_image',
  'introduction',
]) {
  @ApiProperty({ example: 1, description: '그룹 아이디' })
  group_id: number;
}
