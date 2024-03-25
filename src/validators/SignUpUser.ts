import { z } from "zod";

export const SignUpUserSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string(),
  image: z.string().optional(),
});

export type SignUpUserDTO = z.infer<typeof SignUpUserSchema>;
