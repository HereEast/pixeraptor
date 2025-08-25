import {
  ReactNode,
  useState,
  useRef,
  createContext,
  useEffect,
  RefObject,
} from "react";

import { getImageData } from "~/lib";

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
    if (!canvasRef.current || !image) return;

    const result = getImageData(canvasRef.current, image);

    if (!result) return;

    setImageData(result.imageData);
  }, [image, canvasRef]);

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
