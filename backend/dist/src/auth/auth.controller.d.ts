import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { LoginUserDto } from 'src/user/dto/login-user.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    createUser(newUser: CreateUserDto): Promise<{
        access_token: string;
    }>;
    login(user: LoginUserDto): Promise<{
        access_token: string;
    }>;
    update(user: LoginUserDto): Promise<{
        access_token: string;
    }>;
}
