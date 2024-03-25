import { Router } from "express";
import { signUpUserController } from "../controllers/signUpUser";
import { signInUserController } from "../controllers/signInUser";

const router = Router();

router.post("/sign-up", signUpUserController);
router.post("/sign-in", signInUserController);

export default router;
