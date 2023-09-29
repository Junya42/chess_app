import { Body, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Role } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(@Body() newUserObj: CreateUserDto) {
    try {
      const newUser = await this.prisma.user.create({
        data: {
          ...newUserObj,
          role: Role.USER,
        },
      });
      return newUser;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.CONFLICT,
          error: 'This email or username already in use',
        },
        HttpStatus.CONFLICT,
        {
          cause: error,
        },
      );
    }
  }

  async login(@Body() userInfo: LoginUserDto) {
    const whereData: any = { password: userInfo.password };
    if ('email' in userInfo) whereData.email = userInfo.email;
    else whereData.username = userInfo.username;
    try {
      const res = await this.prisma.user.findUniqueOrThrow({
        where: whereData,
        select: { id: true, username: true },
      });
      return res;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          error: 'Invalid credentials',
        },
        HttpStatus.UNAUTHORIZED,
        {
          cause: error,
        },
      );
    }
  }
}
