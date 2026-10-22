# Minimal PowerPoint Website

A clean, minimal, completely self-contained website that hardcodes and serves your PowerPoint presentation (`Sutra_Khes_Venture_Vault.pptx`) so that anyone who opens the website immediately sees it and can download it.

---

## Features

- **Hardcoded Default Presentation**: Bundles `Sutra_Khes_Venture_Vault.pptx` directly in the project (`public/Sutra_Khes_Venture_Vault.pptx`).
- **Immediate Loading for Everyone**: Anyone who opens the website immediately sees `Sutra_Khes_Venture_Vault.pptx` without needing to upload anything first.
- **Download PPT**: One-click download of the exact, unmodified `.pptx` file.
- **Upload / Replace Option**: Allows selecting and saving a replacement `.pptx` or `.ppt` file locally in browser storage at any time.
- **No External Database / Backend**: 100% client-side, zero configuration, zero external dependencies required.
- **Ultra-Minimal Interface**:
  - Pure white background (`#FFFFFF`) with simple black text.
  - Centered horizontally and vertically in the viewport.
  - Displays only the presentation filename, **Download PPT**, and **Upload PPT**.
  - No navbar, header, footer, cards, borders, shadows, or decorative elements.

---

## How It Works

1. **Initial Visit**:
   When any visitor opens the website, `Sutra_Khes_Venture_Vault.pptx` is displayed by default.
2. **Download**:
   Clicking **Download PPT** downloads `Sutra_Khes_Venture_Vault.pptx` directly to the user's device.
3. **Upload / Replace**:
   Clicking **Upload PPT** lets the user select another `.pptx` or `.ppt` presentation from their device, which is stored in the browser's persistent local storage.

---

## Running the Website

### Start Development Server
```bash
npm run dev
```
Open `http://localhost:5173/` in your browser.

### Build for Production
```bash
npm run build
```
The output will be generated in `dist/` (including `dist/Sutra_Khes_Venture_Vault.pptx`), ready to be deployed to any static host (GitHub Pages, Vercel, Netlify, Cloudflare Pages, etc.).
