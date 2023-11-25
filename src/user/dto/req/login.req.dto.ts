import { ApiProperty, PickType } from '@nestjs/swagger';
import { User } from '../../entities/user.entity';

export class LoginReqDto extends PickType(User, ['id', 'password']) {}
