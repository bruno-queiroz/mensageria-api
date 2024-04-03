import { Request, Response } from "express";

import { SignInUserSchema } from "../validators/SignInUser";
import { signInUserService } from "../services/signInUser";

export const signInUserController = async (req: Request, res: Response) => {
  try {
    const userData = SignInUserSchema.parse(req.body);
    const { isSignedIn, session } = await signInUserService(userData);

    if (!isSignedIn) {
      return res.status(401).json({ message: "Incorrect email/password" });
    }

    res
      .status(201)
      .cookie("next-auth.session-token", session?.sessionToken, {
        httpOnly: true,
        expires: session?.expires,
        secure: true,
      })
      .cookie("mensageria-user-id", session?.userId, {
        httpOnly: false,
        expires: session?.expires,
        secure: true,
      })
      .json({
        message: "User signed in successfully.",
        isOk: true,
      });
  } catch (error) {
    console.error("Error signing in user", error);

    res.status(500).json({
      message: "Something went wrong signing in user.",
      isOk: false,
    });
  }
};
