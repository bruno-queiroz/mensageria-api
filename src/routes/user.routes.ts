import { Router } from "express";
import { signUpUserController } from "../controllers/signUpUser";

const router = Router();

router.post("/sign-up", signUpUserController);
router.post("/sign-in");

export default router;
