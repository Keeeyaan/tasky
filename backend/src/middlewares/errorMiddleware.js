import { StatusCodes } from "http-status-codes";
import logger from "../logger/index.js";

const errorHandlerMiddleware = (err, req, res, next) => {
  logger.error(err);

  const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  const message = err.message || "Something went wrong, try again later";
  const status = err.status || "error";

  res.status(statusCode).json({ statusCode, status, message });
};

export default errorHandlerMiddleware;
