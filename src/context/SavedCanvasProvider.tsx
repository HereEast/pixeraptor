import { ReactNode, useState, createContext } from "react";

import { ISavedCanvas } from "~/types";

// Context Values
interface SavedCanvasesContextValueType {
  savedCanvas: ISavedCanvas[];
  addCanvas: (canvasState: ISavedCanvas) => void;
  removeCanvas: (index: number) => void;
}

export const SavedCanvasContext =
  createContext<SavedCanvasesContextValueType | null>(null);

interface SavedCanvasProviderProps {
  children: ReactNode;
}

// Provider
export function SavedCanvasProvider({ children }: SavedCanvasProviderProps) {
  const [savedCanvas, setSavedCanvas] = useState<ISavedCanvas[]>([]);

  function addCanvas(canvasState: ISavedCanvas) {
    setSavedCanvas([...savedCanvas, canvasState]);
  }

  function removeCanvas(index: number) {
    setSavedCanvas(savedCanvas.filter((_, i) => i !== index));
  }

  return (
    <SavedCanvasContext.Provider
      value={{
        savedCanvas,
        addCanvas,
        removeCanvas,
      }}
    >
      {children}
    </SavedCanvasContext.Provider>
  );
}
