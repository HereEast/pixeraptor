import { InputRange } from "../ui/InputRange";
import { Button } from "../ui/Button";

import { MIN_COLOR_LIMIT, MAX_COLOR_LIMIT } from "~/constants";
import { useSettingsContext } from "~/hooks/useSettingsContext";
import { useCanvasContext } from "~/hooks";
import { ControlsTitle } from "./ControlsTitle";

export function ColorsRange() {
  // const { image, isImageRestoring } = useCanvasContext();
  const { colorLimit, setColorLimit, refreshColors, isColorsLoading } =
    useSettingsContext();

  // const isDisabled = isColorsLoading;

  return (
    <div className="space-y-4">
      <div className="relative flex items-center justify-between gap-2">
        <ControlsTitle
          title="Colors"
          value={String(colorLimit).padStart(2, "0")}
          isDisabled={isColorsLoading}
        />

        <Button
          onClick={refreshColors}
          disabled={isColorsLoading}
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
          disabled={isColorsLoading}
          onChange={setColorLimit}
        />
      </div>
    </div>
  );
}
