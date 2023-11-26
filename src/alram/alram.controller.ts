import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AlramService } from './alram.service';
import { SubscribeReqDto } from './dto/req/subscribe.req.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('alram')
@Controller('alram')
export class AlramController {
  constructor(private readonly alramService: AlramService) {}

  @ApiOperation({ summary: '알림 보내기 (콕 찌르기 기능)' })
  @Post()
  subscribe(@Body() subscribeReqDto: SubscribeReqDto) {
    return this.alramService.subscribe(subscribeReqDto);
  }
}
