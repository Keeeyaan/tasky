import { Router } from "express";

import {
  getCurrentUserTasks,
  createTask,
  updateTaskById,
  deleteTaskById,
  userTaskSummary,
} from "../controllers/taskController.js";

import {
  validateCreateTask,
  validateDeleteTask,
  validateGetCurrentUserTasks,
  validateUpdateTask,
} from "../validations/taskValidation.js";

const router = Router();

router
  .route("/")
  .get(() => {})
  .post(validateCreateTask, createTask);

router.route("/current").get(validateGetCurrentUserTasks, getCurrentUserTasks);
router.route("/summary").get(userTaskSummary);

router
  .route("/:taskId")
  .patch(validateUpdateTask, updateTaskById)
  .delete(validateDeleteTask, deleteTaskById);

export default router;
