import Wrapper from "@/components/Wrapper";

import useFetchCurrentUser from "@/hooks/useFetchCurrentUser";
import TaskSkeletonCard from "@/components/task/TaskSkeletonCard";
import Board from "@/components/dnd/Board";

const Dashboard = () => {
  const { data: user, isPending, isError } = useFetchCurrentUser();

  return (
    <Wrapper title="Board">
      {isPending ? (
        <TaskSkeletonCard />
      ) : isError ? (
        <p className="text-red-500">Something went wrong!</p>
      ) : (
        <Board
          startedTask={user.startedTask}
          inProgressTask={user.inProgressTask}
          completedTask={user.completedTask}
        />
      )}
    </Wrapper>
  );
};

export default Dashboard;
