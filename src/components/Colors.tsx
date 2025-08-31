import { useState } from "react";

import { useSettingsContext } from "~/hooks";
import { cn } from "~/utils";

export function Colors() {
  const { editedColors } = useSettingsContext();

  return (
    <div className="flex flex-wrap gap-1">
      {editedColors.map((color, index) => (
        <ColorPicker key={`color-${index}`} color={color} index={index} />
      ))}
    </div>
  );
}

// Color Picker
interface ColorPickerProps {
  color: string;
  index: number;
}

export function ColorPicker({ color, index }: ColorPickerProps) {
  const { replaceColor } = useSettingsContext();

  const [isFocused, setIsFocused] = useState(false);

  // Update color
  function handleColorChange(newColor: string) {
    if (!newColor) return;

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
        className={cn(
          isFocused && "scale-110",
          !isFocused && "hover:scale-110",
          "transition",
        )}
        style={{
          backgroundColor: color,
        }}
      />
    </div>
  );
}
