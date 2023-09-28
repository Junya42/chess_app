import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { config } from '../config/config';
import { AuthModule } from './auth/auth.module';

// @Module({
//   imports: [
// 	JwtModule.registerAsync({
// 		imports : [ConfigModule],
// 		useFactory : async (configService : ConfigService) => ({
// 			global : true,
// 			secret : configService.get<string>('jwt.jwtKey'),
// 			signOptions: { expiresIn: '24h' }
// 		}),
// 		inject : [ConfigService]
// 	}),
// 	UserModule
// ],
//   controllers: [AppController],
//   providers: [AppService],
// })

Module({
  // 	imports: [
  // 	  AuthModule,
  // 	  UserModule,
  // 	  ConfigModule.forRoot({
  // 			isGlobal : true,
  // 			load : [config],
  // 	}),
  //   ],
  imports: [],
  controllers: [AppController],
  providers: [AppService],
});
export class AppModule {}
