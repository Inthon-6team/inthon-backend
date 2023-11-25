import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { JoinUserDto } from './dto/join-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: '[only 관리자] 유저 계정 생성' })
  @Post()
  join(@Body() joinUserDto: JoinUserDto) {
    return this.userService.create(joinUserDto);
  }

  @ApiOperation({ summary: '[only 관리자] 유저 정보 조회' })
  @Get(':id')
  findById(@Param('id') id: string) {
    return this.userService.findByIdOrThrow(id);
  }

  @ApiOperation({ summary: '유저 정보 수정' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }
}
