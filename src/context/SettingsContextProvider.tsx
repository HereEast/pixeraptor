import { ReactNode, useState, createContext, useLayoutEffect } from "react";

import { DEFAULT_COLOR_LIMIT, DEFAULT_TILE_SIZE } from "~/constants";
import { drawCanvas, extractCentralColors, getTileAssignments } from "~/lib";
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
  const { imageData, ctxRef } = useCanvasContext();

  const [tileSize, setTileSize] = useState(DEFAULT_TILE_SIZE);
  const [colorLimit, setColorLimit] = useState(DEFAULT_COLOR_LIMIT);
  const [editedColors, setEditedColors] = useState<string[]>([]);
  const [generatedColors, setGeneratedColors] = useState<string[]>([]);
  const [tileAssignments, setTileAssignments] = useState<number[]>([]);

  //
  // ON TILE SIZE CHANGE
  //
  useLayoutEffect(() => {
    if (!imageData || generatedColors.length === 0) return;

    assignColorIndexToTiles(generatedColors);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tileSize, generatedColors]);

  //
  // ON COLOR LIMIT CHANGE
  //
  useLayoutEffect(() => {
    if (!imageData) return;

    const initialColors = extractCentralColors(imageData, colorLimit);

    setEditedColors(initialColors);
    setGeneratedColors(initialColors);
    assignColorIndexToTiles(initialColors);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [colorLimit, imageData]);

  //
  // ON DRAW CANVAS
  //
  useLayoutEffect(() => {
    if (!imageData || !tileAssignments.length || !ctxRef.current) return;

    drawCanvas({
      ctx: ctxRef.current,
      imageData,
      tileAssignments,
      colors: editedColors,
      tileSize,
    });
  }, [editedColors, tileAssignments, tileSize, imageData, ctxRef]);

  ////////////////////////////////
  /////// HANDLERS ///////////////
  ////////////////////////////////

  // Update Tile Assignments: [0, 1, 0, ...] > Number of tiles
  function assignColorIndexToTiles(centralColors: string[]) {
    if (!imageData) return;

    const newAssignments = getTileAssignments(
      imageData,
      centralColors,
      tileSize,
    );

    setTileAssignments(newAssignments);
  }

  // Refresh Colors
  function refreshColors() {
    if (!imageData) return;

    const newColors = extractCentralColors(imageData, colorLimit);

    setEditedColors(newColors);
    setGeneratedColors(newColors);
    assignColorIndexToTiles(newColors);
  }

  // Replace Color
  function replaceColor(idx: number, value: string) {
    setEditedColors((prev) => {
      const colors = [...prev];
      colors[idx] = value;
      return colors;
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
