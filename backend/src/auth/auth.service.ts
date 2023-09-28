import { Body, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaClient,
    private jwt: JwtService,
    private userService: UserService,
  ) {}

  async createUser(@Body() newUser: CreateUserDto) {
    const user = await this.userService.create(newUser);
    const payload = { sub: user.id, username: user.username };
    return { access_token: await this.jwt.signAsync(payload) };
  }
}
