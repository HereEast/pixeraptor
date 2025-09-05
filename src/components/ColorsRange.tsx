import { InputRange } from "./ui/InputRange";
import { Button } from "./ui/Button";

import { MIN_COLOR_LIMIT, MAX_COLOR_LIMIT } from "~/constants";
import { useSettingsContext } from "~/hooks/useSettingsContext";

export function ColorsRange() {
  const { colorLimit, setColorLimit, refreshColors } = useSettingsContext();

  return (
    <div className="space-y-4">
      <div className="relative flex items-center justify-between gap-2">
        <div className="flex items-center justify-between gap-2 text-sm font-semibold uppercase">
          <span>Colors</span>
          <span>[{colorLimit.toString().padStart(2, "0")}]</span>
        </div>

        <Button
          onClick={refreshColors}
          className="absolute right-0 size-7 px-0 text-xs uppercase"
        >
          Re
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <InputRange
          min={MIN_COLOR_LIMIT}
          max={MAX_COLOR_LIMIT}
          value={colorLimit}
          onChange={setColorLimit}
        />
      </div>
    </div>
  );
}
