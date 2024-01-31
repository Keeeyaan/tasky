import { validationResult } from "express-validator";
import { StatusCodes } from "http-status-codes";
import CustomError from "../utils/CustomError.js";

export const mapValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg);

        if (errorMessages[0].startsWith("Unauthorized!")) {
          return next(
            new CustomError(
              "Not authorized to access this route!",
              StatusCodes.UNAUTHORIZED
            )
          );
        }

        const err = new CustomError(errorMessages, StatusCodes.BAD_REQUEST);
        next(err);
      }
      next();
    },
  ];
};
