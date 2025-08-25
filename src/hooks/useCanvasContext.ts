import { useContext } from "react";

import { CanvasContext } from "~/context";

export function useCanvasContext() {
  const context = useContext(CanvasContext);

  if (!context) {
    throw new Error(
      "No context found. Canvas context must be used within a CanvasContextProvider",
    );
  }

  return context;
}
