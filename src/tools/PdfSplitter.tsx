import { useState } from 'react';
import { PDFDocument } from 'pdf-lib';

export default function PdfSplitter() {
  const [file, setFile] = useState<File | null>(null);
  const [pages, setPages] = useState('1');
  const [error, setError] = useState('');
  const [downloadUrl, setDownloadUrl] = useState('');
  const [busy, setBusy] = useState(false);

  async function splitPdf() {
    setError('');
    setDownloadUrl('');

    if (!file) {
      setError('Please select a PDF file.');
      return;
    }

    const pageNumbers = pages.split(',').map(Number);

    if (
      !pages.trim() ||
      pageNumbers.some(
        (n) => !Number.isInteger(n) || n < 1
      )
    ) {
      setError('Enter page numbers like 1,3,5.');
      return;
    }

    setBusy(true);

    try {
      const pdf = await PDFDocument.load(
        await file.arrayBuffer()
      );

      const total = pdf.getPageCount();

      if (pageNumbers.some((n) => n > total)) {
        setError(`This PDF has ${total} pages.`);
        return;
      }

      if (new Set(pageNumbers).size !== pageNumbers.length) {
        setError('Please do not repeat page numbers.');
        return;
      }

      const output = await PDFDocument.create();

      const selected = await output.copyPages(
        pdf,
        pageNumbers.map((n) => n - 1)
      );

      selected.forEach((page) => output.addPage(page));

      const bytes = await output.save();
      const blob = new Blob([bytes], {
        type: 'application/pdf',
      });

      setDownloadUrl(URL.createObjectURL(blob));
    } catch {
      setError('Could not read this PDF. Try another file.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-4 text-slate-100">
      <label className="block text-sm font-semibold">
        Choose PDF
        <input
          type="file"
          accept=".pdf,application/pdf"
          className="mt-2 block w-full text-sm"
          onChange={(e) => {
            setFile(e.target.files?.[0] ?? null);
            setDownloadUrl('');
            setError('');
          }}
        />
      </label>

      <label className="block text-sm font-semibold">
        Page numbers to keep
        <input
          value={pages}
          onChange={(e) => setPages(e.target.value)}
          placeholder="Example: 1,3,5"
          className="mt-2 h-11 w-full rounded-lg border border-slate-600 bg-slate-900 px-3 text-white"
        />
      </label>

      <p className="text-xs text-slate-400">
        Example: enter 1,3,5 to save pages 1, 3 and 5.
      </p>

      {error && (
        <p role="alert" className="text-sm text-red-400">
          {error}
        </p>
      )}

      <button
        onClick={splitPdf}
        disabled={busy}
        className="w-full rounded-xl bg-blue-600 px-4 py-3 font-bold text-white hover:bg-blue-500 disabled:opacity-60"
      >
        {busy ? 'Processing PDF...' : 'Split PDF'}
      </button>

      {downloadUrl && (
        <a
          href={downloadUrl}
          download="selected-pages.pdf"
          className="block rounded-xl bg-emerald-600 px-4 py-3 text-center font-bold text-white hover:bg-emerald-500"
        >
          Download PDF
        </a>
      )}

      <p className="text-xs text-slate-400">
        Your PDF is processed in your browser.
      </p>
    </div>
  );
}
