import { useState } from 'react';
import { Download, Image as ImageIcon, RefreshCw, Upload } from 'lucide-react';

export default function ImageCompressor() {
  const [file, setFile] = useState<File | null>(null);
  const [compressedUrl, setCompressedUrl] = useState<string | null>(null);
  const [quality, setQuality] = useState<number>(80);
  const [loading, setLoading] = useState(false);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setCompressedUrl(null);
    }
  };

  const compressImage = () => {
    if (!file) return;
    setLoading(true);
    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx?.drawImage(img, 0, 0);
      const dataUrl = canvas.toDataURL('image/jpeg', quality / 100);
      setCompressedUrl(dataUrl);
      setLoading(false);
    };
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 p-8 text-center bg-slate-50">
        <Upload className="mb-3 h-10 w-10 text-slate-400" />
        <label className="cursor-pointer rounded-xl bg-blue-800 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-900">
          Select Image
          <input type="file" accept="image/*" onChange={handleFile} className="hidden" />
        </label>
        {file && <p className="mt-3 text-xs font-semibold text-slate-600">{file.name}</p>}
      </div>

      {file && (
        <div className="space-y-4 rounded-xl border border-slate-200 p-4">
          <div>
            <label className="text-xs font-bold text-slate-700">Quality: {quality}%</label>
            <input
              type="range"
              min="10"
              max="100"
              value={quality}
              onChange={(e) => setQuality(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer mt-2"
            />
          </div>
          <button
            onClick={compressImage}
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-teal-700 py-3 text-sm font-bold text-white hover:bg-teal-800"
          >
            {loading ? <RefreshCw className="animate-spin" size={16} /> : <ImageIcon size={16} />}
            Compress Image
          </button>
        </div>
      )}

      {compressedUrl && (
        <div className="rounded-xl border border-teal-200 bg-teal-50 p-4 text-center">
          <p className="mb-3 text-xs font-bold text-teal-900">Image Compressed Successfully!</p>
          <a
            href={compressedUrl}
            download={`compressed_${file?.name || 'image.jpg'}`}
            className="inline-flex items-center gap-2 rounded-xl bg-blue-800 px-5 py-2.5 text-sm font-bold text-white hover:bg-blue-900"
          >
            <Download size={16} /> Download
          </a>
        </div>
      )}
    </div>
  );
}
