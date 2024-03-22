import { axiosPrivate } from "@/components/AxiosInterceptor";

import { IGetCurrentUserResponse } from "@/types";

export async function getCurrentUser() {
  const response =
    await axiosPrivate.get<IGetCurrentUserResponse>(`users/current`);

  return response.data;
}
