import { useState } from 'react';
import { Copy, Check, Palette } from 'lucide-react';

export default function ColorPicker() {
  const [color, setColor] = useState('#3b82f6');
  const [copiedHex, setCopiedHex] = useState(false);
  const [copiedRgb, setCopiedRgb] = useState(false);

  // HEX to RGB conversion
  const hexToRgb = (hex: string) => {
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? `rgb(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)})`
      : 'rgb(59, 130, 246)';
  };

  const rgbColor = hexToRgb(color);

  const copyToClipboard = (text: string, type: 'hex' | 'rgb') => {
    navigator.clipboard.writeText(text);
    if (type === 'hex') {
      setCopiedHex(true);
      setTimeout(() => setCopiedHex(false), 2000);
    } else {
      setCopiedRgb(true);
      setTimeout(() => setCopiedRgb(false), 2000);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-center gap-6 rounded-xl border border-slate-800 bg-[#0d1526] p-6">
        <div
          className="h-32 w-32 shrink-0 rounded-2xl shadow-xl border-2 border-slate-700 transition-all"
          style={{ backgroundColor: color }}
        />
        
        <div className="flex-1 space-y-4 w-full">
          <div>
            <label className="block text-xs font-bold uppercase text-slate-400 mb-2 flex items-center gap-2">
              <Palette size={16} /> Select Color
            </label>
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="h-12 w-full cursor-pointer rounded-lg border border-slate-700 bg-transparent p-1"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex items-center justify-between rounded-lg border border-slate-700 bg-[#111a2b] p-3 text-xs">
              <span className="font-semibold text-slate-300">HEX: <strong className="text-white">{color.toUpperCase()}</strong></span>
              <button
                onClick={() => copyToClipboard(color.toUpperCase(), 'hex')}
                className="text-cyan-300 hover:text-cyan-200"
              >
                {copiedHex ? <Check size={16} /> : <Copy size={16} />}
              </button>
            </div>

            <div className="flex items-center justify-between rounded-lg border border-slate-700 bg-[#111a2b] p-3 text-xs">
              <span className="font-semibold text-slate-300">RGB: <strong className="text-white">{rgbColor}</strong></span>
              <button
                onClick={() => copyToClipboard(rgbColor, 'rgb')}
                className="text-cyan-300 hover:text-cyan-200"
              >
                {copiedRgb ? <Check size={16} /> : <Copy size={16} />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
