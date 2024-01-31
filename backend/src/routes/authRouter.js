import { Router } from "express";
import {
  login,
  logout,
  refreshToken,
  register,
} from "../controllers/authController.js";
import {
  validateLogin,
  validateRegister,
  validateRefreshToken,
} from "../validations/authValidation.js";
import loginLimiter from "../middlewares/loginLimiterMiddleware.js";

const router = Router();

router.post("/register", validateRegister, register);
router.post("/login", loginLimiter, validateLogin, login);
router.delete("/logout", logout);
router.post("/refresh", validateRefreshToken, refreshToken);

export default router;
