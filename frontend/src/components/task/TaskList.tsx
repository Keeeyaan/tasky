import { cn } from "@/lib/utils";
import TaskCard from "./TaskCard";

import { ITask } from "@/types";

type TaskListProps = {
  className?: string;
  tasks: ITask[];
};

const TaskList = ({ className, tasks }: TaskListProps) => {
  return (
    <div className={cn("", className)}>
      {tasks.map((task) => {
        return <TaskCard key={task.id} task={task} />;
      })}
    </div>
  );
};

export default TaskList;
