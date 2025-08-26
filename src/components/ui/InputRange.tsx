import { cn } from "~/utils";

interface InputRangeProps {
  min: number;
  max: number;
  value: number;
  step?: number;
  onChange: (value: number) => void;
  className?: string;
}

export function InputRange({
  min,
  max,
  value,
  step = 1,
  onChange,
  className = "",
}: InputRangeProps) {
  return (
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(e) => onChange(parseInt(e.target.value))}
      className={cn(
        "h-0.5 w-full cursor-pointer appearance-none bg-zinc-200",
        className,
      )}
    />
  );
}
