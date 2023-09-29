import { z } from 'zod';

export const loginUserSchemaByMail = z
  .object({
    email: z.string().email().min(5),
    password: z.string().min(4),
  })
  .required();

export const loginUserSchemaByUsername = z
  .object({
    username: z.string().min(5),
    password: z.string().min(4),
  })
  .required();

export type LoginUserEmailDto = z.infer<typeof loginUserSchemaByMail>;
export type LoginUserUsernameDto = z.infer<typeof loginUserSchemaByUsername>;
export type LoginUserDto = LoginUserEmailDto | LoginUserUsernameDto;
