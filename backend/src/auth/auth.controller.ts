import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { ZodValidationPipe } from 'pipes/zod.pipe';
import { CreateUserDto, createUserSchema } from 'src/user/dto/create-user.dto';
import { AuthService } from './auth.service';
import {
  LoginUserDto,
  loginUserSchemaByMail,
  loginUserSchemaByUsername,
} from 'src/user/dto/login-user.dto';
import { ParseData } from 'src/parse-data/parse-data';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private parseDataService: ParseData,
  ) {}

  @Post('signup')
  @UsePipes(
    new ZodValidationPipe([createUserSchema], () => this.parseDataService),
  )
  createUser(@Body() newUser: CreateUserDto) {
    return this.authService.createUser(newUser);
  }

  @Post('login')
  @UsePipes(
    new ZodValidationPipe([loginUserSchemaByMail, loginUserSchemaByUsername]),
  )
  login(@Body() user: LoginUserDto) {
    return this.authService.login(user);
  }

  @Post('update')
  @UsePipes(
    new ZodValidationPipe([loginUserSchemaByMail, loginUserSchemaByUsername]),
  )
  update(@Body() user: LoginUserDto) {
    return this.authService.login(user);
  }
}
