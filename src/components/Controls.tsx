import { ReactNode } from "react";

import { TileSizeRange } from "./TileSizeRange";
import { ColorsRange } from "./ColorsRange";
import { Colors } from "./Colors";

import { useSettingsContext } from "~/hooks";
import { cn } from "~/utils";

export function Controls() {
  const { editedColors, replaceColor } = useSettingsContext();

  return (
    <div className="flex flex-col gap-3">
      <ControlContainer>
        <TileSizeRange />
      </ControlContainer>

      <ControlContainer className="gap-6">
        <ColorsRange />
        <Colors colors={editedColors} handleChange={replaceColor} />
      </ControlContainer>
    </div>
  );
}

// Controls container
interface ControlContainerProps {
  children: ReactNode;
  className?: string;
}

export function ControlContainer({
  children,
  className = "",
}: ControlContainerProps) {
  return (
    <div className={cn("flex flex-col gap-3 bg-white p-8", className)}>
      {children}
    </div>
  );
}

export function ControlLabel({ children }: { children: ReactNode }) {
  return <label className="text-sm font-semibold uppercase">{children}</label>;
}
