import { body, header } from "express-validator";
import { mapValidationErrors } from "../middlewares/validationMiddleware.js";

export const validateRegister = mapValidationErrors([
  body("email")
    .isEmail()
    .withMessage("Invalid email format!")
    .notEmpty()
    .withMessage("Email is required!"),
  body("name").notEmpty().withMessage("Name is required!"),
  body("password")
    .notEmpty()
    .withMessage("Password is required!")
    .isLength({ min: 6, max: 128 })
    .withMessage(
      "Password must be at least 6 characters with a max of 128 characters."
    ),
  body("confirmPassword")
    .notEmpty()
    .withMessage("Confirm password is required!")
    .isLength({ min: 6, max: 128 })
    .withMessage(
      "Confirm password must be at least 6 characters with a max of 128 characters."
    )
    .custom((value, { req }) => value === req.body.password)
    .withMessage("Password and confirm password do not match!"),
]);

export const validateLogin = mapValidationErrors([
  body("email")
    .isEmail()
    .withMessage("Invalid email format!")
    .notEmpty()
    .withMessage("Email is required!"),
  body("password")
    .notEmpty()
    .withMessage("Password is required!")
    .isLength({ min: 6, max: 128 })
    .withMessage(
      "Password must be at least 6 characters with a max of 128 characters."
    ),
]);

export const validateToken = mapValidationErrors([
  body("token").notEmpty().withMessage("Token is required!").isJWT(),
]);
