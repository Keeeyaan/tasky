import { useEffect, useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

import TaskList from "../task/TaskList";
import { StrictModeDroppable as Droppable } from "../../helper/StrictModeDroppable";
import { move, reorder } from "@/helper/dnd";

import { ITask } from "@/types";
import useUpdateTaskId from "@/hooks/useUpdateTaskById";
import TaskCreateButton from "../task/TaskCreateButton";

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
    const arrayIdsOrder = JSON.parse(localStorage.getItem("tasky-order")!);

    if (!arrayIdsOrder) {
      const startedTaskIdsOrderArray = startedTask.map((task) => task.id);
      const inProgressTaskIdsOrderArray = inProgressTask.map((task) => task.id);
      const completedTaskIdsOrderArray = completedTask.map((task) => task.id);

      const dataOrder = {
        started: startedTaskIdsOrderArray,
        in_progress: inProgressTaskIdsOrderArray,
        completed: completedTaskIdsOrderArray,
      };
      localStorage.setItem("tasky-order", JSON.stringify(dataOrder));
    }

    let startedArray;
    let inProgressArray;
    let completedArray;

    if (arrayIdsOrder) {
      startedArray = arrayIdsOrder.started.map((pos: number) => {
        return startedTask.find((el) => el.id === pos);
      });
      inProgressArray = arrayIdsOrder.in_progress.map((pos: number) => {
        return inProgressTask.find((el) => el.id === pos);
      });

      completedArray = arrayIdsOrder.completed.map((pos: number) => {
        return completedTask.find((el) => el.id === pos);
      });

      const newStartedItems = startedTask.filter((el) => {
        return !arrayIdsOrder.started.includes(el.id);
      });
      const newInProgressItems = inProgressTask.filter((el) => {
        return !arrayIdsOrder.in_progress.includes(el.id);
      });
      const newCompletedItems = completedTask.filter((el) => {
        return !arrayIdsOrder.completed.includes(el.id);
      });

      if (newStartedItems.length)
        startedArray = [...newStartedItems, ...startedArray];

      if (newInProgressItems.length)
        inProgressArray = [...newInProgressItems, ...inProgressArray];

      if (newCompletedItems.length)
        completedArray = [...newCompletedItems, ...completedArray];
    }

    setNewStartedTask(startedArray || startedTask);
    setNewInProgressTask(inProgressArray || inProgressTask);
    setNewCompletedTask(completedArray || completedTask);
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

      const updatedList = reorder(itemList, source, destination);

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

      // updating the data status on the database
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
      <div className="gap-4 flex flex-col 2xl:flex-row justify-center">
        {droppableColumn.map((col) => (
          <div key={col.id} className="space-y-2 w-full">
            <div
              className={`${col.title === "Started" ? "bg-lime-400" : col.title === "In Progress" ? "bg-yellow-400" : "bg-purple-400"} w-full p-2 rounded-lg flex text-white justify-between items-center`}
            >
              <h1 className="text-white font-medium text-center">
                {col.title}
              </h1>
              <TaskCreateButton />
            </div>
            <Droppable droppableId={col.id} type="group">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="space-y-4"
                >
                  <TaskList tasks={col.data} />
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        ))}
      </div>
    </DragDropContext>
  );
};

export default Board;
