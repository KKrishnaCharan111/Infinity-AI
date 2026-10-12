import React from 'react';
import { X, CheckCircle, ChevronRight, Sliders } from 'lucide-react';
import { SLIDES_METADATA, DEFAULT_TEAM_MEMBERS } from '../../data/presentationData.ts';

interface SlideDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  currentSlide: number;
  onSelectSlide: (slideNum: number) => void;
}

export const SlideDrawer: React.FC<SlideDrawerProps> = ({
  isOpen,
  onClose,
  currentSlide,
  onSelectSlide,
}) => {
  if (!isOpen) return null;

  const getMemberName = (speakerId: string) => {
    const member = DEFAULT_TEAM_MEMBERS.find((m) => m.id === speakerId);
    return member ? member.name : speakerId;
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm transition-opacity">
      <div className="w-full max-w-md bg-navy-950 border-l border-slate-800 h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-300">
        {/* Drawer Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-navy-900/60">
          <div>
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <span>Presentation Overview</span>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800">
                24 Slides
              </span>
            </h2>
            <p className="text-xs text-slate-400">Click any slide to jump directly</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Slides List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {SLIDES_METADATA.map((slide) => {
            const isCurrent = slide.id === currentSlide;
            const isPassed = slide.id < currentSlide;
            const speakerName = getMemberName(slide.speakerId);

            return (
              <button
                key={slide.id}
                onClick={() => {
                  onSelectSlide(slide.id);
                  onClose();
                }}
                className={`w-full text-left p-3 rounded-xl border transition-all flex items-start gap-3 group ${
                  isCurrent
                    ? 'bg-cyan-950/40 border-cyan-500/80 shadow-md shadow-cyan-950/50'
                    : 'bg-navy-900/40 border-slate-800/80 hover:bg-slate-800/50 hover:border-slate-700'
                }`}
              >
                {/* Slide Number Badge */}
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center font-mono text-xs font-bold shrink-0 transition-colors ${
                    isCurrent
                      ? 'bg-cyan-500 text-navy-950 font-black'
                      : isPassed
                      ? 'bg-slate-800 text-slate-400'
                      : 'bg-slate-900 text-slate-500'
                  }`}
                >
                  {slide.id.toString().padStart(2, '0')}
                </div>

                {/* Slide Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span
                      className={`text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.2 rounded ${
                        isCurrent
                          ? 'bg-cyan-900/80 text-cyan-300'
                          : 'bg-slate-800/80 text-slate-400'
                      }`}
                    >
                      {slide.category}
                    </span>
                    {slide.id === 22 && (
                      <span className="text-[10px] font-semibold text-amber-400 flex items-center gap-1">
                        <Sliders className="w-3 h-3" /> Live Simulator
                      </span>
                    )}
                  </div>

                  <h3
                    className={`text-xs font-semibold truncate ${
                      isCurrent ? 'text-white' : 'text-slate-300 group-hover:text-white'
                    }`}
                  >
                    {slide.title}
                  </h3>

                  <p className="text-[10px] text-slate-400 mt-1 truncate">
                    Presenter: <span className="text-slate-300">{speakerName}</span>
                  </p>
                </div>

                <ChevronRight
                  className={`w-4 h-4 mt-2 shrink-0 transition-transform ${
                    isCurrent ? 'text-cyan-400 translate-x-1' : 'text-slate-600 group-hover:text-slate-400'
                  }`}
                />
              </button>
            );
          })}
        </div>

        {/* Footer shortcuts */}
        <div className="p-3 border-t border-slate-800 bg-navy-900/60 flex items-center justify-between text-xs">
          <button
            onClick={() => {
              onSelectSlide(1);
              onClose();
            }}
            className="text-cyan-400 hover:underline"
          >
            Jump to Start (Slide 01)
          </button>
          <button
            onClick={() => {
              onSelectSlide(22);
              onClose();
            }}
            className="text-amber-400 hover:underline font-semibold"
          >
            Jump to Simulator (Slide 22)
          </button>
        </div>
      </div>
    </div>
  );
};
