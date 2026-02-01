import { ControlsTitle } from "./ControlsTitle";
import { InputRange } from "../ui/InputRange";

import { MIN_TILE_SIZE, MAX_TILE_SIZE, TILE_SIZE_STEP } from "~/constants";
import { useSettingsContext } from "~/hooks";

export function TileSizeRange() {
  const { tileSize, setTileSize, isLoadingData } = useSettingsContext();

  return (
    <div className="flex flex-col gap-4">
      <ControlsTitle
        title="Tile"
        value={String(tileSize)}
        isDisabled={isLoadingData}
      />

      <div className="flex items-center gap-4">
        <InputRange
          min={MIN_TILE_SIZE}
          max={MAX_TILE_SIZE}
          value={tileSize}
          step={TILE_SIZE_STEP}
          disabled={isLoadingData}
          onChange={setTileSize}
        />
      </div>
    </div>
  );
}
