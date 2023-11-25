import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { JoinUserDto } from './dto/join-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './user.respository';
import { User } from './entities/user.entity';
import { Group } from '../group/entities/group.entity';
import { GroupRepository } from 'src/group/group.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly groupRepository: GroupRepository,
  ) {}

  async create(joinUserDto: JoinUserDto) {
    const { id, password, name, profile_image, introduction, group_id } =
      joinUserDto;

    const exUser = await this.userRepository.findOneBy({ id });
    if (exUser) throw new ConflictException();

    const user = new User();
    user.id = id;
    user.password = bcrypt.hashSync(password, 10);
    user.name = name;
    user.profile_image = profile_image;
    user.introduction = introduction;
    const group = await this.groupRepository.findOneBy({ id: group_id });
    user.group = group ? group : await this.groupRepository.save(new Group());

    return await this.userRepository.save(user);
  }

  async findByIdOrThrow(id: string) {
    const user = await this.userRepository.findOneBy({ id: id });
    if (!user) throw new NotFoundException();
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const { name, profile_image, introduction, group_id } = updateUserDto;
    const user = await this.findByIdOrThrow(id);

    user.name = name ? name : user.name;
    user.profile_image = profile_image ? profile_image : user.profile_image;
    user.introduction = introduction ? introduction : user.introduction;
    const group = await this.groupRepository.findOneBy({ id: group_id });
    user.group = group ? group : await this.groupRepository.save(new Group());

    return await this.userRepository.save(user);
  }
}
