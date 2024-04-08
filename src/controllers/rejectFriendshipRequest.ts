import { Request, Response } from "express";
import { FriendshipRequestSchema } from "../validators/FriendshipRequest";
import { rejectFriendshipRequestService } from "../services/rejectFriendshipRequest";

export const rejectFriendshipRequestController = async (
  req: Request,
  res: Response
) => {
  try {
    const request = FriendshipRequestSchema.parse(req.body);
    await rejectFriendshipRequestService(request);

    res.status(201).json({
      message: "The request was rejected successfully.",
      isOk: true,
    });
  } catch (error) {
    console.error("Error rejecting friendship request", error);

    res.status(500).json({
      message: "Something went wrong rejecting friendship request.",
      isOk: false,
    });
  }
};
