import { Body, Controller, UsePipes } from '@nestjs/common';
import { ZodValidationPipe } from 'pipes/zod.pipe';
import { CreateUserDto, createUserSchema } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';

@Controller('auth')
export class AuthController {
	constructor(private userService : UserService){}
	@UsePipes(new ZodValidationPipe(createUserSchema))
	createUser(@Body() newUser : CreateUserDto){
		this.userService.create(newUser)
	}
}
