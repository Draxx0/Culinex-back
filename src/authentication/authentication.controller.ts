import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { LoginDTO } from './dto/auth.dto';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @HttpCode(HttpStatus.OK)
  @Post('/signin')
  login(@Body() loginDto: LoginDTO) {
    const { email, password: pass } = loginDto;
    return this.authenticationService.login({
      email,
      pass,
    });
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
