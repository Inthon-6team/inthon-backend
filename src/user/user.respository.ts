import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(
    @InjectRepository(User) private readonly repository: Repository<User>,
  ) {
    super(repository.target, repository.manager);
  }

  async findUsersByGroupId(groupId: number): Promise<User[]> {
    return this.createQueryBuilder('user')
      .innerJoinAndSelect('user.group', 'group')
      .where('group.id = :groupId', { groupId })
      .getMany();
  }

  async findUserByIdWithPassword(id: string): Promise<User> {
    return this.createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.id = :id', { id })
      .getOne();
  }
}
