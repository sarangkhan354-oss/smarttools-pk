import { lazy, Suspense, useMemo, useState } from 'react';
import { ArrowDownRight, ArrowRight, Check, FileImage, FileText, Image, LockKeyhole, Menu, Search, Sparkles, Type, X, Bot, Send, Palette, Calculator, CaseSensitive } from 'lucide-react';

const ImageCompressor = lazy(() => import('./tools/ImageCompressor'));
const ImageToPdf = lazy(() => import('./tools/ImageToPdf'));
const PdfMerger = lazy(() => import('./tools/PdfMerger'));
const PdfSplitter = lazy(() => import('./tools/PdfSplitter'));
const QrGenerator = lazy(() => import('./tools/QrGenerator'));
const TextCounter = lazy(() => import('./tools/TextCounter'));
const CaseConverter = lazy(() => import('./tools/CaseConverter'));
const PercentageCalculator = lazy(() => import('./tools/PercentageCalculator'));
const ColorPicker = lazy(() => import('./tools/ColorPicker'));
const PrivacyPolicy = lazy(() => import('./tools/PrivacyPolicy'));
const ContactUs = lazy(() => import('./tools/ContactUs'));

type Category = 'All tools' | 'Images' | 'PDF' | 'Text & utilities';
type ToolId = 'compress' | 'image-pdf' | 'merge-pdf' | 'pdf-split' | 'qr' | 'counter' | 'case-converter' | 'percentage' | 'color-picker' | 'privacy-policy' | 'contact-us';

const directory: {
  id: ToolId;
  title: string;
  description: string;
  category: Exclude<Category, 'All tools'>;
  time: string;
  icon: typeof Image;
  accent: string;
}[] = [
  {
    id: 'compress',
    title: 'Image compressor',
    description: 'Make image files lighter without changing their shape.',
    category: 'Images',
    time: 'Under a minute',
    icon: Image,
    accent: 'sky',
  },
  {
    id: 'image-pdf',
    title: 'Image to PDF',
    description: 'Arrange images and bundle them into a tidy PDF.',
    category: 'PDF',
    time: 'A few clicks',
    icon: FileImage,
    accent: 'teal',
  },
  {
    id: 'merge-pdf',
    title: 'PDF merger',
    description: 'Combine multiple PDFs in the order you choose.',
    category: 'PDF',
    time: 'A few clicks',
    icon: FileText,
    accent: 'amber',
  },
  {
    id: 'pdf-split',
    title: 'PDF splitter',
    description: 'Extract selected pages from a PDF into a new file.',
    category: 'PDF',
    time: 'A few clicks',
    icon: FileText,
    accent: 'amber',
  },
  {
    id: 'qr',
    title: 'QR code generator',
    description: 'Turn a link or message into a crisp, downloadable QR.',
    category: 'Text & utilities',
    time: 'Instant',
    icon: Sparkles,
    accent: 'violet',
  },
  {
    id: 'counter',
    title: 'Text & word counter',
    description: 'See useful writing stats as you type or paste.',
    category: 'Text & utilities',
    time: 'Live',
    icon: Type,
    accent: 'coral',
  },
  {
    id: 'case-converter',
    title: 'Case converter',
    description: 'Convert text to UPPERCASE, lowercase, Title Case, or Sentence case.',
    category: 'Text & utilities',
    time: 'Instant',
    icon: CaseSensitive,
    accent: 'sky',
  },
  {
    id: 'percentage',
    title: 'Percentage & Discount Calculator',
    description: 'Quickly calculate percentages and discount prices.',
    category: 'Text & utilities',
    time: 'Instant',
    icon: Calculator,
    accent: 'amber',
  },
  {
    id: 'color-picker',
    title: 'Color picker & HEX/RGB',
    description: 'Pick colors and copy HEX and RGB color codes easily.',
    category: 'Text & utilities',
    time: 'Instant',
    icon: Palette,
    accent: 'teal',
  },
];

const tools: Record<
  ToolId,
  { title: string; eyebrow: string; description: string }
> = {
  compress: {
    title: 'Image compressor',
    eyebrow: 'IMAGE TOOL',
    description:
      'Get a smaller image file, right in your browser. No upload, no waiting.',
  },
  'image-pdf': {
    title: 'Image to PDF',
    eyebrow: 'PDF TOOL',
    description: 'Put your images in the right order and make one clean PDF.',
  },
  'merge-pdf': {
    title: 'PDF merger',
    eyebrow: 'PDF TOOL',
    description:
      'Bring separate documents together. Your chosen order is the page order.',
  },
  'pdf-split': {
    title: 'PDF splitter',
    eyebrow: 'PDF TOOL',
    description: 'Extract the pages you need and save them as a new PDF.',
  },
  qr: {
    title: 'QR code generator',
    eyebrow: 'QUICK UTILITY',
    description:
      'Create a QR code for any message or link and save it in your preferred format.',
  },
  counter: {
    title: 'Text & word counter',
    eyebrow: 'WRITING TOOL',
    description: 'A clear snapshot of your writing, updated as you work.',
  },
  'case-converter': {
    title: 'Case converter',
    eyebrow: 'WRITING TOOL',
    description: 'Change the case of any text instantly with a single click.',
  },
  percentage: {
    title: 'Percentage & Discount Calculator',
    eyebrow: 'MATH UTILITY',
    description: 'Calculate percentages or figure out sale discount prices easily.',
  },
  'color-picker': {
    title: 'Color picker & HEX/RGB',
    eyebrow: 'DESIGN UTILITY',
    description: 'Select colors and convert between HEX and RGB formats.',
  },
  'privacy-policy': {
    title: 'Privacy Policy',
    eyebrow: 'LEGAL & TRUST',
    description: 'Learn how SmartTools PK protects your privacy and data.',
  },
  'contact-us': {
    title: 'Contact Us',
    eyebrow: 'GET IN TOUCH',
    description: 'Send us your suggestions, feedback, or support queries.',
  },
};

