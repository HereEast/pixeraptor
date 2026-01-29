export async function uploadImage(file: File) {
  const image = new Image();
  const url = URL.createObjectURL(file);

  image.src = url; // Starts loading the bytes behind that blob URL

  await new Promise<HTMLImageElement>((resolve, reject) => {
    // On load, the browser has already read the blob data and decoded it into the HTMLImageElement - pixels/decoded image data is now in memory
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
