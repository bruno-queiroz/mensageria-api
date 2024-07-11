import { z } from "zod";

export const GetMessageSchema = z.object({
  toUser: z.string().uuid(),
  fromUser: z.string().uuid(),
  date: z.string(),
});

export type GetMessageDto = z.infer<typeof GetMessageSchema>;
