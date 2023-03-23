import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/users.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private jwtService: JwtService,
  ) {}

  async login(userName: string, password: string) {
    const user = await this.validateCredentials(userName, password);

    const payload = {
      sub: user.id,
      username: user.name,
    };

    return this.jwtService.sign(payload);
  }

  async validateCredentials(email: string, password: string) {
    const userExist = await this.userRepository.findOne({
      where: {
        email,
      },
    });

    const validatePassword = bcrypt.compareSync(password, userExist.password);

    if (userExist && validatePassword) {
      return userExist;
    }
  }
}
