import React, { useState } from 'react';
import { MathView } from '../common/MathView.tsx';
import { Sparkles, Layers, Cpu, CheckCircle2 } from 'lucide-react';

export const Slide13FormulaDerivation: React.FC = () => {
  const [activeTerm, setActiveTerm] = useState<number>(0);

  const termExplanations = [
    {
      title: 'Constant Base Term (Order 0)',
      latex: 'y_0',
      value: '28.5 °C',
      color: 'border-cyan-500 text-cyan-300 bg-cyan-950/40',
      desc: 'The ground baseline temperature at altitude x0 = 0 m. Forms the starting anchor of the entire polynomial series.',
    },
    {
      title: 'Linear Gradient Term (Order 1)',
      latex: 'u \\Delta y_0',
      value: '1.75 × (-2.4) = -4.2 °C',
      color: 'border-sky-500 text-sky-300 bg-sky-950/40',
      desc: 'The dominant first-order cooling trend. Represents the straight-line tangent descent across u normalized steps.',
    },
    {
      title: 'Quadratic Curvature Term (Order 2)',
      latex: '\\frac{u(u-1)}{2!} \\Delta^2 y_0',
      value: '\\frac{1.75 \\times 0.75}{2}(0.1) = +0.065625 °C',
      color: 'border-amber-500 text-amber-300 bg-amber-950/40',
      desc: 'Parabolic upward correction. Accounts for the deceleration in lapse rate, bending the curve convexly.',
    },
    {
      title: 'Higher Order Terms (Order 3+)',
      latex: '\\frac{u(u-1)(u-2)}{3!} \\Delta^3 y_0 + \\cdots',
      value: '0 °C (Identically Vanish)',
      color: 'border-purple-500 text-purple-300 bg-purple-950/40',
      desc: 'Because Δ³y0 = 0 and Δ⁴y0 = 0, all cubic, quartic, and higher order polynomial terms contribute exactly zero.',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in duration-300">
      <div className="border-b border-slate-800 pb-3">
        <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
          Polynomial Derivation • Slide 13
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
          Derivation of the Newton–Gregory Forward Formula
        </h2>
      </div>

      {/* Prominent Formula Master Display */}
      <div className="bg-gradient-to-r from-navy-900 via-slate-900 to-navy-900 border-2 border-cyan-500/50 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-4">
        <div className="text-xs font-bold font-mono text-cyan-400 uppercase tracking-wider text-center">
          General Interpolation Polynomial Expansion
        </div>
        <div className="overflow-x-auto py-2 text-center">
          <MathView
            block
            math="y(x) = y_0 + u\\Delta y_0 + \\frac{u(u-1)}{2!}\\Delta^2 y_0 + \\frac{u(u-1)(u-2)}{3!}\\Delta^3 y_0 + \\cdots"
            className="text-lg sm:text-2xl text-cyan-200"
          />
        </div>
        <div className="text-center text-xs text-slate-400 font-mono">
          where normalized dimensionless parameter <MathView math="u = \frac{x - x_0}{h}" />
        </div>
      </div>

      {/* Operator Algebra Origin: Shift Operator E */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-3">
        <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <Cpu className="w-4 h-4 text-cyan-400" />
          Operator Derivation: Shift Operator E and Binomial Expansion
        </h3>
        <p className="text-xs text-slate-300 leading-relaxed">
          The shift operator is defined as <MathView math="E f(x) = f(x + h)" />. For any point <MathView math="x = x_0 + uh" />, we have <MathView math="f(x) = E^u f(x_0)" />.
          Since <MathView math="E = 1 + \Delta" />, applying the generalized binomial theorem gives:
        </p>
        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-center">
          <MathView
            block
            math="E^u = (1 + \Delta)^u = 1 + u\Delta + \frac{u(u-1)}{2!}\Delta^2 + \frac{u(u-1)(u-2)}{3!}\Delta^3 + \cdots"
          />
        </div>
        <p className="text-[11px] text-slate-400">
          Applying this operator to <MathView math="y_0" /> immediately yields the Newton–Gregory forward formula! This is the discrete calculus analog of Taylor series.
        </p>
      </div>

      {/* Interactive Term Breakdown Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {termExplanations.map((item, idx) => (
          <div
            key={idx}
            onClick={() => setActiveTerm(idx)}
            className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
              item.color
            } ${activeTerm === idx ? 'ring-2 ring-cyan-400 shadow-lg scale-[1.02]' : 'hover:scale-[1.01]'}`}
          >
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider mb-1 opacity-80">
                {item.title}
              </div>
              <div className="my-2 text-center py-2 bg-slate-950/70 rounded-lg border border-slate-800">
                <MathView math={item.latex} />
              </div>
              <div className="text-xs font-mono font-bold text-amber-300 text-center mb-2">
                = {item.value}
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
