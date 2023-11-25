import { OmitType, PartialType } from '@nestjs/swagger';
import { JoinUserDto } from './join-user.dto';

export class UpdateUserDto extends PartialType(
  OmitType(JoinUserDto, ['id', 'password']),
) {}
