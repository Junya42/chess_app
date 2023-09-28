import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
