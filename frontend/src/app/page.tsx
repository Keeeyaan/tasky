import Link from "next/link";
import Image from "next/image";

import Wrapper from "@/components/Wrapper";
import { buttonVariants } from "@/components/ui/button";

export default function Home() {
  return (
    <Wrapper className="">
      <nav className="flex py-8 items-center gap-4">
        <Image src="/logo.png" width={50} height={50} alt="logo" />
        <p className="text-3xl font-bold text-primary">TaskEase</p>
      </nav>
      <div className="gap-12 mb-12 text-center md:text-start mt-28 sm:mt-38 flex flex-col sm:flex-row items-center justify-center ">
        <div>
          <h1 className="max-w-2xl text-5xl font-bold md:text-6xl lg:text-7xl">
            Task Management Made <span className="text-primary">Simple</span>.
          </h1>
          <p className="mt-5 max-w-prose text-zinc-700 sm:text-lg">
            Effortlessly organize your work, collaborate with your team, and
            boost productivity with TaskEase. From simple to-do lists to complex
            project workflows, we've got you covered.
          </p>
          <Link
            className={buttonVariants({
              size: "sm",
              className: "mr-5 mt-5 mb-2 bg-primary hover:bg-primary py-6",
            })}
            href="/register"
          >
            Register
          </Link>
          <Link
            className={buttonVariants({
              size: "sm",
              className: "mt-5 mb-2 bg-primary hover:bg-primary p-6",
            })}
            href="/login"
          >
            Login / Demo User
          </Link>
        </div>
        <Image
          src="landing_page.svg"
          width={500}
          height={500}
          alt="landing page logo"
          className="hidden md:block md:w-[350px] md:h-[350px] lg:w-[500px] lg:h-[500px]"
        />
      </div>
    </Wrapper>
  );
}
