import { createPortal } from "react-dom";
import { useEffect, useState } from "react";

const TemplateModal = ({ onClose, onSelect }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[10000] flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative z-[10001] w-full max-w-5xl rounded-3xl glass-card hero-gradient">

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 text-slate-400 hover:text-[var(--accent-color)] transition"
        >
          ✕
        </button>

        {/* Header */}
        <div className="pt-12 text-center px-6">
          <h1 className="text-3xl font-bold glow-text text-gradient">
            Choose your starting point
          </h1>
          <p className="mt-3 text-sm text-slate-500 dark:text-slate-300">
            Pick a style that best represents your professional brand.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-10">
          {/* MODERN */}
          <div className="glass-card rounded-2xl p-6 flex flex-col">
            <span className="inline-block mb-3 w-fit rounded-full bg-[var(--accent-soft)] px-3 py-1 text-xs font-semibold text-[var(--accent-color)]">
              Creative & Tech
            </span>

            <h3 className="text-lg font-bold mb-3">
              Modern Template
            </h3>

            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300 flex-1">
              <li>✔ Dynamic multi-column layout</li>
              <li>✔ Bold aesthetic headings</li>
              <li>✔ Contemporary styling & accents</li>
            </ul>

            <button
              onClick={() => onSelect("modern")}
              className="mt-6 w-full rounded-xl bg-[var(--accent-color)] py-3 font-semibold text-white hover:opacity-90 transition"
            >
              Select Modern →
            </button>
          </div>

          {/* CLASSIC */}
          <div className="glass-card rounded-2xl p-6 flex flex-col">
            <span className="inline-block mb-3 w-fit rounded-full bg-[var(--accent-soft)] px-3 py-1 text-xs font-semibold text-[var(--accent-color)]">
              Finance & Law
            </span>

            <h3 className="text-lg font-bold mb-3">
              Classic Template
            </h3>

            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300 flex-1">
              <li>✔ 100% ATS-friendly structure</li>
              <li>✔ Traditional professional hierarchy</li>
              <li>✔ Conservative & elegant typography</li>
            </ul>

            <button
              onClick={() => onSelect("classic")}
              className="mt-6 w-full rounded-xl bg-[var(--accent-color)] py-3 font-semibold text-white hover:opacity-90 transition"
            >
              Select Classic →
            </button>
          </div>
        </div>

        {/* Footer */}
        <p className="pb-8 text-center text-xs text-slate-500 dark:text-slate-400">
          Don&apos;t worry, you can change your template at any time in the editor.
        </p>
      </div>
    </div>,
    document.body
  );
};

export default TemplateModal;
