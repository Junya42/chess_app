import { Body, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { LoginUserDto } from 'src/user/dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwt: JwtService,
    private userService: UserService,
  ) {}

  async createUser(@Body() newUser: CreateUserDto) {
    const user = await this.userService.create(newUser);
    const payload = { sub: user.id, username: user.username };
    return { access_token: await this.jwt.signAsync(payload) };
  }

  async login(@Body() user: LoginUserDto) {
    // const logUser = await this.userService.login(user);
    // const payload = { sub: logUser.id, username: logUser.username };
    // return { access_token: await this.jwt.signAsync(payload) };
  }
}
