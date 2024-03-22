import { PlusSquare } from "lucide-react";

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
        <Button className="gap-2" size="sm" variant="ghost">
          <PlusSquare className="text-muted-foreground" size={18} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create new task</DialogTitle>
          <DialogDescription>
            Fill out the form. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <TaskCreateForm />
      </DialogContent>
    </Dialog>
  );
};

export default TaskCreateButton;
