import { Router } from "express";
import { sendFriendshipRequestController } from "../controllers/sendFriendshipRequest";
import { getFriendshipRequestController } from "../controllers/getFriendshipRequest";
import { acceptFriendshipRequestController } from "../controllers/acceptFriendshipRequest";

const router = Router();

router.post("/", sendFriendshipRequestController);
router.post("/accept", acceptFriendshipRequestController);

router.get("/", getFriendshipRequestController);

export default router;
