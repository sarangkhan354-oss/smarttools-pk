import { useState, useMemo } from 'react';

export default function TextCounter() {
  const [text, setText] = useState('');

  const stats = useMemo(() => {
    const trimmed = text.trim();
    const characters = text.length;
    const words = trimmed ? trimmed.split(/\s+/).length : 0;
    const sentences = trimmed ? trimmed.split(/[.!?]+/).filter(Boolean).length : 0;
    const paragraphs = trimmed ? text.split(/\n+/).filter(Boolean).length : 0;
    const readingTime = Math.ceil(words / 200); // ~200 words per minute

    return { characters, words, sentences, paragraphs, readingTime };
  }, [text]);

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-xs font-bold text-slate-700 mb-2">
          Type or paste your text below:
        </label>
        <textarea
          rows={6}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Start typing or pasting text here..."
          className="w-full rounded-xl border border-slate-200 bg-white p-3 text-sm outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
        />
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-center">
          <span className="block text-2xl font-extrabold text-[#142b49]">{stats.words}</span>
          <span className="mt-1 block text-xs font-semibold text-slate-500">Words</span>
        </div>
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-center">
          <span className="block text-2xl font-extrabold text-[#142b49]">{stats.characters}</span>
          <span className="mt-1 block text-xs font-semibold text-slate-500">Characters</span>
        </div>
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-center">
          <span className="block text-2xl font-extrabold text-[#142b49]">{stats.sentences}</span>
          <span className="mt-1 block text-xs font-semibold text-slate-500">Sentences</span>
        </div>
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-center">
          <span className="block text-2xl font-extrabold text-[#142b49]">{stats.paragraphs}</span>
          <span className="mt-1 block text-xs font-semibold text-slate-500">Paragraphs</span>
        </div>
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-center col-span-2 sm:col-span-2">
          <span className="block text-2xl font-extrabold text-[#142b49]">{stats.readingTime} min</span>
          <span className="mt-1 block text-xs font-semibold text-slate-500">Est. Reading Time</span>
        </div>
      </div>
    </div>
  );
}
