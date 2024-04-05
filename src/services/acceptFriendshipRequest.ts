import { friendshipRequestRepository } from "../repositories/friendshipRequest";
import { FriendshipRequestDto } from "../validators/FriendshipRequest";

export const acceptFriendshipRequestService = async (
  request: FriendshipRequestDto
) => {
  return friendshipRequestRepository.accept(request);
};
