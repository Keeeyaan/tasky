import { PrismaClient } from "@prisma/client";
import { matchedData } from "express-validator";
import { StatusCodes } from "http-status-codes";

import { comparePassword, hashPassword } from "../utils/PasswordUtils.js";
import {
  createAccessToken,
  createRefreshToken,
  verifyRefreshToken,
} from "../utils/TokenUtils.js";
import asyncErrorHandler from "../utils/asyncErrorHandler.js";
import CustomError from "../utils/CustomError.js";

const prisma = new PrismaClient();

export const register = asyncErrorHandler(async (req, res) => {
  const { email, name, password } = matchedData(req);

  const hashedPassword = await hashPassword(password);

  const user = await prisma.user.create({
    data: {
      email,
      name,
      password: hashedPassword,
    },
  });

  res
    .status(StatusCodes.CREATED)
    .json({ status: "success", message: "User account created!" });
});

export const login = asyncErrorHandler(async (req, res, next) => {
  const { email, password } = matchedData(req);

  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  const isValidUser = user && (await comparePassword(password, user.password));

  if (!isValidUser) {
    const error = new CustomError(
      "Invalid email or password!",
      StatusCodes.CONFLICT
    );
    return next(error);
  }

  const userToken = await prisma.refreshToken.findUnique({
    where: {
      userId: Number(user.id),
    },
  });

  if (userToken)
    await prisma.refreshToken.delete({
      where: {
        userId: Number(user.id),
      },
    });

  console.log(userToken);

  const accessToken = createAccessToken({ userId: user.id });
  const refreshToken = createRefreshToken({ userId: user.id });

  const createdRefreshToken = await prisma.refreshToken.create({
    data: {
      userId: user.id,
      token: refreshToken,
    },
  });

  console.log(createdRefreshToken);

  res.status(StatusCodes.OK).json({
    status: "success",
    message: "User logged in!",
    accessToken,
    refreshToken,
  });
});

export const logout = asyncErrorHandler(async (req, res, next) => {
  const { token } = matchedData(req);

  res.status(StatusCodes.OK).json({
    status: "success",
    message: "User logged out!",
  });
});

export const token = asyncErrorHandler(async (req, res) => {
  const { token } = matchedData(req);

  const refreshToken = await prisma.refreshToken.findUnique({
    where: {
      token: token,
    },
  });

  if (!refreshToken) {
    return next(new CustomError("Forbidden Access!", StatusCodes.FORBIDDEN));
  }

  const { userId } = verifyRefreshToken(token);

  const accessToken = createAccessToken({ userId });

  console.log(accessToken);

  res.status(StatusCodes.OK).json({
    status: "success",
    message: "Access token generated!",
    accessToken,
  });
});
