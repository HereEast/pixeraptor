import { ReactNode } from "react";

import { cn } from "~/utils";

interface ToolContainerProps {
  children: ReactNode;
  className?: string;
}

export function ToolContainer({
  children,
  className = "",
}: ToolContainerProps) {
  return (
    <div className={cn("flex flex-col gap-3 bg-white p-8", className)}>
      {children}
    </div>
  );
}

export function ToolLabel({ children }: { children: ReactNode }) {
  return <label className="font-semibold uppercase">{children}</label>;
}
