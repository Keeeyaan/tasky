import { cn } from "@/lib/utils";

import { Card } from "./ui/card";

const StatCard = ({
  title,
  total,
  className,
}: {
  title: string;
  total: number;
  className: string;
}) => {
  return (
    <Card
      className={cn(
        "shadow-none border-none p-4 min-w-[130px] bg-gradient-to-r text-white",
        className
      )}
    >
      <div className="font-medium uppercase flex items-center justify-between">
        <h1>{title}</h1>
      </div>

      <div className="flex mt-1 items-center gap-1">
        <div className="bg-green-200 text-xs rounded-full h-[30px] px-0.5 font-semibold" />
        <h2 className="text-foreground font-semibold text-3xl">{total}</h2>
      </div>
    </Card>
  );
};

export default StatCard;
