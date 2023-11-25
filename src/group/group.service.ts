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

  async findAllMembers(user: User) {
    console.log(user);
    const groupId = (await this.userRepository.findUsersGroupId(user.id)).group
      .id;

    const users: User[] = await this.userRepository.findUsersByGroupId(groupId);
    return users;
  }
}
