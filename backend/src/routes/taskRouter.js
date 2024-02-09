import { Router } from "express";

import { createTask, updateTaskById } from "../controllers/taskController.js";
import {
  validateCreateTask,
  validateUpdateTask,
} from "../validations/taskValidation.js";

const router = Router();

router
  .route("/")
  .get(() => {})
  .post(validateCreateTask, createTask);

router
  .route("/:taskId")
  .patch(validateUpdateTask, updateTaskById)
  .delete(() => {});

export default router;
