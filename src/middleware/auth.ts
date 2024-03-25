import { Response, Request, NextFunction } from "express";
import { sessionRepository } from "../repositories/session";
import { isSessionExpired } from "../utils/isSessionExpired";

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  const sessionToken = req.cookies["next-auth.session-token"];
  try {
    const userSession = await sessionRepository.getUserSession(sessionToken);
    const { expires, userId } = userSession[0];

    if (isSessionExpired(expires)) throw new Error();
    req.body.userId = userId;

    next();
  } catch (error) {
    console.log("Error authorizing ", error);

    res.status(401).json({
      isOk: false,
      message: "Session expired",
    });
  }
};
