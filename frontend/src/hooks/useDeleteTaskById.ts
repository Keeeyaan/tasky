import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useToast } from "@/components/ui/use-toast";

import { deleteTaskById } from "@/api/task";

const useDeleteTaskId = () => {
  const queryClient = useQueryClient();

  const { toast } = useToast();

  return useMutation({
    mutationKey: ["task"],
    mutationFn: deleteTaskById,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
      toast({
        title: "Task Deleted!",
        description: data.message,
      });
    },
    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast({
        title: "Opps.. Error on delete. Try again!",
        description: error.response.data.message || error.message,
      });
    },
  });
};

export default useDeleteTaskId;
