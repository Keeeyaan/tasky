import { Router } from "express";
import authRouter from "./authRouter.js";
import userRouter from "./userRouter.js";
import taskRouter from "./taskRouter.js";
import { authenticateUserToken } from "../middlewares/authMiddleware.js";

const router = Router();

router.use("/auth", authRouter);
router.use("/user", authenticateUserToken, userRouter);
router.use("/task", authenticateUserToken, taskRouter);

export default router;
