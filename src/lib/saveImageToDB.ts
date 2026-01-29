import { IndexedDB } from "~/db";

export async function saveImageToDB(
  canvas: HTMLCanvasElement,
  filename: string,
  imageData: ImageData,
) {
  await IndexedDB.clearImageData();

  canvas.toBlob(async (blob) => {
    if (blob) {
      try {
        await IndexedDB.saveImageData({
          filename,
          imageData,
          imageBlob: blob,
        });
      } catch (error) {
        console.error("Failed to save image data:", error);
      }
    }
  });
}
