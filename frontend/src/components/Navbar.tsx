import { Link } from "react-router-dom";

import { useLocation } from "react-router-dom";

const ROUTE = ["/dashboard"];

const Navbar = () => {
  const { pathname } = useLocation();

  // hides the header in main pages
  if (ROUTE.includes(pathname)) return;

  return (
    <nav className="sticky h-16 inset-x-0 top-0 z-30 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all">
      <div
        className="md:px-40
         w-full mx-auto px-4  max-screen-xl"
      >
        <div className="flex h-16 items-center justify-between border-b border-zinc-200">
          <Link
            to="/"
            className="flex z-40 font-bold text-2xl items-center gap-2"
          >
            <img
              className="w-[40px] h-[40px]"
              alt="linkedlist logo"
              src="/logo.png"
            />
            <span>Tasky</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
