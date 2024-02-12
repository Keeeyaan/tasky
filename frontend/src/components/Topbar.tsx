import { Bell, Calendar, PanelRightOpen, PanelLeftOpen } from "lucide-react";

import { useStore } from "@/store";

import SearchInput from "./SearchInput";
import { Card } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";

const Topbar = () => {
  const { setSidebarIsClosed, sidebarIsClosed } = useStore();

  return (
    <Card className="sticky inset-x-0 top-0 z-30 border-t-0 border-x-0 w-full rounded-none backdrop-blur-lg transition-all">
      <div className="w-full h-full flex items-center px-6 py-5 justify-between">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="px-2">
            {sidebarIsClosed ? (
              <PanelLeftOpen onClick={setSidebarIsClosed} />
            ) : (
              <PanelRightOpen onClick={setSidebarIsClosed} />
            )}
          </Button>
          <SearchInput type="text" placeholder="Search" />
        </div>
        <div className="flex items-center gap-4">
          <Bell size={20} />
          <Calendar size={20} />
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <h3 className="text-sm font-medium">Villaflor</h3>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default Topbar;
