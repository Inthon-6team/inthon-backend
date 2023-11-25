import { PickType } from '@nestjs/swagger';
import { User } from '../../../user/entities/user.entity';

export class LoginReqDto extends PickType(User, ['id', 'password']) {}
