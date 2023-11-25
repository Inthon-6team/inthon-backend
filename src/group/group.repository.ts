import { Repository } from 'typeorm';
import { Group } from './entities/group.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GroupRepository extends Repository<Group> {
  constructor(
    @InjectRepository(Group) private readonly repository: Repository<Group>,
  ) {
    super(repository.target, repository.manager);
  }
}
