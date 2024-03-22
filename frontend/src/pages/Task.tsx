import { Loader2, SlidersHorizontal } from "lucide-react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import useFetchCurrentUser from "@/hooks/useFetchCurrentUser";

import Wrapper from "@/components/Wrapper";
import TaskSkeletonCard from "@/components/task/TaskSkeletonCard";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import TaskCreateButton from "@/components/task/TaskCreateButton";
import Board from "@/components/dnd/Board";
import { Separator } from "@/components/ui/separator";
import useFetchUserTaskSummary from "@/hooks/useFetchUserTaskSummary";

const Task = () => {
  const { data: user, isPending, isError } = useFetchCurrentUser();
  const { data: summary, isPending: summaryPending } =
    useFetchUserTaskSummary();

  return (
    <Wrapper norMargin title="Task" className=" h-auto">
      <div className="flex gap-4">
        <Card className="inline-block min-h-screen mb-4">
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
                startedTask={user.startedTask}
                inProgressTask={user.inProgressTask}
                completedTask={user.completedTask}
              />
            )}
          </CardContent>
        </Card>
        <div className="sticky h-full space-y-4">
          <Card className="min-w-[300px]">
            <CardHeader>
              <CardTitle className="text-xl leading-none">Summary</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center">
              <div className="w-[150px] h-[150px]">
                <CircularProgressbar
                  className="font-bold shadow-purple-300 rounded-full shadow-lg"
                  value={
                    summaryPending || !summary.percentage
                      ? 0
                      : summary.percentage
                  }
                  text={`${summaryPending || !summary.percentage ? 0 : summary.percentage}%`}
                  styles={buildStyles({
                    pathColor: "#884DEE",
                    textSize: "14px",
                    textColor: "#030712",
                  })}
                />
              </div>
            </CardContent>
            <CardFooter className="justify-center">
              <div className="space-y-2">
                <h1 className="text-xl font-bold">Tasks</h1>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-[#ECF2FF] p-4 rounded-lg space-y-2 min-w-[100px]">
                    <h3 className="text-muted-foreground text-xs font-medium uppercase">
                      Total
                    </h3>
                    <h1 className="text-xl font-semibold">
                      <span className="px-[2px] rounded bg-blue-500 mr-2" />
                      {summaryPending ? (
                        <Loader2 className=" animate-spin" />
                      ) : (
                        summary.total
                      )}
                    </h1>
                  </div>
                  <div className="bg-[#FFEFE1] p-4 rounded-lg space-y-2 min-w-[100px]">
                    <h3 className="text-muted-foreground text-xs font-medium uppercase">
                      Completed
                    </h3>
                    <h1 className="text-xl font-semibold">
                      <span className="px-[2px] rounded bg-orange-500 mr-2" />
                      {summaryPending ? (
                        <Loader2 className=" animate-spin" />
                      ) : (
                        summary.completed
                      )}
                    </h1>
                  </div>
                  <div className="bg-[#FEEDFF] p-4 rounded-lg space-y-2 min-w-[100px]">
                    <h3 className="text-muted-foreground text-xs font-medium uppercase">
                      In Progress
                    </h3>
                    <h1 className="text-xl font-semibold">
                      <span className="px-[2px] rounded bg-pink-500 mr-2" />
                      {summaryPending ? (
                        <Loader2 className=" animate-spin" />
                      ) : (
                        summary.in_progress
                      )}
                    </h1>
                  </div>
                  <div className="bg-[#F1ECFF] p-4 rounded-lg space-y-2 min-w-[100px]">
                    <h3 className="text-muted-foreground text-xs font-medium uppercase">
                      Started
                    </h3>
                    <h1 className="text-xl font-semibold">
                      <span className="px-[2px] rounded bg-purple-500 mr-2" />
                      {summaryPending ? (
                        <Loader2 className=" animate-spin" />
                      ) : (
                        summary.started
                      )}
                    </h1>
                  </div>
                </div>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </Wrapper>
  );
};

export default Task;
