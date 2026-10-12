import React, { useState } from 'react';
import { MathView } from '../common/MathView.tsx';
import { Sparkles, ArrowRight, Code } from 'lucide-react';

export const Slide09Symbols: React.FC = () => {
  const [activeSymbol, setActiveSymbol] = useState<number>(0);

  const symbols = [
    {
      symLatex: 'x_0',
      name: 'Origin / Base Altitude',
      caseValue: '0 m',
      desc: 'The starting altitude in the discrete sensor table. For forward interpolation, this is the first sampled node.',
      physical: 'Drone sea-level or ground launch elevation.',
      color: 'border-cyan-500/50 text-cyan-300 bg-cyan-950/30',
    },
    {
      symLatex: 'h',
      name: 'Grid Spacing / Step Size',
      caseValue: '100 m',
      desc: 'The constant uniform altitude difference between consecutive sensor measurements: h = x_{i+1} - x_i.',
      physical: 'Ascent sampling window step size.',
      color: 'border-sky-500/50 text-sky-300 bg-sky-950/30',
    },
    {
      symLatex: 'y_0',
      name: 'Origin Measured Temperature',
      caseValue: '28.5 °C',
      desc: 'The base temperature recorded at origin x_0 = 0 m. Serves as the constant foundation term of the polynomial.',
      physical: 'Ground ambient surface temperature.',
      color: 'border-amber-500/50 text-amber-300 bg-amber-950/30',
    },
    {
      symLatex: '\\Delta y_0',
      name: 'First Forward Difference',
      caseValue: '-2.4 °C',
      desc: 'The change in temperature between the first two nodes: \\Delta y_0 = y_1 - y_0 = 26.1 - 28.5 = -2.4 °C.',
      physical: 'Initial localized lapse rate (cooling per 100 m).',
      color: 'border-teal-500/50 text-teal-300 bg-teal-950/30',
    },
    {
      symLatex: '\\Delta^2 y_0',
      name: 'Second Forward Difference',
      caseValue: '+0.1 °C',
      desc: 'The rate of change of first differences: \\Delta^2 y_0 = \\Delta y_1 - \\Delta y_0 = -2.3 - (-2.4) = +0.1 °C.',
      physical: 'Atmospheric curvature (lapse rate deceleration).',
      color: 'border-purple-500/50 text-purple-300 bg-purple-950/30',
    },
    {
      symLatex: 'u = \\frac{x - x_0}{h}',
      name: 'Dimensionless Normalized Position',
      caseValue: '1.75',
      desc: 'Maps the physical continuous coordinate x into normalized fractional step units from the origin x_0.',
      physical: 'Target is 1.75 step units above ground (175 m).',
      color: 'border-emerald-500/50 text-emerald-300 bg-emerald-950/30',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in duration-300">
      <div className="border-b border-slate-800 pb-3">
        <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
          Theoretical Nomenclature • Slide 09
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
          Understanding the Mathematical Symbols
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Translating abstract finite difference operator notation into concrete physical drone parameters.
        </p>
      </div>

      {/* Interactive Symbol Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {symbols.map((item, idx) => {
          const isSelected = activeSymbol === idx;
          return (
            <div
              key={idx}
              onClick={() => setActiveSymbol(idx)}
              className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                item.color
              } ${
                isSelected
                  ? 'ring-2 ring-cyan-400 shadow-xl scale-[1.02]'
                  : 'hover:border-slate-700 hover:scale-[1.01]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="px-3 py-1.5 rounded-xl bg-slate-950/80 border border-slate-800 font-mono text-base font-bold text-white shadow-inner">
                    <MathView math={item.symLatex} />
                  </div>
                  <span className="text-xs font-mono font-bold text-amber-400 px-2 py-0.5 rounded bg-slate-900/80 border border-slate-800">
                    = {item.caseValue}
                  </span>
                </div>

                <h3 className="text-xs font-bold text-white mb-1.5 uppercase tracking-wide">
                  {item.name}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed mb-3">
                  {item.desc}
                </p>
              </div>

              <div className="pt-2.5 border-t border-slate-800/80 text-[11px] text-slate-400 font-mono">
                <span className="text-cyan-400 font-semibold">Physical Sensor Meaning: </span>
                {item.physical}
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Detailed Callout */}
      <div className="bg-navy-900/60 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider font-bold">
            Focused Parameter In-Depth
          </div>
          <div className="text-sm font-bold text-white flex items-center gap-2">
            <span>{symbols[activeSymbol].name}</span>
            <span className="text-amber-400 font-mono">({symbols[activeSymbol].caseValue})</span>
          </div>
          <p className="text-xs text-slate-300">{symbols[activeSymbol].desc}</p>
        </div>

        <div className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-cyan-300 shrink-0 text-center">
          <div className="text-[10px] text-slate-500 uppercase">Math Formula</div>
          <MathView math={symbols[activeSymbol].symLatex} />
        </div>
      </div>
    </div>
  );
};
