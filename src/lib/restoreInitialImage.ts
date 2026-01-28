import { IndexedDB } from "~/db";
import { getImageData } from "~/lib";
import { CanvasRef, DEFAULT_FILENAME } from "~/types";

export async function restoreInitialImage(
  canvasRef: CanvasRef,
  setImage: (image: HTMLImageElement) => void,
  setImageData: (data: ImageData) => void,
  setFilename: (filename: string) => void,
) {
  function setInitialImage(
    image: HTMLImageElement,
    imageData: ImageData,
    filename: string,
  ) {
    setImage(image);
    setImageData(imageData);
    setFilename(filename);
  }

  const savedImageData = await IndexedDB.getImageData();

  // DB Image exists
  if (savedImageData) {
    const imageUrl = URL.createObjectURL(savedImageData.imageBlob);
    const restoredImage = new Image();

    restoredImage.onload = () => {
      setInitialImage(
        restoredImage,
        savedImageData.imageData,
        savedImageData.filename,
      );

      URL.revokeObjectURL(imageUrl);
    };

    restoredImage.onerror = () => {
      console.error("Failed to load restored image");

      URL.revokeObjectURL(imageUrl);
    };

    restoredImage.src = imageUrl;
  } else {
    // Default Image
    const defaultImage = new Image();

    defaultImage.onload = () => {
      if (!canvasRef.current) return;

      const defaultImageData = getImageData(canvasRef.current, defaultImage);

      if (!defaultImageData) return;

      setInitialImage(defaultImage, defaultImageData, DEFAULT_FILENAME);
    };

    defaultImage.src = `/assets/images/${DEFAULT_FILENAME}.png`;
  }
}
