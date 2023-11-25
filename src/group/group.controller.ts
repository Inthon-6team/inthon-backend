import { Controller, Get, Param } from '@nestjs/common';
import { GroupService } from './group.service';
import { ApiOperation } from '@nestjs/swagger';

@Controller('group')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}
  @ApiOperation({ summary: '그룹 멤버 전체의 정보 가져오기' })
  @Get(':id/members')
  findAll(@Param('id') id: string) {
    return this.groupService.findAllMembers(+id);
  }

  /*
  @ApiOperation({ summary: '그룹 멤버 중 특정 멤버의 정보 가져오기' })
  @Get('/members/:id')
  findOne() {
    return this.groupService.findOne();
  }
  */
}
