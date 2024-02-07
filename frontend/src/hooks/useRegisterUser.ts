import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { register } from "@/api/auth";
import { useToast } from "@/components/ui/use-toast";

export const useRegisterUser = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: register,
    onSuccess: (data) => {
      toast({
        title: "Register Success",
        description: data.message,
      });
      navigate("/login");
      toast({
        title: "Login to continue",
        description: "You may now login",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Opps.. Error on register. Try again!",
        description: error.response.data.message || error.message,
      });
    },
  });
};
