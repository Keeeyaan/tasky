import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_API_URL;
axios.defaults.withCredentials = true;

import {
  ILoginRefreshResponse,
  IGenericResponse,
  IRegisterProp,
  ILoginProp,
} from "@/types";

export async function login(data: ILoginProp) {
  const response = await axios.post<ILoginRefreshResponse>(`auth/login`, data);
  return response.data;
}

export async function register(data: IRegisterProp) {
  const response = await axios.post<IGenericResponse>(`auth/register`, data);
  return response.data;
}

export async function logout() {
  const response = await axios.delete<IGenericResponse>(`auth/logout`);
  return response.data;
}

export async function refreshAccessToken() {
  const response = await axios.get<ILoginRefreshResponse>("auth/refresh");
  return response.data;
}
