import { Router } from "express";
import { getFriendController } from "../controllers/getFriend";

const router = Router();

router.get("/", getFriendController);

export default router;
