import {
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import * as argon from 'argon2';

import { PrismaService } from '../prisma/prisma.service';
import { AuthDto } from './dto/auth.dto';

@Injectable({})
export class AuthService {
  constructor(private prisma: PrismaService) {}
  async signup(dto: AuthDto) {
    const hash = await argon.hash(dto.password);
    // save the new user in the database
    try {
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash,
        },
      });
      delete user.hash;
      // return the new user
      return user;
    } catch (error) {
      if (
        error instanceof
        PrismaClientKnownRequestError
      ) {
        if (error.code === 'P2002') {
          throw new ForbiddenException(
            'Credentials taken',
          );
        }
      }
      throw error;
    }
  }

  async signin(dto: AuthDto) {
    // find the user by email
    const user =
      await this.prisma.user.findUnique({
        where: {
          email: dto.email,
        },
      });
    // if user does not exist, throw an error
    if (!user) {
      throw new ForbiddenException(
        'Credentials invalid',
      );
    }

    // campare the password with the hash
    const matchedPassword = await argon.verify(
      user.hash,
      dto.password,
    );

    // if the password is wrong, throw an error
    if (!matchedPassword) {
      throw new ForbiddenException(
        'Credentials invalid',
      );
    }

    // send back the user
    delete user.hash;

    return user;
  }
}
