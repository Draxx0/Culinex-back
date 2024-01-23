import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/models/users/users.service';
import { TokenObject } from './types/authentication';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/models/users/entities/users.entity';
import { Repository } from 'typeorm';
import { SignupDTO } from './dto/auth.dto';

@Injectable()
export class AuthenticationService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async login({
    email,
    pass,
  }: {
    email: string;
    pass: string;
  }): Promise<TokenObject> {
    const user = await this.usersService.findOneByEmail(email);

    const isPasswordMatching = await bcrypt.compare(pass, user.password);

    if (!isPasswordMatching) {
      throw new UnauthorizedException();
    }

    const { email: userEmail, id, role, username } = user;

    const payload = {
      username,
      sub: user.id,
      email: userEmail,
      id,
      role,
    };

    return {
      access_token: await this.jwtService.signAsync(payload, {
        secret: process.env.JWT_SECRET,
      }),
      user: {
        username: user.username,
        sub: user.id,
        email: user.email,
        id: user.id,
        role: user.role,
      },
    };
  }

  async signup(body: SignupDTO): Promise<UserEntity> {
    try {
      const hashedPassword = await bcrypt.hash(body.password, 10);
      body.password = hashedPassword;
      const createdUser = this.userRepository.create(body);
      return await this.userRepository.save(createdUser);
    } catch (error) {
      throw new Error('Error while creating user');
    }
  }
}
