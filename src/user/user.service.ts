import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { DeleteUserDto } from './dto/delete-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
      @InjectRepository(User)
      private userRepository: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();
    user.name = createUserDto.name;
    user.email = createUserDto.email;

    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(createUserDto.password, salt);

    const savedUser = await this.userRepository.save(user);

    // Delete the password field before returning the User
    delete savedUser.password;
    return savedUser;
  }

  async deleteUser(deleteUserDto: DeleteUserDto): Promise<User> {
    const user = await this.userRepository.findOne({
      where: [
        { email: deleteUserDto.email },
        { id: deleteUserDto.id },
      ],
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }
    return await this.userRepository.remove(user);
  }
}
