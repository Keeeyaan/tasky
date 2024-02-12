import TaskCard from "./TaskCard";

import { ITask } from "@/types";
import { Draggable } from "react-beautiful-dnd";

type TaskListProps = {
  tasks: ITask[] | [];
};

const TaskList = ({ tasks }: TaskListProps) => {
  return (
    <>
      {tasks.map((task, index) => (
        <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
          {(provided) => (
            <div
              {...provided.dragHandleProps}
              {...provided.draggableProps}
              ref={provided.innerRef}
            >
              <TaskCard task={task} />
            </div>
          )}
        </Draggable>
      ))}
    </>
  );
};

export default TaskList;
