import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';

@Module({
	imports : [UserModule],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}