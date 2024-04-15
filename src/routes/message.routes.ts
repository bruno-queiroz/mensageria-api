import { Router } from "express";
import { sendMessageController } from "../controllers/sendMessage";
import { getMessageController } from "../controllers/getMessage";

const router = Router();

router.post("/", sendMessageController);
router.get("/", getMessageController);

export default router;
