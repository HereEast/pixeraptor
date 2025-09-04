import { SavedCanvasItem } from "./SavedCanvasItem";

import { SAVED_CANVAS_LIMIT } from "~/constants";
import { useSavedCanvas } from "~/hooks";

// Delete from the Popup
// List saved canvases in the popup
// If this exact canvas already saved, don't show it in the list

export function SavedCanvasList() {
  const { savedCanvases, removeCanvas } = useSavedCanvas();

  const emptyLength = SAVED_CANVAS_LIMIT - savedCanvases.length;

  return (
    <div>
      <h2 className="mb-4 flex gap-2 text-sm font-semibold uppercase">
        <span>Saved</span>
        <span>[{savedCanvases.length}]</span>
      </h2>

      <div className="w-full overflow-y-auto md:max-h-[80vh]">
        <ul className="grid w-full grid-cols-2 gap-1 md:w-[80px] md:grid-cols-1">
          {savedCanvases.map((item, index) => (
            <SavedCanvasItem
              key={item.dataUrl}
              item={item}
              index={index}
              removeCanvas={removeCanvas}
            />
          ))}

          {new Array(emptyLength).fill(0).map((_, index) => (
            <li
              key={index}
              className="hidden aspect-square max-h-[400px] max-w-[400px] shrink-0 bg-stone-200/50 md:block"
            />
          ))}
        </ul>
      </div>

      {savedCanvases.length === 0 && (
        <div className="w-full bg-stone-200/50 p-10 text-center text-sm md:hidden">
          No saved canvases
        </div>
      )}

      <div className="text-center">
        <span>...</span>
      </div>
    </div>
  );
}
