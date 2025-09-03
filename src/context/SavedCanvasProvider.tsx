import { ReactNode, useState, createContext } from "react";

import { ISavedCanvas } from "~/types";

// Context Values
interface SavedCanvasesContextValueType {
  savedCanvases: ISavedCanvas[];
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
  const [savedCanvases, setSavedCanvases] = useState<ISavedCanvas[]>([]);

  function addCanvas(canvasState: ISavedCanvas) {
    setSavedCanvases([...savedCanvases, canvasState]);
  }

  function removeCanvas(index: number) {
    setSavedCanvases(savedCanvases.filter((_, i) => i !== index));
  }

  return (
    <SavedCanvasContext.Provider
      value={{
        savedCanvases,
        addCanvas,
        removeCanvas,
      }}
    >
      {children}
    </SavedCanvasContext.Provider>
  );
}
