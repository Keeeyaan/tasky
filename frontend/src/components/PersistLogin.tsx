import { useRefreshToken } from "@/hooks/useRefreshToken";
import { useStore } from "@/store";
import { ReactNode, useEffect, useState } from "react";

const PersistLogin = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);
  const { auth } = useStore();
  const refresh = useRefreshToken();

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);
  }, []);

  return <>{isLoading ? <p>Loading...</p> : children}</>;
};

export default PersistLogin;
