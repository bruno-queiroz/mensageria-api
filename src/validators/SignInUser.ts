import { z } from "zod";

export const SignInUserSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  image: z.string().optional(),
});

export type SignInUserDTO = z.infer<typeof SignInUserSchema>;
