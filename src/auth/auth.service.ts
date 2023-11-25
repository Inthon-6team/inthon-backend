import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginReqDto } from './dto/req/login.req.dto';
import { UserRepository } from 'src/user/user.respository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async login(loginReqDto: LoginReqDto) {
    const { id, password } = loginReqDto;

    const user = await this.userRepository.findUserByIdWithPassword(id);
    if (!user) throw new NotFoundException('존재하지 않는 아이디입니다.');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      throw new UnauthorizedException('비밀번호가 일치하지 않습니다.');

    const secretKey = this.configService.get<string>('JWT_SECRET_KEY');
    const accessToken = this.jwtService.sign(
      {
        id: user.id,
      },
      { secret: secretKey },
    );
    return { accessToken };
  }
}
