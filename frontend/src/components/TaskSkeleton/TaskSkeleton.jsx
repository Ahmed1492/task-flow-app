const SkeletonCard = () => (
  <div className="flex flex-col rounded-2xl border border-gray-100 dark:border-white/10 bg-white dark:bg-[#1e293b] overflow-hidden shadow-sm">
    <div className="h-1.5 w-full bg-gray-100 dark:bg-white/10 animate-pulse" />
    <div className="px-5 pt-4 pb-5 bg-gray-50 dark:bg-white/5">
      <div className="h-4 w-3/4 bg-gray-200 dark:bg-white/10 rounded-lg animate-pulse mb-3" />
      <div className="h-3 w-1/3 bg-gray-200 dark:bg-white/10 rounded-full animate-pulse" />
    </div>
    <div className="px-5 py-4 flex flex-col gap-3">
      <div className="h-3 w-full bg-gray-100 dark:bg-white/5 rounded-lg animate-pulse" />
      <div className="h-3 w-5/6 bg-gray-100 dark:bg-white/5 rounded-lg animate-pulse" />
      <div className="h-px w-full bg-gray-100 dark:bg-white/10 mt-1" />
      <div className="flex justify-between mt-1">
        <div className="h-3 w-16 bg-gray-100 dark:bg-white/5 rounded-lg animate-pulse" />
        <div className="h-3 w-16 bg-gray-100 dark:bg-white/5 rounded-lg animate-pulse" />
      </div>
    </div>
  </div>
);

const TaskSkeleton = ({ count = 6 }) => (
  <div className="grid [grid-template-columns:repeat(auto-fill,minmax(270px,1fr))] gap-5 py-4 px-2">
    {Array.from({ length: count }).map((_, i) => (
      <SkeletonCard key={i} />
    ))}
  </div>
);

export default TaskSkeleton;
