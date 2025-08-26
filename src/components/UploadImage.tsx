import { ChangeEvent, useRef } from "react";

import { Button } from "~/components/ui/Button";
import { useCanvasContext } from "~/hooks";

export function UploadImage() {
  const { handleUpload } = useCanvasContext();

  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleImageUpload(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    if (!file || !file.type.startsWith("image/")) return;

    await handleUpload(file);
  }

  return (
    <div className="mb-2">
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        ref={fileInputRef}
        className="hidden"
      />

      <Button onClick={() => fileInputRef.current?.click()} className="text-sm">
        Upload Image
      </Button>
    </div>
  );
}
