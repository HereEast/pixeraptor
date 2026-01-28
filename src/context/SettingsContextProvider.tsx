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

  // Active Colors
  const activeColors = useMemo(() => {
    return initialColors.map((color, idx) => colorEdits.get(idx) ?? color);
  }, [initialColors, colorEdits]);

  // Draw to canvas
  useLayoutEffect(() => {
    if (!imageData || !tileAssignments.length || !canvasRef.current) return;

    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    drawCanvas({
      ctx,
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
        editedColors: activeColors,
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

// export function SettingsContextProvider({ children }: ColorsContextType) {
//   const { imageData, canvasRef } = useCanvasContext();

//   const [tileSize, setTileSize] = useState(DEFAULT_TILE_SIZE);
//   const [colorLimit, setColorLimit] = useState(DEFAULT_COLOR_LIMIT);
//   const [refreshKey, setRefreshKey] = useState(0);
//   const [editedColors, setEditedColors] = useState<string[]>([]);

//   const generatedColors = useMemo(() => {
//     if (!imageData) {
//       return [];
//     }

//     void refreshKey;

//     return extractCentralColors(imageData, colorLimit);
//   }, [imageData, colorLimit, refreshKey]);

//   // The actual colors to use (edited if available, otherwise generated)
//   const activeColors = editedColors.length ? editedColors : generatedColors;

//   // Update Tile Assignments - use activeColors, not generatedColors
//   const tileAssignments = useMemo(() => {
//     if (!imageData || generatedColors.length === 0) {
//       return [];
//     }

//     return getTileAssignments(imageData, generatedColors, tileSize);
//   }, [imageData, generatedColors, tileSize]);

//   // Draw to canvas
//   useLayoutEffect(() => {
//     if (!imageData || !tileAssignments.length || !canvasRef.current) return;

//     const ctx = canvasRef.current.getContext("2d");
//     if (!ctx) return;

//     drawCanvas({
//       ctx,
//       imageData,
//       tileAssignments,
//       colors: activeColors,
//       tileSize,
//     });
//   }, [activeColors, tileAssignments, tileSize, imageData, canvasRef]);

//   // Regenerate colors
//   function refreshColors() {
//     setEditedColors([]); // Clear edits first
//     setRefreshKey((prev) => prev + 1); // Then regenerate
//   }

//   // User manually replaces a color
//   function replaceColor(idx: number, value: string) {
//     setEditedColors((prev) => {
//       // Initialize from generated colors if first edit
//       const colors = prev.length ? [...prev] : [...generatedColors];
//       colors[idx] = value;
//       return colors;
//     });
//   }

//   return (
//     <SettingsContext.Provider
//       value={{
//         editedColors: activeColors,
//         colorLimit,
//         tileAssignments,
//         tileSize,
//         setTileSize,
//         setColorLimit,
//         replaceColor,
//         refreshColors,
//       }}
//     >
//       {children}
//     </SettingsContext.Provider>
//   );
// }

// generatedColors: To set indices to tiles
// editedColors: To draw on canvas

// export function SettingsContextProvider({ children }: ColorsContextType) {
//   const { imageData, canvasRef } = useCanvasContext();

//   const [tileSize, setTileSize] = useState(DEFAULT_TILE_SIZE);
//   const [colorLimit, setColorLimit] = useState(DEFAULT_COLOR_LIMIT);
//   const [refreshKey, setRefreshKey] = useState(0);

//   // Colors the user has manually edited
//   const [colorEdits, setColorEdits] = useState<Map<number, string>>(new Map());

//   // Generated Colors
//   const generatedColors = useMemo(() => {
//     if (!imageData) {
//       return [];
//     }

//     void refreshKey;

//     return extractCentralColors(imageData, colorLimit);
//   }, [imageData, colorLimit, refreshKey]);

//   // Derive editedColors by applying user edits to generated colors
//   const editedColors = useMemo(() => {
//     return generatedColors.map(
//       (color, idx) => colorEdits.get(idx) ?? color, // Use edited color if exists, otherwise use generated
//     );
//   }, [generatedColors, colorEdits]);

//   // Update Tile Assignments: [0, 1, 0, ...] > Number of tiles
//   const tileAssignments = useMemo(() => {
//     if (!imageData || generatedColors.length === 0) {
//       return [];
//     }

//     return getTileAssignments(imageData, generatedColors, tileSize);
//   }, [imageData, generatedColors, tileSize]);

//   // ON DRAW CANVAS
//   useLayoutEffect(() => {
//     if (!imageData || !tileAssignments.length || !canvasRef.current) return;

//     const ctx = canvasRef.current.getContext("2d");

//     if (!ctx) return;

//     drawCanvas({
//       ctx,
//       imageData,
//       tileAssignments,
//       colors: editedColors,
//       tileSize,
//     });
//   }, [editedColors, tileAssignments, tileSize, imageData, canvasRef]);

//   //
//   // Refresh Colors
//   function refreshColors() {
//     setRefreshKey((prev) => prev + 1);
//     setColorEdits(new Map());
//   }

//   // Replace Color
//   function replaceColor(idx: number, value: string) {
//     setColorEdits((prev) => {
//       const next = new Map(prev);
//       next.set(idx, value);

//       return next;
//     });
//   }

//   return (
//     <SettingsContext.Provider
//       value={{
//         editedColors,
//         colorLimit,
//         tileAssignments,
//         tileSize,
//         setTileSize,
//         setColorLimit,
//         replaceColor,
//         refreshColors,
//       }}
//     >
//       {children}
//     </SettingsContext.Provider>
//   );
// }

// export function SettingsContextProvider({ children }: ColorsContextType) {
//   const { imageData, canvasRef } = useCanvasContext();

//   const [tileSize, setTileSize] = useState(DEFAULT_TILE_SIZE);
//   const [colorLimit, setColorLimit] = useState(DEFAULT_COLOR_LIMIT);
//   // const [editedColors, setEditedColors] = useState<string[]>([]);
//   // const [generatedColors, setGeneratedColors] = useState<string[]>([]);
//   const [refreshKey, setRefreshKey] = useState(0);

//   const generatedColors = useMemo(() => {
//     if (!imageData) {
//       return [];
//     }

//     void refreshKey;

//     const colors = extractCentralColors(imageData, colorLimit);
//     return colors;
//   }, [imageData, colorLimit, refreshKey]);

//   const [editedColors, setEditedColors] = useState<string[]>(generatedColors);

//   useLayoutEffect(() => {
//     if (JSON.stringify(editedColors) !== JSON.stringify(generatedColors)) {
//       setEditedColors(generatedColors);
//     }
//   }, [generatedColors, setEditedColors, editedColors]);

//   // Update Tile Assignments: [0, 1, 0, ...] > Number of tiles
//   const tileAssignments = useMemo(() => {
//     if (!imageData || generatedColors.length === 0) {
//       return [];
//     }

//     return getTileAssignments(imageData, generatedColors, tileSize);
//   }, [imageData, generatedColors, tileSize]);

//   // ON DRAW CANVAS
//   useLayoutEffect(() => {
//     if (!imageData || !tileAssignments.length || !canvasRef.current) return;

//     const ctx = canvasRef.current.getContext("2d");

//     if (!ctx) return;

//     drawCanvas({
//       ctx,
//       imageData,
//       tileAssignments,
//       colors: editedColors,
//       tileSize,
//     });
//   }, [editedColors, tileAssignments, tileSize, imageData, canvasRef]);

//   //
//   // Refresh Colors
//   function refreshColors() {
//     setRefreshKey((prev) => prev + 1);
//   }

//   // Replace Color
//   function replaceColor(idx: number, value: string) {
//     setEditedColors((prev) => {
//       const colors = [...prev];
//       colors[idx] = value;

//       return colors;
//     });
//   }

//   return (
//     <SettingsContext.Provider
//       value={{
//         editedColors,
//         colorLimit,
//         tileAssignments,
//         tileSize,
//         setTileSize,
//         setColorLimit,
//         replaceColor,
//         refreshColors,
//       }}
//     >
//       {children}
//     </SettingsContext.Provider>
//   );
// }
