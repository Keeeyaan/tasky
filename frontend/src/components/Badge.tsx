import { cn } from "@/lib/utils";
import { CheckCircle2, Circle, CircleSlash, Flag } from "lucide-react";

type BadgeProps = {
  className?: string;
  text: string;
  variant:
    | "default"
    | "low"
    | "normal"
    | "high"
    | "urgent"
    | "started"
    | "in_progress"
    | "completed";
};
const variants = {
  default: { color: "bg-gray-200 text-gray-500", icon: <Flag size={20} /> },
  low: { color: "bg-blue-200 text-blue-500", icon: <Flag size={20} /> },
  normal: { color: "bg-green-200 text-green-500", icon: <Flag size={20} /> },
  high: { color: "bg-red-200 text-red-500", icon: <Flag size={20} /> },
  urgent: { color: "bg-red-300 text-red-600", icon: <Flag size={20} /> },
  started: { color: "bg-lime-100  text-lime-500", icon: <Circle size={16} /> },
  in_progress: {
    color: "bg-yellow-100 text-yellow-500",
    icon: <CircleSlash size={16} />,
  },
  completed: {
    color: "bg-purple-200 text-purple-500",
    icon: <CheckCircle2 size={16} />,
  },
};

const Badge = ({ className, variant = "default", text }: BadgeProps) => {
  const badgeVariant = variants[variant];
  const capitalizedFLetterText = text.charAt(0).toUpperCase() + text.slice(1);
  return (
    <div
      className={cn(
        `${badgeVariant.color} text-xs flex items-center gap-2  rounded py-1 px-2`,
        className
      )}
    >
      {badgeVariant.icon}
      <p>{capitalizedFLetterText}</p>
    </div>
  );
};

export default Badge;
