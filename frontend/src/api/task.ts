import { axiosPrivate } from "./auth";

import { IGenericResponse } from "@/types";

export type UpdateTaskByIdProps = {
  id: number;
  data: {
    title: string;
    description: string;
    tag: string;
    priority: "low" | "normal" | "high" | "urgent";
    status: "started" | "in_progress" | "completed";
  };
};

export type CreateTaskProps = {
  title: string;
  description: string;
  tag: string;
  priority: "low" | "normal" | "high" | "urgent" | "";
  status: "started" | "in_progress" | "completed" | "";
};

export const createTask = async (data: CreateTaskProps) => {
  const response = await axiosPrivate.post<IGenericResponse>(`tasks`, data);
  return response.data;
};

export const updateTaskById = async ({ id, data }: UpdateTaskByIdProps) => {
  const response = await axiosPrivate.patch<IGenericResponse>(
    `tasks/${id}`,
    data
  );
  return response.data;
};
