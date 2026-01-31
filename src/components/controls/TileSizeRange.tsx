import { InputRange } from "../ui/InputRange";

import { cn } from "~/utils";

import { MIN_TILE_SIZE, MAX_TILE_SIZE, TILE_SIZE_STEP } from "~/constants";

interface TileSizeRangeProps {
  tileSize: number;
  setTileSize: (tileSize: number) => void;
  disabled?: boolean;
}

export function TileSizeRange({
  tileSize,
  setTileSize,
  disabled,
}: TileSizeRangeProps) {
  return (
    <div className="flex flex-col gap-4">
      <div
        className={cn(
          "flex items-center gap-2 text-sm font-semibold uppercase",
          disabled && "opacity-50",
        )}
      >
        <span>Tile</span>
        <span>[{tileSize}]</span>
      </div>

      <div className="flex items-center gap-4">
        <InputRange
          min={MIN_TILE_SIZE}
          max={MAX_TILE_SIZE}
          value={tileSize}
          step={TILE_SIZE_STEP}
          disabled={disabled}
          onChange={setTileSize}
        />
      </div>
    </div>
  );
}
