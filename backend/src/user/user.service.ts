import { Body, Injectable } from '@nestjs/common';
import { PrismaClient, Role } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaClient, private jwt: JwtService) {}
  async create(@Body() newUserObj: CreateUserDto) {
    const newUser = await this.prisma.user.create({
      data: {
        ...newUserObj,
        role: Role.USER,
      },
    });
    return newUser;
  }
}
