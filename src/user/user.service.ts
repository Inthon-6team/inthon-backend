import {
  Injectable,
  NotFoundException,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { JoinReqDto } from './dto/req/join.req.dto';
import { UpdateUserReqDto } from './dto/req/update.req.dto';
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

  async join(joinReqDto: JoinReqDto) {
    const { id, password, name, profile_image, introduction, group_id } =
      joinReqDto;

    const exUser = await this.userRepository.findOneBy({ id });
    if (exUser) throw new ConflictException('이미 존재하는 아이디입니다.');

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
    if (!user) throw new NotFoundException('존재하지 않는 유저입니다.');
    return user;
  }

  async update(user: User, updateReqDto: UpdateUserReqDto) {
    const { name, profile_image, introduction, group_id } = updateReqDto;

    user.name = name ? name : user.name;
    user.profile_image = profile_image ? profile_image : user.profile_image;
    user.introduction = introduction ? introduction : user.introduction;
    const group = await this.groupRepository.findOneBy({ id: group_id });
    user.group = group ? group : await this.groupRepository.save(new Group());

    return await this.userRepository.save(user);
  }
}
