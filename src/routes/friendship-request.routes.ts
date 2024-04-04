import { Router } from "express";
import { sendFriendshipRequestController } from "../controllers/sendFriendshipRequest";
import { getFriendshipRequestController } from "../controllers/getFriendshipRequest";

const router = Router();

router.post("/", sendFriendshipRequestController);
router.get("/", getFriendshipRequestController);

export default router;
