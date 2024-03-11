import { Request, Response } from "express";
import { SignUpUserSchema } from "../validators/SignUpUser";
import { signUpUserService } from "../services/signUpUser";

export const signUpUserController = async (req: Request, res: Response) => {
  try {
    const userBody = SignUpUserSchema.parse(req.body);

    const newUser = await signUpUserService(userBody);

    res.status(201).json({
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
