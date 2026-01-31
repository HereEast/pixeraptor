import { InputRange } from "../ui/InputRange";

import { MIN_TILE_SIZE, MAX_TILE_SIZE, TILE_SIZE_STEP } from "~/constants";
import { useCanvasContext, useSettingsContext } from "~/hooks";
import { cn } from "~/utils";

export function TileSizeRange() {
  const { image } = useCanvasContext();
  const { tileSize, setTileSize } = useSettingsContext();

  const isDisabled = !image;

  return (
    <div className="flex flex-col gap-4">
      <div
        className={cn(
          "flex items-center gap-2 text-sm font-semibold uppercase",
          isDisabled && "opacity-50",
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
          disabled={isDisabled}
          onChange={setTileSize}
        />
      </div>
    </div>
  );
}
