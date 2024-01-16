import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/users.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { UpdateUserDTO } from './dto/user.update.dto';
import { ApiCommonResponse } from 'src/common/types';
import { Role } from 'src/decorator/role.decorator';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findOneByEmail(email: string): Promise<UserEntity | undefined> {
    const user = await this.userRepository.findOneBy({ email });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return user;
  }

  async findOne(id: string): Promise<UserEntity> {
    try {
      return await this.userRepository.findOneBy({ id });
    } catch (error) {
      throw new Error('User not found');
    }
  }

  async updateUser(id: string, body: UpdateUserDTO): Promise<UserEntity> {
    const { email, password, username } = body;
    try {
      if (password) {
        const hashedPassword = await bcrypt.hash(body.password, 10);
        body.password = hashedPassword;
      }
      if (email) {
        const user = await this.userRepository.findOneBy({ email });
        if (user) {
          throw new Error('Email already exists');
        }
      }
      if (username) {
        const user = await this.userRepository.findOneBy({ username });
        if (user) {
          throw new Error('Username already exists');
        }
      }
      await this.userRepository.update(id, body);

      return await this.userRepository.findOneBy({ id });
    } catch (error) {
      throw new Error('Error while updating user');
    }
  }

  async updateUserRole(id: string, role: Role): Promise<ApiCommonResponse> {
    try {
      await this.userRepository.update(id, { role });

      return {
        status: 200,
        message: `User role updated to ${role}`,
      };
    } catch (error) {
      throw new Error('Error while updating user role');
    }
  }

  async getUsers(): Promise<Array<UserEntity>> {
    try {
      return await this.userRepository.find();
    } catch (error) {
      throw new Error('Users not found');
    }
  }

  async deleteUser(id: string) {
    return await this.userRepository.delete(id);
  }
}
