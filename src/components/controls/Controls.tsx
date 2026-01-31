import { ReactNode } from "react";

import { TileSizeRange } from "./TileSizeRange";
import { ColorsRange } from "./ColorsRange";
import { Colors } from "./Colors";

import { cn } from "~/utils";
import { useCanvasContext, useSettingsContext } from "~/hooks";

export function Controls() {
  const { image } = useCanvasContext();
  const { tileSize, setTileSize } = useSettingsContext();

  return (
    <div className="flex w-full flex-col gap-2">
      <ControlContainer>
        <TileSizeRange
          tileSize={tileSize}
          setTileSize={setTileSize}
          disabled={!image}
        />
      </ControlContainer>

      <ControlContainer className="gap-6">
        <ColorsRange />
        <Colors />
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
