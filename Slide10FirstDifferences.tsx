import React, { useState } from 'react';
import { MathView } from '../common/MathView.tsx';
import { ArrowDownRight, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

export const Slide10FirstDifferences: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);

  const steps = [
    {
      label: 'Δy₀ (Interval 0 m → 100 m)',
      formula: '\\Delta y_0 = y_1 - y_0 = 26.1 - 28.5 = -2.4^\\circ\\text{C}',
      explanation: 'Temperature drops by 2.4 °C in the first 100 m ascent.',
      y1: '26.1',
      y0: '28.5',
      result: '-2.4',
    },
    {
      label: 'Δy₁ (Interval 100 m → 200 m)',
      formula: '\\Delta y_1 = y_2 - y_1 = 23.8 - 26.1 = -2.3^\\circ\\text{C}',
      explanation: 'Temperature drops by 2.3 °C in the second 100 m ascent.',
      y1: '23.8',
      y0: '26.1',
      result: '-2.3',
    },
    {
      label: 'Δy₂ (Interval 200 m → 300 m)',
      formula: '\\Delta y_2 = y_3 - y_2 = 21.6 - 23.8 = -2.2^\\circ\\text{C}',
      explanation: 'Temperature drops by 2.2 °C in the third 100 m ascent.',
      y1: '21.6',
      y0: '23.8',
      result: '-2.2',
    },
    {
      label: 'Δy₃ (Interval 300 m → 400 m)',
      formula: '\\Delta y_3 = y_4 - y_3 = 19.5 - 21.6 = -2.1^\\circ\\text{C}',
      explanation: 'Temperature drops by 2.1 °C in the fourth 100 m ascent.',
      y1: '19.5',
      y0: '21.6',
      result: '-2.1',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in duration-300">
      <div className="border-b border-slate-800 pb-3">
        <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
          Finite Difference Calculus • Slide 10
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
          First Forward Differences: <MathView math="\Delta y_i = y_{i+1} - y_i" />
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Step-by-step subtraction of adjacent sensor nodes to determine localized lapse rates.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Left Column (5 Cols): Sensor Data with Connected Arrows */}
        <div className="lg:col-span-5 bg-navy-900/80 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
          <div className="text-xs font-bold text-white uppercase tracking-wider flex items-center justify-between">
            <span>Adjacent Subtraction Map</span>
            <span className="text-[10px] font-mono text-cyan-400">Click to focus</span>
          </div>

          <div className="space-y-2">
            {[
              { idx: 0, alt: 0, temp: 28.5 },
              { idx: 1, alt: 100, temp: 26.1 },
              { idx: 2, alt: 200, temp: 23.8 },
              { idx: 3, alt: 300, temp: 21.6 },
              { idx: 4, alt: 400, temp: 19.5 },
            ].map((node, i) => {
              const isTargetInterval = activeStep === i || activeStep === i - 1;

              return (
                <div key={node.idx} className="relative">
                  <div
                    className={`flex items-center justify-between p-2.5 rounded-xl border text-xs font-mono transition-all ${
                      isTargetInterval
                        ? 'bg-cyan-950/50 border-cyan-400 text-white font-bold'
                        : 'bg-slate-950 border-slate-800 text-slate-400'
                    }`}
                  >
                    <span className="text-slate-500">Node y_{node.idx}</span>
                    <span className="text-cyan-300">{node.alt} m</span>
                    <span className="text-amber-400 font-bold">{node.temp.toFixed(1)} °C</span>
                  </div>

                  {/* Connecting Arrow between node i and i+1 */}
                  {i < 4 && (
                    <div
                      onClick={() => setActiveStep(i)}
                      className={`my-1 mx-4 p-1.5 rounded-lg border text-[11px] font-mono flex items-center justify-between cursor-pointer transition-all ${
                        activeStep === i
                          ? 'bg-amber-500/20 border-amber-400 text-amber-300 font-bold scale-105 shadow-md'
                          : 'bg-slate-900/50 border-slate-800/80 text-slate-500 hover:text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <span className="flex items-center gap-1">
                        <ArrowDownRight className="w-3.5 h-3.5 text-cyan-400" />
                        Δy_{i} = {steps[i].result} °C
                      </span>
                      <span className="text-[10px] text-slate-400">
                        ({steps[i].y1} - {steps[i].y0})
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column (7 Cols): Step-by-Step Subtraction Card */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-gradient-to-br from-navy-900 via-navy-850 to-slate-900 border border-cyan-500/40 rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400">
                Detailed Finite Difference Step #{activeStep + 1}
              </span>
              <span className="text-xs font-mono text-cyan-300">
                Operator Order: k = 1
              </span>
            </div>

            <div className="bg-slate-950/90 border border-slate-800 rounded-xl p-4 text-center">
              <MathView block math={steps[activeStep].formula} className="text-lg" />
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {steps[activeStep].explanation}
            </p>

            {/* Stepper Navigation */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-800">
              <span className="text-xs text-slate-400">
                Step {activeStep + 1} of {steps.length}
              </span>
              <div className="flex items-center gap-2">
                {steps.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveStep(idx)}
                    className={`w-7 h-7 rounded-lg text-xs font-mono font-bold transition-all ${
                      activeStep === idx
                        ? 'bg-cyan-500 text-navy-950 shadow-md'
                        : 'bg-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {idx}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Meteorological Pattern Observation */}
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-300 flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-amber-300">Meteorological Observation:</strong> Notice the sequence of first differences: <MathView math="-2.4, -2.3, -2.2, -2.1" />. The negative drop becomes progressively smaller in magnitude as altitude increases! This indicates the rate of cooling is steadily decelerating by +0.1 °C per 100 m.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
