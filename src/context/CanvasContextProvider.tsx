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

  // Image uploaded
  useEffect(() => {
    if (!canvasRef.current || !image || filename.includes(DEFAULT_FILENAME))
      return;

    const data = getImageData(canvasRef.current, image);

    if (!data) {
      console.error("Failed to get image data.");
      return;
    }

    setImageData(data);
    saveImageToDB(canvasRef.current, filename, data);
  }, [image, filename]);

  // Upload image
  async function handleUpload(file: File) {
    try {
      const img = await uploadImage(file);

      setImage(img);
      setFilename(file.name);
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
