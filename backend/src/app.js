import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import { StatusCodes } from "http-status-codes";

import routes from "./routes/index.js";
import errorHandlerMiddleware from "./middlewares/errorMiddleware.js";
import CustomError from "./utils/CustomError.js";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

// routes
app.use("/api/v1", routes);

// throw error on non existing api routes
app.use("*", (req, res, next) => {
  next(
    new CustomError(
      `Could not find ${req.originalUrl} route on the server!`,
      StatusCodes.NOT_FOUND
    )
  );
});

app.use(errorHandlerMiddleware);

export default app;
