import { z } from "zod";

export const SignUpUserSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().optional(),
  photo: z.string().optional(),
});

export type UserInputDTO = z.infer<typeof SignUpUserSchema>;
