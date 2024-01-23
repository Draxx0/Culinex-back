import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthenticationService } from 'src/authentication/authentication.service';
import { TokenObject } from 'src/authentication/types/authentication';
import { ApiCommonResponse } from 'src/common/types';
import { Role, Roles } from 'src/decorator/role.decorator';
import { AuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { DeleteResult } from 'typeorm';
import { UserEntity } from './entities/users.entity';
import { UsersService } from './users.service';
import { SignupDTO } from 'src/authentication/dto/auth.dto';

@Controller('users')
@UseGuards(AuthGuard, RolesGuard)
export class UsersController {
  constructor(
    private readonly userService: UsersService,
    private readonly authenticationService: AuthenticationService,
  ) {}

  @Get()
  @Roles([Role.ADMIN])
  async getUsers(): Promise<Array<UserEntity>> {
    return await this.userService.getUsers();
  }

  @Get('current')
  getCurrentUserConnected(@Request() req) {
    return req.user;
  }

  @Get(':id')
  async getUser(@Param('id') id: string): Promise<UserEntity> {
    return await this.userService.findOne(id);
  }

  @Delete(':id')
  deleteOrder(@Param('id') id: string): Promise<DeleteResult> {
    return this.userService.deleteUser(id);
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() body: SignupDTO,
  ): Promise<TokenObject> {
    const updatedUser = await this.userService.updateUser(id, body);

    return await this.authenticationService.login({
      email: updatedUser.email,
      pass: updatedUser.password,
    });
  }

  @Put('admin-endpoint/role/:id')
  // @Roles([Role.ADMIN])
  async updateUserRole(
    @Param('id') id: string,
    @Body() body: { role: Role },
  ): Promise<ApiCommonResponse> {
    return await this.userService.updateUserRole(id, body.role);
  }
}
