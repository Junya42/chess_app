import { ConfigService } from '@nestjs/config';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
export declare class ParseData {
    private configService;
    constructor(configService: ConfigService);
    passwordHashingBeforeUsage(value: CreateUserDto): Promise<CreateUserDto>;
}
