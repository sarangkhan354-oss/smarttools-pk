# SmartTools PK

A responsive browser-based toolbox for image compression, image-to-PDF conversion, PDF merging, QR generation, and text statistics. User files are processed locally and are not uploaded.

## Run & Operate

- `pnpm --filter @workspace/smarttools-pk run dev` — run the website
- `pnpm --filter @workspace/smarttools-pk run typecheck` — check the website's TypeScript
- `pnpm --filter @workspace/smarttools-pk run build` — build the static frontend

## Stack

- pnpm workspace, React, TypeScript, Vite, and Tailwind CSS
- Browser Canvas and File APIs for local image processing
- `pdf-lib` for PDF creation and merging; `qrcode` for local QR code generation
- No app database, login, payment, or file-upload service

## Where things live

- `artifacts/smarttools-pk/src/App.tsx` — navigation, search, categories, and tool directory
- `artifacts/smarttools-pk/src/tools/` — focused implementations for each tool and shared utilities
- `artifacts/smarttools-pk/src/index.css` — application theme and responsive styling

## Architecture decisions

- File conversion happens in the browser so selected files are never sent to a server.
- PDF and QR libraries load only when their tool is opened to keep the initial page lighter.

## Product

- Five free utilities: image compression to a target size, image-to-PDF, PDF merge, QR generation, and text/word counts.
- Search and category filters navigate to tool panels on the same page.

## User preferences

- Premium, modern, clean interface with a white background and navy/blue accents.
- Responsive for phones and laptops; footer credit: “Built by Sarang Khan”.

## Gotchas

- Image compression exports JPEG; transparent pixels are flattened onto white.
- Image/PDF processing is limited by the browser's available memory and supported image formats.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
