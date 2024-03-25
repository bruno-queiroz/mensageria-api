import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

import { userRepository } from "../repositories/user";
import { SignInUserDTO } from "../validators/SignInUser";
import { sessionRepository } from "../repositories/session";
import { setSessionExpireDate } from "../utils/setSessionExpireDate";

export const signInUserService = async (user: SignInUserDTO) => {
  const [{ encryptedPw, userId }] = await userRepository.findUserByEmail(
    user.email
  );

  const isPasswordCorrect = await bcrypt.compare(
    user.password,
    encryptedPw || ""
  );

  if (!isPasswordCorrect) {
    return { isSignedIn: false };
  }

  const newSession = {
    userId,
    sessionToken: uuidv4(),
    expires: setSessionExpireDate({ days: 30 }),
  };

  await sessionRepository.createUserSession(newSession);

  return { isSignedIn: true, session: newSession };
};
