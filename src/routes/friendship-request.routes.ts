import { Router } from "express";
import { sendFriendshipRequestController } from "../controllers/sendFriendshipRequest";

const router = Router();

router.post("/", sendFriendshipRequestController);

export default router;
