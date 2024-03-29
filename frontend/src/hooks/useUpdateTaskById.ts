import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useToast } from "@/components/ui/use-toast";

import { updateTaskById } from "@/api/task";

const useUpdateTaskId = () => {
  const queryClient = useQueryClient();

  const { toast } = useToast();

  return useMutation({
    mutationKey: ["task"],
    mutationFn: updateTaskById,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
      queryClient.invalidateQueries({
        queryKey: ["task"],
      });
      toast({
        title: "Task Updated!",
        description: data.message,
      });
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast({
        title: "Opps.. Error on update. Try again!",
        description: error.response.data.message || error.message,
      });
    },
  });
};

export default useUpdateTaskId;
