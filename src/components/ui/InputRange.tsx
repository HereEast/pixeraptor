import { cn } from "~/utils";

interface InputRangeProps {
  min: number;
  max: number;
  value: number;
  step?: number;
  disabled?: boolean;
  onChange: (value: number) => void;
  className?: string;
}

export function InputRange({
  min,
  max,
  value,
  step = 1,
  disabled = false,
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
      disabled={disabled}
      onChange={(e) => onChange(parseInt(e.target.value))}
      className={cn("h-0.5 w-full appearance-none bg-zinc-200", className)}
    />
  );
}
