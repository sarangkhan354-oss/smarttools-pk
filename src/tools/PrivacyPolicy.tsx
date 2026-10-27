import { ShieldCheck, Lock, EyeOff } from 'lucide-react';

export default function PrivacyPolicy() {
  return (
    <div className="space-y-6 text-slate-300 text-sm leading-relaxed">
      <div className="border-b border-slate-700 pb-4">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <ShieldCheck className="text-cyan-400" size={22} /> Privacy Policy
        </h3>
        <p className="text-xs text-slate-400 mt-1">
          Last updated: October 2026 — SmartTools PK
        </p>
      </div>

      <div className="space-y-4">
        <div className="rounded-xl border border-slate-800 bg-[#0d1526] p-4">
          <h4 className="font-bold text-white flex items-center gap-2 mb-2 text-base">
            <Lock size={16} className="text-cyan-300" /> Client-Side Processing (100% Private)
          </h4>
          <p>
            At <strong>SmartTools PK</strong>, we prioritize your privacy above all else. 
            All processing for tools including Image Compressor, PDF Merger, PDF Splitter, 
            QR Generator, and text utilities happens directly inside your web browser on your device.
          </p>
        </div>

        <div>
          <h4 className="font-bold text-white mb-2 text-base">1. No File Uploads or Data Storage</h4>
          <p>
            Your uploaded files, images, documents, or typed text are <strong>never uploaded to external servers</strong> or saved anywhere. Once you refresh or close the page, all your session data is automatically cleared.
          </p>
        </div>

        <div>
          <h4 className="font-bold text-white mb-2 text-base">2. Analytics & Cookies</h4>
          <p>
            We use minimal cookies or third-party analytics (such as Google Analytics) strictly to understand user traffic and improve tool performance. No personally identifiable information (PII) is tracked or sold.
          </p>
        </div>

        <div>
          <h4 className="font-bold text-white mb-2 text-base">3. Advertising</h4>
          <p>
            We may display advertisements provided by third-party ad networks (such as Google AdSense). These ad services may use cookies to serve ads based on your visit to this and other websites.
          </p>
        </div>

        <div className="rounded-xl border border-blue-500/30 bg-blue-500/10 p-4 flex items-center gap-3">
          <EyeOff size={20} className="shrink-0 text-cyan-300" />
          <p className="text-xs text-slate-200">
            SmartTools PK is designed with privacy by default. You can use all our tools freely without registering or creating an account.
          </p>
        </div>
      </div>
    </div>
  );
}
