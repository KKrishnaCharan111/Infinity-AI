import React from 'react';
import { MathView } from '../common/MathView.tsx';
import { ShieldCheck, AlertCircle, TrendingDown, CheckCircle2 } from 'lucide-react';

export const Slide17Verification: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in duration-300">
      <div className="border-b border-slate-800 pb-3">
        <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
          Validation & Uncertainty Analysis • Slide 17
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
          Verify the Result: Physical Sanity Check & Atmospheric Realities
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Sanity Check Pillar */}
        <div className="p-6 rounded-2xl bg-cyan-950/20 border border-cyan-500/40 space-y-3">
          <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            1. Bounding Bracket Sanity Check
          </div>
          <h3 className="text-sm font-bold text-white">Consistent Between Neighboring Nodes</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Target altitude <MathView math="x = 175\text{ m}" /> is bounded by:
          </p>
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs space-y-1">
            <div className="flex justify-between">
              <span className="text-slate-400">Node x₁ (100 m):</span>
              <span className="text-cyan-300 font-bold">26.10 °C</span>
            </div>
            <div className="flex justify-between bg-cyan-900/40 p-1 rounded">
              <span className="text-amber-300 font-bold">Estimated T(175 m):</span>
              <span className="text-amber-300 font-bold">24.37 °C</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Node x₂ (200 m):</span>
              <span className="text-cyan-300 font-bold">23.80 °C</span>
            </div>
          </div>
          <p className="text-xs text-emerald-400 font-semibold flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4" />
            <MathView math="23.80^\circ\text{C} < 24.37^\circ\text{C} < 26.10^\circ\text{C}" /> (Strictly bounded)
          </p>
        </div>

        {/* Monotonic Cooling Trend */}
        <div className="p-6 rounded-2xl bg-sky-950/20 border border-sky-500/40 space-y-3">
          <div className="flex items-center gap-2 text-sky-400 font-bold text-xs uppercase tracking-wider">
            <TrendingDown className="w-4 h-4" />
            2. Physical Lapse Gradient
          </div>
          <h3 className="text-sm font-bold text-white">Normal Environmental Cooling</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            In standard dry tropospheric lapse conditions, temperature monotonically drops as elevation increases.
          </p>
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 space-y-1.5">
            <div>
              • 175 m is located 75% along the [100 m, 200 m] interval.
            </div>
            <div>
              • Linear midpoint would be 24.95 °C. The 75% linear point is 24.325 °C.
            </div>
            <div>
              • Parabolic correction nudges the estimate slightly to <strong>24.37 °C</strong> due to lapse deceleration.
            </div>
          </div>
        </div>
      </div>

      {/* Crucial Engineering Reflection Callout */}
      <div className="bg-slate-900/80 border border-amber-500/40 rounded-2xl p-5 space-y-3">
        <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
          <AlertCircle className="w-4 h-4" />
          Critical Engineering Distinctions
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-300">
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
            <div className="font-bold text-white mb-1">Sanity Check ≠ Physical Proof</div>
            <p className="text-slate-400 text-[11px]">
              Satisfying mathematical bounds verifies consistency with the model, but cannot detect unmeasured micro-thermal inversions or localized updrafts.
            </p>
          </div>
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
            <div className="font-bold text-white mb-1">Sensor Thermal Time Constant</div>
            <p className="text-slate-400 text-[11px]">
              Drone sensors have response lag (τ = 1–2 sec). A fast-climbing quadcopter records slightly warmer values than static ambient air.
            </p>
          </div>
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
            <div className="font-bold text-white mb-1">Rotor Downwash Interference</div>
            <p className="text-slate-400 text-[11px]">
              Propeller turbulence mixes thermal boundary layers. Probes must be mounted on forward booms away from motor rotor prop-wash.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
