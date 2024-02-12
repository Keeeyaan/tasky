import { SlidersHorizontal } from "lucide-react";

import useFetchCurrentUser from "@/hooks/useFetchCurrentUser";

import Wrapper from "@/components/Wrapper";
import TaskSkeletonCard from "@/components/task/TaskSkeletonCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TaskCreateButton from "@/components/task/TaskCreateButton";
import Board from "@/components/dnd/Board";
import { Separator } from "@/components/ui/separator";

const Task = () => {
  const { data, isPending, isError } = useFetchCurrentUser();

  console.log(data);

  return (
    <Wrapper norMargin title="Task">
      <Card className="inline-block">
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle className="font-bold">Tasks</CardTitle>
          <div className="flex items-center gap-4">
            <SlidersHorizontal size={20} />
            <TaskCreateButton />
          </div>
        </CardHeader>
        <Separator className="mb-6" />
        <CardContent>
          {isPending ? (
            <TaskSkeletonCard />
          ) : isError ? (
            <p className="text-red-500">Something went wrong!</p>
          ) : (
            <Board
              startedTask={data.startedTask}
              inProgressTask={data.inProgressTask}
              completedTask={data.completedTask}
            />
          )}
        </CardContent>
      </Card>
    </Wrapper>
  );
};

export default Task;
