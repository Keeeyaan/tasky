import { Link, useLocation } from "react-router-dom";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button, buttonVariants } from "@/components/ui/button";
import TaskCreateButton from "@/components/task/TaskCreateButton";
import Wrapper from "./Wrapper";

const HeadMenu = () => {
  const { pathname } = useLocation();

  return (
    <Wrapper>
      <Card className="mb-6 w-full">
        <CardHeader className="pb-4">
          <CardTitle className="text-4xl font-semibold">Tasks</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-between">
          <div className="space-x-2">
            <Link
              to="/task/analytic"
              className={`${buttonVariants({ variant: `${pathname === "/task/analytic" ? "secondary" : "ghost"}` })} `}
            >
              Analytic
            </Link>
            <Link
              to="/task"
              className={`${buttonVariants({ variant: `${pathname === "/task" ? "secondary" : "ghost"}` })}`}
            >
              Board
            </Link>
          </div>
          <div className="space-x-2">
            <Button variant="outline">Filter</Button>
            <Button variant="outline">&lt; Jun, 2022 &gt;</Button>
          </div>
        </CardContent>
        <Separator />
        <CardFooter className="py-4 block">
          {pathname === "/task" && (
            <div className="grid grid-cols-3 gap-2">
              <div className="flex items-center justify-between">
                <h1 className="py-1 px-2 bg-lime-500 rounded font-medium text-sm text-white">
                  Started
                </h1>
                <TaskCreateButton />
              </div>
              <div className="flex items-center justify-between">
                <h1 className="py-1 px-2 bg-yellow-500 rounded font-medium text-sm text-white">
                  In Progress
                </h1>
                <TaskCreateButton />
              </div>
              <div className="flex items-center justify-between">
                <h1 className="py-1 px-2 bg-purple-400 rounded font-medium text-sm text-white">
                  Completed
                </h1>
                <TaskCreateButton />
              </div>
            </div>
          )}
        </CardFooter>
      </Card>
    </Wrapper>
  );
};

export default HeadMenu;
