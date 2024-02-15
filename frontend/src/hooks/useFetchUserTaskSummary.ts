import { useQuery } from "@tanstack/react-query";

import { getUserTaskSummary } from "@/api/task";

const useFetchUserTaskSummary = () => {
  return useQuery({
    queryKey: ["task"],
    queryFn: getUserTaskSummary,
    select: (data) => {
      data.summary.percentage =
        (data.summary.completed / data.summary.total) * 100;
      return data.summary;
    },
  });
};

export default useFetchUserTaskSummary;
