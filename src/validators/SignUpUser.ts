import { z } from "zod";

export const SignUpUserSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string(),
  image: z.string().optional(),
  sessionToken: z.string().min(30),
});

type SignUpUserSchemaType = z.infer<typeof SignUpUserSchema>;
export type SignUpUserDTO = Omit<SignUpUserSchemaType, "sessionToken">;
