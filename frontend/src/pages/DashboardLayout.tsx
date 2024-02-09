import { Outlet } from "react-router-dom";

import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";

const DashboardLayout = () => {
  return (
    <main className="flex min-h-screen">
      <Sidebar />
      <div className="w-full space-y-4">
        <Topbar />
        <Outlet />
      </div>
    </main>
  );
};

export default DashboardLayout;
