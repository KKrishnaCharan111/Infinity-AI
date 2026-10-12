import React, { useState } from 'react';
import { MathView } from '../common/MathView.tsx';
import { Sparkles, CheckCircle2, TrendingUp, HelpCircle } from 'lucide-react';

export const Slide11SecondDifferences: React.FC = () => {
  const [activeDiff, setActiveDiff] = useState<number>(0);

  const secondDiffs = [
    {
      label: 'Δ²y₀',
      calcLatex: '\\Delta^2 y_0 = \\Delta y_1 - \\Delta y_0 = -2.3 - (-2.4) = +0.1^\\circ\\text{C}',
      terms: '-2.3 - (-2.4)',
      result: '+0.1',
    },
    {
      label: 'Δ²y₁',
      calcLatex: '\\Delta^2 y_1 = \\Delta y_2 - \\Delta y_1 = -2.2 - (-2.3) = +0.1^\\circ\\text{C}',
      terms: '-2.2 - (-2.3)',
      result: '+0.1',
    },
    {
      label: 'Δ²y₂',
      calcLatex: '\\Delta^2 y_2 = \\Delta y_3 - \\Delta y_2 = -2.1 - (-2.2) = +0.1^\\circ\\text{C}',
      terms: '-2.1 - (-2.2)',
      result: '+0.1',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in duration-300">
      <div className="border-b border-slate-800 pb-3">
        <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
          Second-Order Differences • Slide 11
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
          Second Forward Differences: <MathView math="\Delta^2 y_i = \Delta y_{i+1} - \Delta y_i" />
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Revealing the constant quadratic curvature of the atmospheric temperature profile.
        </p>
      </div>

      {/* 3 Interactive Second Difference Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {secondDiffs.map((diff, idx) => (
          <div
            key={idx}
            onClick={() => setActiveDiff(idx)}
            className={`p-5 rounded-2xl border transition-all cursor-pointer ${
              activeDiff === idx
                ? 'bg-amber-950/30 border-amber-400 shadow-xl ring-2 ring-amber-500/50'
                : 'bg-navy-900/50 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono font-bold text-cyan-300 px-2 py-0.5 rounded bg-slate-900 border border-slate-800">
                {diff.label}
              </span>
              <span className="text-sm font-mono font-black text-amber-400">
                = {diff.result} °C
              </span>
            </div>

            <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-850 text-center font-mono my-2">
              <MathView block math={diff.calcLatex} className="text-xs" />
            </div>

            <p className="text-[11px] text-slate-400 mt-2">
              Rate of lapse acceleration across node pair {idx} and {idx + 1}.
            </p>
          </div>
        ))}
      </div>

      {/* Theoretical Revelation Box */}
      <div className="bg-gradient-to-r from-navy-900 via-slate-900 to-navy-900 border border-cyan-500/40 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex items-center gap-2 text-cyan-300 font-bold text-sm uppercase tracking-wider">
          <Sparkles className="w-5 h-5 text-amber-400" />
          The Fundamental Theorem of Finite Differences
        </div>

        <blockquote className="text-sm sm:text-base text-slate-200 font-medium leading-relaxed pl-4 border-l-4 border-amber-400 italic">
          “If the <MathView math="n" />-th forward differences of a tabulated function are strictly constant, then the function is an <MathView math="n" />-th degree polynomial, and all higher differences (<MathView math="n+1" /> and above) vanish identically to zero.”
        </blockquote>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
            <div className="font-bold text-emerald-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              Degree 2 (Quadratic) Consequence
            </div>
            <p className="text-slate-300">
              Because <MathView math="\Delta^2 y_i = +0.1" /> is strictly constant for all rows, the drone's temperature follows an exact parabola: <MathView math="T(x) = ax^2 + bx + c" />.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
            <div className="font-bold text-cyan-400 flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4" />
              Vanishing Higher Differences
            </div>
            <p className="text-slate-300">
              Third differences: <MathView math="\Delta^3 y = 0.1 - 0.1 = 0" />.<br />
              Fourth differences: <MathView math="\Delta^4 y = 0 - 0 = 0" />.<br />
              The Gregory-Newton series terminates cleanly at order 2!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
