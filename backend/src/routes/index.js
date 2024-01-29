import { Router } from "express";
import authRouter from "./authRouter.js";
import userRouter from "./userRouter.js";
import { authenticateUserToken } from "../middlewares/authMiddleware.js";

const router = Router();

router.use("/auth", authRouter);
router.use("/user", authenticateUserToken, userRouter);

export default router;
