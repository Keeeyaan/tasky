import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { useToast } from "@/components/ui/use-toast";

import { logout } from "@/api/auth";

const useLogoutUser = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { toast } = useToast();

  return useMutation({
    mutationKey: undefined,
    mutationFn: logout,
    onSuccess: (data) => {
      queryClient.removeQueries();
      toast({
        title: "Logout Success",
        description: data.message,
      });
      navigate("/", { replace: true });
    },
    onError: (error: any) => {
      toast({
        title: "Opps.. Error on logout. Try again!",
        description: error.response.data.message || error.message,
      });
    },
  });
};

export default useLogoutUser;
