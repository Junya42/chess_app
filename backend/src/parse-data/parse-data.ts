import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

@Injectable()
export class ParseData {
  constructor(private configService: ConfigService) {}
  static passwordHashingBeforeUsage(value: any) {
    const saltRounds = this.configService.get<number>('bcrypt.round');
    if (value && value.password !== undefined && saltRounds)
      value.password = bcrypt.hash(value.password, saltRounds);
    return value;
  }
}
