import React, { useState, useMemo } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from 'recharts';
import { MathView } from '../common/MathView.tsx';
import { DEFAULT_SENSOR_DATA, calculateInterpolation } from '../../math/interpolation.ts';
import { Sliders, Sparkles, Activity, Layers } from 'lucide-react';

export const Slide23RealTimeDynamics: React.FC = () => {
  const [alt, setAlt] = useState<number>(175);

  const result = useMemo(() => {
    return calculateInterpolation(DEFAULT_SENSOR_DATA, alt, 'forward');
  }, [alt]);

  // Data for term contribution bar chart
  const barData = useMemo(() => {
    if (!result.isValid) return [];
    return result.terms.map((t) => ({
      name: `Term ${t.index}`,
      val: t.termValue,
      label: t.label,
    }));
  }, [result]);

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in duration-300">
      <div className="border-b border-slate-800 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
            Mathematical Sensitivity & Dynamics • Slide 23
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            Real-Time Polynomial Term Contributions
          </h2>
        </div>

        {/* Dynamic target slider */}
        <div className="flex items-center gap-3 bg-navy-900 border border-slate-800 rounded-xl px-3 py-1.5">
          <span className="text-xs text-slate-400 font-mono">Target:</span>
          <input
            type="range"
            min={0}
            max={400}
            step={5}
            value={alt}
            onChange={(e) => setAlt(parseFloat(e.target.value))}
            className="w-32 h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
          />
          <span className="text-xs font-mono font-bold text-cyan-300 min-w-[50px]">
            {alt} m
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Left Column (6 Cols): Term Contribution Bar Chart */}
        <div className="lg:col-span-6 bg-navy-900/80 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Activity className="w-4 h-4 text-cyan-400" />
              Individual Term Magnitudes (°C)
            </h3>
            <span className="text-[10px] font-mono text-slate-400">
              Positive vs Negative Impact
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} margin={{ top: 20, right: 20, bottom: 20, left: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="name" stroke="#64748b" fontSize={11} />
                <YAxis unit="°C" stroke="#64748b" fontSize={11} />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-navy-950 border border-cyan-500/50 p-2 rounded text-xs font-mono">
                          <div className="font-bold text-white">{data.name}: {data.label}</div>
                          <div className={data.val >= 0 ? 'text-cyan-400' : 'text-red-400'}>
                            Contribution: {data.val.toFixed(6)} °C
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="val" radius={[4, 4, 0, 0]}>
                  {barData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        index === 0
                          ? '#06b6d4'
                          : entry.val < 0
                          ? '#f43f5e'
                          : '#f59e0b'
                      }
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="text-[11px] text-slate-400 flex items-center justify-between font-mono pt-2 border-t border-slate-800">
            <span className="text-cyan-400">• Term 0 (Base): +28.5 °C</span>
            <span className="text-rose-400">• Term 1 (Linear): -4.2 °C</span>
            <span className="text-amber-400">• Term 2 (Curvature): +0.0656 °C</span>
          </div>
        </div>

        {/* Right Column (6 Cols): Dynamic Math Inspection Panel */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-gradient-to-br from-navy-900 to-slate-900 border border-cyan-500/40 rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
                Live Formula State
              </span>
              <span className="text-xs font-mono text-amber-400 font-bold">
                u = {result.u.toFixed(4)}
              </span>
            </div>

            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-center font-mono">
              <div className="text-slate-400 text-[10px] mb-1">Interpolated Temperature:</div>
              <div className="text-2xl font-black text-white">
                T({alt} m) = <span className="text-amber-400">{result.yTarget.toFixed(4)} °C</span>
              </div>
            </div>

            <div className="space-y-2 text-xs font-mono">
              <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 flex justify-between">
                <span className="text-slate-400">1. Base origin x₀:</span>
                <span className="text-cyan-300 font-bold">0 m (y₀ = 28.5 °C)</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 flex justify-between">
                <span className="text-slate-400">2. Step size h:</span>
                <span className="text-cyan-300 font-bold">100 m</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 flex justify-between">
                <span className="text-slate-400">3. Normalized u factor:</span>
                <span className="text-amber-300 font-bold">({alt} - 0) / 100 = {result.u.toFixed(2)}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 flex justify-between">
                <span className="text-slate-400">4. Truncation Order:</span>
                <span className="text-emerald-300 font-bold">Quadratic (Δ³y = 0)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
