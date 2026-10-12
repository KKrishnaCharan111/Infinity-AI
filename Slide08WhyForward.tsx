import React, { useState } from 'react';
import { Check, X, ArrowRight, Grid, AlertCircle } from 'lucide-react';
import { MathView } from '../common/MathView.tsx';

export const Slide08WhyForward: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'equal' | 'unequal'>('equal');

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in duration-300">
      <div className="border-b border-slate-800 pb-3">
        <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
          Algorithmic Selection Rationale • Slide 08
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
          Why Newton–Gregory Forward Interpolation?
        </h2>
      </div>

      {/* 4 Rationale Columns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-cyan-950/20 border border-cyan-500/40 space-y-2">
          <div className="text-xs font-bold font-mono text-cyan-400 uppercase tracking-wider">
            1. Strictly Equal Spacing
          </div>
          <h4 className="text-sm font-bold text-white">Uniform Grid Interval</h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            Drone altitudes are sampled at exactly <MathView math="h = 100\text{ m}" /> intervals: <MathView math="0, 100, 200, 300, 400" />. Constant step enables simplified operator algebra.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-sky-950/20 border border-sky-500/40 space-y-2">
          <div className="text-xs font-bold font-mono text-sky-400 uppercase tracking-wider">
            2. Forward Shift Operator
          </div>
          <h4 className="text-sm font-bold text-white">Algebraic Simplification</h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            Because <MathView math="E = 1 + \Delta" />, expanding <MathView math="E^u = (1+\Delta)^u" /> via the binomial theorem eliminates complex divided difference denominators.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-500/40 space-y-2">
          <div className="text-xs font-bold font-mono text-amber-400 uppercase tracking-wider">
            3. Target Proximity to Origin
          </div>
          <h4 className="text-sm font-bold text-white">Condition Number & Accuracy</h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            Target <MathView math="x = 175\text{ m}" /> lies near the top of the table. Normalized <MathView math="u = 1.75" /> is small and positive, ensuring high numerical stability.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-purple-950/20 border border-purple-500/40 space-y-2">
          <div className="text-xs font-bold font-mono text-purple-400 uppercase tracking-wider">
            4. Diagonal Reuse
          </div>
          <h4 className="text-sm font-bold text-white">Progressive Tableau</h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            The forward formula requires only the top diagonal entries (<MathView math="y_0, \Delta y_0, \Delta^2 y_0" />), allowing rapid execution in embedded firmware.
          </p>
        </div>
      </div>

      {/* Visual Comparison: Equal Spacing vs Unequal Spacing */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Grid className="w-4 h-4 text-cyan-400" />
            Visual Sampling Grid Comparison
          </h4>
          <div className="flex items-center gap-2 text-xs">
            <button
              onClick={() => setActiveTab('equal')}
              className={`px-3 py-1 rounded-lg font-mono transition-colors ${
                activeTab === 'equal'
                  ? 'bg-cyan-500 text-navy-950 font-bold'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              Our Uniform Grid (h = 100m)
            </button>
            <button
              onClick={() => setActiveTab('unequal')}
              className={`px-3 py-1 rounded-lg font-mono transition-colors ${
                activeTab === 'unequal'
                  ? 'bg-red-500 text-white font-bold'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              Non-Uniform Jittery Grid
            </button>
          </div>
        </div>

        {activeTab === 'equal' ? (
          <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-500/30 space-y-3">
            <div className="flex items-center justify-between text-xs font-mono text-cyan-300">
              <span className="font-bold flex items-center gap-1.5">
                <Check className="w-4 h-4 text-green-400" />
                Constant Interval: Δx = 100 m throughout
              </span>
              <span>Valid for Newton–Gregory Forward</span>
            </div>
            {/* Visual Equal Spaced Ticks */}
            <div className="flex justify-between items-center relative py-3 border-b border-cyan-800/40">
              {[0, 100, 200, 300, 400].map((val) => (
                <div key={val} className="flex flex-col items-center">
                  <div className="w-3.5 h-3.5 rounded-full bg-cyan-400 shadow-sm shadow-cyan-400/50" />
                  <span className="text-[11px] font-mono text-slate-300 mt-1">{val} m</span>
                  <span className="text-[10px] text-cyan-400 font-mono">+100m</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-slate-300">
              Formula holds: Finite difference table is constructed purely through simple subtractions, without division by unequal intervals.
            </p>
          </div>
        ) : (
          <div className="p-4 rounded-xl bg-red-950/20 border border-red-500/30 space-y-3">
            <div className="flex items-center justify-between text-xs font-mono text-red-300">
              <span className="font-bold flex items-center gap-1.5">
                <X className="w-4 h-4 text-red-400" />
                Variable Intervals: Δx varies (e.g., 0, 75, 210, 280, 400 m)
              </span>
              <span>Requires Divided Differences or Lagrange</span>
            </div>
            {/* Visual Unequal Ticks */}
            <div className="flex justify-between items-center relative py-3 border-b border-red-800/40">
              {[
                { x: 0, dx: 'start' },
                { x: 75, dx: '+75m' },
                { x: 210, dx: '+135m' },
                { x: 280, dx: '+70m' },
                { x: 400, dx: '+120m' },
              ].map((val) => (
                <div key={val.x} className="flex flex-col items-center">
                  <div className="w-3.5 h-3.5 rounded-full bg-red-400" />
                  <span className="text-[11px] font-mono text-slate-300 mt-1">{val.x} m</span>
                  <span className="text-[10px] text-red-400 font-mono">{val.dx}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-slate-300">
              Newton–Gregory forward cannot be applied directly here because <MathView math="h" /> is not constant. Engineers must use Newton's Divided Difference or Lagrange Polynomials.
            </p>
          </div>
        )}

        <div className="text-[11px] text-slate-400 italic">
          <strong>Method Boundary Note:</strong> If our target were near the end of the data table (such as 385 m), Newton–Gregory Backward Interpolation would be selected instead to keep parameter <MathView math="v = (x - x_n)/h" /> close to zero.
        </div>
      </div>
    </div>
  );
};
