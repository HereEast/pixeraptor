import {
  ReactNode,
  useState,
  createContext,
  useMemo,
  useLayoutEffect,
} from "react";

import {
  drawCanvas,
  extractCentralColors,
  getImageColors,
  getTileAssignments,
} from "~/lib";

import { useCanvasContext } from "~/hooks";
import { DEFAULT_COLOR_LIMIT, DEFAULT_TILE_SIZE } from "~/constants";

// Context Values
interface SettingsContextValueType {
  activeColors: string[];
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
  const { imageData, canvasRef } = useCanvasContext();

  const [tileSize, setTileSize] = useState(DEFAULT_TILE_SIZE);
  const [colorLimit, setColorLimit] = useState(DEFAULT_COLOR_LIMIT);
  const [refreshKey, setRefreshKey] = useState(0);
  const [colorEdits, setColorEdits] = useState<Map<number, string>>(new Map());

  // Initial Colors
  const initialColors = useMemo(() => {
    if (!imageData) {
      return [];
    }

    void refreshKey;
    const imageColors = getImageColors(imageData);

    return extractCentralColors(imageColors, colorLimit);
  }, [imageData, colorLimit, refreshKey]);

  // Tile Assignments > ALWAYS use initialColors [0, 1, 0, ...]
  const tileAssignments = useMemo(() => {
    if (!imageData || initialColors.length === 0) {
      return [];
    }

    return getTileAssignments(imageData, initialColors, tileSize);
  }, [imageData, initialColors, tileSize]);

  // Active Colors > NOT affected by changing tileSize
  const activeColors = useMemo(() => {
    return initialColors.map((color, idx) => colorEdits.get(idx) ?? color);
  }, [initialColors, colorEdits]);

  // Draw to canvas
  useLayoutEffect(() => {
    if (!imageData || !tileAssignments.length || !canvasRef.current) return;

    drawCanvas({
      ctx: canvasRef.current.getContext("2d"),
      imageData,
      tileAssignments,
      colors: activeColors,
      tileSize,
    });
  }, [activeColors, tileAssignments, tileSize, imageData, canvasRef]);

  // Regenerate colors and clear edits
  function refreshColors() {
    setColorEdits(new Map());
    setRefreshKey((prev) => prev + 1);
  }

  // Replace color
  function replaceColor(idx: number, value: string) {
    setColorEdits((prev) => {
      const colors = new Map(prev);
      colors.set(idx, value);

      return colors;
    });
  }

  return (
    <SettingsContext.Provider
      value={{
        activeColors,
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
