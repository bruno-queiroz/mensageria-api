import { Router } from "express";
import { findFriendController } from "../controllers/findFriend";

const router = Router();

router.get("/", findFriendController);

export default router;
