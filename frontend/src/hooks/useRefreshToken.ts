import { useStore } from "@/store";
import { refreshAccessToken } from "@/api/auth";

export const useRefreshToken = () => {
  const { setAuth } = useStore();

  const request = async () => {
    const data = await refreshAccessToken();
    setAuth({ accessToken: data.accessToken });
    return data.accessToken;
  };

  return request;
};
