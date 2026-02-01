import { useState } from "react";

import { useCanvasContext, useSettingsContext } from "~/hooks";
import { cn, generatePlaceholderColors } from "~/utils";

const PLACEHOLDER_COLORS_COUNT = 10;

export function Colors() {
  const { image } = useCanvasContext();
  const { activeColors } = useSettingsContext();

  const isDisabled = !image;

  const colors = isDisabled
    ? generatePlaceholderColors(PLACEHOLDER_COLORS_COUNT)
    : activeColors;

  return (
    <div className="flex flex-wrap gap-1">
      {colors.map((color, index) => (
        <ColorPicker
          key={`color-${index}`}
          index={index}
          color={color}
          isDisabled={isDisabled}
        />
      ))}
    </div>
  );
}

// Color Picker
interface ColorPickerProps {
  index: number;
  color: string;
  isDisabled?: boolean;
}

export function ColorPicker({ color, index, isDisabled }: ColorPickerProps) {
  const { replaceColor } = useSettingsContext();

  const [isFocused, setIsFocused] = useState(false);

  // Update color
  function handleColorChange(newColor: string) {
    replaceColor(index, newColor);
  }

  return (
    <div className="relative size-7">
      <input
        type="color"
        value={color}
        onChange={(e) => handleColorChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        disabled={isDisabled}
        className={cn(
          !isDisabled && isFocused && "scale-110",
          !isDisabled && !isFocused && "hover:scale-110",
          "transition",
        )}
        style={{
          backgroundColor: color,
        }}
      />
    </div>
  );
}
