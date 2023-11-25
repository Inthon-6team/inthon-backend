import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './user.respository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const { name, profile_image, introduction } = updateUserDto;
    const user = await this.userRepository.findOneByOrFail({ id });

    user.name = name ? name : user.name;
    user.profile_image = profile_image ? profile_image : user.profile_image;
    user.introduction = introduction ? introduction : user.introduction;
    await this.userRepository.save(user);

    return user;
  }
}
