import { z } from "zod";

export const SendMessageSchema = z.object({
  toUser: z.string().uuid(),
  fromUser: z.string().uuid(),
  message: z.string().min(1),
});

export type SendMessageDto = z.infer<typeof SendMessageSchema>;
