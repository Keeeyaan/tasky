import { useQuery } from "@tanstack/react-query";

import { getCurrentUser } from "@/api/user";

const useFetchCurrentUserTaskByStatus = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
    select: (data) => {
      const startedTask = data.user.tasks.filter(
        (task) => task.status === "started"
      );
      const inProgressTask = data.user.tasks.filter(
        (task) => task.status === "in_progress"
      );
      const completedTask = data.user.tasks.filter(
        (task) => task.status === "completed"
      );

      return { startedTask, inProgressTask, completedTask };
    },
  });
};

export default useFetchCurrentUserTaskByStatus;
