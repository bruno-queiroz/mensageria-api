import { Request, Response } from "express";
import { SignUpUserSchema } from "../validators/SignUpUser";
import { signUpUserService } from "../services/signUpUser";

export const signUpUserController = async (req: Request, res: Response) => {
  try {
    const userData = SignUpUserSchema.parse(req.body);
    const { newUser, expireDate, sessionToken } = await signUpUserService(
      userData
    );

    res
      .status(201)
      .cookie("next-auth.session-token", sessionToken, {
        httpOnly: true,
        expires: expireDate,
        secure: true,
      })
      .cookie("mensageria-user-id", newUser.id, {
        httpOnly: false,
        expires: expireDate,
        secure: true,
      })
      .json({
        data: newUser,
        message: "User signed up successfully.",
        isOk: true,
      });
  } catch (error) {
    console.error("Error signing up user", error);

    res.status(500).json({
      message: "Something went wrong signing up the user.",
      isOk: false,
    });
  }
};
