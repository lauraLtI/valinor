import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.userRepository.findOne({
      where: { emailUser: loginDto.emailUser },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (!bcrypt.compareSync(loginDto.passwordUser, user.passwordUser)) {
      throw new UnauthorizedException('Invalid login details');
    }

    const payload = { email: user.emailUser, id: user.idUser };

    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }
}
