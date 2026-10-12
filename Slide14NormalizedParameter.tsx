import React, { useState } from 'react';
import { MathView } from '../common/MathView.tsx';
import { Compass, ArrowRight, CheckCircle2, Calculator } from 'lucide-react';

export const Slide14NormalizedParameter: React.FC = () => {
  const [customX, setCustomX] = useState<number>(175);
  const x0 = 0;
  const h = 100;
  const calculatedU = (customX - x0) / h;

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in duration-300">
      <div className="border-b border-slate-800 pb-3">
        <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
          Coordinate Normalization • Slide 14
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
          Calculate the Dimensionless Normalized Parameter (u)
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Left Column (7 Cols): Step-by-Step Substitution */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-navy-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Calculator className="w-4 h-4 text-cyan-400" />
              Parameter Formula Definition
            </h3>

            <div className="bg-slate-950/90 border border-slate-800 rounded-xl p-4 text-center">
              <MathView block math="u = \frac{x - x_0}{h}" className="text-xl text-cyan-300" />
            </div>

            <div className="space-y-2 text-xs font-mono">
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-900/60 border border-slate-800">
                <span className="text-slate-400">Target Altitude (x):</span>
                <span className="text-amber-400 font-bold">175 m</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-900/60 border border-slate-800">
                <span className="text-slate-400">Starting Node (x₀):</span>
                <span className="text-cyan-300 font-bold">0 m</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-900/60 border border-slate-800">
                <span className="text-slate-400">Constant Step Size (h):</span>
                <span className="text-cyan-300 font-bold">100 m</span>
              </div>
            </div>

            <div className="border-t border-slate-800 pt-3">
              <div className="text-[11px] text-slate-400 mb-1 font-semibold">Substitution & Evaluation:</div>
              <div className="bg-slate-950 p-3 rounded-xl border border-cyan-500/30 text-center">
                <MathView
                  block
                  math="u = \frac{175 - 0}{100} = \frac{175}{100} = \mathbf{1.75}"
                  className="text-lg text-amber-400"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (5 Cols): Interactive Parameter Explorer */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-gradient-to-br from-navy-900 to-slate-900 border border-cyan-500/40 rounded-2xl p-6 shadow-xl space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Compass className="w-4 h-4 text-amber-400" />
              Interactive u-Mapper
            </h4>

            <p className="text-xs text-slate-300 leading-relaxed">
              Test how different target altitudes map to the dimensionless coordinate <MathView math="u" />:
            </p>

            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-400">Altitude x:</span>
                <span className="text-cyan-300 font-bold">{customX} m</span>
              </div>
              <input
                type="range"
                min={0}
                max={400}
                step={5}
                value={customX}
                onChange={(e) => setCustomX(parseFloat(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-center space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-500 font-mono">Computed u</span>
              <div className="text-2xl font-black font-mono text-cyan-300">
                u = {calculatedU.toFixed(2)}
              </div>
              <span className="text-[11px] text-slate-400">
                {calculatedU < 2 ? 'Near table origin (Optimal for Forward)' : 'Deeper in table'}
              </span>
            </div>

            <div className="text-[11px] text-slate-400 italic">
              <strong>Physical Intuition:</strong> A value of <MathView math="u = 1.75" /> signifies that 175 m is exactly 1 full step (100 m) plus 0.75 of the second interval (75 m).
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
