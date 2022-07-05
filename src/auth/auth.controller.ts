import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AutoDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() autoDto: AutoDto) {
    return this.authService.signup();
  }

  @Post('signin')
  sigin() {
    return this.authService.signin();
  }
}
