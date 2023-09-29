import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    createUser(newUser: CreateUserDto): Promise<{
        access_token: string;
    }>;
}
