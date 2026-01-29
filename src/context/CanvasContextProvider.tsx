import {
  ReactNode,
  useState,
  useRef,
  createContext,
  useEffect,
  RefObject,
} from "react";

import {
  uploadImage,
  restoreInitialImage,
  saveImageToDB,
  getImageData,
} from "~/lib";

import { DEFAULT_FILENAME } from "~/types";

// Context Values
interface CanvasContextValueType {
  canvasRef: RefObject<HTMLCanvasElement | null>;
  image: HTMLImageElement | null;
  imageData: ImageData | null;
  filename: string;
  handleUpload: (file: File) => Promise<void>;
}

export const CanvasContext = createContext<CanvasContextValueType | null>(null);

// Provider
interface ImageContextProviderProps {
  children: ReactNode;
}

export function CanvasContextProvider({ children }: ImageContextProviderProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [imageData, setImageData] = useState<ImageData | null>(null);
  const [filename, setFilename] = useState("");

  // Initial image (Restored or default)
  useEffect(() => {
    restoreInitialImage(canvasRef, setImage, setImageData, setFilename);
  }, []);

  // Upload image
  async function handleUpload(file: File) {
    try {
      const img = await uploadImage(file);

      const tempCanvas = document.createElement("canvas");
      const data = getImageData(tempCanvas, img);

      if (!data) {
        console.error("Failed to get image data.");
        return;
      }

      setImage(img);
      setFilename(file.name);
      setImageData(data);

      if (!file.name.includes(DEFAULT_FILENAME)) {
        saveImageToDB(tempCanvas, file.name, data);
      }
    } catch (error) {
      console.error("Upload failed:", error);
    }
  }

  return (
    <CanvasContext.Provider
      value={{
        canvasRef,
        image,
        imageData,
        filename,
        handleUpload,
      }}
    >
      {children}
    </CanvasContext.Provider>
  );
}
