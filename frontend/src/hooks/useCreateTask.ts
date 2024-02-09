import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useToast } from "@/components/ui/use-toast";

import { createTask } from "@/api/task";

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  const { toast } = useToast();

  return useMutation({
    mutationKey: ["task"],
    mutationFn: createTask,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["task"],
      });
      toast({
        title: "Task Created!",
        description: data.message,
      });
    },
    onError: (error: any) => {
      toast({
        title: "Opps.. Error on create. Try again!",
        description: error.response.data.message || error.message,
      });
    },
  });
};

export default useCreateTask;
