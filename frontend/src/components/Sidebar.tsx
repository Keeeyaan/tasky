import { useStore } from "@/store";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import logo from "@/assets/logo.png";

const Sidebar = () => {
  const { sidebarIsClosed } = useStore();

  return (
    <Card
      className={`${
        sidebarIsClosed ? "min-w-[100px]" : "min-w-[300px]"
      } sticky rounded-none transition-all grid ease-in-out duration-300`}
    >
      <div>
        <CardHeader>
          <div className="flex items-center gap-2">
            <img src={logo} className="w-[40px] h-[40[px]" />
            <CardTitle>Tasky</CardTitle>
          </div>
        </CardHeader>
        <CardContent>hehe</CardContent>
      </div>
      <CardFooter>footer</CardFooter>
    </Card>
  );
};

export default Sidebar;
