import { Skeleton } from "@/components/ui/skeleton";

const TaskSkeletonCard = () => {
  return (
    <div className="flex items-center gap-6">
      <Skeleton className="bg-slate-200 h-[240px] w-[380px] rounded-lg" />
      <Skeleton className="bg-slate-200 h-[240px] w-[380px] rounded-lg" />
      <Skeleton className="bg-slate-200 h-[240px] w-[380px] rounded-lg" />
    </div>
  );
};

export default TaskSkeletonCard;
