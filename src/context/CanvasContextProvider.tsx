import {
  ReactNode,
  useState,
  useRef,
  createContext,
  useEffect,
  RefObject,
} from "react";

import { getImageData, IndexedDB } from "~/lib";

// Context Values
interface CanvasContextValueType {
  canvasRef: RefObject<HTMLCanvasElement | null>;
  ctxRef: RefObject<CanvasRenderingContext2D | null>;
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
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);

  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [imageData, setImageData] = useState<ImageData | null>(null);
  const [filename, setFilename] = useState("");

  // Canvas context
  useEffect(() => {
    if (!canvasRef.current) return;

    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    ctxRef.current = ctx;
  }, [canvasRef]);

  // Image data
  useEffect(() => {
    async function handleImageData() {
      // Restore data from indexedDB
      const savedImageData = await IndexedDB.getImageData();

      if (savedImageData && !image) {
        const imageUrl = URL.createObjectURL(savedImageData.imageBlob);
        const restoredImage = new Image();

        restoredImage.onload = () => {
          setImage(restoredImage);
          setImageData(savedImageData.imageData);
          setFilename(savedImageData.filename);
          URL.revokeObjectURL(imageUrl);
        };

        restoredImage.src = imageUrl;
        return;
      }

      // Get image data from canvas
      if (!canvasRef.current || !image) return;

      const result = getImageData(canvasRef.current, image);

      if (!result) {
        console.error("Failed to get image data.");
        return;
      }

      setImageData(result.imageData);

      // Save image data to indexedDB
      canvasRef.current.toBlob(async (blob) => {
        if (blob) {
          await IndexedDB.saveImageData({
            filename,
            imageData: result.imageData,
            imageBlob: blob,
          });
        }
      });
    }

    handleImageData();
  }, [image, canvasRef, filename]);

  // Handle file upload
  async function handleUpload(file: File) {
    try {
      const img = new Image();
      const url = URL.createObjectURL(file);

      img.src = url;

      await new Promise<void>((resolve, reject) => {
        img.onload = () => {
          URL.revokeObjectURL(url);
          resolve();
        };

        img.onerror = () => {
          URL.revokeObjectURL(url);
          reject(new Error("Failed to load image"));
        };
      });

      // Clear indexedDB
      await IndexedDB.clearImageData();

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
        ctxRef,
        handleUpload,
      }}
    >
      {children}
    </CanvasContext.Provider>
  );
}
