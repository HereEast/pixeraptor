import { cn } from "~/utils";

interface ControlsTitleProps {
  title: string;
  value: string;
  isDisabled?: boolean;
}

export function ControlsTitle({
  title,
  value,
  isDisabled,
}: ControlsTitleProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 text-sm font-semibold uppercase",
        isDisabled && "opacity-50",
      )}
    >
      <span>{title}</span>
      <span>[{value}]</span>
    </div>
  );
}
