import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
      @InjectRepository(User)
      private userRepository: Repository<User>,
  ) {}

  create(email: string, password: string, name: string): Promise<User> {
    const user = this.userRepository.create({ email, password, name });
    return this.userRepository.save(user);
  }
}
