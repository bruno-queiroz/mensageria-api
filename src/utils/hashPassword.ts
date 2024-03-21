import bcrypt from "bcrypt";
import { SignUpUserDTO } from "../validators/SignUpUser";

export const hashPassword = async (user: SignUpUserDTO) => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(user.password, saltRounds);
  user.password = hashedPassword;

  return user;
};
