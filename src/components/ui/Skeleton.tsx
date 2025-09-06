import { cn } from "~/utils";

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn("aspect-square animate-pulse bg-stone-200", className)}
    />
  );
}
