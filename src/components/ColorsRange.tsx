import { InputRange } from "./ui/InputRange";
import { Button } from "./ui/Button";
import { ControlLabel } from "./Controls";

import { MIN_COLOR_LIMIT, MAX_COLOR_LIMIT } from "~/constants";
import { useSettingsContext } from "~/hooks/useSettingsContext";

export function ColorsRange() {
  const { colorLimit, setColorLimit, refreshColors } = useSettingsContext();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-2">
        <ControlLabel>Colors [{colorLimit}]</ControlLabel>

        <Button size="small" onClick={refreshColors} className="pb-px">
          Refresh
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
