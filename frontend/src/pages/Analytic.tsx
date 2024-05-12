import { Loader2 } from "lucide-react";

import {
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  AreaChart,
  Tooltip,
  Area,
} from "recharts";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Wrapper from "@/components/Wrapper";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import useFetchUserTaskSummary from "@/hooks/useFetchUserTaskSummary";
import useFetchCurrentUser from "@/hooks/useFetchCurrentUser";

const Analytic = () => {
  const { data: user } = useFetchCurrentUser();
  const { data: summary, isPending: summaryPending } =
    useFetchUserTaskSummary();

  return (
    <Wrapper
      title="Analytic"
      className="flex w-full gap-2 flex-col xl:flex-row"
    >
      <Card className="mb-4 w-full h-full">
        <CardContent>
          <h1 className="mt-4 mb-2 text-xl text-gray-700 font-semibold text-">
            Tasks Timeline Overview
          </h1>
          <Separator />
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart margin={{ top: 20 }} data={user?.monthlyTasks}>
              <defs>
                <linearGradient id="student" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="teacher" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#01b9ad" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#01b9ad" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="task"
                stroke="#4B71F0"
                fillOpacity={1}
                fill="url(#student)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <div className="sticky h-full space-y-4">
        <Card className="min-w-[300px]">
          <CardHeader>
            <CardTitle className="text-xl leading-none">Summary</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            <div className="w-[150px] h-[150px]">
              <CircularProgressbar
                className="font-bold shadow-purple-300 rounded-full shadow-lg"
                value={
                  summaryPending || !summary.percentage ? 0 : summary.percentage
                }
                text={`${summaryPending || !summary.percentage ? 0 : summary.percentage.toFixed(0)}%`}
                styles={buildStyles({
                  pathColor: "#884DEE",
                  textSize: "14px",
                  textColor: "#030712",
                })}
              />
            </div>
          </CardContent>
          <CardFooter className="justify-center">
            <div className="space-y-2">
              <h1 className="text-xl font-bold">Tasks</h1>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-[#ECF2FF] p-4 rounded-lg space-y-2 min-w-[100px]">
                  <h3 className="text-muted-foreground text-xs font-medium uppercase">
                    Total
                  </h3>
                  <h1 className="text-xl font-semibold">
                    <span className="px-[2px] rounded bg-blue-500 mr-2" />
                    {summaryPending ? (
                      <Loader2 className=" animate-spin" />
                    ) : (
                      summary.total
                    )}
                  </h1>
                </div>
                <div className="bg-[#FFEFE1] p-4 rounded-lg space-y-2 min-w-[100px]">
                  <h3 className="text-muted-foreground text-xs font-medium uppercase">
                    Completed
                  </h3>
                  <h1 className="text-xl font-semibold">
                    <span className="px-[2px] rounded bg-orange-500 mr-2" />
                    {summaryPending ? (
                      <Loader2 className=" animate-spin" />
                    ) : (
                      summary.completed
                    )}
                  </h1>
                </div>
                <div className="bg-[#FEEDFF] p-4 rounded-lg space-y-2 min-w-[100px]">
                  <h3 className="text-muted-foreground text-xs font-medium uppercase">
                    In Progress
                  </h3>
                  <h1 className="text-xl font-semibold">
                    <span className="px-[2px] rounded bg-pink-500 mr-2" />
                    {summaryPending ? (
                      <Loader2 className=" animate-spin" />
                    ) : (
                      summary.in_progress
                    )}
                  </h1>
                </div>
                <div className="bg-[#F1ECFF] p-4 rounded-lg space-y-2 min-w-[100px]">
                  <h3 className="text-muted-foreground text-xs font-medium uppercase">
                    Started
                  </h3>
                  <h1 className="text-xl font-semibold">
                    <span className="px-[2px] rounded bg-purple-500 mr-2" />
                    {summaryPending ? (
                      <Loader2 className=" animate-spin" />
                    ) : (
                      summary.started
                    )}
                  </h1>
                </div>
              </div>
            </div>
          </CardFooter>
        </Card>
      </div>
    </Wrapper>
  );
};

export default Analytic;
