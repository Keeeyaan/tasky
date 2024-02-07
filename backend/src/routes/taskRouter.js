import { Router } from "express";

import { createTask, updateTaskById } from "../controllers/taskController.js";
import { validateCreateUpdateTask } from "../validations/taskValidation.js";

const router = Router();

router
  .route("/")
  .get(() => {})
  .post(validateCreateUpdateTask, createTask);

router
  .route("/:taskId")
  .patch(validateCreateUpdateTask, updateTaskById)
  .delete(() => {});

export default router;
