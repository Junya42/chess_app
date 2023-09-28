import { z } from 'zod';

export const createUserSchema = z
  .object({
    email: z.string().email().min(5),
    username: z.string().min(2),
    password: z.string(),
  })
  .required();

export type CreateUserDto = {
  email: string;
  username: string;
  password: string;
};
