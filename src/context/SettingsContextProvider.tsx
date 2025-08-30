import { ReactNode, useState, createContext, useLayoutEffect } from "react";

import { DEFAULT_COLOR_LIMIT, DEFAULT_TILE_SIZE } from "~/constants";
import { extractCentralColors, getTileAssignments } from "~/lib";
import { useCanvasContext } from "~/hooks";

// Context Values
interface SettingsContextValueType {
  editedColors: string[];
  colorLimit: number;
  tileAssignments: number[];
  tileSize: number;
  setTileSize: (size: number) => void;
  setColorLimit: (colorLimit: number) => void;
  replaceColor: (idx: number, value: string) => void;
  refreshColors: () => void;
}

export const SettingsContext = createContext<SettingsContextValueType | null>(
  null,
);

// Provider
interface ColorsContextType {
  children: ReactNode;
}

export function SettingsContextProvider({ children }: ColorsContextType) {
  const { imageData } = useCanvasContext();

  const [tileSize, setTileSize] = useState(DEFAULT_TILE_SIZE);
  const [colorLimit, setColorLimit] = useState(DEFAULT_COLOR_LIMIT);
  const [editedColors, setEditedColors] = useState<string[]>([]);
  const [generatedColors, setGeneratedColors] = useState<string[]>([]);
  const [tileAssignments, setTileAssignments] = useState<number[]>([]);

  // TILE SIZE CHANGE
  useLayoutEffect(() => {
    if (!imageData || generatedColors.length === 0) return;

    updateAssignments(generatedColors);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tileSize, generatedColors]);

  // COLOR LIMIT CHANGE
  useLayoutEffect(() => {
    if (!imageData) return;

    const initialColors = extractCentralColors(imageData, colorLimit);

    setEditedColors(initialColors);
    setGeneratedColors(initialColors);
    updateAssignments(initialColors);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [colorLimit, imageData]);

  // UPDATE ASSIGNMENTS
  function updateAssignments(centralColors: string[]) {
    if (!imageData) return;

    const newAssignments = getTileAssignments(
      imageData,
      centralColors,
      tileSize,
    ); // [0, 1, 0, ...] > Number of tiles

    setTileAssignments(newAssignments);
  }

  // REFRESH COLORS
  function refreshColors() {
    if (!imageData) return;

    const newColors = extractCentralColors(imageData, colorLimit);

    setEditedColors(newColors);
    setGeneratedColors(newColors);
    updateAssignments(newColors);
  }

  // REPLACE COLOR
  function replaceColor(idx: number, value: string) {
    setEditedColors((prev) => {
      const next = [...prev];
      next[idx] = value;
      return next;
    });
  }

  return (
    <SettingsContext.Provider
      value={{
        editedColors,
        colorLimit,
        tileAssignments,
        tileSize,
        setTileSize,
        setColorLimit,
        replaceColor,
        refreshColors,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}
