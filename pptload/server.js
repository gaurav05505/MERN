import express from 'express';
import cors from 'cors';
import multer from 'multer';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// In-memory upload buffer (up to 100MB limit for PowerPoint presentations)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 100 * 1024 * 1024 }
});

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const OWNER_SECRET_KEY = process.env.OWNER_SECRET_KEY;
const BUCKET_NAME = 'presentations';

// Server-side Supabase client with service role key (NEVER exposed to frontend)
let supabase = null;
if (SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY) {
  supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    auth: { persistSession: false }
  });
} else {
  console.warn('\n⚠️  [Server Warning]: SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY is not defined in .env.');
  console.warn('   Shared file storage requires these credentials.\n');
}

/**
 * Middleware: Verify owner authorization via x-owner-secret header
 */
function requireOwnerAuth(req, res, next) {
  const providedSecret = req.headers['x-owner-secret'];

  if (!OWNER_SECRET_KEY) {
    return res.status(500).json({
      error: 'OWNER_SECRET_KEY is not configured on the server. Please define it in your .env file.'
    });
  }

  if (!providedSecret || providedSecret !== OWNER_SECRET_KEY) {
    return res.status(401).json({
      error: 'Unauthorized: Invalid or missing owner credential.'
    });
  }

  next();
}

/**
 * Verify owner credential (used by frontend to verify owner session)
 */
app.post('/api/auth/verify', (req, res) => {
  const providedSecret = req.headers['x-owner-secret'] || req.body?.secret;

  if (!OWNER_SECRET_KEY) {
    return res.status(500).json({ isOwner: false, error: 'Server owner secret not configured.' });
  }

  if (providedSecret && providedSecret === OWNER_SECRET_KEY) {
    return res.json({ isOwner: true });
  }

  return res.status(401).json({ isOwner: false, error: 'Invalid owner secret.' });
});

/**
 * GET /api/presentation
 * Publicly accessible endpoint to retrieve the current presentation info.
 */
app.get('/api/presentation', async (req, res) => {
  if (!supabase) {
    return res.json({
      exists: false,
      error: 'Supabase storage is not configured on the server. Please check your .env settings.'
    });
  }

  try {
    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .download('current/metadata.json');

    if (error || !data) {
      // metadata file does not exist yet -> no presentation uploaded
      return res.json({
        exists: false,
        fileName: null,
        downloadUrl: null
      });
    }

    const text = await data.text();
    const metadata = JSON.parse(text);

    return res.json({
      exists: true,
      fileName: metadata.fileName,
      fileSize: metadata.fileSize,
      updatedAt: metadata.updatedAt,
      downloadUrl: '/api/presentation/download'
    });
  } catch (err) {
    console.error('Error fetching presentation metadata:', err.message);
    return res.status(500).json({
      exists: false,
      error: 'Failed to retrieve presentation information.'
    });
  }
});

/**
 * GET /api/presentation/download
 * Publicly accessible endpoint to download the exact current PowerPoint presentation.
 * Automatically sets the correct filename in the Content-Disposition header.
 */
app.get('/api/presentation/download', async (req, res) => {
  if (!supabase) {
    return res.status(500).send('Storage is not configured.');
  }

  try {
    // 1. Fetch metadata to get original filename and storage path
    const { data: metaData, error: metaErr } = await supabase.storage
      .from(BUCKET_NAME)
      .download('current/metadata.json');

    if (metaErr || !metaData) {
      return res.status(404).send('No presentation found.');
    }

    const metadata = JSON.parse(await metaData.text());

    // 2. Download the actual presentation file
    const { data: fileData, error: fileErr } = await supabase.storage
      .from(BUCKET_NAME)
      .download(metadata.storagePath);

    if (fileErr || !fileData) {
      return res.status(404).send('Presentation file not found in storage.');
    }

    const arrayBuffer = await fileData.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // 3. Set headers for standard file download across all platforms
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="${encodeURIComponent(metadata.fileName)}"; filename*=UTF-8''${encodeURIComponent(metadata.fileName)}`
    );
    res.setHeader(
      'Content-Type',
      metadata.mimeType || 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
    );
    res.setHeader('Content-Length', buffer.length);

    return res.send(buffer);
  } catch (err) {
    console.error('Download error:', err.message);
    return res.status(500).send('Failed to process download.');
  }
});

/**
 * POST /api/upload
 * Protected endpoint: only website owner with valid x-owner-secret can upload or replace.
 */
app.post('/api/upload', requireOwnerAuth, upload.single('file'), async (req, res) => {
  if (!supabase) {
    return res.status(500).json({
      error: 'Supabase client is not configured on the server. Please set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.'
    });
  }

  if (!req.file) {
    return res.status(400).json({ error: 'No file provided.' });
  }

  const originalName = req.file.originalname || '';
  const ext = path.extname(originalName).toLowerCase();

  // Validate PowerPoint extension
  if (ext !== '.pptx' && ext !== '.ppt') {
    return res.status(400).json({
      error: 'Unsupported file type. Only .pptx and .ppt presentations are accepted.'
    });
  }

  try {
    const storagePath = `current/presentation${ext}`;
    const contentType =
      req.file.mimetype ||
      (ext === '.ppt'
        ? 'application/vnd.ms-powerpoint'
        : 'application/vnd.openxmlformats-officedocument.presentationml.presentation');

    // 1. Upload presentation file to Supabase Storage with upsert
    const { error: uploadError } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(storagePath, req.file.buffer, {
        contentType,
        upsert: true
      });

    if (uploadError) {
      console.error('Supabase storage upload error:', uploadError);
      return res.status(500).json({
        error: `Supabase upload failed: ${uploadError.message}. Make sure the "${BUCKET_NAME}" bucket exists.`
      });
    }

    // 2. Save metadata so all visitors know the human-readable filename
    const metadata = {
      fileName: originalName,
      storagePath,
      fileSize: req.file.size,
      mimeType: contentType,
      updatedAt: new Date().toISOString()
    };

    const { error: metaError } = await supabase.storage
      .from(BUCKET_NAME)
      .upload('current/metadata.json', Buffer.from(JSON.stringify(metadata, null, 2)), {
        contentType: 'application/json',
        upsert: true
      });

    if (metaError) {
      console.error('Metadata update error:', metaError);
      return res.status(500).json({
        error: `Failed to update presentation metadata: ${metaError.message}`
      });
    }

    return res.json({
      success: true,
      fileName: originalName,
      updatedAt: metadata.updatedAt
    });
  } catch (err) {
    console.error('Upload processing error:', err.message);
    return res.status(500).json({
      error: 'Unexpected server error while processing upload.'
    });
  }
});

// Serve frontend build if dist folder exists (for unified production deployment)
const distPath = path.join(__dirname, 'dist');
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`\n🚀 PPT Workspace Server running on http://localhost:${PORT}`);
  console.log(`📁 Target Supabase Bucket: "${BUCKET_NAME}"`);
});

