import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_API_URL;
axios.defaults.withCredentials = true;

import {
  ILoginRefreshResponse,
  IRegisterResponse,
  IRegisterProp,
  ILoginProp,
} from "@/types";

export const axiosPrivate = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

export async function login(data: ILoginProp) {
  const response = await axios.post<ILoginRefreshResponse>(`auth/login`, data);
  return response.data;
}

export async function register(data: IRegisterProp) {
  const response = await axios.post<IRegisterResponse>(`auth/register`, data);
  return response.data;
}

export async function refreshAccessToken() {
  const response = await axios.get<ILoginRefreshResponse>("auth/refresh");
  return response.data;
}

axiosPrivate.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const prevRequest = error?.config;
    const errorMessage = error.response?.data.message;

    if (errorMessage?.includes("Unathorized") && !prevRequest?.sent) {
      prevRequest.sent = true;

      const newAccessToken = await refreshAccessToken();
      prevRequest.headers[
        "Authorization"
      ] = `Bearer ${newAccessToken.accessToken}`;
      return axiosPrivate(prevRequest);
    }
    return Promise.reject(error);
  }
);
