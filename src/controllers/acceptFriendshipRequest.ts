import { Request, Response } from "express";
import { FriendshipRequestSchema } from "../validators/FriendshipRequest";
import { acceptFriendshipRequestService } from "../services/acceptFriendshipRequest";

export const acceptFriendshipRequestController = async (
  req: Request,
  res: Response
) => {
  const request = FriendshipRequestSchema.parse(req.body);
  await acceptFriendshipRequestService(request);

  try {
    res.status(201).json({
      message: "The request was accepted successfully.",
      isOk: true,
    });
  } catch (error) {
    console.error("Something went wrong when accepting friendship.", error);

    res.status(500).json({
      message: "Something went wrong when accepting friendship.",
      isOk: false,
    });
  }
};
