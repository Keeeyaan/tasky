import { rateLimit } from "express-rate-limit";
import logger from "../utils/Logger.js";
import CustomError from "../utils/CustomError.js";

const loginLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  message: {
    message:
      "Too many login attemps from this IP, please try again after 60 second pause",
  },
  handler: (req, res, next, options) => {
    logger.error(
      `Too Many Request: ${options.message.message}\t${req.method}\t${req.url}\t${req.headers.origin}`
    );
    next(new CustomError(options.message, options.statusCode));
  },
  standardHeaders: true,
  legacyHeaders: false,
});

export default loginLimiter;
