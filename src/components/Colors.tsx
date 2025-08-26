import { useState } from "react";

import { cn } from "~/utils";

interface ColorsProps {
  colors: string[];
  handleChange: (index: number, color: string) => void;
}

export function Colors({ colors, handleChange }: ColorsProps) {
  return (
    <div className="flex flex-wrap gap-1">
      {colors.map((color, index) => (
        <ColorPicker
          key={`color-${index}`}
          color={color}
          index={index}
          handleChange={handleChange}
        />
      ))}
    </div>
  );
}

// Color Picker
interface ColorPickerProps {
  color: string;
  index: number;
  handleChange: (index: number, color: string) => void;
}

export function ColorPicker({ color, index, handleChange }: ColorPickerProps) {
  const [isFocused, setIsFocused] = useState(false);

  function handleColorChange(newColor: string) {
    if (!newColor) return;

    handleChange(index, newColor);
  }

  return (
    <div className="relative mb-2 size-8">
      <input
        type="color"
        value={color}
        onChange={(e) => handleColorChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={cn(isFocused ? "scale-110" : "scale-100", "transition")}
        style={{
          backgroundColor: color,
        }}
      />
    </div>
  );
}
