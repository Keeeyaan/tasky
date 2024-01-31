import { ReactNode, useEffect } from "react";
import { cn } from "@/lib/utils";

const Wrapper = ({
  className,
  title,
  children,
}: {
  className?: string;
  title?: string;
  children: ReactNode;
}) => {
  useEffect(() => {
    document.title = `Tasky | ${title || ""}`;
    window.scroll(0, 0);
  }, [title]);

  return (
    <div
      className={cn("w-full mx-auto px-4 md:px-40 max-screen-xl", className)}
    >
      {children}
    </div>
  );
};

export default Wrapper;
