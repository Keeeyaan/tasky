import { Router } from "express";

const router = Router();

router
  .route("/")
  .get(() => {})
  .post(() => {});

router
  .route("/:taskId")
  .patch(() => {})
  .delete(() => {});

export default router;
