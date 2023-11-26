import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AlramService } from './alram.service';
import { SubscribeReqDto } from './dto/req/subscribe.req.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { User } from 'src/user/entities/user.entity';
import { AuthUser } from 'src/auth/decorator/auth-user.decorator';
import { RegisterDeviceReqDto } from './dto/req/register-device.req.dto';

@ApiTags('alram')
@Controller('alram')
export class AlramController {
  constructor(private readonly alramService: AlramService) {}

  @ApiOperation({ summary: '알림 보내기 (콕 찌르기 기능)' })
  @Post()
  subscribe(@Body() subscribeReqDto: SubscribeReqDto) {
    return this.alramService.subscribe(subscribeReqDto);
  }

  @ApiOperation({ summary: '디바이스 토큰 등록하기' })
  @ApiBearerAuth()
  @Post('device')
  @UseGuards(JwtAuthGuard)
  registerDeviceToken(
    @AuthUser() user: User,
    @Body() registerDeviceReqDto: RegisterDeviceReqDto,
  ) {
    return this.alramService.registerDeviceToken(user.id, registerDeviceReqDto);
  }
}
