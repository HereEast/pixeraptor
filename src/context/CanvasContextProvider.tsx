import {
  ReactNode,
  useState,
  useRef,
  createContext,
  useEffect,
  RefObject,
  useCallback,
} from "react";

import { IndexedDB } from "~/db";
import { uploadImage, restoreInitialImage, processLoadedImage } from "~/lib";
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

  // SET INITIAL IMAGE (Restored or default)
  useEffect(() => {
    restoreInitialImage(canvasRef, setImage, setImageData, setFilename);
  }, []);

  // ON IMAGE LOAD
  useEffect(() => {
    if (!canvasRef || !image || filename.includes(DEFAULT_FILENAME)) return;

    processLoadedImage(
      canvasRef as RefObject<HTMLCanvasElement>,
      image,
      filename,
      setImageData,
    );
  }, [image, filename]);

  // UPLOAD IMAGE
  const handleUpload = useCallback(async (file: File) => {
    try {
      await IndexedDB.clearImageData();

      const img = await uploadImage(file);

      setImage(img);
      setFilename(file.name);
    } catch (error) {
      console.error("Upload failed:", error);
    }
  }, []);

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
