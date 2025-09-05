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
        <span>[{`${savedCanvases.length}`.padStart(2, "0")}]</span>
      </h2>

      <div className="overflow-y-auto md:max-h-[62vh]">
        <ul className="grid w-full grid-cols-2 gap-1 md:w-[85px] md:grid-cols-1">
          {savedCanvases.map((item, index) => (
            <SavedCanvasItem
              key={item.dataUrl}
              item={item}
              index={index}
              removeCanvas={removeCanvas}
            />
          ))}

          {/* Empty Tile for odd number of saved canvases – Mobile */}
          {savedCanvases.length % 2 !== 0 && (
            <li className="aspect-square max-h-[400px] max-w-[400px] shrink-0 bg-stone-200/50 md:hidden" />
          )}

          {/* Empty List – Desktop */}
          {new Array(emptyLength).fill(0).map((_, index) => (
            <li
              key={index}
              className="hidden size-[85px] shrink-0 bg-stone-200/50 md:block"
            />
          ))}
        </ul>
      </div>

      {/* Empty Note – Mobile */}
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
