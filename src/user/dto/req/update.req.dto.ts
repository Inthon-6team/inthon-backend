import { OmitType, PartialType } from '@nestjs/swagger';
import { JoinReqDto } from './join.req.dto';

export class UpdateUserReqDto extends PartialType(
  OmitType(JoinReqDto, ['id', 'password']),
) {}
