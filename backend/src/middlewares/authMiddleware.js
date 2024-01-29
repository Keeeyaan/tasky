import { StatusCodes } from "http-status-codes";

import { verifyAccessToken } from "../utils/TokenUtils.js";
import CustomError from "../utils/CustomError.js";

export const authenticateUserToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token)
    return next(new CustomError("Access denied!", StatusCodes.UNAUTHORIZED));

  try {
    const { userId } = verifyAccessToken(token);

    req.user = {
      userId,
    };

    next();
  } catch (err) {
    const error = new CustomError("Invalid token!", StatusCodes.UNAUTHORIZED);
    next(error);
  }
};
