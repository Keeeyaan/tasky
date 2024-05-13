import Wrapper from "@/components/Wrapper";

import useFetchCurrentUserTaskByStatus from "@/hooks/useFetchCurrentUserTaskByStatus";
import TaskSkeletonCard from "@/components/task/TaskSkeletonCard";
import Board from "@/components/dnd/Board";

const Dashboard = () => {
  const { data: task, isPending, isError } = useFetchCurrentUserTaskByStatus();

  return (
    <Wrapper title="Board">
      {isPending ? (
        <TaskSkeletonCard />
      ) : isError ? (
        <p className="text-red-500">Something went wrong!</p>
      ) : (
        <Board
          startedTask={task.startedTask}
          inProgressTask={task.inProgressTask}
          completedTask={task.completedTask}
        />
      )}
    </Wrapper>
  );
};

export default Dashboard;
