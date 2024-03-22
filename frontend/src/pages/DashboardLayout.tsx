import { Outlet } from "react-router-dom";

import Topbar from "@/components/Topbar";
import HeadMenu from "@/components/HeadMenu";

const DashboardLayout = () => {
  return (
    <main className="flex min-h-screen">
      {/* <Sidebar /> */}
      <div className="w-full space-y-4">
        <Topbar />
        <HeadMenu />
        <Outlet />
      </div>
    </main>
  );
};

export default DashboardLayout;
