import { axiosPrivate } from "@/components/AxiosInterceptor";

import { IGenericResponse } from "@/types";

export type UpdateTaskByIdProps = {
  id: number;
  data: {
    title?: string;
    description?: string;
    tag?: string;
    priority?: "low" | "normal" | "high" | "urgent";
    status?: "started" | "in_progress" | "completed" | string;
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

export const deleteTaskById = async (id: number) => {
  const response = await axiosPrivate.delete<IGenericResponse>(`tasks/${id}`);
  return response.data;
};

export const getUserTaskSummary = async () => {
  const response = await axiosPrivate.get(`tasks/summary`);
  return response.data;
};
