import { Link, Navigate } from "react-router-dom";

import { useStore } from "@/store";
import Wrapper from "@/components/Wrapper";
import { buttonVariants } from "@/components/ui/button";

const Landing = () => {
  const { auth } = useStore();

  return !auth.accessToken ? (
    <Wrapper title="Landing Page">
      <div className="gap-12 mb-12 text-center md:text-start mt-28 sm:mt-38 flex flex-col sm:flex-row items-center justify-center ">
        <div>
          <h1 className="max-w-2xl text-5xl font-bold md:text-6xl lg:text-7xl">
            Task Management Made <span className="text-primary">Simple</span>.
          </h1>
          <p className="mt-5 max-w-prose text-zinc-700 sm:text-lg">
            Simplify Your Task Management. Effortlessly organize, prioritize,
            and track your tasks with Tasky – your intuitive task management
            solution.
          </p>
          <Link
            className={buttonVariants({
              size: "sm",
              className: "mr-5 mt-5 mb-2 bg-primary hover:bg-primary py-6",
            })}
            to="/register"
          >
            Register
          </Link>
          <Link
            className={buttonVariants({
              size: "sm",
              className: "mt-5 mb-2 bg-primary hover:bg-primary p-6",
            })}
            to="/login"
          >
            Login / Demo User
          </Link>
        </div>
        <img
          src="./landing_page.svg"
          alt="landing page"
          className="hidden md:block md:w-[350px] md:h-[350px] lg:w-[500px] lg:h-[500px]"
        />
      </div>
    </Wrapper>
  ) : (
    <Navigate to="/dashboard" replace />
  );
};

export default Landing;
