import { ReactNode, useState, createContext, useEffect } from "react";

import { SAVED_CANVAS_LIMIT } from "~/constants";
import { ISavedCanvas } from "~/types";

// Context Values
interface SavedCanvasesContextValueType {
  savedCanvases: ISavedCanvas[];
  saveCanvas: (canvasState: ISavedCanvas) => void;
  removeCanvas: (index: number) => void;
  isLimit: boolean;
}

export const SavedCanvasContext =
  createContext<SavedCanvasesContextValueType | null>(null);

interface SavedCanvasProviderProps {
  children: ReactNode;
}

// Provider
export function SavedCanvasProvider({ children }: SavedCanvasProviderProps) {
  const [savedCanvases, setSavedCanvases] = useState<ISavedCanvas[]>([]);
  const [isLimit, setIsLimit] = useState(false);

  useEffect(() => {
    if (savedCanvases.length >= SAVED_CANVAS_LIMIT) {
      setIsLimit(true);
    } else {
      setIsLimit(false);
    }
  }, [savedCanvases]);

  // Save Canvas
  function saveCanvas(canvasState: ISavedCanvas) {
    if (isLimit) {
      return;
    }

    setSavedCanvases([...savedCanvases, canvasState]);
  }

  // Remove Canvas
  function removeCanvas(index: number) {
    setSavedCanvases(savedCanvases.filter((_, i) => i !== index));
  }

  return (
    <SavedCanvasContext.Provider
      value={{
        savedCanvases,
        saveCanvas,
        removeCanvas,
        isLimit,
      }}
    >
      {children}
    </SavedCanvasContext.Provider>
  );
}
