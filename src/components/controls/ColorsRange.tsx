import { InputRange } from "../ui/InputRange";
import { Button } from "../ui/Button";
import { ControlsTitle } from "./ControlsTitle";

import { MIN_COLOR_LIMIT, MAX_COLOR_LIMIT } from "~/constants";
import { useSettingsContext } from "~/hooks";

export function ColorsRange() {
  const { colorLimit, setColorLimit, refreshColors, isLoadingData } =
    useSettingsContext();

  return (
    <div className="space-y-4">
      <div className="relative flex items-center justify-between gap-2">
        <ControlsTitle
          title="Colors"
          value={String(colorLimit).padStart(2, "0")}
          isDisabled={isLoadingData}
        />

        <Button
          onClick={refreshColors}
          disabled={isLoadingData}
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
          disabled={isLoadingData}
          onChange={setColorLimit}
        />
      </div>
    </div>
  );
}
