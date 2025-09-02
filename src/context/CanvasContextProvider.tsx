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
  isImageRestored: boolean;
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
  const [isImageRestored, setIsImageRestored] = useState(false);

  // CANVAS
  useEffect(() => {
    if (!canvasRef.current) return;

    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    ctxRef.current = ctx;
  }, [canvasRef]);

  // RESTORE DATA FROM DB
  useEffect(() => {
    async function restoreFromIndexedDB() {
      const savedImageData = await IndexedDB.getImageData();

      // DB Image exists
      if (savedImageData) {
        const imageUrl = URL.createObjectURL(savedImageData.imageBlob);
        const restoredImage = new Image();

        restoredImage.onload = () => {
          setImage(restoredImage);
          setImageData(savedImageData.imageData);
          setFilename(savedImageData.filename);
          setIsImageRestored(true);

          URL.revokeObjectURL(imageUrl);
        };

        restoredImage.onerror = () => {
          console.error("Failed to load restored image");

          URL.revokeObjectURL(imageUrl);
          setIsImageRestored(true);
        };

        restoredImage.src = imageUrl;
      } else {
        // Default Image
        const defaultImage = new Image();

        defaultImage.onload = () => {
          if (!canvasRef.current) return;

          const defaultImageData = getImageData(
            canvasRef.current,
            defaultImage,
          );

          if (!defaultImageData) return;

          setImage(defaultImage);
          setImageData(defaultImageData);
          setFilename(DEFAULT_FILENAME);
          setIsImageRestored(true);
        };

        defaultImage.src = `/assets/images/${DEFAULT_FILENAME}.png`;

        defaultImage.onerror = () => {
          console.error("Failed to load default image");
        };
      }
    }

    restoreFromIndexedDB();
  }, []);

  // ON IMAGE LOAD
  useEffect(() => {
    if (
      !isImageRestored ||
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
  }, [image, filename, isImageRestored]);

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
        isImageRestored,
        handleUpload,
      }}
    >
      {children}
    </CanvasContext.Provider>
  );
}
