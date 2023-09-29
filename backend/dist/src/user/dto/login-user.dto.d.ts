import { z } from 'zod';
export declare const loginUserSchemaByMail: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
export declare const loginUserSchemaByUsername: z.ZodObject<{
    username: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    password: string;
    username: string;
}, {
    password: string;
    username: string;
}>;
export type LoginUserEmailDto = z.infer<typeof loginUserSchemaByMail>;
export type LoginUserUsernameDto = z.infer<typeof loginUserSchemaByUsername>;
export type LoginUserDto = LoginUserEmailDto | LoginUserUsernameDto;
