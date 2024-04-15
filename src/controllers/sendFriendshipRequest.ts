import { Request, Response } from "express";
import { FriendshipRequestSchema } from "../validators/FriendshipRequest";
import { sendFriendshipRequestService } from "../services/sendFriendshipRequest";

export const sendFriendshipRequestController = async (
  req: Request,
  res: Response
) => {
  try {
    const friendshipRequest = FriendshipRequestSchema.parse(req.body);
    await sendFriendshipRequestService(friendshipRequest);

    res
      .status(201)
      .json({ message: "Friendship request sent successfully.", isOk: true });
  } catch (error) {
    console.error("Error sending friendship request.", error);

    res.status(500).json({
      message: "Something went wrong sending friendship request.",
      isOk: false,
    });
  }
};
