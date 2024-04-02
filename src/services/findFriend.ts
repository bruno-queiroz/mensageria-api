import { userRepository } from "../repositories/user";

export const findFriendService = async (userId: string, query: string) => {
  const users = await userRepository.findFriend(userId, query);

  return users;
};
