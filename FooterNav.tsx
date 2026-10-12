import React from 'react';
import { ArrowLeft, ArrowRight, RotateCcw, List, CheckCircle2 } from 'lucide-react';

interface FooterNavProps {
  currentSlide: number;
  totalSlides: number;
  onPrev: () => void;
  onNext: () => void;
  onResetToStart: () => void;
  onToggleDrawer: () => void;
}

export const FooterNav: React.FC<FooterNavProps> = ({
  currentSlide,
  totalSlides,
  onPrev,
  onNext,
  onResetToStart,
  onToggleDrawer,
}) => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 z-30 bg-navy-950/90 backdrop-blur-md border-t border-slate-800/80 px-4 py-2.5 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        {/* Left: Quick Jump to start & TOC */}
        <div className="flex items-center gap-2">
          <button
            onClick={onResetToStart}
            disabled={currentSlide === 1}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-navy-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white text-xs disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            title="Return to Slide 1"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">First Slide</span>
          </button>

          <button
            onClick={onToggleDrawer}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-navy-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white text-xs transition-colors"
            title="Browse all 24 slides"
          >
            <List className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">All Slides</span>
          </button>
        </div>

        {/* Center: Slide dots / mini navigator for quick visual feedback */}
        <div className="hidden md:flex items-center gap-1 max-w-md overflow-x-auto py-1">
          {Array.from({ length: totalSlides }, (_, i) => i + 1).map((slideNum) => (
            <button
              key={slideNum}
              onClick={() => {
                if (slideNum !== currentSlide) {
                  window.dispatchEvent(new CustomEvent('jump-slide', { detail: slideNum }));
                }
              }}
              title={`Slide ${slideNum}`}
              className={`h-2 transition-all rounded-full ${
                slideNum === currentSlide
                  ? 'w-6 bg-cyan-400 shadow-sm shadow-cyan-400/50'
                  : slideNum < currentSlide
                  ? 'w-2 bg-slate-600 hover:bg-slate-400'
                  : 'w-2 bg-slate-800 hover:bg-slate-700'
              }`}
            />
          ))}
        </div>

        {/* Right: Main Prev / Next Presentation Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={onPrev}
            disabled={currentSlide === 1}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-slate-200 text-xs font-semibold disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-sm active:scale-95"
            title="Previous Slide (Keyboard Left Arrow)"
          >
            <ArrowLeft className="w-4 h-4 text-cyan-400" />
            <span>Prev</span>
            <span className="hidden sm:inline text-[10px] text-slate-500 font-mono bg-slate-800 px-1.5 py-0.5 rounded">
              ←
            </span>
          </button>

          <button
            onClick={onNext}
            disabled={currentSlide === totalSlides}
            className="flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-navy-950 font-bold text-xs disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-md shadow-cyan-500/25 active:scale-95"
            title="Next Slide (Keyboard Right Arrow or Space)"
          >
            <span>{currentSlide === totalSlides ? 'Finished' : 'Next'}</span>
            <ArrowRight className="w-4 h-4" />
            <span className="hidden sm:inline text-[10px] text-navy-900/80 font-mono bg-cyan-300/40 px-1.5 py-0.5 rounded">
              →
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
};
