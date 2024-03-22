import { useStore } from "@/store";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";

const SmallSB = () => {
  return (
    <div>
      <CardHeader className="p-5 flex items-center flex-col">
        <img src="/logo.png" className="w-[40px] h-[40[px]" />
      </CardHeader>
      <Separator />
      <CardContent></CardContent>
    </div>
  );
};

const BigSB = () => {
  return (
    <div>
      <CardHeader className="p-5">
        <div className="flex items-center gap-2">
          <img src="/logo.png" className="w-[40px] h-[40[px]" />
          <CardTitle>Tasky</CardTitle>
        </div>
      </CardHeader>
      <Separator />
      <CardContent></CardContent>
    </div>
  );
};

const Sidebar = () => {
  const { sidebarIsClosed } = useStore();

  return (
    <Card className="rounded-none">
      <div
        className={`${
          sidebarIsClosed ? "w-[80px]" : "w-[280px]"
        } sticky transition-all ease-in-out duration-300`}
      >
        {sidebarIsClosed ? <SmallSB /> : <BigSB />}
      </div>
    </Card>
  );
};

export default Sidebar;
