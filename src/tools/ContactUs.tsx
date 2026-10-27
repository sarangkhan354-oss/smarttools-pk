import { useState } from 'react';
import { Mail, Send, CheckCircle, Phone } from 'lucide-react';

export default function ContactUs() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
  };

  return (
    <div className="space-y-6 text-slate-300 text-sm">
      <div className="border-b border-slate-700 pb-4">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <Mail className="text-cyan-400" size={22} /> Contact Us
        </h3>
        <p className="text-xs text-slate-400 mt-1">
          Have a question, feedback, or tool suggestion? Get in touch with us!
        </p>
      </div>

      {/* Direct Contact Info Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="rounded-xl border border-slate-800 bg-[#0d1526] p-4 flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-cyan-300">
            <Mail size={18} />
          </div>
          <div>
            <span className="block text-xs text-slate-400">Direct Email</span>
            <a href="mailto:sarangkhan354@gmail.com" className="font-bold text-white hover:text-cyan-300 text-xs sm:text-sm">
              sarangkhan354@gmail.com
            </a>
          </div>
        </div>

        <div className="rounded-xl border border-slate-800 bg-[#0d1526] p-4 flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-300">
            <Phone size={18} />
          </div>
          <div>
            <span className="block text-xs text-slate-400">WhatsApp / Phone</span>
            <a href="https://wa.me/923180397651" target="_blank" rel="noreferrer" className="font-bold text-white hover:text-emerald-300 text-xs sm:text-sm">
              0318 0397651
            </a>
          </div>
        </div>
      </div>

      {submitted ? (
        <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-6 text-center space-y-3">
          <CheckCircle size={40} className="mx-auto text-emerald-400" />
          <h4 className="text-lg font-bold text-white">Message Sent Successfully!</h4>
          <p className="text-xs text-slate-300">
            Thank you for reaching out to SmartTools PK. We will respond to your query shortly.
          </p>
          <button
            onClick={() => {
              setSubmitted(false);
              setFormData({ name: '', email: '', message: '' });
            }}
            className="mt-2 rounded-lg bg-emerald-600 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-500 transition"
          >
            Send Another Message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 rounded-xl border border-slate-800 bg-[#0d1526] p-5">
          <h4 className="font-bold text-white text-sm mb-3">Send us a direct message</h4>
          <div>
            <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Your Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Sarang Khan"
              className="w-full rounded-xl border border-slate-700 bg-[#111a2b] p-3 text-white outline-none focus:border-blue-400 placeholder:text-slate-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Your Email</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="name@example.com"
              className="w-full rounded-xl border border-slate-700 bg-[#111a2b] p-3 text-white outline-none focus:border-blue-400 placeholder:text-slate-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Message</label>
            <textarea
              required
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="How can we help you or what new tool would you like to see?"
              className="w-full rounded-xl border border-slate-700 bg-[#111a2b] p-3 text-white outline-none focus:border-blue-400 placeholder:text-slate-500"
            />
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 text-sm font-bold text-white transition hover:bg-blue-500 shadow-lg"
          >
            <Send size={16} /> Send Message
          </button>
        </form>
      )}
    </div>
  );
}
