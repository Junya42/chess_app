import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { ZodValidationPipe } from 'pipes/zod.pipe';
import { CreateUserDto, createUserSchema } from 'src/user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('login')
  @UsePipes(new ZodValidationPipe(createUserSchema))
  createUser(@Body() newUser: CreateUserDto) {
    return this.authService.createUser(newUser);
  }

  @Get('empty')
  @UseGuards(AuthGuard)
  empty() {
    console.log("tu m'as reach");
    return 'gg empty function';
  }
}
