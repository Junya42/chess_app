import { Body, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Role } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UserRepository } from './repository/user.repository';

@Injectable()
export class UserService {
  constructor(private userRepo: UserRepository) {}

  async create(@Body() newUserObj: CreateUserDto) {
    try {
      const newUser = await this.userRepo.create({
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
      const res = await this.userRepo.getUsers({
        where: whereData,
        select: { id: true, username: true },
      });
      if (res.length != 1)
        throw new Error("error when fetching user")
      return res[0];
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

  // async update(@Body())
  // {

  // }
}
