import React, { useState, useEffect, useRef } from 'react';
import { saveLocalPresentation, getLocalPresentation } from './utils/storage';

// Hardcoded presentation bundled with the website
const DEFAULT_FILE_NAME = 'Sutra_Khes_Venture_Vault.pptx';
const DEFAULT_FILE_URL = '/Sutra_Khes_Venture_Vault.pptx';

export default function App() {
  const [presentation, setPresentation] = useState({
    exists: true,
    fileName: DEFAULT_FILE_NAME,
    blob: null,
    downloadUrl: DEFAULT_FILE_URL
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [blobDownloadUrl, setBlobDownloadUrl] = useState(null);

  const fileInputRef = useRef(null);

  // 1. Load saved presentation or fallback to the hardcoded presentation
  useEffect(() => {
    loadPresentation();
  }, []);

  // 2. Manage temporary download URL when a user uploads a custom presentation
  useEffect(() => {
    if (!presentation.blob) {
      setBlobDownloadUrl(null);
      return;
    }

    const url = URL.createObjectURL(presentation.blob);
    setBlobDownloadUrl(url);

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [presentation.blob]);

  const loadPresentation = async () => {
    try {
      setLoading(true);
      const saved = await getLocalPresentation();

      if (saved && saved.blob) {
        setPresentation({
          exists: true,
          fileName: saved.fileName,
          blob: saved.blob,
          downloadUrl: null
        });
      } else {
        // Default to the hardcoded PPTX so every visitor sees it automatically
        setPresentation({
          exists: true,
          fileName: DEFAULT_FILE_NAME,
          blob: null,
          downloadUrl: DEFAULT_FILE_URL
        });
      }
      setError('');
    } catch {
      // Graceful fallback to hardcoded PPTX
      setPresentation({
        exists: true,
        fileName: DEFAULT_FILE_NAME,
        blob: null,
        downloadUrl: DEFAULT_FILE_URL
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const lowerName = file.name.toLowerCase();
    if (!lowerName.endsWith('.pptx') && !lowerName.endsWith('.ppt')) {
      setError('Please select a .pptx or .ppt file.');
      return;
    }

    setError('');

    try {
      // Save in browser local storage
      await saveLocalPresentation(file);

      setPresentation({
        exists: true,
        fileName: file.name,
        blob: file,
        downloadUrl: null
      });
    } catch {
      setError('Failed to save presentation to browser local storage.');
    }
  };

  const handleDownload = () => {
    const targetUrl = blobDownloadUrl || presentation.downloadUrl || DEFAULT_FILE_URL;
    const targetName = presentation.fileName || DEFAULT_FILE_NAME;

    if (!targetUrl) return;

    const link = document.createElement('a');
    link.href = targetUrl;
    link.download = targetName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <main className="min-h-screen bg-white flex flex-col items-center justify-center text-black px-4 font-sans select-none">
      {/* Hidden file input for .pptx / .ppt selection */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".pptx,.ppt,application/vnd.openxmlformats-officedocument.presentationml.presentation,application/vnd.ms-powerpoint"
        className="hidden"
      />

      {loading ? (
        <p className="text-sm text-black">Loading...</p>
      ) : presentation.exists ? (
        <div className="flex flex-col items-center">
          {/* Uploaded / Hardcoded PowerPoint filename */}
          <p className="text-sm text-black mb-4">
            {presentation.fileName}
          </p>

          {/* Action options */}
          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={handleDownload}
              className="text-black hover:underline cursor-pointer text-base bg-transparent border-0 p-0"
            >
              Download PPT
            </button>

            <button
              type="button"
              onClick={handleUploadClick}
              className="text-black hover:underline cursor-pointer text-base bg-transparent border-0 p-0"
            >
              Upload PPT
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <p className="text-sm text-black mb-4">
            No presentation available.
          </p>

          <button
            type="button"
            onClick={handleUploadClick}
            className="text-black hover:underline cursor-pointer text-base bg-transparent border-0 p-0"
          >
            Upload PPT
          </button>
        </div>
      )}

      {/* Minimal error notification if any */}
      {error && (
        <p className="text-xs text-red-600 mt-4">
          {error}
        </p>
      )}
    </main>
  );
}

