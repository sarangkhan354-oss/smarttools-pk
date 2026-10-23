import { useState } from 'react';
import { Download, FileImage, Trash2, Upload } from 'lucide-react';
import { PDFDocument } from 'pdf-lib';

export default function ImageToPdf() {
  const [images, setImages] = useState<{ file: File; preview: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).map((file) => ({
        file,
        preview: URL.createObjectURL(file),
      }));
      setImages((prev) => [...prev, ...newFiles]);
      setPdfUrl(null);
    }
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setPdfUrl(null);
  };

  const generatePdf = async () => {
    if (images.length === 0) return;
    setLoading(true);
    try {
      const pdfDoc = await PDFDocument.create();

      for (const item of images) {
        const imageBytes = await item.file.arrayBuffer();
        let embeddedImage;
        if (item.file.type === 'image/png') {
          embeddedImage = await pdfDoc.embedPng(imageBytes);
        } else {
          embeddedImage = await pdfDoc.embedJpg(imageBytes);
        }

        const page = pdfDoc.addPage([embeddedImage.width, embeddedImage.height]);
        page.drawImage(embeddedImage, {
          x: 0,
          y: 0,
          width: embeddedImage.width,
          height: embeddedImage.height,
        });
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      setPdfUrl(url);
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
        <label className="cursor-pointer rounded-xl bg-teal-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-teal-800">
          Select Images
          <input type="file" accept="image/*" multiple onChange={handleFiles} className="hidden" />
        </label>
        <p className="mt-2 text-xs text-slate-500">You can select multiple images</p>
      </div>

      {images.length > 0 && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {images.map((img, index) => (
              <div key={index} className="relative group rounded-xl border border-slate-200 bg-white p-2">
                <img src={img.preview} alt="preview" className="h-24 w-full object-cover rounded-lg" />
                <button
                  onClick={() => removeImage(index)}
                  className="absolute top-3 right-3 rounded-full bg-red-600 p-1 text-white opacity-90 hover:opacity-100"
                >
                  <Trash2 size={14} />
                </button>
                <span className="mt-1 block truncate text-[11px] text-slate-600">{img.file.name}</span>
              </div>
            ))}
          </div>

          <button
            onClick={generatePdf}
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-800 py-3 text-sm font-bold text-white hover:bg-blue-900"
          >
            <FileImage size={16} />
            {loading ? 'Generating PDF...' : 'Create PDF from Images'}
          </button>
        </div>
      )}

      {pdfUrl && (
        <div className="rounded-xl border border-teal-200 bg-teal-50 p-4 text-center">
          <p className="mb-3 text-xs font-bold text-teal-900">PDF Created Successfully!</p>
          <a
            href={pdfUrl}
            download="images_document.pdf"
            className="inline-flex items-center gap-2 rounded-xl bg-blue-800 px-5 py-2.5 text-sm font-bold text-white hover:bg-blue-900"
          >
            <Download size={16} /> Download PDF
          </a>
        </div>
      )}
    </div>
  );
}
