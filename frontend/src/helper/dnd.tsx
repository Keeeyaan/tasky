import { DraggableLocation } from "react-beautiful-dnd";

import { ITask } from "@/types";

export const reorder = (
  list: ITask[],
  source: DraggableLocation,
  destination: DraggableLocation
) => {
  const result = [...list];
  const [removed] = result.splice(source.index, 1);
  result.splice(destination.index, 0, removed);

  const arrayIdsOrder = JSON.parse(localStorage.getItem("tasky-order")!);
  const idsOrderArray = result.map((task) => task.id);

  const sourceId = source.droppableId;

  localStorage.setItem(
    "tasky-order",
    JSON.stringify({
      ...arrayIdsOrder,
      [sourceId]: idsOrderArray,
    })
  );

  return result;
};

export const move = (
  source: ITask[],
  destination: ITask[],
  droppableSource: DraggableLocation,
  droppableDestination: DraggableLocation
) => {
  const sourceClone = [...source];
  const destClone = [...destination];
  const [removed] = sourceClone.splice(droppableSource.index, 1);
  destClone.splice(droppableDestination.index, 0, removed);

  const arrayIdsOrder = JSON.parse(localStorage.getItem("tasky-order")!);

  const sourceIdsOrderArray = sourceClone.map((task) => task.id);
  const destinationIdsOrderArray = destClone.map((task) => task.id);

  const sourceId = droppableSource.droppableId;
  const destinationId = droppableDestination.droppableId;

  localStorage.setItem(
    "tasky-order",
    JSON.stringify({
      ...arrayIdsOrder,
      [sourceId]: sourceIdsOrderArray,
      [destinationId]: destinationIdsOrderArray,
    })
  );
  return {
    [droppableSource.droppableId]: sourceClone,
    [droppableDestination.droppableId]: destClone,
  };
};
