import React from 'react';
import { X, UserCheck, MessageSquareQuote, HelpCircle, ChevronRight, Mic } from 'lucide-react';
import { SPEAKER_NOTES, SLIDES_METADATA } from '../../data/presentationData.ts';

interface SpeakerNotesModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentSlide: number;
}

export const SpeakerNotesModal: React.FC<SpeakerNotesModalProps> = ({
  isOpen,
  onClose,
  currentSlide,
}) => {
  if (!isOpen) return null;

  const notes = SPEAKER_NOTES[currentSlide] || {
    slideNumber: currentSlide,
    assignedMember: 'Team Member',
    usn: 'ECE Department',
    keyPoints: ['Present mathematical concept clearly', 'Refer to slide equations and visual cues'],
    transitionCue: 'Transition to the next slide smoothly.',
    potentialFacultyQuestions: [],
  };

  const meta = SLIDES_METADATA.find((s) => s.id === currentSlide);

  return (
    <div className="fixed bottom-14 right-4 z-50 w-full max-w-lg bg-navy-950/95 border border-cyan-500/40 rounded-2xl shadow-2xl backdrop-blur-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
      {/* Header */}
      <div className="bg-gradient-to-r from-navy-900 to-navy-850 p-3.5 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-400">
            <Mic className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-white flex items-center gap-2">
              Presenter Notes & Viva Prep
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-cyan-900 text-cyan-300">
                Slide {currentSlide.toString().padStart(2, '0')}
              </span>
            </div>
            <div className="text-[11px] text-slate-400 truncate max-w-xs">{meta?.title}</div>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="p-4 space-y-4 max-h-[70vh] overflow-y-auto">
        {/* Presenter Assignment Badge */}
        <div className="bg-slate-900/80 border border-slate-800 p-3 rounded-xl flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-cyan-950 border border-cyan-500/50 flex items-center justify-center text-cyan-300 font-bold text-xs">
              {notes.assignedMember.charAt(0)}
            </div>
            <div>
              <div className="text-xs font-bold text-cyan-300">{notes.assignedMember}</div>
              <div className="text-[10px] text-slate-400 font-mono">USN: {notes.usn}</div>
            </div>
          </div>
          <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-800">
            Active Presenter
          </span>
        </div>

        {/* Key Talking Points */}
        <div>
          <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <MessageSquareQuote className="w-3.5 h-3.5 text-cyan-400" />
            Key Speaking Points
          </h4>
          <ul className="space-y-1.5 text-xs text-slate-300">
            {notes.keyPoints.map((point, idx) => (
              <li key={idx} className="flex items-start gap-2 bg-navy-900/40 p-2 rounded-lg border border-slate-850">
                <span className="text-cyan-400 font-bold font-mono text-[11px] mt-0.5">•</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Transition Cue */}
        <div className="bg-amber-950/20 border border-amber-800/40 rounded-xl p-3">
          <div className="text-[11px] font-bold text-amber-400 mb-1 flex items-center gap-1">
            <ChevronRight className="w-3.5 h-3.5" />
            Transition Cue to Next Slide:
          </div>
          <p className="text-xs text-slate-300 italic">"{notes.transitionCue}"</p>
        </div>

        {/* Anticipated Faculty Questions */}
        {notes.potentialFacultyQuestions && notes.potentialFacultyQuestions.length > 0 && (
          <div>
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
              Anticipated Faculty Viva Question
            </h4>
            <div className="space-y-2">
              {notes.potentialFacultyQuestions.map((q, idx) => (
                <div key={idx} className="bg-slate-900/80 border border-slate-800 rounded-xl p-3">
                  <div className="text-xs font-semibold text-cyan-300 mb-1.5">Q: {q.question}</div>
                  <div className="text-xs text-slate-300 bg-navy-950/60 p-2.5 rounded-lg border border-slate-850">
                    <span className="text-amber-400 font-medium mr-1.5">Model Answer:</span>
                    {q.answer}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
