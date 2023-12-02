import { IsEmail, IsString } from 'class-validator';

export class createUserDTO {
  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
