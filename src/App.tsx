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

type Category = 'All tools' | 'Images' | 'PDF' | 'Text & utilities';
type ToolId = 'compress' | 'image-pdf' | 'merge-pdf' | 'pdf-split' | 'qr' | 'counter' | 'case-converter' | 'percentage' | 'color-picker';

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
          Preparing this tool…
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
      ) : (
        <ColorPicker />
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
              <span className="hidden text-[10px] font-medium tracking-[.11em] text-slate-500 sm:block">
                EVERYDAY TOOLS. MADE SIMPLE.
              </span>
            </span>
          </a>

          <nav className="hidden items-center gap-8 text-sm font-semibold text-slate-300 md:flex">
            <a href="#tools" className="transition hover:text-cyan-300">
              Explore tools
            </a>
            <a href="#privacy" className="transition hover:text-cyan-300">
              Your privacy
            </a>
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
          <nav className="border-t border-slate-800 bg-[#0d1526] px-5 py-3 md:hidden">
            <a
              onClick={() => setMenuOpen(false)}
              href="#tools"
              className="block rounded-lg px-2 py-3 text-sm font-semibold text-slate-300"
            >
              Explore tools
            </a>
            <a
              onClick={() => setMenuOpen(false)}
              href="#privacy"
              className="block rounded-lg px-2 py-3 text-sm font-semibold text-slate-300"
            >
              Your privacy
            </a>
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
                <a
                  href="#privacy"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl px-4 text-sm font-semibold text-slate-200 transition hover:bg-white/5"
                >
                  <LockKeyhole size={16} className="text-cyan-300" />
                  Private by design
                </a>
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
                    </strong>{' '}
                    Work happens in this browser, on your device.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="tools"
          className="mx-auto max-w-7xl scroll-mt-24 px-5 py-14 md:py-20 lg:px-8"
        >
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[.18em] text-cyan-300">
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
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                data-testid="input-search-tools"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search tools…"
                className="h-12 w-full rounded-xl border border-slate-700 bg-[#111a2b] pl-10 pr-4 text-sm text-slate-200 outline-none transition placeholder:text-slate-500 focus:border-blue-400 focus:ring-4 focus:ring-blue-500/20"
              />
            </label>
          </div>

          <div
            className="mt-7 flex flex-wrap gap-2"
            role="group"
            aria-label="Filter tools by category"
          >
            {categories.map((item) => (
              <button
                key={item}
                data-testid={`filter-${item.toLowerCase().replaceAll(' ', '-').replace('&-', '')}`}
                aria-pressed={category === item}
                onClick={() => setCategory(item)}
                className={`min-h-10 rounded-full border px-4 text-sm font-semibold transition ${
                  category === item
                    ? 'border-blue-500 bg-blue-600 text-white'
                    : 'border-slate-700 bg-[#111a2b] text-slate-300 hover:border-slate-600 hover:text-cyan-300'
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          {filtered.length > 0 ? (
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((tool, index) => {
                const Icon = tool.icon;
                return (
                  <button
                    key={tool.id}
                    data-testid={`card-tool-${tool.id}`}
                    onClick={() => openTool(tool.id)}
                    className={`group reveal flex min-h-[190px] flex-col rounded-2xl border bg-[#111a2b] p-5 text-left transition hover:-translate-y-1 hover:border-blue-400/60 hover:shadow-[0_18px_40px_-18px_rgba(59,130,246,.35)] ${
                      active === tool.id
                        ? 'border-blue-400/50'
                        : 'border-slate-700'
                    }`}
                    style={{
                      animationDelay: `${Math.min(index * 55, 220)}ms`,
                    }}
                  >
                    <div className="flex w-full items-start justify-between">
                      <span
                        className={`flex h-11 w-11 items-center justify-center rounded-[14px] ${
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
                        <Icon size={21} />
                      </span>
                      <span className="rounded-full bg-slate-800 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[.1em] text-slate-400">
                        {tool.category}
                      </span>
                    </div>
                    <span className="mt-5 text-base font-bold text-slate-100">
                      {tool.title}
                    </span>
                    <span className="mt-1.5 text-sm leading-5 text-slate-400">
                      {tool.description}
                    </span>
                    <span className="mt-auto flex w-full items-center justify-between pt-4 text-xs font-semibold text-slate-400">
                      <span>{tool.time}</span>
                      <span className="inline-flex items-center gap-1 text-cyan-300 transition group-hover:gap-2">
                        Open tool <ArrowRight size={14} />
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="mt-6 rounded-2xl border border-dashed border-slate-700 bg-[#111a2b] px-6 py-12 text-center">
              <Search className="mx-auto text-slate-400" size={25} />
              <p className="mt-3 font-semibold text-slate-100">No tools found</p>
              <p className="mt-1 text-sm text-slate-400">
                Try another search or category.
              </p>
              <button
                onClick={() => {
                  setQuery('');
                  setCategory('All tools');
                }}
                className="mt-4 rounded-lg px-3 py-2 text-sm font-semibold text-cyan-300 hover:bg-white/5"
              >
                Clear filters
              </button>
            </div>
          )}
        </section>

        <section
          id="workspace"
          className="scroll-mt-24 border-y border-slate-800 bg-[#0d1526]"
        >
          <div className="mx-auto grid max-w-7xl gap-8 px-5 py-12 md:grid-cols-[.72fr_1.28fr] md:gap-12 md:py-16 lg:px-8">
            <div className="md:pt-2">
              <p className="text-xs font-bold uppercase tracking-[.18em] text-cyan-300">
                {tools[active].eyebrow}
              </p>
              <h2 className="font-display mt-3 text-3xl font-extrabold tracking-[-.05em] text-white">
                {tools[active].title}
              </h2>
              <p className="mt-3 max-w-sm text-sm leading-6 text-slate-300">
                {tools[active].description}
              </p>
              <div className="mt-6 inline-flex items-center gap-2 rounded-lg bg-cyan-400/10 px-3 py-2 text-xs font-semibold text-cyan-200">
                <LockKeyhole size={14} /> Processed locally in your browser
              </div>
            </div>

            <div className="min-w-0 rounded-2xl border border-slate-700 bg-[#111a2b] p-4 shadow-[0_12px_38px_-28px_rgba(22,48,78,.2)] sm:p-6">
              <ToolContent key={active} id={active} />
            </div>
          </div>
        </section>

        <section
          id="privacy"
          className="mx-auto max-w-7xl scroll-mt-20 px-5 py-14 md:py-20 lg:px-8"
        >
          <div className="grid gap-8 rounded-[1.6rem] bg-[#142f54] px-6 py-8 text-white sm:px-9 md:grid-cols-[.9fr_1.1fr] md:items-center md:px-12 md:py-12">
            <div>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-cyan-300">
                <LockKeyhole size={20} />
              </div>
              <h2 className="font-display mt-5 text-2xl font-extrabold tracking-[-.04em] md:text-3xl">
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
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-white/10 bg-white/[.06] p-4">
                  <Check size={17} className="text-cyan-300" />
                  <p className="mt-2 text-sm font-semibold">No file uploads</p>
                  <p className="mt-1 text-xs leading-5 text-blue-100/75">
                    Images and PDFs stay on your device.
                  </p>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/[.06] p-4">
                  <Check size={17} className="text-cyan-300" />
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
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-6 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <div className="flex items-center gap-2.5">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#153c70] text-[10px] font-extrabold text-white">
              ST
            </span>
            <span className="font-semibold text-slate-100">SmartTools PK</span>
            <span className="hidden text-slate-700 sm:inline">/</span>
            <span>Useful tools. Thoughtfully simple.</span>
          </div>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <p>
              Built by <span className="font-semibold text-slate-200">Sarang Khan</span>
            </p>
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/80 px-4 py-1.5 text-xs text-slate-300 shadow-sm">
              <span>Crafted with 💙 by</span>
              <span className="font-bold text-white">Sarang Khan</span>
            </div>
          </div>
        </div>
      </footer>

      {/* 🤖 Embedded Floating AI Assistant Widget */}
      <AIAssistantWidget />
    </div>
  );
}

export default App;
