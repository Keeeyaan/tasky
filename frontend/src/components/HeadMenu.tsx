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
import Wrapper from "./Wrapper";

const HeadMenu = () => {
  const { pathname } = useLocation();

  return (
    <Wrapper>
      <Card className="mb-6 w-full">
        <CardHeader className="p-4 md:px-6 md:pt-6">
          <CardTitle className="text-3xl md:text-4xl font-semibold">
            Tasks
          </CardTitle>
        </CardHeader>
        <CardContent className="flex justify-between px-4 pb-4 md:px-6 md:pb-6">
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
          <div className="hidden sm:block space-x-2">
            <Button variant="outline">Filter</Button>
            <Button variant="outline">&lt; Jun, 2022 &gt;</Button>
          </div>
        </CardContent>
        <Separator />
        <CardFooter className="py-2 block"></CardFooter>
      </Card>
    </Wrapper>
  );
};

export default HeadMenu;
