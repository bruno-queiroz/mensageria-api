import { friendRepository } from "../repositories/friend";

export const getFriendService = async (myId: string) => {
  return await friendRepository.getFriends(myId);
};
