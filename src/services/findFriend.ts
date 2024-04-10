import { friendRepository } from "../repositories/friend";

export const findFriendService = async (userId: string, query: string) => {
  const users = await friendRepository.findFriend(userId, query);

  return users;
};
