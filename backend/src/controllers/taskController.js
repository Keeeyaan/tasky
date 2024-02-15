import { PrismaClient } from "@prisma/client";
import { matchedData } from "express-validator";
import { StatusCodes } from "http-status-codes";

import asyncErrorHandler from "../utils/AsyncErrorHandler.js";

const prisma = new PrismaClient();

export const getAllTasks = asyncErrorHandler(async (req, res) => {});

export const getCurrentUserTasks = asyncErrorHandler(async (req, res) => {
  const { status } = matchedData(req);
  const { userId } = req.user;

  const task = await prisma.task.findMany({
    where: {
      userId: Number(userId),
      status,
    },
  });

  res.status(StatusCodes.OK).json({ status: "success", task: task });
});

export const createTask = asyncErrorHandler(async (req, res) => {
  const { title, description, priority, status, tag } = matchedData(req);
  const { userId } = req.user;

  const task = await prisma.task.create({
    data: {
      title,
      description,
      priority,
      status,
      tag,
      userId,
    },
  });

  res
    .status(StatusCodes.OK)
    .json({ status: "success", message: "Task created!" });
});

export const updateTaskById = asyncErrorHandler(async (req, res) => {
  const data = matchedData(req);
  const taskId = data.taskId;

  // remove the taskId from params
  delete data.taskId;

  const task = await prisma.task.update({
    where: { id: +taskId },
    data: data,
  });

  res
    .status(StatusCodes.OK)
    .json({ status: "success", message: "Task updated!" });
});

export const deleteTaskById = asyncErrorHandler(async (req, res) => {
  const { taskId } = matchedData(req);

  const task = await prisma.task.delete({
    where: { id: +taskId },
  });

  res
    .status(StatusCodes.OK)
    .json({ status: "success", message: "Task deleted!" });
});

export const userTaskSummary = asyncErrorHandler(async (req, res) => {
  const { userId } = req.user;

  const total = await prisma.task.count({
    where: {
      userId,
    },
  });

  const started = await prisma.task.count({
    where: {
      userId,
      status: "started",
    },
  });

  const in_progress = await prisma.task.count({
    where: {
      userId,
      status: "in_progress",
    },
  });

  const completed = await prisma.task.count({
    where: {
      userId,
      status: "completed",
    },
  });

  res
    .status(StatusCodes.OK)
    .json({
      status: "success",
      summary: { total, started, in_progress, completed },
    });
});
