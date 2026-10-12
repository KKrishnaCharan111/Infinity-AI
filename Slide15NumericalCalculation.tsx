import React, { useState } from 'react';
import { MathView } from '../common/MathView.tsx';
import { Sparkles, Calculator, CheckCircle2, ChevronRight, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';

export const Slide15NumericalCalculation: React.FC = () => {
  const [activeStage, setActiveStage] = useState<number>(3); // reveal all by default, can step through

  const terms = [
    {
      step: 1,
      label: 'Term 0: Base Surface Reading (y₀)',
      formula: 'y_0 = 28.5',
      val: 28.5,
      running: 28.5,
      desc: 'Ground temperature baseline.',
      color: 'border-cyan-500/50 bg-cyan-950/20 text-cyan-300',
    },
    {
      step: 2,
      label: 'Term 1: Linear Tangent Drop (u · Δy₀)',
      formula: '1.75 \\times (-2.4) = -4.2',
      val: -4.2,
      running: 24.3,
      desc: 'First-order lapse drop across 175 m.',
      color: 'border-sky-500/50 bg-sky-950/20 text-sky-300',
    },
    {
      step: 3,
      label: 'Term 2: Quadratic Curvature Correction',
      formula: '\\frac{1.75(1.75-1)}{2}(0.1) = \\frac{1.3125}{2}(0.1) = +0.065625',
      val: 0.065625,
      running: 24.365625,
      desc: 'Convex curvature correction for lapse deceleration.',
      color: 'border-amber-500/50 bg-amber-950/20 text-amber-300',
    },
    {
      step: 4,
      label: 'Term 3+: Vanishing Higher Terms',
      formula: '\\frac{u(u-1)(u-2)}{6}(0) = 0',
      val: 0,
      running: 24.365625,
      desc: 'Third differences are zero, so series truncates exactly.',
      color: 'border-purple-500/50 bg-purple-950/20 text-purple-300',
    },
  ];

  const handleNextStep = () => {
    if (activeStage < 3) {
      setActiveStage(activeStage + 1);
      if (activeStage === 2) {
        try {
          confetti({ particleCount: 40, spread: 50 });
        } catch (e) {}
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in duration-300">
      <div className="border-b border-slate-800 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
            Numerical Evaluation • Slide 15
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            Step-by-Step Numerical Calculation: T(175 m)
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleNextStep}
            disabled={activeStage >= 3}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-navy-950 font-bold text-xs disabled:opacity-40 transition-colors"
          >
            <span>Next Operation</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setActiveStage(0)}
            className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
            title="Reset step animation"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Calculation Progression */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (7 Cols): Step Accumulator */}
        <div className="lg:col-span-7 space-y-3">
          {terms.map((t, idx) => {
            const isVisible = idx <= activeStage;
            return (
              <div
                key={t.step}
                className={`p-4 rounded-2xl border transition-all ${t.color} ${
                  isVisible ? 'opacity-100 scale-100' : 'opacity-25 scale-95 pointer-events-none'
                }`}
              >
                <div className="flex items-center justify-between mb-1 text-xs">
                  <span className="font-bold">{t.label}</span>
                  <span className="font-mono font-bold text-amber-300">
                    {t.val >= 0 ? `+${t.val}` : t.val} °C
                  </span>
                </div>

                <div className="bg-slate-950/70 p-2.5 rounded-xl border border-slate-800/80 my-2 text-center">
                  <MathView block math={t.formula} className="text-xs" />
                </div>

                <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-1 border-t border-slate-800/60">
                  <span>{t.desc}</span>
                  <span className="text-cyan-300 font-bold">
                    Running Total: {t.running.toFixed(6)} °C
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column (5 Cols): Final Golden Box */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-gradient-to-br from-navy-900 via-navy-850 to-slate-900 border-2 border-amber-400/80 rounded-3xl p-6 shadow-2xl space-y-4 text-center">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-mono font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              FINAL COMPUTED RESULT
            </div>

            <div className="space-y-1">
              <div className="text-xs text-slate-400 uppercase font-mono">
                Exact Theoretical Result (6 Decimals):
              </div>
              <div className="text-2xl sm:text-3xl font-black font-mono text-white">
                <MathView block math="T(175) = \mathbf{24.365625^\circ C}" />
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
              <div className="text-xs text-slate-400 font-mono">Standard Engineering Rounding:</div>
              <div className="text-2xl font-extrabold text-amber-400 font-mono">
                <MathView block math="T(175) \approx \mathbf{24.37^\circ C}" />
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed text-left">
              The drone’s thermal environment at 175 m is accurately predicted as <strong>24.37 °C</strong>. Notice that the quadratic correction (+0.0656 °C) adds a noticeable adjustment beyond pure linear interpolation (24.30 °C).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
