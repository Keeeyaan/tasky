import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="min-h-screen antialiased grainy">
      <Outlet />
    </div>
  );
};

export default Layout;
