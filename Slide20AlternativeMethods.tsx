import React from 'react';
import { GitCompare, Check, Minus, X } from 'lucide-react';

export const Slide20AlternativeMethods: React.FC = () => {
  const methods = [
    {
      name: 'Linear Interpolation',
      spacing: 'Any',
      complexity: 'O(1)',
      smoothness: 'C⁰ (Discontinuous slopes)',
      suitability: 'Coarse quick estimates between adjacent pairs',
      ourVerdict: 'Underestimates curvature (+0.065°C error)',
    },
    {
      name: 'Newton–Gregory Forward',
      spacing: 'Strictly Equal',
      complexity: 'O(n) evaluation',
      smoothness: 'C^∞ (Global polynomial)',
      suitability: 'Equally spaced data near the start of the table',
      ourVerdict: 'Selected Case Study Method (Optimal for h=100m, x=175m)',
    },
    {
      name: 'Newton–Gregory Backward',
      spacing: 'Strictly Equal',
      complexity: 'O(n) evaluation',
      smoothness: 'C^∞ (Global polynomial)',
      suitability: 'Equally spaced data near the end of the table',
      ourVerdict: 'Equivalent polynomial, optimal for x near 400m',
    },
    {
      name: 'Lagrange Interpolation',
      spacing: 'Unequal / Arbitrary',
      complexity: 'O(n²) update',
      smoothness: 'C^∞ (Global polynomial)',
      suitability: 'Unequally spaced non-uniform altitude samples',
      ourVerdict: 'Higher computational overhead, unnecessary for uniform h',
    },
    {
      name: 'Cubic Spline (Natural/Clamped)',
      spacing: 'Any',
      complexity: 'O(n) tridiagonal solve',
      smoothness: 'C² (Continuous curvature)',
      suitability: 'Large noisy datasets with inflection layers',
      ourVerdict: 'Overkill for 5 points, but standard for full flight profiles',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in duration-300">
      <div className="border-b border-slate-800 pb-3">
        <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
          Comparative Benchmarking • Slide 20
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
          Comparison with Alternative Interpolation Frameworks
        </h2>
      </div>

      <div className="bg-navy-900/80 border border-slate-800 rounded-3xl p-6 shadow-2xl overflow-x-auto">
        <table className="w-full text-xs text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-700 text-slate-300 font-mono text-[11px] bg-slate-950/60">
              <th className="p-3">Methodology</th>
              <th className="p-3">Grid Requirement</th>
              <th className="p-3">Algorithmic Cost</th>
              <th className="p-3">Continuity</th>
              <th className="p-3">Typical Engineering Domain</th>
              <th className="p-3">Drone Case Evaluation</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800 font-sans">
            {methods.map((m, idx) => {
              const isOurs = m.name.includes('Forward');
              return (
                <tr
                  key={idx}
                  className={`transition-colors ${
                    isOurs
                      ? 'bg-cyan-950/40 text-white font-semibold'
                      : 'hover:bg-slate-800/40 text-slate-300'
                  }`}
                >
                  <td className="p-3 font-bold font-mono text-cyan-300">{m.name}</td>
                  <td className="p-3 font-mono">{m.spacing}</td>
                  <td className="p-3 font-mono text-amber-400">{m.complexity}</td>
                  <td className="p-3 text-[11px]">{m.smoothness}</td>
                  <td className="p-3 text-[11px]">{m.suitability}</td>
                  <td className="p-3 text-[11px] font-mono text-cyan-200">{m.ourVerdict}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-400">
        <strong>Academic Conclusion:</strong> No single interpolation method is universally superior. Engineering selection is dictated by sensor sampling synchronization, processor power, memory constraints, and target query location.
      </div>
    </div>
  );
};
