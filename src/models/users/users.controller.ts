import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserEntity } from './entities/users.entity';
import { createUserDTO } from './dto/user.create.dto';
import { TokenObject } from 'src/authentication/types/authentication';
import { AuthenticationService } from 'src/authentication/authentication.service';
import { DeleteResult } from 'typeorm';

@Controller('users')
export class UsersController {
  constructor(
    private readonly userService: UsersService,
    private readonly authService: AuthenticationService,
  ) {}
  @Post()
  async createUser(@Body() body: createUserDTO): Promise<TokenObject> {
    const { password: pass, email } = body;
    await this.userService.createUser(body);

    return await this.authService.login({
      email,
      pass,
    });
  }

  @Get()
  async getUsers(): Promise<Array<UserEntity>> {
    return await this.userService.getUsers();
  }

  @Delete(':id')
  deleteOrder(@Param('id') id: string): Promise<DeleteResult> {
    return this.userService.deleteUser(id);
  }
}
