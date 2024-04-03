import { friendshipRequestRepository } from "../repositories/friendshipRequest";
import { FriendshipRequestDto } from "../validators/FriendshipRequest";

export const sendFriendshipRequestService = async (
  friendshipRequest: FriendshipRequestDto
) => {
  return await friendshipRequestRepository.create(friendshipRequest);
};
