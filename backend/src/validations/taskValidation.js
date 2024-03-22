import { body, param, query } from "express-validator";
import { mapValidationErrors } from "../middlewares/validationMiddleware.js";

export const validateGetCurrentUserTasks = mapValidationErrors([
  query("status")
    .isIn(["started", "in_progress", "completed", ""])
    .withMessage("Invalid query params"),
]);

export const validateCreateTask = mapValidationErrors([
  body("title").notEmpty().withMessage("Task title is required!"),
  body("description")
    .notEmpty()
    .withMessage("Task description is required!")
    .isLength({ max: 1024 })
    .withMessage("Task description must be under 1024 characters."),
  body("priority"),
  body("status"),
  body("tag"),
]);

export const validateUpdateTask = mapValidationErrors([
  param("taskId").notEmpty().withMessage("Task ID is required!"),
  body("title").notEmpty().withMessage("Task title is required!"),
  body("description")
    .notEmpty()
    .withMessage("Task description is required!")
    .isLength({ max: 1024 })
    .withMessage("Task description must be under 1024 characters."),
  body("priority"),
  body("status"),
  body("tag"),
]);

export const validateDeleteTask = mapValidationErrors([
  param("taskId").notEmpty().withMessage("Task ID is required!"),
]);
