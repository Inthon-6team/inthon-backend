import { Injectable, NotFoundException } from '@nestjs/common';
import { GroupRepository } from './group.repository';
import { UserRepository } from 'src/user/user.respository';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class GroupService {
  constructor(
    private readonly groupRepository: GroupRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async findAllMembers(groupId: number) {
    const group = await this.groupRepository.findOne({
      where: { id: groupId },
    });
    if (!group) throw new NotFoundException('존재하지 않는 그룹입니다.');

    const users: User[] = await this.userRepository.findUsersByGroupId(groupId);
    return users;
  }
}
