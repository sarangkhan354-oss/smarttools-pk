import { lazy, Suspense, useMemo, useState, useRef, useEffect } from 'react';
import { ArrowDownRight, ArrowRight, Check, FileImage, FileText, Image, LockKeyhole, Menu, Search, Sparkles, Type, X, Bot, Send, Palette, Calculator, CaseSensitive, Zap, ShieldCheck } from 'lucide-react';

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

// 🤖 Supercharged Interactive Smart AI Assistant Widget
function AIAssistantWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { 
      sender: 'ai', 
      text: '👋 Assalam-o-Alaikum! Main SmartTools PK ka Next-Gen AI Assistant hoon. Bataiye, aaj konsa tool use karna hai? (Image Compressor, PDF Merger, QR Code, etc.)' 
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;
    
    const userMessage = { sender: 'user', text: query };
    setMessages(prev => [...prev, userMessage]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    setTimeout(() => {
      let aiReply = "⚡ SmartTools PK ek lightning-fast aur 100% secure platform hai jo aapki files ko directly browser mein process karta hai. Mazeed kis tool ke baray mein janna chahte hain?";
      
      const lowerQuery = query.toLowerCase();
      if (lowerQuery.includes('image') || lowerQuery.includes('compress') || lowerQuery.includes('tasveer')) {
        aiReply = "🖼️ Image Compressor ko use karne ke liye upar 'Images' category select karein. Yeh bina quality drop kiye aapki image ka size light kar deta hai!";
      } else if (lowerQuery.includes('pdf') || lowerQuery.includes('merge') || lowerQuery.includes('split')) {
        aiReply = "📄 PDF Merger aur Splitter boht zabardast tools hain. 'PDF' tab par click karein aur apne documents ko second mein combine ya separate karein!";
      } else if (lowerQuery.includes('qr') || lowerQuery.includes('code')) {
        aiReply = "✨ QR Code Generator se aap kisi bhi link, text ya contact ko instant crisp QR code mein badal kar download kar saktay hain.";
      } else if (lowerQuery.includes('hello') || lowerQuery.includes('salam') || lowerQuery.includes('hi')) {
        aiReply = "Walaikum Assalam! Sarang Khan ki banayi hui is platform par aapka khair makhdam hai. Aaj kya help chahiye?";
      } else if (lowerQuery.includes('contact') || lowerQuery.includes('support')) {
        aiReply = "📞 Aap humein direct Contact Us page ke zariye ya official email par message bhej saktay hain!";
      }

      setMessages(prev => [...prev, { sender: 'ai', text: aiReply }]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-400 text-white shadow-[0_0_30px_rgba(6,182,212,0.4)] transition-all duration-300 hover:scale-110 hover:shadow-[0_0_40px_rgba(6,182,212,0.7)] focus:outline-none"
          title="Chat with Smart AI"
        >
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
            <span className="relative inline-flex h-4 w-4 rounded-full bg-cyan-500 text-[9px] font-bold items-center justify-center text-white">AI</span>
          </span>
          <Bot size={28} className="transition-transform group-hover:rotate-12" />
        </button>
      )}

      {isOpen && (
        <div className="flex h-[520px] w-[360px] flex-col overflow-hidden rounded-3xl border border-cyan-500/30 bg-[#0d1526]/95 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.7)] sm:w-[400px]">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-800 bg-gradient-to-r from-[#111a2b] to-[#152238] px-5 py-4">
            <div className="flex items-center gap-3">
              <div className="relative flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-400 text-white shadow-md">
                <Sparkles size={20} className="animate-pulse" />
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-white flex items-center gap-1.5">
                  SmartTools AI <span className="rounded bg-cyan-500/20 px-1.5 py-0.5 text-[9px] font-bold text-cyan-300 uppercase tracking-wider">Pro</span>
                </h3>
                <p className="text-[11px] text-cyan-400/80 flex items-center gap-1 font-medium">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" /> Online & Ready
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-xl p-1.5 text-slate-400 hover:bg-white/10 hover:text-white transition"
            >
              <X size={20} />
            </button>
          </div>

          {/* Quick Suggestions Chips */}
          <div className="flex gap-2 overflow-x-auto border-b border-slate-800/80 bg-[#080d19] px-4 py-2.5 scrollbar-none">
            <button 
              onClick={() => handleSend("How to compress image?")}
              className="shrink-0 rounded-full border border-slate-700/80 bg-[#131d31] px-3 py-1 text-xs font-medium text-cyan-300 hover:border-cyan-400 hover:bg-cyan-500/10 transition"
            >
              🖼️ Compress Image
            </button>
            <button 
              onClick={() => handleSend("How to merge PDFs?")}
              className="shrink-0 rounded-full border border-slate-700/80 bg-[#131d31] px-3 py-1 text-xs font-medium text-cyan-300 hover:border-cyan-400 hover:bg-cyan-500/10 transition"
            >
              📄 Merge PDFs
            </button>
            <button 
              onClick={() => handleSend("QR code maker")}
              className="shrink-0 rounded-full border border-slate-700/80 bg-[#131d31] px-3 py-1 text-xs font-medium text-cyan-300 hover:border-cyan-400 hover:bg-cyan-500/10 transition"
            >
              ✨ QR Generator
            </button>
          </div>

          {/* Messages Body */}
          <div className="flex-1 space-y-4 overflow-y-auto p-4 text-sm">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 leading-relaxed text-xs sm:text-sm shadow-sm ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-br-none shadow-blue-600/20'
                      : 'border border-slate-700/60 bg-[#152238] text-slate-200 rounded-bl-none'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-none border border-slate-700/60 bg-[#152238] px-4 py-3 text-slate-400">
                  <span className="h-2 w-2 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="h-2 w-2 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="h-2 w-2 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Footer */}
          <div className="border-t border-slate-800 bg-[#0b1220] p-3.5">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask me anything..."
                className="h-11 flex-1 rounded-2xl border border-slate-700 bg-[#111a2b] px-4 text-xs sm:text-sm text-slate-200 outline-none placeholder:text-slate-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 transition"
              />
              <button
                onClick={() => handleSend()}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-500 text-white transition hover:scale-105 shadow-md shadow-cyan-500/20"
              >
                <Send size={18} />
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
    <div className="min-h-[100dvh] bg-[#080d19] text-slate-100 relative selection:bg-cyan-500 selection:text-slate-950">
      <header className="sticky top-0 z-30 border-b border-slate-800/80 bg-[#080d19]/90 backdrop-blur-md">
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-4 px-5 lg:px-8">
          {/* Attractive New Logo Design */}
          <a
            href="#"
            aria-label="SmartTools PK home"
            className="group flex items-center gap-3 transition-transform hover:scale-[1.02]"
            onClick={() => {
              setActive('compress');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-400 p-0.5 shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition">
              <div className="flex h-full w-full items-center justify-center rounded-[14px] bg-[#0d1526]">
                <span className="font-display text-base font-black tracking-tighter bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                  ST
                </span>
              </div>
            </div>
            <div className="leading-tight">
              <span className="font-display block text-[17px] font-extrabold tracking-[-.03em] text-white">
                SmartTools <span className="text-cyan-400">PK</span>
              </span>
              <span className="flex items-center gap-1 text-[10px] font-semibold tracking-[.15em] text-slate-400 uppercase">
                <Zap size={10} className="text-amber-400 fill-amber-400" /> Pro Utility Suite
              </span>
            </div>
          </a>

          <nav className="hidden items-center gap-8 text-sm font-semibold text-slate-300 md:flex">
            <a href="#tools" className="transition hover:text-cyan-300">
              Explore tools
            </a>
            <button onClick={() => openTool('privacy-policy')} className="transition hover:text-cyan-300">
              Privacy Policy
            </button>
            <button onClick={() => openTool('contact-us')} className="transition hover:text-cyan-300">
              Contact Us
            </button>
          </nav>

          <a
            href="#tools"
            className="hidden items-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-blue-500/20 transition hover:shadow-cyan-500/40 hover:scale-105 sm:inline-flex"
          >
            Find a tool <ArrowRight size={16} />
          </a>

          <button
            aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
            onClick={() => setMenuOpen((v) => !v)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-700 bg-[#111a2b] text-slate-200 md:hidden"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {menuOpen && (
          <nav className="border-t border-slate-800 bg-[#0d1526]/95 backdrop-blur-xl px-5 py-4 md:hidden space-y-2.5 shadow-2xl">
            <a
              onClick={() => setMenuOpen(false)}
              href="#tools"
              className="block rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-200 hover:bg-white/5 transition"
            >
              Explore tools
            </a>
            <button
              onClick={() => { setMenuOpen(false); openTool('privacy-policy'); }}
              className="block w-full text-left rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-200 hover:bg-white/5 transition"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => { setMenuOpen(false); openTool('contact-us'); }}
              className="block w-full text-left rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-200 hover:bg-white/5 transition"
            >
              Contact Us
            </button>
          </nav>
        )}
      </header>

      <main>
        <section className="relative overflow-hidden border-b border-slate-800/80 bg-[#0d1526]">
          <div className="pointer-events-none absolute -right-24 -top-36 h-[450px] w-[450px] rounded-full border border-blue-400/20 blur-xl" />
          <div className="pointer-events-none absolute right-[-3rem] top-[-8rem] h-[350px] w-[350px] rounded-full border border-cyan-400/15 blur-xl" />

          <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-5 pb-16 pt-16 md:grid-cols-[1.2fr_.8fr] md:pb-24 md:pt-24 lg:px-8">
            <div className="reveal max-w-2xl">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-cyan-300 shadow-sm">
                <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
                Next-Gen Browser Utilities
              </div>

              <h1 className="font-display max-w-2xl text-[clamp(2.8rem,7vw,5.35rem)] font-extrabold leading-[.98] tracking-[-.065em] text-white">
                The tools you need.
                <br />
                <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">Nothing in the way.</span>
              </h1>

              <p className="mt-6 max-w-xl text-base leading-7 text-slate-300 md:text-lg">
                Compress an image, sort out a PDF, or get your words in shape.
                Quick, practical tools that work right here on your device securely.
              </p>

              <div className="mt-8 flex flex-col gap-3.5 sm:flex-row">
                <a
                  href="#tools"
                  className="inline-flex min-h-13 items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 px-6 text-sm font-bold text-white shadow-lg shadow-cyan-500/25 transition hover:scale-105"
                >
                  Explore all tools <ArrowDownRight size={18} />
                </a>
                <button
                  onClick={() => openTool('privacy-policy')}
                  className="inline-flex min-h-13 items-center justify-center gap-2.5 rounded-2xl border border-slate-700 bg-[#111a2b] px-5 text-sm font-semibold text-slate-200 transition hover:bg-white/5 hover:border-slate-600"
                >
                  <ShieldCheck size={18} className="text-cyan-400" />
                  Private by design
                </button>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-medium text-slate-400">
                <span className="inline-flex items-center gap-1.5">
                  <Check size={15} className="text-cyan-400" /> No account needed
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Check size={15} className="text-cyan-400" /> 100% Free to use
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Check size={15} className="text-cyan-400" /> Local browser processing
                </span>
              </div>
            </div>

            <div
              className="reveal relative mx-auto w-full max-w-[420px] md:justify-self-end"
              style={{ animationDelay: '100ms' }}
            >
              <div className="absolute -inset-5 rounded-[2.5rem] bg-gradient-to-br from-blue-500/20 via-transparent to-cyan-400/20 blur-3xl" />
              <div className="relative rounded-[1.8rem] border border-slate-700/80 bg-[#111a2b] p-6 shadow-2xl">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <span className="text-xs font-bold uppercase tracking-[.16em] text-slate-400">
                    Your everyday toolkit
                  </span>
                  <span className="rounded-full bg-cyan-400/10 px-3 py-1 text-[10px] font-extrabold text-cyan-300">
                    INSTANT ACTIVE
                  </span>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-3.5">
                  {[
                    ['Image compressor', 'Image', Image],
                    ['PDF merger', 'PDF', FileText],
                    ['Image to PDF', 'PDF', FileImage],
                    ['Word counter', 'Text', Type],
                  ].map(([title, tag, Icon], i) => {
                    const IconComponent = Icon as typeof Image;
                    return (
                      <button
                        key={String(title)}
                        onClick={() =>
                          openTool(
                            (
                              [
                                'compress',
                                'merge-pdf',
                                'image-pdf',
                                'counter',
                              ] as ToolId[]
                            )[i],
                          )
                        }
                        className="group rounded-2xl border border-slate-700/80 bg-[#162238] p-4 text-left transition hover:-translate-y-1 hover:border-cyan-400/60 hover:shadow-lg hover:shadow-cyan-500/10"
                      >
                        <span
                          className={`mb-4 flex h-10 w-10 items-center justify-center rounded-xl ${
                            i === 0
                              ? 'bg-blue-500/15 text-blue-300'
                              : i === 1
                                ? 'bg-amber-400/15 text-amber-300'
                                : i === 2
                                  ? 'bg-cyan-400/15 text-cyan-300'
                                  : 'bg-violet-400/15 text-violet-300'
                          }`}
                        >
                          <IconComponent size={20} />
                        </span>
                        <span className="block text-sm font-bold text-slate-100">
                          {String(title)}
                        </span>
                        <span className="mt-1 flex items-center justify-between text-[11px] text-slate-400">
                          <span>{String(tag)}</span>
                          <ArrowRight
                            size={13}
                            className="transition group-hover:translate-x-1 group-hover:text-cyan-300"
                          />
                        </span>
                      </button>
                    );
                  })}
                </div>

                <div className="mt-4 flex items-center gap-3 rounded-2xl bg-[#080d19] px-4 py-3">
                  <LockKeyhole size={18} className="shrink-0 text-cyan-400" />
                  <p className="text-xs leading-5 text-slate-300">
                    <strong className="font-semibold text-slate-100">
                      Files stay secure.
                    </strong>{' '}
                    Everything stays right on your device.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="tools"
          className="mx-auto max-w-7xl scroll-mt-24 px-5 py-16 md:py-24 lg:px-8"
        >
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[.18em] text-cyan-400">
                The toolbox
              </p>
              <h2 className="font-display mt-3 text-3xl font-extrabold tracking-[-.045em] text-white md:text-[2.65rem]">
                Small tasks, sorted.
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-6 text-slate-300">
                Essential tools, no learning curve. Pick a tool and get
                straight to work.
              </p>
            </div>

            <label className="relative block w-full md:max-w-[320px]">
              <span className="sr-only">Search tools</span>
              <Search
                size={18}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                data-testid="input-search-tools"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search tools…"
                className="h-12 w-full rounded-2xl border border-slate-700 bg-[#111a2b] pl-11 pr-4 text-sm text-slate-200 outline-none transition placeholder:text-slate-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20"
              />
            </label>
          </div>

          <div
            className="mt-8 flex flex-wrap gap-2.5"
            role="group"
            aria-label="Filter tools by category"
          >
            {categories.map((item) => (
              <button
                key={item}
                data-testid={`filter-${item.toLowerCase().replaceAll(' ', '-').replace('&-', '')}`}
                aria-pressed={category === item}
                onClick={() => setCategory(item)}
                className={`min-h-11 rounded-2xl border px-5 text-sm font-semibold transition ${
                  category === item
                    ? 'border-cyan-500 bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md shadow-cyan-500/20'
                    : 'border-slate-700 bg-[#111a2b] text-slate-300 hover:border-slate-600 hover:text-cyan-300'
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          {filtered.length > 0 ? (
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((tool, index) => {
                const Icon = tool.icon;
                return (
                  <button
                    key={tool.id}
                    data-testid={`card-tool-${tool.id}`}
                    onClick={() => openTool(tool.id)}
                    className={`group reveal flex min-h-[200px] flex-col rounded-3xl border bg-[#111a2b] p-6 text-left transition hover:-translate-y-1.5 hover:border-cyan-400/60 hover:shadow-xl hover:shadow-cyan-500/10 ${
                      active === tool.id
                        ? 'border-cyan-400/60 shadow-lg shadow-cyan-500/10'
                        : 'border-slate-700/80'
                    }`}
                    style={{
                      animationDelay: `${Math.min(index * 55, 220)}ms`,
                    }}
                  >
                    <div className="flex w-full items-start justify-between">
                      <span
                        className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
                          tool.accent === 'sky'
                            ? 'bg-blue-500/15 text-blue-300'
                            : tool.accent === 'teal'
                              ? 'bg-cyan-400/15 text-cyan-300'
                              : tool.accent === 'amber'
                                ? 'bg-amber-400/15 text-amber-300'
                                : tool.accent === 'violet'
                                  ? 'bg-violet-400/15 text-violet-300'
                                  : 'bg-rose-500/15 text-rose-300'
                        }`}
                      >
                        <Icon size={22} />
                      </span>
                      <span className="rounded-full bg-slate-800/80 px-3 py-1 text-[10px] font-bold uppercase tracking-[.1em] text-slate-400">
                        {tool.category}
                      </span>
                    </div>
                    <span className="mt-5 text-base font-bold text-slate-100">
                      {tool.title}
                    </span>
                    <span className="mt-1.5 text-sm leading-5 text-slate-400">
                      {tool.description}
                    </span>
                    <span className="mt-auto flex w-full items-center justify-between pt-5 text-xs font-semibold text-slate-400">
                      <span>{tool.time}</span>
                      <span className="inline-flex items-center gap-1.5 text-cyan-300 transition group-hover:gap-2">
                        Open tool <ArrowRight size={14} />
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="mt-8 rounded-3xl border border-dashed border-slate-700 bg-[#111a2b] px-6 py-16 text-center">
              <Search className="mx-auto text-slate-400" size={28} />
              <p className="mt-3 font-semibold text-slate-100">No tools found</p>
              <p className="mt-1 text-sm text-slate-400">
                Try another search or category.
              </p>
              <button
                onClick={() => {
                  setQuery('');
                  setCategory('All tools');
                }}
                className="mt-4 rounded-xl px-4 py-2 text-sm font-semibold text-cyan-300 hover:bg-white/5 transition"
              >
                Clear filters
              </button>
            </div>
          )}
        </section>

        <section
          id="workspace"
          className="scroll-mt-24 border-y border-slate-800/80 bg-[#0d1526]"
        >
          <div className="mx-auto grid max-w-7xl gap-8 px-5 py-14 md:grid-cols-[.72fr_1.28fr] md:gap-12 md:py-20 lg:px-8">
            <div className="md:pt-2">
              <p className="text-xs font-bold uppercase tracking-[.18em] text-cyan-400">
                {tools[active].eyebrow}
              </p>
              <h2 className="font-display mt-3 text-3xl font-extrabold tracking-[-.05em] text-white">
                {tools[active].title}
              </h2>
              <p className="mt-3 max-w-sm text-sm leading-6 text-slate-300">
                {tools[active].description}
              </p>
              <div className="mt-6 inline-flex items-center gap-2 rounded-xl bg-cyan-400/10 px-3.5 py-2.5 text-xs font-semibold text-cyan-200 border border-cyan-500/20">
                <LockKeyhole size={15} /> Processed locally in your browser
              </div>
            </div>

            <div className="min-w-0 rounded-3xl border border-slate-700/80 bg-[#111a2b] p-5 shadow-2xl sm:p-8">
              <ToolContent key={active} id={active} />
            </div>
          </div>
        </section>

        <section
          id="privacy"
          className="mx-auto max-w-7xl scroll-mt-20 px-5 py-16 md:py-24 lg:px-8"
        >
          <div className="grid gap-8 rounded-[2rem] bg-gradient-to-r from-blue-900/60 via-[#142f54] to-cyan-900/50 border border-cyan-500/20 px-6 py-10 text-white sm:px-9 md:grid-cols-[.9fr_1.1fr] md:items-center md:px-12 md:py-14 shadow-2xl">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                <LockKeyhole size={24} />
              </div>
              <h2 className="font-display mt-6 text-2xl font-extrabold tracking-[-.04em] md:text-4xl">
                Private by default.
                <br />
                Not by fine print.
              </h2>
            </div>

            <div>
              <p className="text-sm leading-6 text-blue-100">
                Your files are processed locally by your browser. They are not
                uploaded to a server, stored, or shared. When you leave the
                page, your work stays with you.
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/[.04] p-5 backdrop-blur-sm">
                  <Check size={18} className="text-cyan-400" />
                  <p className="mt-2 text-sm font-semibold">No file uploads</p>
                  <p className="mt-1 text-xs leading-5 text-blue-100/75">
                    Images and PDFs stay on your device.
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[.04] p-5 backdrop-blur-sm">
                  <Check size={18} className="text-cyan-400" />
                  <p className="mt-2 text-sm font-semibold">
                    No account required
                  </p>
                  <p className="mt-1 text-xs leading-5 text-blue-100/75">
                    Open a tool and get on with your day.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-800 bg-[#080d19]">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-8 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <div className="flex items-center gap-3.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-400 text-white font-black text-xs">
              ST
            </div>
            <span className="font-bold text-slate-100">SmartTools PK</span>
            <span className="text-slate-700">|</span>
            <button onClick={() => openTool('privacy-policy')} className="hover:text-cyan-300 transition">
              Privacy Policy
            </button>
            <span className="text-slate-700">|</span>
            <button onClick={() => openTool('contact-us')} className="hover:text-cyan-300 transition">
              Contact Us
            </button>
          </div>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <p>
              Built with ❤️ by <span className="font-semibold text-slate-300">Sarang Khan</span>
            </p>
          </div>
        </div>
      </footer>

      {/* Embedded Next-Gen AI Assistant Widget */}
      <AIAssistantWidget />
    </div>
  );
}

export default App;
