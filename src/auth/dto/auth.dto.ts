import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export default class AuthDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
