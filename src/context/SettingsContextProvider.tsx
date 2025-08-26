import { ReactNode, useState, createContext, useLayoutEffect } from "react";

import { extractColors } from "../lib/extractColors";
import { calculateTileAssignments } from "../lib/calculateTileAssignments";
import { DEFAULT_COLOR_LIMIT, DEFAULT_TILE_SIZE } from "~/constants";
import { useCanvasContext } from "~/hooks";
import { downloadPNG, downloadSVG } from "~/lib";

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
  download: {
    savePNG: () => void;
    saveSVG: () => void;
  };
}

export const SettingsContext = createContext<SettingsContextValueType | null>(
  null,
);

// Provider
interface ColorsContextType {
  children: ReactNode;
}

export function SettingsContextProvider({ children }: ColorsContextType) {
  const { imageData, canvasRef, filename } = useCanvasContext();

  const [tileSize, setTileSize] = useState(DEFAULT_TILE_SIZE);
  const [colorLimit, setColorLimit] = useState(DEFAULT_COLOR_LIMIT);
  const [editedColors, setEditedColors] = useState<string[]>([]);
  const [generatedColors, setGeneratedColors] = useState<string[]>([]);
  const [tileAssignments, setTileAssignments] = useState<number[]>([]);

  // Tile size change
  useLayoutEffect(() => {
    if (!imageData || generatedColors.length === 0) return;

    updateAssignments(generatedColors);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tileSize, generatedColors]);

  // Color limit change
  useLayoutEffect(() => {
    if (!imageData) return;

    const initialColors = extractColors(imageData, colorLimit);

    setEditedColors(initialColors);
    setGeneratedColors(initialColors);
    updateAssignments(initialColors);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [colorLimit, imageData]);

  // Update assignments
  function updateAssignments(colors: string[]) {
    if (!imageData) return;

    const newAssignments = calculateTileAssignments(
      imageData,
      colors,
      tileSize,
    );

    setTileAssignments(newAssignments);
  }

  // Refresh colors
  function refreshColors() {
    if (!imageData) return;

    const newColors = extractColors(imageData, colorLimit);

    setEditedColors(newColors);
    setGeneratedColors(newColors);
    updateAssignments(newColors);
  }

  // Replace color
  function replaceColor(idx: number, value: string) {
    setEditedColors((prev) => {
      const next = [...prev];
      next[idx] = value;
      return next;
    });
  }

  // Download
  function savePNG() {
    if (canvasRef.current) {
      downloadPNG(canvasRef.current, filename);
    }
  }

  function saveSVG() {
    if (canvasRef.current && imageData && tileAssignments.length > 0) {
      downloadSVG({
        tileSize,
        filename,
        colors: editedColors,
        imageData,
        assignments: tileAssignments,
      });
    }
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
        download: {
          savePNG,
          saveSVG,
        },
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}
