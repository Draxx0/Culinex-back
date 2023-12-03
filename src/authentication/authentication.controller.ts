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
import { LoginDTO, SignupDTO } from './dto/auth.dto';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('/signin')
  @HttpCode(HttpStatus.OK)
  login(@Body() loginDto: LoginDTO) {
    const { email, password: pass } = loginDto;
    return this.authenticationService.login({
      email,
      pass,
    });
  }

  @Post('/signup')
  @HttpCode(HttpStatus.CREATED)
  async signup(@Body() signupDTO: SignupDTO) {
    const { email, password: pass } = signupDTO;
    await this.authenticationService.signup(signupDTO);

    return await this.authenticationService.login({
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
