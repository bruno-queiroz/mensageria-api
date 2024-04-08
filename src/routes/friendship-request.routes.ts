import { Router } from "express";
import { sendFriendshipRequestController } from "../controllers/sendFriendshipRequest";
import { getFriendshipRequestController } from "../controllers/getFriendshipRequest";
import { acceptFriendshipRequestController } from "../controllers/acceptFriendshipRequest";
import { rejectFriendshipRequestController } from "../controllers/rejectFriendshipRequest";

const router = Router();

router.post("/", sendFriendshipRequestController);
router.post("/accept", acceptFriendshipRequestController);
router.post("/reject", rejectFriendshipRequestController);

router.get("/", getFriendshipRequestController);

export default router;
