import { Request, Response } from "express";
import { sendMessageService } from "../services/sendMenssage";
import { SendMessageSchema } from "../validators/SendMessage";

export const sendMessageController = async (req: Request, res: Response) => {
  try {
    const message = SendMessageSchema.parse({
      ...req.body,
      fromUser: req.body.userId,
    });
    await sendMessageService(message);

    res.status(201).json({ message: "Message sent successfully.", isOk: true });
  } catch (error) {
    console.error("Error sending message.", error);

    res.status(500).json({
      message: "Something went wrong sending message.",
      isOk: false,
    });
  }
};
