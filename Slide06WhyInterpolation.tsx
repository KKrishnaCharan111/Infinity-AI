import React, { useState } from 'react';
import { CheckCircle, AlertTriangle, ArrowRight, ShieldAlert, Sparkles } from 'lucide-react';
import { MathView } from '../common/MathView.tsx';

export const Slide06WhyInterpolation: React.FC = () => {
  const [selectedZone, setSelectedZone] = useState<'interp' | 'extrap'>('interp');

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in duration-300">
      <div className="border-b border-slate-800 pb-3">
        <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
          Foundational Mathematical Concepts • Slide 06
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
          Why Interpolation? Interior Estimation vs. Risky Extrapolation
        </h2>
      </div>

      {/* Main Interactive Visual Comparison Banner */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Interpolation Card */}
        <div
          onClick={() => setSelectedZone('interp')}
          className={`p-6 rounded-2xl border transition-all cursor-pointer ${
            selectedZone === 'interp'
              ? 'bg-cyan-950/40 border-cyan-400 shadow-xl ring-2 ring-cyan-500/50'
              : 'bg-navy-900/40 border-slate-800 hover:border-slate-700'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-300 flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-cyan-400" />
              Interpolation (Inside Domain)
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
              Safe & Plausible
            </span>
          </div>

          <h3 className="text-base font-bold text-white mb-2">
            Estimating within <MathView math="[x_0, x_n] = [0\text{ m}, 400\text{ m}]" />
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Our target altitude <strong className="text-cyan-300">175 m</strong> is comfortably bracketed by existing physical readings at 100 m and 200 m. The interpolating polynomial acts as a smooth surrogate curve passing through boundary points.
          </p>

          <div className="mt-4 p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-[11px] text-slate-400">
            <span className="text-cyan-400 font-semibold">Error Bound:</span> Controlled by the remainder term <MathView math="R_n(x) \propto h^{n+1} f^{(n+1)}(\xi)" /> where nodes constrain polynomial oscillation.
          </div>
        </div>

        {/* Extrapolation Card */}
        <div
          onClick={() => setSelectedZone('extrap')}
          className={`p-6 rounded-2xl border transition-all cursor-pointer ${
            selectedZone === 'extrap'
              ? 'bg-red-950/30 border-red-400 shadow-xl ring-2 ring-red-500/50'
              : 'bg-navy-900/40 border-slate-800 hover:border-slate-700'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-red-400 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-red-400" />
              Extrapolation (Outside Domain)
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-red-950 text-red-400 border border-red-800">
              High Risk / Divergence
            </span>
          </div>

          <h3 className="text-base font-bold text-white mb-2">
            Estimating beyond bounds (e.g., <MathView math="x > 400\text{ m}" />)
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Polynomials lack bounding nodes outside the sampled domain. Evaluating at 550 m or 700 m can diverge rapidly, predicting unphysical runaway temperatures or inversion artifacts.
          </p>

          <div className="mt-4 p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-[11px] text-slate-400">
            <span className="text-red-400 font-semibold">Runge Danger:</span> Polynomial wings curve unbounded without physical restraint, invalidating meteorological assumptions.
          </div>
        </div>
      </div>

      {/* Visual Spatial Altitude Scale Graphic */}
      <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-white uppercase tracking-wider">
            Spatial Altitude Domain Classification
          </span>
          <span className="font-mono text-cyan-400">Scale: 0 m to 550 m</span>
        </div>

        {/* Bar strip */}
        <div className="relative pt-6 pb-2">
          <div className="h-4 rounded-xl flex overflow-hidden border border-slate-700">
            {/* Interpolation Bracket (0m to 400m) */}
            <div className="w-[72%] bg-gradient-to-r from-cyan-900/60 to-cyan-600/60 flex items-center justify-center text-[10px] font-bold text-cyan-200 border-r-2 border-amber-400">
              Interpolation Zone [0 m — 400 m]
            </div>
            {/* Extrapolation Zone (400m to 550m) */}
            <div className="w-[28%] bg-gradient-to-r from-red-950/70 to-red-900/80 flex items-center justify-center text-[10px] font-bold text-red-300">
              Extrapolation Zone (&gt; 400 m)
            </div>
          </div>

          {/* Target Pointer at 175 m (175/550 = 31.8%) */}
          <div className="absolute top-1 left-[31.8%] -translate-x-1/2 flex flex-col items-center">
            <div className="px-2 py-0.5 rounded bg-amber-500 text-navy-950 text-[10px] font-bold font-mono shadow-md">
              Target: 175 m (Safely Inside)
            </div>
            <div className="w-0.5 h-6 bg-amber-400" />
          </div>
        </div>

        {/* Essential Scientific Truth Callout */}
        <div className="p-4 rounded-xl bg-navy-950 border border-cyan-500/30 text-xs text-slate-300 flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
          <div>
            <strong className="text-white">Crucial Presentation Concept:</strong> Interpolation computes an inferred mathematical value that satisfies polynomial continuity across discrete data points—it does <em>not</em> manufacture a true physical sensor measurement. Environmental micro-fluctuations, wind shear, and solar heating remain unobserved.
          </div>
        </div>
      </div>
    </div>
  );
};
