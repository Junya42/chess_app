import { Body, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Role } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginUserDto, loginUserSchemaByMail } from './dto/login-user.dto';

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
	}
	catch(error){
		throw new HttpException({
			status: HttpStatus.CONFLICT,
			error: 'This email or username already in use',
		  }, HttpStatus.CONFLICT, {
			cause: error
		  });
	}
  }

//   async login(@Body() userInfo: LoginUserDto) {
// 	let where = { password: userInfo.password }
// 	if ('email' in userInfo) where.email = userInfo.email;

//   }
}
