import { z } from "zod";

export const GetMessageSchema = z.object({
  toUser: z.string().uuid(),
  fromUser: z.string().uuid(),
});

export type GetMessageDto = z.infer<typeof GetMessageSchema>;
