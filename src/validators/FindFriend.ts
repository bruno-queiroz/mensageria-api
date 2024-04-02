import { z } from "zod";

export const FindFriendSchema = z.object({
  q: z.string(),
});
