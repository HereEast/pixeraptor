import { MIN_TILE_SIZE, MAX_TILE_SIZE, TILE_SIZE_STEP } from "~/constants";
import { useSettingsContext } from "~/hooks";

export function TileRange() {
  const { tileSize, setTileSize } = useSettingsContext();

  return (
    <div className="flex flex-col gap-3">
      <label className="font-bold">{`TILE: ${tileSize}PX`}</label>

      <div className="flex items-center gap-4">
        <input
          type="range"
          min={MIN_TILE_SIZE}
          max={MAX_TILE_SIZE}
          value={tileSize}
          step={TILE_SIZE_STEP}
          onChange={(e) => setTileSize(parseInt(e.target.value))}
          className="h-0.5 w-full cursor-pointer appearance-none bg-zinc-200"
        />
      </div>
    </div>
  );
}
