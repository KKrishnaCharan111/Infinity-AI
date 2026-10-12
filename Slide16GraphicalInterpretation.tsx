import React, { useState } from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  ReferenceDot,
} from 'recharts';
import { LineChart as LineChartIcon, Eye, Info } from 'lucide-react';
import { DEFAULT_SENSOR_DATA, calculateInterpolation } from '../../math/interpolation.ts';
import { MathView } from '../common/MathView.tsx';

export const Slide16GraphicalInterpretation: React.FC = () => {
  const [showNodes, setShowNodes] = useState<boolean>(true);
  const [showCurve, setShowCurve] = useState<boolean>(true);
  const [showTarget, setShowTarget] = useState<boolean>(true);

  const result = calculateInterpolation(DEFAULT_SENSOR_DATA, 175, 'forward');

  // Prepare chart dataset
  const chartData = React.useMemo(() => {
    const map = new Map<number, { x: number; curveY?: number; rawY?: number }>();
    result.curvePoints.forEach((pt) => {
      map.set(pt.x, { x: pt.x, curveY: pt.y });
    });
    DEFAULT_SENSOR_DATA.forEach((dp) => {
      const existing = map.get(dp.x);
      if (existing) existing.rawY = dp.y;
      else map.set(dp.x, { x: dp.x, rawY: dp.y });
    });
    return Array.from(map.values()).sort((a, b) => a.x - b.x);
  }, [result]);

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in duration-300">
      <div className="border-b border-slate-800 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
            Geometric Analysis • Slide 16
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            Graphical Interpretation & Continuous Curve Mapping
          </h2>
        </div>

        {/* View Controls */}
        <div className="flex items-center gap-3 text-xs">
          <label className="flex items-center gap-1.5 text-slate-300 cursor-pointer">
            <input
              type="checkbox"
              checked={showNodes}
              onChange={(e) => setShowNodes(e.target.checked)}
              className="rounded bg-slate-800 border-slate-700 text-amber-400"
            />
            <span>Raw Nodes (5 pts)</span>
          </label>
          <label className="flex items-center gap-1.5 text-slate-300 cursor-pointer">
            <input
              type="checkbox"
              checked={showCurve}
              onChange={(e) => setShowCurve(e.target.checked)}
              className="rounded bg-slate-800 border-slate-700 text-cyan-400"
            />
            <span>Fitted Parabola</span>
          </label>
          <label className="flex items-center gap-1.5 text-slate-300 cursor-pointer">
            <input
              type="checkbox"
              checked={showTarget}
              onChange={(e) => setShowTarget(e.target.checked)}
              className="rounded bg-slate-800 border-slate-700 text-amber-400"
            />
            <span>Target (175 m)</span>
          </label>
        </div>
      </div>

      {/* Main Graph Card */}
      <div className="bg-navy-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-4">
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={chartData} margin={{ top: 20, right: 30, bottom: 20, left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis
                dataKey="x"
                type="number"
                domain={[-10, 420]}
                unit=" m"
                stroke="#64748b"
                fontSize={11}
              />
              <YAxis
                domain={[18, 30]}
                unit="°C"
                stroke="#64748b"
                fontSize={11}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-navy-950 border border-cyan-500/50 p-2.5 rounded-xl shadow-xl text-xs font-mono">
                        <div className="text-slate-300">Altitude: {data.x} m</div>
                        {data.curveY !== undefined && (
                          <div className="text-cyan-400">P(x) Curve: {data.curveY.toFixed(3)} °C</div>
                        )}
                        {data.rawY !== undefined && (
                          <div className="text-amber-400 font-bold">Sampled Node: {data.rawY.toFixed(2)} °C</div>
                        )}
                      </div>
                    );
                  }
                  return null;
                }}
              />

              {showCurve && (
                <Line
                  type="monotone"
                  dataKey="curveY"
                  stroke="#06b6d4"
                  strokeWidth={2.5}
                  dot={false}
                  isAnimationActive={false}
                />
              )}

              {showNodes && (
                <Scatter
                  dataKey="rawY"
                  fill="#f59e0b"
                  stroke="#ffffff"
                  strokeWidth={2}
                  isAnimationActive={false}
                />
              )}

              {showTarget && (
                <>
                  <ReferenceLine
                    x={175}
                    stroke="#f59e0b"
                    strokeDasharray="4 4"
                    strokeWidth={1.5}
                    label={{
                      value: 'Target: 175 m',
                      fill: '#f59e0b',
                      fontSize: 11,
                      position: 'top',
                    }}
                  />
                  <ReferenceLine
                    y={24.365625}
                    stroke="#22d3ee"
                    strokeDasharray="4 4"
                    strokeWidth={1.5}
                    label={{
                      value: 'T(175) ≈ 24.37 °C',
                      fill: '#22d3ee',
                      fontSize: 11,
                      position: 'right',
                    }}
                  />
                  <ReferenceDot
                    x={175}
                    y={24.365625}
                    r={7}
                    fill="#f59e0b"
                    stroke="#ffffff"
                    strokeWidth={2}
                  />
                </>
              )}
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        {/* Legend Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-2 border-t border-slate-800">
          <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center gap-2.5">
            <span className="w-3.5 h-3.5 rounded-full bg-amber-400 border border-white shrink-0" />
            <div>
              <div className="font-bold text-white">5 Sampled Nodes</div>
              <div className="text-[10px] text-slate-400">Ground truth sensor calibration points</div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center gap-2.5">
            <span className="w-6 h-1 bg-cyan-400 rounded shrink-0" />
            <div>
              <div className="font-bold text-white">Continuous Parabola</div>
              <div className="text-[10px] text-slate-400">Newton–Gregory 2nd degree polynomial fit</div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center gap-2.5">
            <span className="w-3.5 h-3.5 rounded-full bg-amber-400 border-2 border-cyan-400 shrink-0" />
            <div>
              <div className="font-bold text-amber-300">Target Intersection</div>
              <div className="text-[10px] text-slate-400">(175 m, 24.37 °C)</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
