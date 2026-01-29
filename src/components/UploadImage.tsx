import { ChangeEvent, useRef, useState } from "react";

import { Button } from "~/components/ui/Button";

import { useCanvasContext } from "~/hooks";
import { cn } from "~/utils";

const maxFileSize = 1000 * 1000 * 2; // 2MB

export function UploadImage() {
  const { handleUpload } = useCanvasContext();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isSizeError, setIsSizeError] = useState(false);

  async function handleImageUpload(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    if (!file) return;

    if (file.size > maxFileSize) {
      setIsSizeError(true);
      return;
    }

    await handleUpload(file);
    setIsSizeError(false);
  }

  return (
    <div>
      <input
        type="file"
        accept=".png, .jpg, .jpeg"
        onChange={handleImageUpload}
        ref={fileInputRef}
        hidden
      />

      <div className="flex items-center gap-4">
        <Button
          onClick={() => fileInputRef.current?.click()}
          className="text-sm"
        >
          Upload Image
        </Button>

        <div>
          <p
            className={cn("text-sm font-medium", isSizeError && "text-red-600")}
          >
            .PNG/JPEG, 2MB max
          </p>
        </div>
      </div>
    </div>
  );
}
