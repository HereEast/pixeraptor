export async function uploadImage(file: File) {
  const image = new Image();
  const url = URL.createObjectURL(file);

  image.src = url;

  await new Promise<HTMLImageElement>((resolve, reject) => {
    image.onload = () => {
      URL.revokeObjectURL(url);
      resolve(image);
    };

    image.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Failed to load image"));
    };
  });

  return image;
}
