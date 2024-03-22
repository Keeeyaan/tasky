import { Bell, Calendar } from "lucide-react";

import UserProfile from "./UserProfile";
import SearchInput from "./SearchInput";
import { Card } from "./ui/card";
import { Link } from "react-router-dom";

const Topbar = () => {
  return (
    <Card className="sticky inset-x-0 top-0 z-30 border-t-0 border-x-0 w-full rounded-none backdrop-blur-lg transition-all">
      <div className="w-full h-full flex items-center px-40 py-6 justify-between">
        <div className="flex items-center gap-6">
          <Link
            to="/"
            className="flex z-40 font-bold text-2xl items-center gap-4"
          >
            <img
              className="w-[40px] h-[40px]"
              alt="linkedlist logo"
              src="/logo.png"
            />
            <span>Tasky</span>
          </Link>
        </div>
        <div className="flex items-center gap-6 text-gray-800">
          <SearchInput type="text" placeholder="Search" />
          <div className="p-2 border rounded-full">
            <Bell size={20} />
          </div>
          <div className="p-2 border rounded-full">
            <Calendar size={20} />
          </div>
          <UserProfile />
        </div>
      </div>
    </Card>
  );
};

export default Topbar;
