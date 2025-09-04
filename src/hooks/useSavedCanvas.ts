import { useContext } from "react";

import { SavedCanvasContext } from "~/context";

export function useSavedCanvas() {
  const context = useContext(SavedCanvasContext);

  if (!context) {
    throw new Error(
      "No context found. Saved canvases context must be used within a SavedCanvasProvider",
    );
  }

  return context;
}
