import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginReqDto } from './dto/req/login.req.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: '[only 관리자] 로그인' })
  @Post('login')
  login(@Body() loginReqDto: LoginReqDto) {
    return this.authService.login(loginReqDto);
  }
}
