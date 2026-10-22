const DB_NAME = 'PPT_LOCAL_STORAGE';
const DB_VERSION = 1;
const STORE_NAME = 'presentations';
const KEY = 'current_presentation';

/**
 * Open or initialize the browser's IndexedDB database.
 */
function openDB() {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      return reject(new Error('IndexedDB is not supported in this browser.'));
    }

    const request = window.indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

/**
 * Save a PowerPoint presentation file persistently in the browser's local storage.
 * Stores the actual binary Blob/File object.
 */
export async function saveLocalPresentation(file) {
  const db = await openDB();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);

    const record = {
      id: KEY,
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type || 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      blob: file, // Native File/Blob storage in browser IndexedDB
      savedAt: Date.now()
    };

    const request = store.put(record);

    request.onsuccess = () => {
      // Also store filename in localStorage for instant synchronous peek if needed
      try {
        localStorage.setItem('ppt_current_filename', file.name);
      } catch {
        // ignore localStorage quota warnings
      }
      resolve(record);
    };

    request.onerror = () => reject(request.error);
  });
}

/**
 * Retrieve the saved presentation from browser local storage.
 */
export async function getLocalPresentation() {
  const db = await openDB();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.get(KEY);

    request.onsuccess = () => {
      resolve(request.result || null);
    };

    request.onerror = () => reject(request.error);
  });
}

/**
 * Delete the saved presentation from browser local storage.
 */
export async function deleteLocalPresentation() {
  const db = await openDB();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.delete(KEY);

    request.onsuccess = () => {
      try {
        localStorage.removeItem('ppt_current_filename');
      } catch {
        // ignore
      }
      resolve();
    };

    request.onerror = () => reject(request.error);
  });
}

