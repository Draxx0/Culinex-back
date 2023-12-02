import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/users.entity';
import { Repository } from 'typeorm';
import { createUserDTO } from './dto/user.create.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findOne(email: string): Promise<UserEntity | undefined> {
    const user = await this.userRepository.findOneBy({ email });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return user;
  }

  async createUser(body: createUserDTO): Promise<UserEntity> {
    try {
      const hashedPassword = await bcrypt.hash(body.password, 10);
      body.password = hashedPassword;
      const createdUser = this.userRepository.create(body);
      return await this.userRepository.save(createdUser);
    } catch (error) {
      throw new Error('Error while creating user');
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
