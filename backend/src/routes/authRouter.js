import { Router } from "express";
import { login, token, register } from "../controllers/authController.js";
import {
  validateLogin,
  validateRegister,
  validateToken,
} from "../validations/authValidation.js";

const router = Router();

router.post("/register", validateRegister, register);
router.post("/login", validateLogin, login);
router.post("/logout", () => {});
router.post("/token", validateToken, token);

export default router;
