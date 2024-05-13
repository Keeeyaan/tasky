import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";

import { getCurrentUser } from "@/api/user";

interface MonthlyTasks {
  month: string;
  task: number;
}

const useFetchCurrentUser = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
    select: (data) => {
      const tasksByMonth: MonthlyTasks[] = [];
      const monthsMap: { [month: string]: number } = {};

      data.user.tasks.forEach((inquiry) => {
        const month = format(new Date(inquiry.createdAt), "MMMM");
        if (!monthsMap[month]) {
          monthsMap[month] = 0;
        }
        monthsMap[month]++;
      });

      // Convert map to array of MonthlyInquiry objects
      Object.keys(monthsMap).forEach((month) => {
        tasksByMonth.push({ month, task: monthsMap[month] });
      });

      data.monthlyTasks = tasksByMonth;

      return data;
    },
  });
};

export default useFetchCurrentUser;
