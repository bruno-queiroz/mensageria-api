import { Request, Response } from "express";
import { GetMessageSchema } from "../validators/GetMessage";
import { getMessageService } from "../services/getMessageService";

export const getMessageController = async (req: Request, res: Response) => {
  try {
    const data = GetMessageSchema.parse({
      ...req.query,
      fromUser: req.body.userId,
    });
    const messages = await getMessageService(data);

    res.status(200).json({
      data: messages,
      message: "Message request was made successfully.",
      isOk: true,
    });
  } catch (error) {
    console.error("Error requesting messages.", error);

    res.status(500).json({
      message: "Something went wrong requesting messages.",
      isOk: false,
    });
  }
};
