import prisma from "../lib/prisma.js";
import { StatusCodes } from "http-status-codes";

import asyncErrorHandler from "../utils/AsyncErrorHandler.js";

export const getCurrentUser = asyncErrorHandler(async (req, res) => {
  const { userId } = req.user;

  const user = await prisma.user.findUnique({
    where: {
      id: Number(userId),
    },
    include: {
      tasks: true,
    },
  });

  // Exclude keys from user
  function exclude(user, keys) {
    return Object.fromEntries(
      Object.entries(user).filter(([key]) => !keys.includes(key))
    );
  }

  const userWithoutPassword = exclude(user, ["password"]);

  res
    .status(StatusCodes.OK)
    .json({ status: "success", user: userWithoutPassword });
});
