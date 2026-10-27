import { useState, useEffect } from 'react';
import { Download, Sparkles, Image as ImageIcon, Link as LinkIcon, Upload } from 'lucide-react';
import QRCode from 'qrcode';

export default function QrGenerator() {
  const [mode, setMode] = useState<'text' | 'image'>('text');
  const [text, setText] = useState('https://smarttoolspk.com');
  const [imageUrl, setImageUrl] = useState('');
  const [qrUrl, setQrUrl] = useState('');
  const [loading, setLoading] = useState(false);

  // Generate QR based on active mode
  useEffect(() => {
    const contentToEncode = mode === 'text' ? text : imageUrl;

    if (contentToEncode && contentToEncode.trim()) {
      setLoading(true);
      QRCode.toDataURL(contentToEncode, { width: 300, margin: 2 })
        .then((url) => {
          setQrUrl(url);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    } else {
      setQrUrl('');
    }
  }, [text, imageUrl, mode]);

  // Handle Image Upload and convert to Data URL
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 800 * 1024) {
        alert('Please upload an image smaller than 800KB for a clean QR code scan.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      {/* Mode Switcher Tabs */}
      <div className="flex rounded-2xl bg-slate-100 p-1.5 border border-slate-200">
        <button
          onClick={() => { setMode('text'); setQrUrl(''); }}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-xs font-bold rounded-xl transition ${
            mode === 'text'
              ? 'bg-blue-600 text-white shadow-md'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <LinkIcon size={15} /> Text or URL QR
        </button>
        <button
          onClick={() => { setMode('image'); setQrUrl(''); }}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-xs font-bold rounded-xl transition ${
            mode === 'image'
              ? 'bg-blue-600 text-white shadow-md'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <ImageIcon size={15} /> Image to QR Code
        </button>
      </div>

      {/* Input Section */}
      {mode === 'text' ? (
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-2">
            Enter Text or URL:
          </label>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="https://example.com or any message..."
            className="w-full rounded-xl border border-slate-300 bg-white p-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          />
        </div>
      ) : (
        <div className="space-y-3">
          <label className="block text-xs font-bold text-slate-700">
            Upload Image (Max 800KB):
          </label>
          <label className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 p-6 text-center cursor-pointer hover:border-blue-500 hover:bg-blue-50/50 transition">
            <Upload className="mx-auto mb-2 text-blue-600" size={26} />
            <span className="text-sm font-semibold text-slate-700">Click to upload picture</span>
            <span className="text-xs text-slate-400 mt-1">PNG, JPG or JPEG</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>
          {imageUrl && (
            <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-100 border border-slate-200">
              <img src={imageUrl} alt="Uploaded Preview" className="h-12 w-12 rounded-lg object-cover border" />
              <div className="flex-1 overflow-hidden">
                <p className="text-xs font-bold text-slate-800">Image Uploaded Successfully!</p>
                <p className="text-[11px] text-slate-500 truncate">Ready to generate QR code</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* QR Output Preview */}
      {loading ? (
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-12 text-center text-sm text-slate-500">
          Generating QR Code...
        </div>
      ) : qrUrl ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 p-6 text-center shadow-inner">
          <img src={qrUrl} alt="QR Code" className="h-48 w-48 rounded-lg shadow-sm border bg-white p-2" />
          
          <a
            href={qrUrl}
            download={mode === 'text' ? 'text-qrcode.png' : 'image-qrcode.png'}
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-bold text-white shadow-md hover:bg-blue-700 transition"
          >
            <Download size={16} /> Download QR Code
          </a>
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-slate-300 p-8 text-center text-sm text-slate-500">
          <Sparkles className="mx-auto mb-2 text-slate-400" size={24} />
          {mode === 'text' ? 'Enter text above to generate a QR code' : 'Upload an image above to generate a QR code'}
        </div>
      )}
    </div>
  );
}
