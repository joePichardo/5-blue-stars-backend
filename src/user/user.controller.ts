import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: {email: string, password: string, name: string}) {
    return this.userService.create(createUserDto.email, createUserDto.password, createUserDto.name);
  }
}
