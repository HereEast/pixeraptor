const DB_NAME = "pixeraptor-db";
const DB_VERSION = 1;
const STORE_NAME = "images";
const KEY_NAME = "current_image";

interface ImageDataPayload {
  filename: string;
  imageData: ImageData;
  imageBlob: Blob;
}

export const IndexedDB = {
  saveImageData,
  getImageData,
  clearImageData,
};

// Open the database
function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);

    req.onupgradeneeded = () => {
      const db = req.result;

      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };

    req.onsuccess = () => resolve(req.result);
    req.onerror = () => {
      console.error("Error opening database", req.error);
      reject(req.error);
    };
  });
}

// Save image data
async function saveImageData(payload: ImageDataPayload) {
  const db = await openDB();

  await new Promise<void>((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, "readwrite");
    const store = transaction.objectStore(STORE_NAME);

    store.put(payload, KEY_NAME);

    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error);
  });

  db.close();
}

// Get image data
async function getImageData(): Promise<ImageDataPayload | null> {
  const db = await openDB();

  const result = await new Promise<ImageDataPayload | null>(
    (resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, "readonly");
      const store = transaction.objectStore(STORE_NAME);

      const req: IDBRequest<ImageDataPayload[]> = store.getAll();

      req.onsuccess = () => resolve(req.result[0] ?? null);
      req.onerror = () => reject(req.error);
    },
  );

  db.close();

  return result;
}

// Clear image data
async function clearImageData() {
  const db = await openDB();

  await new Promise<void>((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, "readwrite");
    const store = transaction.objectStore(STORE_NAME);

    store.delete(KEY_NAME);

    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error);
  });

  db.close();
}
