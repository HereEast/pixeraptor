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
import { getImageData, uploadImage } from "~/lib";

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

const DEFAULT_FILENAME = "pixeraptor-00-image-00";

export function CanvasContextProvider({ children }: ImageContextProviderProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);

  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [imageData, setImageData] = useState<ImageData | null>(null);
  const [filename, setFilename] = useState("");
  const [isRestored, setIsRestored] = useState(false);

  // CANVAS
  useEffect(() => {
    if (!canvasRef.current) return;

    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    ctxRef.current = ctx;

    // Default Image
    const defaultImage = new Image();
    defaultImage.src = `/assets/images/${DEFAULT_FILENAME}.png`;

    defaultImage.onload = () => {
      setImage(defaultImage);

      if (!canvasRef.current) return;
      const defaultImageData = getImageData(canvasRef.current, defaultImage);

      if (!defaultImageData) return;
      setImageData(defaultImageData);
      setFilename(DEFAULT_FILENAME);
    };

    defaultImage.onerror = () => {
      console.error("Failed to load default image");
    };
  }, [canvasRef]);

  // RESTORE DATA FROM DB
  useEffect(() => {
    async function restoreFromIndexedDB() {
      const savedImageData = await IndexedDB.getImageData();

      if (savedImageData) {
        const imageUrl = URL.createObjectURL(savedImageData.imageBlob);
        const restoredImage = new Image();

        restoredImage.onload = () => {
          setImage(restoredImage);
          setImageData(savedImageData.imageData);
          setFilename(savedImageData.filename);
          setIsRestored(true);

          URL.revokeObjectURL(imageUrl);
        };

        restoredImage.onerror = () => {
          console.error("Failed to load restored image");

          URL.revokeObjectURL(imageUrl);
          setIsRestored(true);
        };

        restoredImage.src = imageUrl;
      } else {
        setIsRestored(true);
      }
    }

    restoreFromIndexedDB();
  }, []);

  // ON IMAGE LOAD
  useEffect(() => {
    if (
      !isRestored ||
      !canvasRef.current ||
      !image ||
      filename.includes(DEFAULT_FILENAME)
    )
      return;

    async function processImageData() {
      const canvas = canvasRef.current;

      if (!canvas || !image) return;

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

    processImageData();
  }, [image, filename, isRestored]);

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
        ctxRef,
        handleUpload,
      }}
    >
      {children}
    </CanvasContext.Provider>
  );
}
