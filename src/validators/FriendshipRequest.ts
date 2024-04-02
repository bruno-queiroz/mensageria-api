import { z } from "zod";

export const FriendshipRequestSchema = z.object({
  toUser: z.string().uuid(),
  fromUser: z.string().uuid(),
});

export type FriendshipRequestDto = z.infer<typeof FriendshipRequestSchema>;
