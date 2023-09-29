import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { ZodListValidationPipe, ZodValidationPipe } from 'pipes/zod.pipe';
import { CreateUserDto, createUserSchema } from 'src/user/dto/create-user.dto';
import { AuthService } from './auth.service';
import {
  LoginUserDto,
  loginUserSchemaByMail,
  loginUserSchemaByUsername,
} from 'src/user/dto/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  @UsePipes(new ZodValidationPipe(createUserSchema))
  createUser(@Body() newUser: CreateUserDto) {
	console.log("Trying to create a user");
    return this.authService.createUser(newUser);
  }

  @Post('login')
  @UsePipes(
    new ZodListValidationPipe([
      loginUserSchemaByMail,
      loginUserSchemaByUsername,
    ]),
  )
  login(@Body() user: LoginUserDto) {
    return this.authService.login(user);
  }
}
