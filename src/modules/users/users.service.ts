import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthService } from '../auth/auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private readonly authService: AuthService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const createUser = this.userRepository.create(createUserDto);

    const encryptedPassword = await this.authService.generateHash(createUser);

    const newUser = {
      ...createUser,
      password: encryptedPassword,
    };

    const userCreated = await this.userRepository.save(newUser);

    return {
      id: userCreated.id,
      name: userCreated.name,
      email: userCreated.email,
    };
  }
}
