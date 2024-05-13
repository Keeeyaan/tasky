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
        <Button
          className="gap-2 h-6 px-1 text-white hover:text-muted-foreground transition-all"
          size="sm"
          variant="ghost"
        >
          <PlusSquare size={18} />
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
