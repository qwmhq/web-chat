import { z } from "zod";

export const newUserSchema = z.object({
  email: z.string().email(),
  username: z.string().min(3),
  password: z.string().min(6),
});

export type NewUser = z.infer<typeof newUserSchema>;

export const loginSchema = z.object({
  username: z.string().nonempty(),
  password: z.string().nonempty(),
});

export type LoginObject = z.infer<typeof loginSchema>;
