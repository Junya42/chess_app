import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { LoginUserDto } from 'src/user/dto/login-user.dto';
export declare class AuthService {
    private jwt;
    private userService;
    constructor(jwt: JwtService, userService: UserService);
    createUser(newUser: CreateUserDto): Promise<{
        access_token: string;
    }>;
    login(user: LoginUserDto): Promise<void>;
}
