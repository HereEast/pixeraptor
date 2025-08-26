import { ToolLabel } from "./ToolContainer";
import { InputRange } from "./ui/InputRange";

import { MIN_TILE_SIZE, MAX_TILE_SIZE, TILE_SIZE_STEP } from "~/constants";
import { useSettingsContext } from "~/hooks";

export function TileRange() {
  const { tileSize, setTileSize } = useSettingsContext();

  return (
    <div className="flex flex-col gap-3">
      <ToolLabel>TILE [{tileSize}]</ToolLabel>

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
