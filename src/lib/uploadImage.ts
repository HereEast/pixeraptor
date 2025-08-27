export async function uploadImage(file: File) {
  const img = new Image();
  const url = URL.createObjectURL(file);

  img.src = url;

  await new Promise<HTMLImageElement>((resolve, reject) => {
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Failed to load image"));
    };
  });

  return img;
}
