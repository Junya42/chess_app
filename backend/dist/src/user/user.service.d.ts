import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginUserDto } from './dto/login-user.dto';
export declare class UserService {
    private prisma;
    constructor(prisma: PrismaService);
    create(newUserObj: CreateUserDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        password: string;
        username: string;
        role: import(".prisma/client").$Enums.Role;
    }>;
    login(userInfo: LoginUserDto): Promise<{
        username: string;
        id: string;
    }>;
}
