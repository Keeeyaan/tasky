import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { login } from "@/api/auth";
import { useToast } from "@/components/ui/use-toast";
import { useStore } from "@/store";

export const useLoginUser = () => {
  const { setAuth } = useStore();

  const { toast } = useToast();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      toast({
        title: "Login Success",
        description: data.message,
      });
      setAuth({ accessToken: data.accessToken });
      navigate("/dashboard", { replace: true });
    },
    onError: (error: any) => {
      toast({
        title: "Opps.. Error on login. Try again!",
        description: error.response.data.message || error.message,
      });
    },
  });
};
