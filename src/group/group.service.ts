import { Injectable } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
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
    const users: User[] = await this.userRepository.findUsersByGroupId(groupId);
    return users;
  }
}
