import { Request, Response } from "express";
import { FindFriendSchema } from "../validators/FindFriend";
import { findFriendService } from "../services/findFriend";

export const findFriendController = async (req: Request, res: Response) => {
  try {
    const { q } = FindFriendSchema.parse(req.query);
    const userId = req.body.userId;
    const users = await findFriendService(userId, q);

    res.status(200).json({
      data: users,
      message: "The query was made successfully.",
      isOk: true,
    });
  } catch (error) {
    console.error("Something went wrong when querying.", error);

    res.status(500).json({
      message: "Something went wrong when querying.",
      isOk: false,
    });
  }
};
