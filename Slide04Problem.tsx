import React, { useState } from 'react';
import { Target, CheckCircle2, AlertOctagon, HelpCircle, Layers, ArrowRight } from 'lucide-react';
import { MathView } from '../common/MathView.tsx';

interface Slide04ProblemProps {
  onNext: () => void;
}

export const Slide04Problem: React.FC<Slide04ProblemProps> = ({ onNext }) => {
  const [highlightBracket, setHighlightBracket] = useState<boolean>(true);

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in duration-300">
      <div className="border-b border-slate-800 pb-3">
        <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
          Problem Formulation • Slide 04
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
          Formal Engineering Problem Statement
        </h2>
      </div>

      {/* Prominent Mission Statement Banner */}
      <div className="bg-gradient-to-r from-navy-900 via-navy-850 to-slate-900 border-2 border-cyan-500/60 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-start gap-4">
          <div className="p-3 rounded-2xl bg-cyan-500/20 text-cyan-400 shrink-0 border border-cyan-400/40">
            <Target className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <span className="text-[11px] font-mono uppercase tracking-wider text-amber-400 font-bold">
              Core Experiential Challenge
            </span>
            <blockquote className="text-lg sm:text-2xl font-bold text-white tracking-wide leading-snug">
              “Estimate the ambient temperature at an altitude of{' '}
              <span className="text-amber-400 underline decoration-cyan-400 decoration-2 underline-offset-4">
                175 m
              </span>{' '}
              using Newton–Gregory forward interpolation.”
            </blockquote>
            <p className="text-xs text-slate-400">
              Derive the polynomial model, construct the difference tableau, calculate normalized parameter <MathView math="u" />, and verify physical plausibility.
            </p>
          </div>
        </div>
      </div>

      {/* Animated Altitude Bracket Strip (0m ... 100m ... [175m Target] ... 200m ... 300m ... 400m) */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-3">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
          <span>Spatial Placement of the Target Altitude:</span>
          <span className="font-mono text-amber-400">Bracket: [100 m, 200 m]</span>
        </div>

        <div className="relative pt-6 pb-4">
          {/* Main axis track */}
          <div className="h-2 bg-slate-800 rounded-full relative overflow-visible">
            {/* Highlighted Bracket Range [100, 200] */}
            <div
              className={`absolute top-0 bottom-0 left-[25%] right-[50%] rounded-full transition-all duration-500 ${
                highlightBracket
                  ? 'bg-gradient-to-r from-cyan-500 to-amber-500 shadow-[0_0_15px_rgba(6,182,212,0.6)]'
                  : 'bg-slate-700'
              }`}
            />

            {/* Target 175 Marker (175/400 = 43.75%) */}
            <div className="absolute top-1/2 left-[43.75%] -translate-x-1/2 -translate-y-1/2 z-20 group">
              <div className="w-6 h-6 rounded-full bg-amber-400 border-2 border-white shadow-lg animate-bounce flex items-center justify-center cursor-pointer">
                <span className="w-2 h-2 rounded-full bg-navy-950" />
              </div>
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-amber-500 text-navy-950 px-2 py-0.5 rounded text-[10px] font-bold font-mono whitespace-nowrap shadow-md">
                x = 175 m (Target)
              </div>
            </div>

            {/* Grid Nodes */}
            {[
              { alt: 0, pos: '0%', label: '0m (28.5°C)' },
              { alt: 100, pos: '25%', label: '100m (26.1°C)' },
              { alt: 200, pos: '50%', label: '200m (23.8°C)' },
              { alt: 300, pos: '75%', label: '300m (21.6°C)' },
              { alt: 400, pos: '100%', label: '400m (19.5°C)' },
            ].map((node) => (
              <div
                key={node.alt}
                className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center"
                style={{ left: node.pos }}
              >
                <div className="w-3.5 h-3.5 rounded-full bg-cyan-400 border-2 border-navy-950" />
                <span className="text-[10px] font-mono text-slate-400 mt-3 whitespace-nowrap">
                  {node.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4 Formulation Pillars */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1.5">
          <div className="text-[10px] uppercase font-bold text-cyan-400">1. Known Quantities</div>
          <div className="text-xs text-slate-300 font-mono space-y-1">
            <div>• Grid step: <MathView math="h = 100\text{ m}" /></div>
            <div>• Base node: <MathView math="x_0 = 0\text{ m}" /></div>
            <div>• Base reading: <MathView math="y_0 = 28.5^\circ\text{C}" /></div>
            <div>• 5 discrete measurements</div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1.5">
          <div className="text-[10px] uppercase font-bold text-amber-400">2. Unknown Quantity</div>
          <div className="text-xs text-slate-300 font-mono space-y-1">
            <div>• Target: <MathView math="x = 175\text{ m}" /></div>
            <div>• Normalized: <MathView math="u = \frac{175-0}{100} = 1.75" /></div>
            <div>• Estimated temperature: <MathView math="T(175) = ?" /></div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1.5">
          <div className="text-[10px] uppercase font-bold text-blue-400">3. Constraints</div>
          <div className="text-xs text-slate-300 space-y-1">
            <div>• Nodes must be equally spaced</div>
            <div>• Target strictly in interval [0, 400]</div>
            <div>• Smooth polynomial continuity</div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1.5">
          <div className="text-[10px] uppercase font-bold text-emerald-400">4. Expected Output</div>
          <div className="text-xs text-slate-300 space-y-1">
            <div>• Temperature in degrees Celsius</div>
            <div>• Must satisfy: <MathView math="23.8 < T < 26.1" /></div>
            <div>• Expected: <strong className="text-white">~ 24.37 °C</strong></div>
          </div>
        </div>
      </div>
    </div>
  );
};
