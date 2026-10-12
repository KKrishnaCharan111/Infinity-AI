import React, { useState } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceDot,
} from 'recharts';
import { Edit3, Check, RotateCcw, Database, AlertCircle } from 'lucide-react';
import { DataPoint } from '../../types/index.ts';
import { DEFAULT_SENSOR_DATA } from '../../math/interpolation.ts';
import { MathView } from '../common/MathView.tsx';

export const Slide05SensorData: React.FC = () => {
  const [data, setData] = useState<DataPoint[]>(DEFAULT_SENSOR_DATA);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleValueChange = (index: number, val: string) => {
    const updated = [...data];
    updated[index] = { ...updated[index], y: parseFloat(val) || 0 };
    setData(updated);
  };

  const handleReset = () => {
    setData(DEFAULT_SENSOR_DATA);
    setIsEditing(false);
  };

  const hoveredPoint = hoveredIndex !== null ? data[hoveredIndex] : null;

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in duration-300">
      <div className="border-b border-slate-800 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
            Raw Sensor Telemetry • Slide 05
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            Given Drone Meteorological Dataset
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-colors"
          >
            {isEditing ? (
              <>
                <Check className="w-3.5 h-3.5 text-green-400" /> Done
              </>
            ) : (
              <>
                <Edit3 className="w-3.5 h-3.5 text-cyan-400" /> Edit Telemetry
              </>
            )}
          </button>
          {isEditing && (
            <button
              onClick={handleReset}
              className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
              title="Reset default values"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Left Column (6 Cols): Interactive Telemetry Table */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-navy-900/80 border border-slate-800 rounded-2xl p-5 shadow-xl">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Database className="w-4 h-4 text-cyan-400" />
                Discrete Altitude-Temperature Table
              </span>
              <span className="text-[10px] font-mono text-cyan-300">
                Hover row to inspect chart
              </span>
            </div>

            <div className="overflow-hidden rounded-xl border border-slate-800">
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="bg-slate-950 text-cyan-300 font-mono text-[11px] border-b border-slate-800">
                    <th className="p-3">Node (i)</th>
                    <th className="p-3">Altitude x (m)</th>
                    <th className="p-3">Temperature y (°C)</th>
                    <th className="p-3">Lapse Drop (Δ)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80 font-mono">
                  {data.map((pt, idx) => {
                    const isHovered = hoveredIndex === idx;
                    const diffWithNext =
                      idx < data.length - 1 ? (data[idx + 1].y - pt.y).toFixed(1) : '—';

                    return (
                      <tr
                        key={pt.id}
                        onMouseEnter={() => setHoveredIndex(idx)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        className={`cursor-pointer transition-colors ${
                          isHovered
                            ? 'bg-cyan-950/80 text-white font-bold'
                            : 'hover:bg-slate-800/50 text-slate-300'
                        }`}
                      >
                        <td className="p-3 text-slate-500">{idx}</td>
                        <td className="p-3 text-cyan-300 font-bold">{pt.x} m</td>
                        <td className="p-3">
                          {isEditing ? (
                            <input
                              type="number"
                              step="0.1"
                              value={pt.y}
                              onChange={(e) => handleValueChange(idx, e.target.value)}
                              className="w-20 bg-slate-950 border border-slate-700 rounded px-2 py-0.5 text-xs text-amber-300"
                            />
                          ) : (
                            <span className="text-amber-400 font-semibold">{pt.y.toFixed(1)} °C</span>
                          )}
                        </td>
                        <td className="p-3 text-slate-400">{diffWithNext}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3 text-[11px] font-mono">
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-slate-400">Constant Step:</span>{' '}
                <span className="text-cyan-300 font-bold">h = 100 m</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-slate-400">Total Elevation:</span>{' '}
                <span className="text-cyan-300 font-bold">400 m</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (6 Cols): Synchronized Chart */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-navy-900/80 border border-slate-800 rounded-2xl p-5 shadow-xl">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                  Telemetry Profile Scatter & Sync
                </h4>
                <p className="text-[11px] text-slate-400">
                  {hoveredPoint
                    ? `Active inspection: x = ${hoveredPoint.x} m, y = ${hoveredPoint.y.toFixed(1)} °C`
                    : 'Hover over table rows to highlight points'}
                </p>
              </div>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data} margin={{ top: 10, right: 20, bottom: 20, left: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis
                    dataKey="x"
                    type="number"
                    domain={[0, 400]}
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
                        const pt = payload[0].payload as DataPoint;
                        return (
                          <div className="bg-navy-950 border border-cyan-500/50 p-2 rounded text-xs font-mono">
                            <div>Altitude: {pt.x} m</div>
                            <div className="text-amber-400 font-bold">Temperature: {pt.y.toFixed(1)} °C</div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Line
                    type="linear"
                    dataKey="y"
                    stroke="#38bdf8"
                    strokeWidth={2}
                    dot={{ r: 5, fill: '#06b6d4', stroke: '#ffffff', strokeWidth: 1.5 }}
                  />
                  {hoveredPoint && (
                    <ReferenceDot
                      x={hoveredPoint.x}
                      y={hoveredPoint.y}
                      r={9}
                      fill="#f59e0b"
                      stroke="#ffffff"
                      strokeWidth={2}
                    />
                  )}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
