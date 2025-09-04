import { InputRange } from "./ui/InputRange";

import { MIN_TILE_SIZE, MAX_TILE_SIZE, TILE_SIZE_STEP } from "~/constants";
import { useSettingsContext } from "~/hooks";

export function TileSizeRange() {
  const { tileSize, setTileSize } = useSettingsContext();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2 text-sm font-semibold uppercase">
        <span>Tile</span>
        <span>[{tileSize}]</span>
      </div>

      <div className="flex items-center gap-4">
        <InputRange
          min={MIN_TILE_SIZE}
          max={MAX_TILE_SIZE}
          value={tileSize}
          step={TILE_SIZE_STEP}
          onChange={setTileSize}
        />
      </div>
    </div>
  );
}
