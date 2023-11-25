import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { JoinReqDto } from './dto/req/join.req.dto';
import { UpdateUserReqDto } from './dto/req/update.req.dto';
import {
  ApiBearerAuth,
  ApiCookieAuth,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: '[only 관리자] 유저 계정 생성' })
  @Post()
  join(@Body() JoinReqDto: JoinReqDto) {
    return this.userService.join(JoinReqDto);
  }

  @ApiOperation({ summary: '[only 관리자] 유저 정보 조회' })
  @ApiBearerAuth()
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findById(@Param('id') id: string) {
    return this.userService.findByIdOrThrow(id);
  }

  @ApiOperation({ summary: '유저 정보 수정' })
  @ApiBearerAuth()
  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserReqDto) {
    return this.userService.update(id, updateUserDto);
  }
}
