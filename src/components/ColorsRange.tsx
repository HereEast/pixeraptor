import { Button } from "~/components/Button";

import { MIN_COLOR_LIMIT, MAX_COLOR_LIMIT } from "~/constants";
import { useSettingsContext } from "~/hooks/useSettingsContext";

export function ColorsRange() {
  const { colorLimit, setColorLimit, refreshColors } = useSettingsContext();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-2">
        <span className="font-bold uppercase">Colors: {colorLimit}</span>
        <Button
          size="small"
          onClick={refreshColors}
          className="pb-px uppercase"
        >
          Refresh
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <input
          type="range"
          min={MIN_COLOR_LIMIT}
          max={MAX_COLOR_LIMIT}
          value={colorLimit}
          onChange={(e) => setColorLimit(parseInt(e.target.value))}
          className="h-0.5 w-full cursor-pointer appearance-none bg-zinc-200"
        />
      </div>
    </div>
  );
}
