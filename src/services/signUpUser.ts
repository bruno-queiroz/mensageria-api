import { randomBytes } from "crypto";
import bcrypt from "bcrypt";

import { UserInputDTO } from "../validators/SignUpUser";
import { userRepository } from "../repositories/user";

export const signUpUserService = async (user: UserInputDTO) => {
  let hashedPassword = "";
  const saltRounds = 10;

  if (user.password) {
    hashedPassword = await bcrypt.hash(user.password, saltRounds);
  } else {
    hashedPassword = await bcrypt.hash(
      randomBytes(32).toString("hex"),
      saltRounds
    );
  }

  user.password = hashedPassword;

  const newUser = await userRepository.signUpUser(user as any);
  return newUser;
};
