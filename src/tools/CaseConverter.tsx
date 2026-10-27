import { useState } from 'react';
import { Copy, Check, Type } from 'lucide-react';

export default function CaseConverter() {
  const [text, setText] = useState('');
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toUpperCase = () => setText(text.toUpperCase());
  const toLowerCase = () => setText(text.toLowerCase());
  const toTitleCase = () => {
    setText(
      text
        .toLowerCase()
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
    );
  };
  const toSentenceCase = () => {
    setText(
      text
        .toLowerCase()
        .replace(/(^\s*|[.!?]\s*)([a-z])/g, (m, p1, p2) => p1 + p2.toUpperCase())
    );
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
          Enter Your Text
        </label>
        <textarea
          rows={6}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type or paste your text here..."
          className="w-full rounded-xl border border-slate-700 bg-[#0d1526] p-4 text-sm text-slate-200 outline-none focus:border-blue-400 placeholder:text-slate-500"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          onClick={toUpperCase}
          className="rounded-lg border border-slate-700 bg-[#172338] px-3.5 py-2 text-xs font-semibold text-slate-200 transition hover:border-blue-400 hover:text-white"
        >
          UPPERCASE
        </button>
        <button
          onClick={toLowerCase}
          className="rounded-lg border border-slate-700 bg-[#172338] px-3.5 py-2 text-xs font-semibold text-slate-200 transition hover:border-blue-400 hover:text-white"
        >
          lowercase
        </button>
        <button
          onClick={toTitleCase}
          className="rounded-lg border border-slate-700 bg-[#172338] px-3.5 py-2 text-xs font-semibold text-slate-200 transition hover:border-blue-400 hover:text-white"
        >
          Title Case
        </button>
        <button
          onClick={toSentenceCase}
          className="rounded-lg border border-slate-700 bg-[#172338] px-3.5 py-2 text-xs font-semibold text-slate-200 transition hover:border-blue-400 hover:text-white"
        >
          Sentence case
        </button>
        <button
          onClick={() => setText('')}
          className="ml-auto rounded-lg border border-rose-500/30 bg-rose-500/10 px-3.5 py-2 text-xs font-semibold text-rose-300 transition hover:bg-rose-500/20"
        >
          Clear
        </button>
      </div>

      <div className="flex items-center justify-between border-t border-slate-800 pt-3 text-xs text-slate-400">
        <span>Characters: {text.length} | Words: {text.trim() ? text.trim().split(/\s+/).length : 0}</span>
        <button
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-bold text-white transition hover:bg-blue-500"
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
          {copied ? 'Copied!' : 'Copy Text'}
        </button>
      </div>
    </div>
  );
}
