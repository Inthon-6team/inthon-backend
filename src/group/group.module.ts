import { Module } from '@nestjs/common';
import { GroupService } from './group.service';
import { GroupController } from './group.controller';
import { GroupRepository } from './group.repository';
import { Group } from './entities/group.entity';
import { User } from 'src/user/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from 'src/user/user.respository';

@Module({
  imports: [TypeOrmModule.forFeature([User, Group])],
  controllers: [GroupController],
  providers: [GroupService, GroupRepository, UserRepository],
})
export class GroupModule {}
