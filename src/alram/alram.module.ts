import { Module } from '@nestjs/common';
import { AlramService } from './alram.service';
import { AlramController } from './alram.controller';
import { UserRepository } from 'src/user/user.respository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [AlramController],
  providers: [AlramService, UserRepository],
})
export class AlramModule {}
