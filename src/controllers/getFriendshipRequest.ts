import { Request, Response } from "express";
import { getFriendshipRequestService } from "../services/getFriendshipRequest";

export const getFriendshipRequestController = async (
  req: Request,
  res: Response
) => {
  try {
    const friendshipRequests = await getFriendshipRequestService(
      req.body.userId
    );
    console.log("request", friendshipRequests);
    res.status(200).json({
      data: friendshipRequests,
      message: "Get friendship request was made successfully.",
      isOk: true,
    });
  } catch (error) {
    console.error("Error getting friendship request", error);

    res.status(500).json({
      message: "Something went wrong getting friendship request.",
      isOk: false,
    });
  }
};
