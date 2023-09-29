import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { ZodListValidationPipe, ZodValidationPipe } from 'pipes/zod.pipe';
import { CreateUserDto, createUserSchema } from 'src/user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { LoginUserDto, loginUserSchemaByMail, loginUserSchemaByUsername } from 'src/user/dto/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  @UsePipes(new ZodValidationPipe(createUserSchema))
  createUser(@Body() newUser: CreateUserDto) {
    return this.authService.createUser(newUser);
  }

//   @Post('login')
//   @UsePipes(new ZodListValidationPipe([loginUserSchemaByMail, loginUserSchemaByUsername]))
//   login(@Body() user: LoginUserDto) {
// 	return this.authService.login(user);
//   }
}
