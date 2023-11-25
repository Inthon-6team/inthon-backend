import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { GroupService } from './group.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { AuthUser } from 'src/auth/decorator/auth-user.decorator';
import { User } from 'src/user/entities/user.entity';

@ApiTags('group')
@Controller('group')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}
  @ApiOperation({ summary: '그룹 멤버 전체의 정보 가져오기' })
  @ApiBearerAuth()
  @Get('/members')
  @UseGuards(JwtAuthGuard)
  findAll(@AuthUser() user: User) {
    return this.groupService.findAllMembers(user);
  }

  /*
  @ApiOperation({ summary: '그룹 멤버 중 특정 멤버의 정보 가져오기' })
  @Get('/members/:id')
  findOne() {
    return this.groupService.findOne();
  }
  */
}
