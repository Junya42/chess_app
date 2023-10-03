import { Injectable } from '@nestjs/common';

import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { CreateUserDto, createUserSchema } from 'src/user/dto/create-user.dto';

@Injectable()
export class ParseData {
  constructor(private configService: ConfigService) {}
  async passwordHashingBeforeUsage(value: CreateUserDto): Promise<CreateUserDto> {
    const saltRounds = this.configService.get<number>('bcrypt.round');
    if (value && value.password !== undefined && saltRounds)
      value.password = await bcrypt.hash(value.password, saltRounds);
    return value;
  }
}
