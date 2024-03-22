import { Router } from "express";
import authRouter from "./authRouter.js";
import userRouter from "./userRouter.js";
import taskRouter from "./taskRouter.js";
import { authenticateUserToken } from "../middlewares/authMiddleware.js";

const router = Router();

router.use("/auth", authRouter);
router.use("/users", authenticateUserToken, userRouter);
router.use("/tasks", authenticateUserToken, taskRouter);

export default router;
