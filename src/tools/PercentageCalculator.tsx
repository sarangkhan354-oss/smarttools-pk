import { useState } from 'react';
import { Calculator } from 'lucide-react';

export default function PercentageCalculator() {
  // Mode 1: What is X% of Y?
  const [val1, setVal1] = useState('');
  const [val2, setVal2] = useState('');
  
  // Mode 2: Discount Calculator
  const [originalPrice, setOriginalPrice] = useState('');
  const [discountPercent, setDiscountPercent] = useState('');

  const result1 = val1 && val2 ? ((parseFloat(val1) / 100) * parseFloat(val2)).toFixed(2) : null;
  
  const discountAmount = originalPrice && discountPercent 
    ? ((parseFloat(originalPrice) * parseFloat(discountPercent)) / 100).toFixed(2)
    : null;
  const finalPrice = originalPrice && discountAmount 
    ? (parseFloat(originalPrice) - parseFloat(discountAmount)).toFixed(2)
    : null;

  return (
    <div className="space-y-6">
      {/* Percentage Calculator */}
      <div className="rounded-xl border border-slate-800 bg-[#0d1526] p-4">
        <h3 className="text-sm font-bold text-cyan-300 mb-3 flex items-center gap-2">
          <Calculator size={16} /> Basic Percentage
        </h3>
        <div className="flex flex-wrap items-center gap-3 text-sm text-slate-300">
          <span>What is</span>
          <input
            type="number"
            placeholder="X"
            value={val1}
            onChange={(e) => setVal1(e.target.value)}
            className="w-20 rounded-lg border border-slate-700 bg-[#111a2b] p-2 text-center text-white outline-none focus:border-blue-400"
          />
          <span>% of</span>
          <input
            type="number"
            placeholder="Y"
            value={val2}
            onChange={(e) => setVal2(e.target.value)}
            className="w-24 rounded-lg border border-slate-700 bg-[#111a2b] p-2 text-center text-white outline-none focus:border-blue-400"
          />
          <span>?</span>
        </div>
        {result1 !== null && (
          <div className="mt-4 rounded-lg bg-blue-500/10 border border-blue-500/30 p-3 text-sm font-bold text-blue-300">
            Result: {result1}
          </div>
        )}
      </div>

      {/* Discount Calculator */}
      <div className="rounded-xl border border-slate-800 bg-[#0d1526] p-4">
        <h3 className="text-sm font-bold text-amber-300 mb-3 flex items-center gap-2">
          🏷️ Discount Calculator
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-slate-400 mb-1">Original Price (Rs / $)</label>
            <input
              type="number"
              placeholder="e.g. 5000"
              value={originalPrice}
              onChange={(e) => setOriginalPrice(e.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-[#111a2b] p-2 text-white outline-none focus:border-blue-400"
            />
          </div>
          <div>
            <label className="block text-xs text-slate-400 mb-1">Discount (% Off)</label>
            <input
              type="number"
              placeholder="e.g. 20"
              value={discountPercent}
              onChange={(e) => setDiscountPercent(e.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-[#111a2b] p-2 text-white outline-none focus:border-blue-400"
            />
          </div>
        </div>

        {finalPrice !== null && (
          <div className="mt-4 grid grid-cols-2 gap-3 text-center">
            <div className="rounded-lg bg-emerald-500/10 border border-emerald-500/30 p-3">
              <span className="block text-xs text-slate-400">Final Price</span>
              <span className="text-lg font-bold text-emerald-300">{finalPrice}</span>
            </div>
            <div className="rounded-lg bg-rose-500/10 border border-rose-500/30 p-3">
              <span className="block text-xs text-slate-400">You Save</span>
              <span className="text-lg font-bold text-rose-300">{discountAmount}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
