import { Controller, Post, Body } from '@nestjs/common';
import * as argon from 'argon2';

import { AuthService } from './auth.service';
import AutoDto from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() dto: AutoDto) {
    const hash = argon.hash(dto.password);
    return this.authService.signup();
  }

  @Post('signin')
  sigin() {
    return this.authService.signin();
  }
}
