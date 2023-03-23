import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import * as crypto from 'crypto';
import base64Url from 'base64url';
import { User } from './entities/users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const createUser = this.userRepository.create(createUserDto);

    const header = {
      alg: 'HS256',
      typ: 'JWT',
    };

    const payload = {
      name: createUserDto.name,
      email: createUserDto.email,
      exp: new Date().getTime(),
    };

    const headerEncoded = base64Url.encode(JSON.stringify(header));
    const payloadEncoded = base64Url.encode(JSON.stringify(payload));

    const key = 'hublocal123456';

    const signature = crypto
      .createHmac('sha256', key)
      .update(`${headerEncoded}.${payloadEncoded}`)
      .digest();

    const generatedToken = `${headerEncoded}.${payloadEncoded}.${base64Url.encode(
      signature,
    )}`;

    const newUser = {
      ...createUser,
      password: generatedToken,
    };

    return await this.userRepository.save(newUser);
  }
}
