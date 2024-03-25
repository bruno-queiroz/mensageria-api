import { v4 as uuidv4 } from "uuid";

import { SignUpUserDTO } from "../validators/SignUpUser";
import { userRepository } from "../repositories/user";
import { hashPassword } from "../utils/hashPassword";
import { setSessionExpireDate } from "../utils/setSessionExpireDate";

export const signUpUserService = async (user: SignUpUserDTO) => {
  const userWithHashedPw = await hashPassword(user);
  const expireDate = setSessionExpireDate({ days: 30 });
  const newUserId = uuidv4();
  const sessionToken = uuidv4();

  const newUser = await userRepository.signUpUser(
    { id: newUserId, ...userWithHashedPw },
    sessionToken,
    expireDate
  );
  return { newUser, expireDate, sessionToken };
};
