import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/models/users/users.service';
import { TokenObject } from './types/authentication';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthenticationService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  async login({
    email,
    pass,
  }: {
    email: string;
    pass: string;
  }): Promise<TokenObject> {
    const user = await this.usersService.findOne(email);

    const isPasswordMatching = await bcrypt.compare(pass, user.password);

    if (!isPasswordMatching) {
      throw new UnauthorizedException();
    }

    const payload = {
      username: user.username,
      sub: user.id,
      email: user.email,
      id: user.id,
      role: user.role,
    };

    return {
      access_token: await this.jwtService.signAsync(payload, {
        secret: process.env.JWT_SECRET,
      }),
      user: {
        username: user.username,
        email: user.email,
        id: user.id,
        role: user.role,
      },
    };
  }
}
