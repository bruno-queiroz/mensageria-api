import { db } from "../app";
import { friendshipRequest } from "../db/schema/friendshipRequest";
import { FriendshipRequestDto } from "../validators/FriendshipRequest";

export const friendshipRequestRepository = {
  async create(request: FriendshipRequestDto) {
    return await db.insert(friendshipRequest).values(request);
  },
};
