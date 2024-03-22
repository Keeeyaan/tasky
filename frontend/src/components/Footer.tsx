import { useLocation } from "react-router-dom";

import { CardDescription, CardHeader } from "./ui/card";

const ROUTE = ["/task", "/task/analytic"];

const Footer = () => {
  const { pathname } = useLocation();

  // hides the header in admin pages
  if (ROUTE.includes(pathname)) return;

  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full">
      <div className="rounded-none bg-primary text-center w-full">
        <CardHeader className="p-4">
          <CardDescription className="text-white">
            &copy; {currentYear} Kean Jieden Villaflor. All rights reserved.
          </CardDescription>
        </CardHeader>
      </div>
    </footer>
  );
};

export default Footer;
