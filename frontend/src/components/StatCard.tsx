import { ReactNode } from "react";

import { Card } from "./ui/card";
import { cn } from "@/lib/utils";

const StatCard = ({
  title,
  total,
  icon,
  className,
}: {
  title: string;
  total: number;
  icon: ReactNode;
  className: string;
}) => {
  return (
    <Card
      className={cn("p-4 min-w-[200px] bg-gradient-to-r text-white", className)}
    >
      <div className="font-medium text-lg flex items-center gap-2 mb-4">
        <div className="relative">
          <div className="p-4 rounded bg-gradient-to-tr shadow border opacity-80 to-white/70 from-transparent" />
          <div className="text-white absolute transform -translate-x-1/2 -translate-y-1/2 top-2/4 left-2/4">
            {icon}
          </div>
        </div>
        <h1>{title}</h1>
      </div>
      <h2 className="font-medium text-2xl flex">
        <span className="bg-green-200 rounded-full px-0.5 mr-1" />
        {total}
      </h2>
    </Card>
  );
};

export default StatCard;
