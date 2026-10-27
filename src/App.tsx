import { lazy, Suspense, useMemo, useState, useRef, useEffect } from 'react';
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

// 🤖 Professional AI Assistant Widget
function AIAssistantWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { 
      sender: 'ai', 
      text: 'Assalam-o-Alaikum! Main SmartTools PK ka Smart AI Assistant hoon. Aapko kis tool (Image Compressor, PDF Merger, QR Generator) ya feature mein madad chahiye?' 
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
      let aiReply = "SmartTools PK par aap images compress kar saktay hain, PDFs ko merge/split kar saktay hain, aur QR codes bana saktay hain. Yeh sab aapke browser mein locally hota hai, secure tareeqay se!";
      
      const lowerQuery = query.toLowerCase();
      if (lowerQuery.includes('image') || lowerQuery.includes('compress') || lowerQuery.includes('tasveer')) {
        aiReply = "Image compressor use karne ke liye upar 'Images' category select karein aur Image Compressor tool open karein.";
      } else if (lowerQuery.includes('pdf') || lowerQuery.includes('merge') || lowerQuery.includes('split')) {
        aiReply = "Hamare paas PDF Merger aur PDF Splitter dono maujood hain. 'PDF' filter par click karke aap asani se documents combine ya split kar saktay hain.";
      } else if (lowerQuery.includes('qr') || lowerQuery.includes('code')) {
        aiReply = "QR Code generator ki madad se aap kisi bhi link ya text ko foran crisp QR code mein convert karke download kar saktay hain.";
      } else if (lowerQuery.includes('contact') || lowerQuery.includes('email') || lowerQuery.includes('whatsapp')) {
        aiReply = "Aap hum se official email (sarangkhan354@gmail.com) ya WhatsApp par rabta kar saktay hain. Contact Us page par tafseel maujood hai!";
      }

      setMessages(prev => [...prev, { sender: 'ai', text: aiReply }]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-2xl transition hover:scale-110 hover:shadow-cyan-500/25 focus:outline-none focus:ring-4 focus:ring-blue-500/30"
          title="Chat with AI Assistant"
        >
          <Bot size={26} className="animate-pulse" />
        </button>
      )}

      {isOpen && (
        <div className="flex h-[480px] w-[350px] flex-col overflow-hidden rounded-2xl border border-slate-700 bg-[#111a2b] shadow-2xl sm:w-[390px]">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-700 bg-[#0d1526] px-4 py-3.5">
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex h-3 w-3 rounded-full bg-cyan-500" />
              </span>
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                  SmartTools AI <Sparkles size={13} className="text-cyan-400" />
                </h3>
                <p className="text-[10px] text-slate-400">Powered for instant guidance</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-lg p-1 text-slate-400 hover:bg-white/5 hover:text-white transition"
            >
              <X size={18} />
            </button>
          </div>

          {/* Quick Suggestions Chips */}
          <div className="flex gap-1.5 overflow-x-auto border-b border-slate-800 bg-[#0a101f] px-3 py-2 scrollbar-none">
            <button 
              onClick={() => handleSend("How to compress image?")}
              className="shrink-0 rounded-full border border-slate-700 bg-[#141f33] px-2.5 py-1 text-[11px] text-cyan-300 hover:border-cyan-500 transition"
            >
              🖼️ Compress Image
            </button>
            <button 
              onClick={() => handleSend("How to merge PDFs?")}
              className="shrink-0 rounded-full border border-slate-700 bg-[#141f33] px-2.5 py-1 text-[11px] text-cyan-300 hover:border-cyan-500 transition"
            >
              📄 Merge PDFs
            </button>
            <button 
              onClick={() => handleSend("Contact details")}
              className="shrink-0 rounded-full border border-slate-700 bg-[#141f33] px-2.5 py-1 text-[11px] text-cyan-300 hover:border-cyan-500 transition"
            >
              📞 Contact Us
            </button>
          </div>

          {/* Messages Body */}
          <div className="flex-1 space-y-3.5 overflow-y-auto p-4 text-sm">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 leading-relaxed text-xs sm:text-sm ${
                    msg.sender === 'user'
                      ? 'bg-blue-600 text-white rounded-br-none'
                      : 'border border-slate-700/80 bg-[#172338] text-slate-200 rounded-bl-none shadow-sm'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-none border border-slate-700/80 bg-[#172338] px-4 py-3 text-slate-400">
                  <span className="h-2 w-2 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="h-2 w-2 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="h-2 w-2 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Footer */}
          <div className="border-t border-slate-700 bg-[#0d1526] p-3">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Yahan sawal poochein..."
                className="h-10 flex-1 rounded-xl border border-slate-700 bg-[#111a2b] px-3 text-xs sm:text-sm text-slate-200 outline-none placeholder:text-slate-500 focus:border-cyan-400 transition"
              />
              <button
                onClick={() => handleSend()}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white transition hover:bg-blue-500 shadow-md"
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
              <span className="hidden text-[10px] font-medium tracking-[.11em] text-slate-500 sm:block">
                EVERYDAY TOOLS. MADE SIMPLE.
              </span>
            </span>
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
            className="hidden items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-500 sm:inline-flex"
          >
            Find a tool <ArrowRight size={15} />
          </a>

          <button
            aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
            onClick={() => setMenuOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-700 text-slate-200 md:hidden"
          >
            {menuOpen ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>

        {menuOpen && (
          <nav className="border-t border-slate-800 bg-[#0d1526] px-5 py-3 md:hidden space-y-2">
            <a
              onClick={() => setMenuOpen(false)}
              href="#tools"
              className="block rounded-lg px-2 py-2 text-sm font-semibold text-slate-300"
            >
              Explore tools
            </a>
            <button
              onClick={() => { setMenuOpen(false); openTool('privacy-policy'); }}
              className="block w-full text-left rounded-lg px-2 py-2 text-sm font-semibold text-slate-300"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => { setMenuOpen(false); openTool('contact-us'); }}
              className="block w-full text-left rounded-lg px-2 py-2 text-sm font-semibold text-slate-300"
            >
              Contact Us
            </button>
          </nav>
        )}
      </header>

      <main>
        <section className="relative overflow-hidden border-b border-slate-800 bg-[#0d1526]">
          <div className="pointer-events-none absolute -right-24 -top-36 h-[450px] w-[450px] rounded-full border border-blue-400/20" />
          <div className="pointer-events-none absolute right-[-3rem] top-[-8rem] h-[350px] w-[350px] rounded-full border border-cyan-400/15" />

          <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-5 pb-14 pt-14 md:grid-cols-[1.2fr_.8fr] md:pb-20 md:pt-20 lg:px-8 lg:pt-24">
            <div className="reveal max-w-2xl">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-3 py-1.5 text-xs font-semibold tracking-wide text-blue-200">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                A little less digital busywork
              </div>

              <h1 className="font-display max-w-2xl text-[clamp(2.8rem,7vw,5.35rem)] font-extrabold leading-[.99] tracking-[-.065em] text-white">
                The tools you need.
                <br />
                <span className="text-cyan-300">Nothing in the way.</span>
              </h1>

              <p className="mt-6 max-w-xl text-base leading-7 text-slate-300 md:text-lg">
                Compress an image, sort out a PDF, or get your words in shape.
                Quick, practical tools that work right here on your device.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#tools"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 text-sm font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-blue-500"
                >
                  Explore all tools <ArrowDownRight size={17} />
                </a>
                <button
                  onClick={() => openTool('privacy-policy')}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl px-4 text-sm font-semibold text-slate-200 transition hover:bg-white/5"
                >
                  <LockKeyhole size={16} className="text-cyan-300" />
                  Private by design
                </button>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-medium text-slate-400">
                <span className="inline-flex items-center gap-1.5">
                  <Check size={14} className="text-cyan-300" /> No account
                  needed
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Check size={14} className="text-cyan-300" /> Free to use
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Check size={14} className="text-cyan-300" /> Files stay on
                  your device
                </span>
              </div>
            </div>

            <div
              className="reveal relative mx-auto w-full max-w-[410px] md:justify-self-end"
              style={{ animationDelay: '100ms' }}
            >
              <div className="absolute -inset-5 rounded-[2.5rem] bg-gradient-to-br from-blue-500/25 via-transparent to-cyan-400/15 blur-2xl" />
              <div className="relative rounded-[1.6rem] border border-slate-700 bg-[#111a2b] p-5 shadow-[0_24px_70px_-34px_rgba(20,55,95,.25)] sm:p-6">
                <div className="flex items-center justify-between border-b border-slate-700 pb-4">
                  <span className="text-xs font-bold uppercase tracking-[.16em] text-slate-400">
                    Your everyday toolkit
                  </span>
                  <span className="rounded-full bg-cyan-400/10 px-2.5 py-1 text-[10px] font-bold text-cyan-300">
                    ON DEVICE
                  </span>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-3">
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
                        className="group rounded-2xl border border-slate-700 bg-[#172338] p-4 text-left transition hover:-translate-y-1 hover:border-blue-400/60 hover:shadow-[0_12px_30px_-12px_rgba(59,130,246,.35)]"
                      >
                        <span
                          className={`mb-5 flex h-10 w-10 items-center justify-center rounded-xl ${
                            i === 0
                              ? 'bg-blue-500/15 text-blue-300'
                              : i === 1
                                ? 'bg-amber-400/15 text-amber-300'
                                : i === 2
                                  ? 'bg-cyan-400/15 text-cyan-300'
                                  : 'bg-violet-400/15 text-violet-300'
                          }`}
                        >
                          <IconComponent size={19} />
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

                <div className="mt-4 flex items-center gap-3 rounded-xl bg-[#0b1220] px-3.5 py-3">
                  <LockKeyhole size={17} className="shrink-0 text-cyan-400" />
                  <p className="text-xs leading-5 text-slate-300">
                    <strong className="font-semibold text-slate-100">
                      Your files stay yours.
