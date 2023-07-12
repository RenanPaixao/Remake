import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() params: CreateUserDto) {
    try {
      console.log('create user params => ', params);
      return this.usersService.createUser(params);
    } catch (error) {
      console.log(error);
    }
  }
}
