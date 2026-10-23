import { useState } from 'react';
import { Download, FileText, Trash2, Upload, RefreshCw } from 'lucide-react';
import { PDFDocument } from 'pdf-lib';

export default function PdfMerger() {
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [mergedPdfUrl, setMergedPdfUrl] = useState<string | null>(null);

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles((prev) => [...prev, ...newFiles]);
      setMergedPdfUrl(null);
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setMergedPdfUrl(null);
  };

  const mergePdfs = async () => {
    if (files.length < 2) return;
    setLoading(true);
    try {
      const mergedPdf = await PDFDocument.create();

      for (const file of files) {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await PDFDocument.load(arrayBuffer);
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        copiedPages.forEach((page) => mergedPdf.addPage(page));
      }

      const mergedPdfBytes = await mergedPdf.save();
      const blob = new Blob([mergedPdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      setMergedPdfUrl(url);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 p-8 text-center bg-slate-50">
        <Upload className="mb-3 h-10 w-10 text-slate-400" />
        <label className="cursor-pointer rounded-xl bg-amber-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-amber-700">
          Select PDF Files
          <input type="file" accept="application/pdf" multiple onChange={handleFiles} className="hidden" />
        </label>
        <p className="mt-2 text-xs text-slate-500">Select at least 2 PDF files to merge</p>
      </div>

      {files.length > 0 && (
        <div className="space-y-4">
          <div className="space-y-2">
            {files.map((file, index) => (
              <div key={index} className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-3">
                <div className="flex items-center gap-3">
                  <FileText className="text-amber-600" size={20} />
                  <span className="text-sm font-semibold text-slate-800 truncate max-w-[240px]">{file.name}</span>
                </div>
                <button
                  onClick={() => removeFile(index)}
                  className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-red-600"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>

          <button
            onClick={mergePdfs}
            disabled={loading || files.length < 2}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-800 py-3 text-sm font-bold text-white hover:bg-blue-900 disabled:opacity-50"
          >
            {loading ? <RefreshCw className="animate-spin" size={16} /> : <FileText size={16} />}
            Merge PDFs
          </button>
        </div>
      )}

      {mergedPdfUrl && (
        <div className="rounded-xl border border-teal-200 bg-teal-50 p-4 text-center">
          <p className="mb-3 text-xs font-bold text-teal-900">PDFs Merged Successfully!</p>
          <a
            href={mergedPdfUrl}
            download="merged_document.pdf"
            className="inline-flex items-center gap-2 rounded-xl bg-blue-800 px-5 py-2.5 text-sm font-bold text-white hover:bg-blue-900"
          >
            <Download size={16} /> Download Merged PDF
          </a>
        </div>
      )}
    </div>
  );
}