const categories: Category[] = [
  'All tools',
  'Images',
  'PDF',
  'Text & utilities',
];

function ToolContent({ id }: { id: ToolId }) {
  return (
    <Suspense
      fallback={
        <div
          className="flex min-h-48 items-center justify-center text-sm font-medium text-slate-500"
          role="status"
        >
          Preparing component…
        </div>
      }
    >
      {id === 'compress' ? (
        <ImageCompressor />
      ) : id === 'image-pdf' ? (
        <ImageToPdf />
      ) : id === 'merge-pdf' ? (
        <PdfMerger />
      ) : id === 'pdf-split' ? (
        <PdfSplitter />
      ) : id === 'qr' ? (
        <QrGenerator />
      ) : id === 'counter' ? (
        <TextCounter />
      ) : id === 'case-converter' ? (
        <CaseConverter />
      ) : id === 'percentage' ? (
        <PercentageCalculator />
      ) : id === 'color-picker' ? (
        <ColorPicker />
      ) : id === 'privacy-policy' ? (
        <PrivacyPolicy />
      ) : (
        <ContactUs />
      )}
    </Suspense>
  );
}

// 🤖 AI Assistant Component Integrated Inside App
function AIAssistantWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'ai', text: 'Assalam-o-Alaikum! Main SmartTools PK ka AI Assistant hoon. Aapko kis tool ya feature mein madad chahiye?' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    
    const newMessages = [...messages, { sender: 'user', text: input }];
    setMessages(newMessages);
    setInput('');

    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        { sender: 'ai', text: 'Shukriya! SmartTools PK par Image Compressor, PDF Tools, QR Generator, Case Converter aur Color Picker pehle se maujood hain. Aap upar diye gaye tools ko asani se use kar saktay hain.' }
      ]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white shadow-2xl transition hover:scale-110 hover:bg-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/30"
          title="Open AI Assistant"
        >
          <Bot size={24} />
        </button>
      )}

      {isOpen && (
        <div className="flex h-[450px] w-[340px] flex-col overflow-hidden rounded-2xl border border-slate-700 bg-[#111a2b] shadow-2xl sm:w-[380px]">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-700 bg-[#0d1526] px-4 py-3">
            <div className="flex items-center gap-2.5">
              <span className="flex h-3 w-3 rounded-full bg-cyan-400 animate-pulse" />
              <h3 className="text-sm font-bold text-white">SmartTools AI Assistant</h3>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-lg p-1 text-slate-400 hover:bg-white/5 hover:text-white"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages Body */}
          <div className="flex-1 space-y-3 overflow-y-auto p-4 text-sm">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`max-w-[85%] rounded-2xl px-4 py-2.5 leading-relaxed ${
                  msg.sender === 'user'
                    ? 'ml-auto bg-blue-600 text-white'
                    : 'mr-auto border border-slate-700 bg-[#172338] text-slate-200'
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          {/* Input Footer */}
          <div className="border-t border-slate-700 bg-[#0d1526] p-3">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Yahan sawal likhein..."
                className="h-10 flex-1 rounded-xl border border-slate-700 bg-[#111a2b] px-3 text-sm text-slate-200 outline-none placeholder:text-slate-500 focus:border-blue-400"
              />
              <button
                onClick={handleSend}
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white transition hover:bg-blue-500"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function App() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<Category>('All tools');
  const [active, setActive] = useState<ToolId>('compress');
  const [menuOpen, setMenuOpen] = useState(false);

  const filtered = useMemo(
    () =>
      directory.filter(
        (tool) =>
          (category === 'All tools' || tool.category === category) &&
          `${tool.title} ${tool.description} ${tool.category}`
            .toLowerCase()
            .includes(query.toLowerCase().trim()),
      ),
    [category, query],
  );

  function openTool(id: ToolId) {
    setActive(id);
    document
      .getElementById('workspace')
      ?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  return (
    <div className="min-h-[100dvh] bg-[#080d19] text-slate-100 relative">
      <header className="sticky top-0 z-30 border-b border-slate-800/80 bg-[#080d19]/95 backdrop-blur-md">
        <div className="mx-auto flex h-[68px] max-w-7xl items-center justify-between gap-4 px-5 lg:px-8">
          <a
            href="#"
            aria-label="SmartTools PK home"
            className="flex items-center gap-2.5"
            onClick={() => {
              setActive('compress');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#153c70] text-white">
              <span className="font-display text-sm font-extrabold tracking-tight">
                ST
              </span>
            </span>
            <span className="leading-tight">
              <span className="font-display block text-[16px] font-extrabold tracking-[-.04em] text-white">
                SmartTools <span className="text-cyan-300">PK</span>
              </span>
              <span className="hidden text-[10px] font-medium tracking-[.11em] text-slate-500 sm
