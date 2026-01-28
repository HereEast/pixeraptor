import { RefObject } from "react";

import { getImageData } from "~/lib";
import { IndexedDB } from "~/db";

export async function processLoadedImage(
  canvasRef: RefObject<HTMLCanvasElement>,
  image: HTMLImageElement,
  filename: string,
  setImageData: (data: ImageData) => void,
) {
  const canvas = canvasRef.current;
  const data = getImageData(canvas, image);

  if (!data) {
    console.error("Failed to get image data.");
    return;
  }

  setImageData(data);

  // SAVE DATA TO DB
  canvas.toBlob(async (blob) => {
    if (blob) {
      try {
        await IndexedDB.saveImageData({
          filename,
          imageData: data,
          imageBlob: blob,
        });
      } catch (error) {
        console.error("Failed to save image data:", error);
      }
    }
  });
}
