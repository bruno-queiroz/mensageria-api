import { z } from "zod";

export const SignUpUserSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string(),
  image: z.string().optional(),
  sessionToken: z.string().min(180),
});

export type UserInputDTO = z.infer<typeof SignUpUserSchema>;
