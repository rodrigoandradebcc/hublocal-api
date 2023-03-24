import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/users.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from './dto/signin.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private jwtService: JwtService,
  ) {}

  // async validateUser(email: string, password: string): Promise<any> {

  //   console.log('comparePassword', { comparePassword });

  //   if (userExist && comparePassword) {
  //     const { password, ...result } = userExist;
  //     return result;
  //   }
  //   return null;
  // }

  async login(user: SignInDto) {
    const userExist = await this.userRepository.findOne({
      where: {
        email: user.email,
      },
    });

    if (!userExist) {
      throw new BadRequestException('Credenciais inválidas');
    }

    const comparePassword = await bcrypt.compare(
      user.password,
      userExist.password,
    );

    if (!comparePassword) {
      throw new BadRequestException('Credenciais inválidas');
    }

    const payload = { email: user.email, name: userExist.name };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async generateHash(user: User): Promise<string> {
    // const payload = { email: user.email, sub: user.id };
    return bcrypt.hash(user.password, 10);
  }
}
