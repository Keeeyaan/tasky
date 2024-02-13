import { useEffect, useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

import TaskList from "../task/TaskList";
import { StrictModeDroppable as Droppable } from "../../helper/StrictModeDroppable";
import { move, reorder } from "@/helper/dnd";

import { ITask } from "@/types";
import useUpdateTaskId from "@/hooks/useUpdateTaskById";

type BoardProps = {
  startedTask: ITask[] | [];
  inProgressTask: ITask[] | [];
  completedTask: ITask[] | [];
};

const Board = ({ startedTask, inProgressTask, completedTask }: BoardProps) => {
  const [newStartedTask, setNewStartedTask] = useState(startedTask || []);
  const [newInProgressTask, setNewInProgressTask] = useState(
    inProgressTask || []
  );
  const [newCompletedTask, setNewCompletedTask] = useState(completedTask || []);

  const { mutate: updateStatus } = useUpdateTaskId();

  useEffect(() => {
    setNewStartedTask(startedTask);
    setNewInProgressTask(inProgressTask);
    setNewCompletedTask(completedTask);
  }, [startedTask, inProgressTask, completedTask]);

  const droppableColumn = [
    { title: "Started", id: "started", data: newStartedTask },
    { title: "In Progress", id: "in_progress", data: newInProgressTask },
    { title: "Completed", id: "completed", data: newCompletedTask },
  ];

  const handleOnDragEnd = (results: DropResult) => {
    const { source, destination } = results;

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    const getList = (id: string) => {
      switch (id) {
        case "started":
          return newStartedTask;
        case "in_progress":
          return newInProgressTask;
        case "completed":
          return newCompletedTask;
        default:
          return [];
      }
    };

    if (source.droppableId === destination.droppableId) {
      const itemList = getList(source.droppableId);

      const updatedList = reorder(itemList, source.index, destination.index);

      switch (source.droppableId) {
        case "started":
          setNewStartedTask(updatedList);
          break;
        case "in_progress":
          setNewInProgressTask(updatedList);
          break;
        case "completed":
          setNewCompletedTask(updatedList);
          break;
        default:
          break;
      }
    } else {
      const result = move(
        getList(source.droppableId),
        getList(destination.droppableId),
        source,
        destination
      );
      switch (source.droppableId) {
        case "started":
          setNewStartedTask(result.started);
          break;
        case "in_progress":
          setNewInProgressTask(result.in_progress);
          break;
        case "completed":
          setNewCompletedTask(result.completed);
          break;
        default:
          break;
      }
      switch (destination.droppableId) {
        case "started":
          setNewStartedTask(result.started);
          break;
        case "in_progress":
          setNewInProgressTask(result.in_progress);
          break;
        case "completed":
          setNewCompletedTask(result.completed);
          break;
        default:
          break;
      }

      // update the data status
      const data = { ...getList(source.droppableId)[source.index] };
      const status =
        destination.droppableId === "started"
          ? "started"
          : destination.droppableId === "in_progress"
            ? "in_progress"
            : "completed";

      data.status = status;
      updateStatus({
        id: data.id,
        data,
      });
    }
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <div className="flex gap-2">
        {droppableColumn.map((col) => (
          <div key={col.id} className="space-y-2 w-[350px]">
            <h2 className="flex-grow text-muted-foreground font-medium text-base">
              {col.title}
            </h2>
            <Droppable droppableId={col.id} type="group">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="space-y-2"
                >
                  <TaskList tasks={col.data} />
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        ))}

        {/* <div className="space-y-2 w-[350px]">
          <h2 className="flex-grow text-muted-foreground font-medium text-base">
            In Progress
          </h2>
          <Droppable droppableId="in_progress" type="group">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="space-y-2"
              >
                <TaskList tasks={newInProgressTask} />
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>

        <div className="space-y-2 w-[350px]">
          <h2 className="text-muted-foreground font-medium text-base">
            Completed
          </h2>
          <Droppable droppableId="completed" type="group">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="space-y-2"
              >
                <TaskList tasks={newCompletedTask} />
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div> */}
      </div>
    </DragDropContext>
  );
};

export default Board;
