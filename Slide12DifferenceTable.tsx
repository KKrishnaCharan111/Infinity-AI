import React, { useState } from 'react';
import { Eye, EyeOff, RotateCcw, Sparkles, Check, ChevronRight } from 'lucide-react';
import { MathView } from '../common/MathView.tsx';

export const Slide12DifferenceTable: React.FC = () => {
  // Revealed columns: 1 = x, y; 2 = Δy; 3 = Δ²y; 4 = Δ³y; 5 = Δ⁴y
  const [revealedCol, setRevealedCol] = useState<number>(5);
  const [highlightDiagonal, setHighlightDiagonal] = useState<boolean>(true);

  const handleRevealNext = () => {
    if (revealedCol < 5) setRevealedCol(revealedCol + 1);
  };

  const handleResetReveal = () => {
    setRevealedCol(1);
  };

  const handleRevealAll = () => {
    setRevealedCol(5);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in duration-300">
      <div className="border-b border-slate-800 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
            Difference Tableau • Slide 12
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            Complete Triangular Forward-Difference Table
          </h2>
        </div>

        {/* Column Reveal Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleRevealNext}
            disabled={revealedCol === 5}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-navy-950 font-bold text-xs disabled:opacity-40 transition-colors shadow-sm"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Reveal Next Order</span>
          </button>
          <button
            onClick={handleRevealAll}
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-colors"
          >
            Show All
          </button>
          <button
            onClick={handleResetReveal}
            className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
            title="Reset column reveal"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Triangular Table Card */}
      <div className="bg-navy-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <span>Gregory–Newton Forward Diagonal Coefficients</span>
          </div>

          <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
            <input
              type="checkbox"
              checked={highlightDiagonal}
              onChange={(e) => setHighlightDiagonal(e.target.checked)}
              className="rounded bg-slate-800 border-slate-700 text-amber-400 focus:ring-amber-400"
            />
            <span className="font-semibold text-amber-300">Highlight Active Diagonal (x₀ Row)</span>
          </label>
        </div>

        {/* Progressively Revealed Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-center border-collapse">
            <thead>
              <tr className="border-b-2 border-slate-700 text-slate-300 font-mono text-xs">
                <th className="p-3 bg-slate-950/60">Altitude x (m)</th>
                <th className="p-3 bg-slate-950/60 text-cyan-300">Temperature y (°C)</th>
                <th
                  className={`p-3 transition-opacity duration-300 ${
                    revealedCol >= 2 ? 'opacity-100 text-sky-300' : 'opacity-20 text-slate-600'
                  }`}
                >
                  Δy (1st Diff)
                </th>
                <th
                  className={`p-3 transition-opacity duration-300 ${
                    revealedCol >= 3 ? 'opacity-100 text-amber-300' : 'opacity-20 text-slate-600'
                  }`}
                >
                  Δ²y (2nd Diff)
                </th>
                <th
                  className={`p-3 transition-opacity duration-300 ${
                    revealedCol >= 4 ? 'opacity-100 text-purple-300' : 'opacity-20 text-slate-600'
                  }`}
                >
                  Δ³y (3rd Diff)
                </th>
                <th
                  className={`p-3 transition-opacity duration-300 ${
                    revealedCol >= 5 ? 'opacity-100 text-emerald-300' : 'opacity-20 text-slate-600'
                  }`}
                >
                  Δ⁴y (4th Diff)
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 font-mono text-sm">
              {/* Row 0 */}
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3.5 text-slate-400 font-bold">0</td>
                <td
                  className={`p-3.5 font-black transition-all ${
                    highlightDiagonal
                      ? 'bg-cyan-950/90 text-cyan-300 border-2 border-cyan-400 rounded-lg shadow-md'
                      : 'text-white'
                  }`}
                >
                  28.5
                  <span className="block text-[9px] font-sans font-normal text-cyan-400 mt-0.5">y₀ (Base)</span>
                </td>
                <td className={`p-3.5 ${revealedCol >= 2 ? 'opacity-100' : 'opacity-0'}`}>
                  <span
                    className={`px-2.5 py-1 rounded font-bold transition-all ${
                      highlightDiagonal && revealedCol >= 2
                        ? 'bg-sky-950/90 text-sky-300 border-2 border-sky-400 shadow-md inline-block'
                        : 'text-slate-300'
                    }`}
                  >
                    -2.4
                  </span>
                  <span className="block text-[9px] font-sans font-normal text-sky-400 mt-0.5">Δy₀</span>
                </td>
                <td className={`p-3.5 ${revealedCol >= 3 ? 'opacity-100' : 'opacity-0'}`}>
                  <span
                    className={`px-2.5 py-1 rounded font-bold transition-all ${
                      highlightDiagonal && revealedCol >= 3
                        ? 'bg-amber-950/90 text-amber-300 border-2 border-amber-400 shadow-md inline-block'
                        : 'text-slate-300'
                    }`}
                  >
                    +0.1
                  </span>
                  <span className="block text-[9px] font-sans font-normal text-amber-400 mt-0.5">Δ²y₀</span>
                </td>
                <td className={`p-3.5 ${revealedCol >= 4 ? 'opacity-100' : 'opacity-0'}`}>
                  <span
                    className={`px-2.5 py-1 rounded font-bold transition-all ${
                      highlightDiagonal && revealedCol >= 4
                        ? 'bg-purple-950/90 text-purple-300 border-2 border-purple-400 shadow-md inline-block'
                        : 'text-slate-500'
                    }`}
                  >
                    0
                  </span>
                  <span className="block text-[9px] font-sans font-normal text-purple-400 mt-0.5">Δ³y₀</span>
                </td>
                <td className={`p-3.5 ${revealedCol >= 5 ? 'opacity-100' : 'opacity-0'}`}>
                  <span
                    className={`px-2.5 py-1 rounded font-bold transition-all ${
                      highlightDiagonal && revealedCol >= 5
                        ? 'bg-emerald-950/90 text-emerald-300 border-2 border-emerald-400 shadow-md inline-block'
                        : 'text-slate-500'
                    }`}
                  >
                    0
                  </span>
                  <span className="block text-[9px] font-sans font-normal text-emerald-400 mt-0.5">Δ⁴y₀</span>
                </td>
              </tr>

              {/* Row 1 */}
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3.5 text-slate-400 font-bold">100</td>
                <td className="p-3.5 text-slate-200">26.1</td>
                <td className={`p-3.5 text-slate-300 ${revealedCol >= 2 ? 'opacity-100' : 'opacity-0'}`}>
                  -2.3
                </td>
                <td className={`p-3.5 text-slate-300 ${revealedCol >= 3 ? 'opacity-100' : 'opacity-0'}`}>
                  +0.1
                </td>
                <td className={`p-3.5 text-slate-500 ${revealedCol >= 4 ? 'opacity-100' : 'opacity-0'}`}>
                  0
                </td>
                <td className="p-3.5 text-slate-700">—</td>
              </tr>

              {/* Row 2 */}
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3.5 text-slate-400 font-bold">200</td>
                <td className="p-3.5 text-slate-200">23.8</td>
                <td className={`p-3.5 text-slate-300 ${revealedCol >= 2 ? 'opacity-100' : 'opacity-0'}`}>
                  -2.2
                </td>
                <td className={`p-3.5 text-slate-300 ${revealedCol >= 3 ? 'opacity-100' : 'opacity-0'}`}>
                  +0.1
                </td>
                <td className="p-3.5 text-slate-700">—</td>
                <td className="p-3.5 text-slate-700">—</td>
              </tr>

              {/* Row 3 */}
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3.5 text-slate-400 font-bold">300</td>
                <td className="p-3.5 text-slate-200">21.6</td>
                <td className={`p-3.5 text-slate-300 ${revealedCol >= 2 ? 'opacity-100' : 'opacity-0'}`}>
                  -2.1
                </td>
                <td className="p-3.5 text-slate-700">—</td>
                <td className="p-3.5 text-slate-700">—</td>
                <td className="p-3.5 text-slate-700">—</td>
              </tr>

              {/* Row 4 */}
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3.5 text-slate-400 font-bold">400</td>
                <td className="p-3.5 text-slate-200">19.5</td>
                <td className="p-3.5 text-slate-700">—</td>
                <td className="p-3.5 text-slate-700">—</td>
                <td className="p-3.5 text-slate-700">—</td>
                <td className="p-3.5 text-slate-700">—</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Educational Note */}
        <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300 flex items-start gap-2.5">
          <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <strong>Forward Formula Principle:</strong> The forward formula exclusively pulls values along the{' '}
            <span className="text-amber-300 font-bold">top downward diagonal</span> originating at <MathView math="y_0" />:
            namely <MathView math="y_0 = 28.5" />, <MathView math="\Delta y_0 = -2.4" />, <MathView math="\Delta^2 y_0 = +0.1" />, <MathView math="\Delta^3 y_0 = 0" />.
            All other values in the lower rows belong to higher starting nodes.
          </div>
        </div>
      </div>
    </div>
  );
};
