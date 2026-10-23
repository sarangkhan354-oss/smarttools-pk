# SmartTools PK

SmartTools PK is a responsive, browser-only utility website. It does not need an account, database, API, or file upload: image and PDF files are read and processed on the user's device[cite: 4].

## Tools

- **Image compressor** — converts an image to JPEG, lowering quality and, when needed, dimensions while preserving its aspect ratio until it reaches the selected maximum size or reports that the target could not be met[cite: 4].
- **Image to PDF** — accepts multiple images, lets users reorder or remove them, and creates a PDF with one image per page[cite: 4].
- **PDF merger** — combines at least two PDFs in the selected order and downloads the merged result[cite: 4].
- **QR code generator** — creates a downloadable PNG or SVG from text or a URL[cite: 4].
- **Text and word counter** — updates word, character, sentence, paragraph, and estimated reading-time counts as text changes[cite: 4].

## Code map

- `src/App.tsx` — responsive landing page, tool directory, search, and category filters[cite: 4].
- `src/tools/` — one focused component per tool plus shared browser-file and text-statistics helpers[cite: 4].
- `src/index.css` — color tokens, typography, focus states, and reduced-motion support[cite: 4].

PDF and QR dependencies load with their respective tool panels. Generated file downloads are created locally with browser object URLs[cite: 4].

## Run and check

```sh
pnpm --filter @workspace/smarttools-pk run dev
pnpm --filter @workspace/smarttools-pk run typecheck
