import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginReqDto } from './dto/req/login.req.dto';
import { UserRepository } from 'src/user/user.respository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}
  async login(loginReqDto: LoginReqDto) {
    const { id, password } = loginReqDto;

    const user = await this.userRepository.findOneBy({ id });
    if (!user) throw new NotFoundException('존재하지 않는 아이디입니다.');

    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch)
      throw new UnauthorizedException('비밀번호가 일치하지 않습니다.');

    return user;
  }
}
