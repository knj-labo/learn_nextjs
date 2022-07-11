import {
  Controller,
  Get,
  UseGuards,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { JwtGuard } from '../auth/guards';
import { GetUser } from '../auth/decorator';

@Controller('users')
export class UserController {
  @UseGuards(JwtGuard)
  @Get('me')
  getMe(@GetUser() user: User): User {
    return user;
  }
}
