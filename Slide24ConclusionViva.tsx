import React, { useState } from 'react';
import { MathView } from '../common/MathView.tsx';
import { VIVA_QUESTIONS } from '../../data/presentationData.ts';
import {
  Award,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Sparkles,
  CheckCircle2,
  BookOpen,
  MessageSquare,
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const Slide24ConclusionViva: React.FC = () => {
  const [expandedViva, setExpandedViva] = useState<number | null>(1);
  const [activeTab, setActiveTab] = useState<'reflection' | 'viva'>('viva');

  // Reflection questions with editable answers
  const [reflections, setReflections] = useState([
    {
      q: 'What did our team learn?',
      a: 'We discovered how abstract finite difference operators (Δ, E) convert into practical digital filters that evaluate continuous physical flight properties from sparse telemetry samples.',
    },
    {
      q: 'Why is equal spacing important?',
      a: 'Uniform grid interval h enables the shift operator expansion (1+Δ)^u without requiring divided difference denominators, drastically reducing computational complexity to O(n).',
    },
    {
      q: 'What happens when input data changes?',
      a: 'A single noisy sensor reading propagates into all subsequent difference orders with alternating binomial coefficients, demonstrating the critical need for noise filtering.',
    },
    {
      q: 'What are the limitations of the estimate?',
      a: 'Interpolation guarantees a mathematically smooth curve through known points, but cannot physically capture microclimate inversions or turbulence between sampling intervals.',
    },
    {
      q: 'How can this method be applied in ECE?',
      a: 'Directly applicable in thermocouple look-up tables (LUTs), sensor non-linearity calibration, robotics trajectory interpolation, and sparse telemetry compression in IoT nodes.',
    },
  ]);

  const toggleViva = (id: number) => {
    setExpandedViva(expandedViva === id ? null : id);
  };

  const triggerApplause = () => {
    try {
      confetti({ particleCount: 100, spread: 80, origin: { y: 0.7 } });
    } catch (e) {}
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in duration-300">
      <div className="border-b border-slate-800 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
            Project Synthesis & Defense • Slide 24
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            Conclusions, Team Reflection & Faculty Viva Q&A
          </h2>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 rounded-xl p-1 text-xs">
          <button
            onClick={() => setActiveTab('viva')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              activeTab === 'viva'
                ? 'bg-amber-500 text-navy-950 font-bold shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Faculty Viva Bank ({VIVA_QUESTIONS.length})
          </button>
          <button
            onClick={() => setActiveTab('reflection')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              activeTab === 'reflection'
                ? 'bg-cyan-500 text-navy-950 font-bold shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Experiential Reflections
          </button>
        </div>
      </div>

      {/* Synthesis Summary Pill Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
        <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
          <span className="text-[10px] font-mono text-slate-500 uppercase font-bold">1. Input</span>
          <div className="font-bold text-white">5 Drone Telemetry Nodes</div>
          <div className="text-slate-400 text-[11px]">0 to 400 m, h = 100 m</div>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
          <span className="text-[10px] font-mono text-slate-500 uppercase font-bold">2. Operator</span>
          <div className="font-bold text-cyan-300">Forward Differences</div>
          <div className="text-slate-400 text-[11px]">Constant Δ²y = +0.1 (Degree 2)</div>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
          <span className="text-[10px] font-mono text-slate-500 uppercase font-bold">3. Target</span>
          <div className="font-bold text-amber-300">x = 175 m (u = 1.75)</div>
          <div className="text-slate-400 text-[11px]">Bounded in [100 m, 200 m]</div>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-900/80 border border-emerald-500/40 space-y-1">
          <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold">4. Final Output</span>
          <div className="font-bold text-emerald-300 text-sm">T(175) ≈ 24.37 °C</div>
          <div className="text-slate-400 text-[11px]">Exact: 24.365625 °C</div>
        </div>
      </div>

      {/* Tab Content: Faculty Viva Q&A */}
      {activeTab === 'viva' && (
        <div className="bg-navy-900/80 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-3">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-amber-400" />
              Comprehensive Faculty Viva Q&A Defense Bank
            </h3>
            <span className="text-[11px] text-slate-400">
              Click any question to inspect detailed mathematical defense
            </span>
          </div>

          <div className="space-y-2.5 max-h-[50vh] overflow-y-auto pr-1">
            {VIVA_QUESTIONS.map((item) => {
              const isExpanded = expandedViva === item.id;
              return (
                <div
                  key={item.id}
                  className={`rounded-2xl border transition-all ${
                    isExpanded
                      ? 'bg-slate-950 border-amber-500/50 shadow-lg'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <button
                    onClick={() => toggleViva(item.id)}
                    className="w-full text-left p-3.5 flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="w-6 h-6 rounded-full bg-slate-800 text-amber-400 text-xs font-mono font-bold flex items-center justify-center shrink-0">
                        {item.id}
                      </span>
                      <span className="text-xs font-bold text-white">
                        {item.question}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400 hidden sm:inline">
                        {item.category}
                      </span>
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 text-amber-400" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-500" />
                      )}
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="p-4 pt-1 border-t border-slate-800/80 space-y-2 text-xs">
                      {item.formula && (
                        <div className="p-2 rounded-lg bg-navy-950 border border-slate-850 text-center font-mono">
                          <MathView block math={item.formula} className="text-xs text-cyan-300" />
                        </div>
                      )}
                      <p className="text-slate-300 leading-relaxed bg-slate-900/60 p-3 rounded-xl border border-slate-850">
                        <strong className="text-amber-400 font-semibold mr-1.5">Model Defense Answer:</strong>
                        {item.answer}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab Content: Team Reflections */}
      {activeTab === 'reflection' && (
        <div className="bg-navy-900/80 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-cyan-400" />
              Experiential Learning Questions & Discoveries
            </h3>
            <span className="text-[11px] text-slate-400">Team Insights</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {reflections.map((ref, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                <div className="text-xs font-bold text-cyan-300">{ref.q}</div>
                <p className="text-xs text-slate-300 leading-relaxed">{ref.a}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Elegant Closing Banner */}
      <div className="bg-gradient-to-r from-navy-900 via-slate-900 to-navy-900 border-2 border-cyan-500/50 rounded-3xl p-6 sm:p-8 text-center space-y-3 relative overflow-hidden">
        <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
          Thank You • Questions & Discussion?
        </h3>
        <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
          We express our sincere gratitude to our esteemed evaluators and faculty members. The interactive simulator remains live for any custom test cases.
        </p>
        <button
          onClick={triggerApplause}
          className="mt-2 px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-navy-950 font-bold text-xs shadow-lg shadow-cyan-500/25 transition-transform hover:scale-105 active:scale-95 inline-flex items-center gap-2"
        >
          <Sparkles className="w-4 h-4" />
          <span>Celebrate Presentation Completion</span>
        </button>
      </div>
    </div>
  );
};
