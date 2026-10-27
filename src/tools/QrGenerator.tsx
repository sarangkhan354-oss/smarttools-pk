import { useState, useEffect } from 'react';
import { Download, Sparkles } from 'lucide-react';
import QRCode from 'qrcode';

export default function QrGenerator() {
  const [text, setText] = useState('https://smarttools.pk');
  const [qrUrl, setQrUrl] = useState('');

  useEffect(() => {
    if (text.trim()) {
      QRCode.toDataURL(text, { width: 300, margin: 2 })
        .then((url) => setQrUrl(url))
        .catch((err) => console.error(err));
    } else {
      setQrUrl('');
    }
  }, [text]);

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-xs font-bold text-slate-700 mb-2">
          Enter Text or URL:
        </label>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="https://example.com or any message..."
          className="w-full rounded-xl border border-slate-200 bg-white p-3 text-sm outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
        />
      </div>

      {qrUrl ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 p-6 text-center">
          <img src={qrUrl} alt="QR Code" className="h-48 w-48 rounded-lg shadow-sm border bg-white p-2" />
          
          <a
            href={qrUrl}
            download="qrcode.png"
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-blue-800 px-5 py-2.5 text-sm font-bold text-black hover:bg-blue-900"
          >
            <Download size={16} /> Download QR Code
          </a>
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-slate-300 p-8 text-center text-sm text-slate-500">
          <Sparkles className="mx-auto mb-2 text-slate-400" size={24} />
          Enter text above to generate a QR code
        </div>
      )}
    </div>
  );
}
