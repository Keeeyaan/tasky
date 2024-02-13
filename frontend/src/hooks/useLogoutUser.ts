import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { useToast } from "@/components/ui/use-toast";

import { logout } from "@/api/auth";
import { useStore } from "@/store";

const useLogoutUser = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { setAuth } = useStore();
  const { toast } = useToast();

  return useMutation({
    mutationKey: undefined,
    mutationFn: logout,
    onSuccess: (data) => {
      queryClient.removeQueries();
      setAuth({ accessToken: "" });
      toast({
        title: "Logout Success",
        description: data.message,
      });
      navigate("/", { replace: true });
    },
    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast({
        title: "Opps.. Error on logout. Try again!",
        description: error.response.data.message || error.message,
      });
    },
  });
};

export default useLogoutUser;
