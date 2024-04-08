import { friendshipRequestRepository } from "../repositories/friendshipRequest";
import { FriendshipRequestDto } from "../validators/FriendshipRequest";

export const rejectFriendshipRequestService = async (
  request: FriendshipRequestDto
) => {
  return await friendshipRequestRepository.reject(request);
};
