import { Request, Response } from "express";
import { getFriendService } from "../services/getFriend";

export const getFriendController = async (req: Request, res: Response) => {
  try {
    const userId = req.body.userId;
    const users = await getFriendService(userId);

    res.status(200).json({
      data: users,
      message: "Friends requested successfully.",
      isOk: true,
    });
  } catch (error) {
    console.error("Error getting friends.", error);

    res.status(500).json({
      message: "Something went wrong getting friends.",
      isOk: false,
    });
  }
};
