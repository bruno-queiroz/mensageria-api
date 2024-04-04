import { friendshipRequestRepository } from "../repositories/friendshipRequest";

export const getFriendshipRequestService = async (userId: string) => {
  return await friendshipRequestRepository.getByUserId(userId);
};
