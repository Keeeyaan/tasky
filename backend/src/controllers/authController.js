import { PrismaClient } from "@prisma/client";
import { matchedData } from "express-validator";
import { StatusCodes } from "http-status-codes";

import { comparePassword, hashPassword } from "../utils/PasswordUtils.js";
import {
  createAccessToken,
  createRefreshToken,
  verifyRefreshToken,
} from "../utils/TokenUtils.js";
import asyncErrorHandler from "../utils/AsyncErrorHandler.js";
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

  const foundRefreshToken = await prisma.refreshToken.findUnique({
    where: {
      userId: user.id,
    },
  });

  if (foundRefreshToken)
    await prisma.refreshToken.delete({
      where: {
        userId: user.id,
      },
    });

  const accessToken = createAccessToken({ userId: user.id });
  const refreshToken = createRefreshToken({
    userId: user.id,
  });

  // Create secure cookie with refresh token
  res.cookie("token", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

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
  });
});

export const logout = asyncErrorHandler(async (req, res, next) => {
  const cookies = req.cookies;

  if (!cookies?.token) return res.sendStatus(StatusCodes.NO_CONTENT);

  const refreshToken = cookies.token;

  // Is refreshToken found in DB?
  const foundRefreshToken = await prisma.refreshToken.findUnique({
    where: {
      token: refreshToken,
    },
  });

  if (!foundRefreshToken) {
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "None",
      secure: true,
    });
    return res.sendStatus(StatusCodes.NO_CONTENT);
  }

  await prisma.refreshToken.delete({
    where: {
      userId: foundRefreshToken.userId,
    },
  });

  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "None",
    secure: true,
  });

  res.status(StatusCodes.OK).json({
    status: "success",
    message: "User logged out!",
  });
});

export const refreshToken = asyncErrorHandler(async (req, res, next) => {
  const { token } = matchedData(req);

  const { userId } = verifyRefreshToken(token);

  const refreshToken = await prisma.refreshToken.findUnique({
    where: {
      token: token,
      userId: userId,
    },
  });

  if (!refreshToken) {
    return next(new CustomError("Forbidden Access!", StatusCodes.FORBIDDEN));
  }

  const accessToken = createAccessToken({ userId });

  res.status(StatusCodes.OK).json({
    status: "success",
    message: "Access token generated!",
    accessToken,
  });
});
