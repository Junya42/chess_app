import { z } from 'zod';

export const updateUserSchema = z
  .object({
    email: z.string().email().min(5),
    username: z.string().min(2),
    password: z.string().min(4),
  })
  .required();

export type updateUserDto = z.infer<typeof updateUserSchema>;
