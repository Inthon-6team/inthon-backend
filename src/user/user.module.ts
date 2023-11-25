import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from './user.respository';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Group } from 'src/group/entities/group.entity';
import { GroupRepository } from 'src/group/group.repository';

@Module({
  imports: [TypeOrmModule.forFeature([User, Group])],
  controllers: [UserController],
  providers: [UserService, UserRepository, GroupRepository],
})
export class UserModule {}
