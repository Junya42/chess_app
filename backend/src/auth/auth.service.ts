import { Body, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { LoginUserDto } from 'src/user/dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(private jwt: JwtService, private userService: UserService) {}

  async createUser(@Body() newUser: CreateUserDto) {
    const user = await this.userService.create(newUser);
    const payload = { sub: user.id, username: user.username };
    return { access_token: await this.jwt.signAsync(payload) };
  }

  async login(@Body() user: LoginUserDto) {
    const userLogged = await this.userService.login(user);
    console.log(`User ${userLogged.username} is succefully logged!`)
    const payload = { sub: userLogged.id, username: userLogged.username };
    return { access_token: await this.jwt.signAsync(payload) };
  }
}
