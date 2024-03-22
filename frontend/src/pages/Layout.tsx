import { Outlet } from "react-router-dom";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const HomeLayout = () => {
  return (
    <main className="flex flex-col">
      <Navbar />
      <div className="min-h-screen antialiased grainy">
        <Outlet />
      </div>
      <Footer />
    </main>
  );
};

export default HomeLayout;
