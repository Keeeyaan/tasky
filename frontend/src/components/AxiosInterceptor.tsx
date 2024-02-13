import axios from "axios";
import { useStore } from "@/store";
import { ReactNode, useEffect } from "react";
import { useRefreshToken } from "../hooks/useRefreshToken";

/* eslint-disable-next-line react-refresh/only-export-components*/
export const axiosPrivate = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

const AxiosInterceptor = ({ children }: { children: ReactNode }) => {
  const refresh = useRefreshToken();
  const { auth } = useStore();

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${auth.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        const prevRequest = error?.config;
        const errorMessage = error.response?.data.message;

        if (errorMessage?.includes("Unathorized") && !prevRequest?.sent) {
          prevRequest.sent = true;

          const newAccessToken = await refresh();
          prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return axiosPrivate(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [auth, refresh]);

  return children;
};

export default AxiosInterceptor;
