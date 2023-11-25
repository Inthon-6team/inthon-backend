import { PartialType } from '@nestjs/swagger';
import { JoinUserDto } from './join-user.dto';

export class UpdateUserDto extends PartialType(JoinUserDto) {}
