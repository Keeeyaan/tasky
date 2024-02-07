import { axiosPrivate } from "./auth";

import { IGetCurrentUserResponse } from "@/types";

export async function getCurrentUser() {
  const response = await axiosPrivate.get<IGetCurrentUserResponse>(
    `user/current`
  );
  return response.data;
}
