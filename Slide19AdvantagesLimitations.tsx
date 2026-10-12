import React from 'react';
import { CheckCircle2, AlertTriangle, ShieldCheck, Zap } from 'lucide-react';

export const Slide19AdvantagesLimitations: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in duration-300">
      <div className="border-b border-slate-800 pb-3">
        <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
          Numerical Critique • Slide 19
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
          Advantages and Limitations: Engineering Evaluation
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Advantages Pillar */}
        <div className="bg-navy-900/80 border border-emerald-500/40 rounded-3xl p-6 shadow-xl space-y-4">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            Core Strengths & Advantages
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
              <div className="font-bold text-white flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-cyan-400" />
                Computational Efficiency: O(n) additions
              </div>
              <p className="text-slate-300">
                Eliminates matrix inversions and division loops. Only relies on differences and Horner multiplications, executing ultra-fast on resource-constrained microcontrollers.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
              <div className="font-bold text-white">Transparent Order Truncation</div>
              <p className="text-slate-300">
                Engineers can inspect difference magnitudes and safely truncate higher terms (e.g., stopping at quadratic degree when Δ²y becomes constant).
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
              <div className="font-bold text-white">Progressive Tableau Expansion</div>
              <p className="text-slate-300">
                Adding a new sensor node at the bottom requires only appending one difference entry per column without recalculating the rest of the table.
              </p>
            </div>
          </div>
        </div>

        {/* Limitations Pillar */}
        <div className="bg-navy-900/80 border border-amber-500/40 rounded-3xl p-6 shadow-xl space-y-4">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
            <AlertTriangle className="w-5 h-5 text-amber-400" />
            Known Limitations & Risk Factors
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
              <div className="font-bold text-white">Strict Constant Grid Requirement</div>
              <p className="text-slate-300">
                Requires strictly uniform altitude intervals (h = const). Fails if drone climb rate varies unevenly or if sensor sampling skips clock cycles.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
              <div className="font-bold text-white">Noise Amplification in Differences</div>
              <p className="text-slate-300">
                High-order difference operators act as high-pass filters. Random sensor jitter (±0.2°C) is magnified by alternating signs into spurious fluctuations.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
              <div className="font-bold text-white">Extrapolation & Runge Phenomenon</div>
              <p className="text-slate-300">
                Evaluating outside [0 m, 400 m] or utilizing higher-degree polynomials (&gt; 4) leads to severe edge oscillations and wild divergence.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
