import { PlusCircle } from "lucide-react";

import TaskCreateForm from "../form/TaskCreateForm";

import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";

const TaskCreateButton = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="gap-2" size="sm">
          <PlusCircle />
          Create Task
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit user profile</DialogTitle>
          <DialogDescription>
            Make changes to user profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <TaskCreateForm />
      </DialogContent>
    </Dialog>
  );
};

export default TaskCreateButton;
