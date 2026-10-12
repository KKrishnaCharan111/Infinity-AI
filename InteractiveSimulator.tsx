import React, { useState, useMemo, useEffect } from 'react';
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
import {
  RotateCcw,
  Play,
  Pause,
  Plus,
  Trash2,
  AlertTriangle,
  CheckCircle2,
  Sliders,
  ChevronDown,
  ChevronUp,
  Info,
  Layers,
  ArrowRight,
  TrendingDown,
  Sparkles,
  Calculator,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { DataPoint, InterpolationResult } from '../../types/index.ts';
import {
  calculateInterpolation,
  computeForwardDifferenceTable,
  DEFAULT_SENSOR_DATA,
} from '../../math/interpolation.ts';
import { MathView } from '../common/MathView.tsx';

interface InteractiveSimulatorProps {
  initialTarget?: number;
  compact?: boolean;
}

export const InteractiveSimulator: React.FC<InteractiveSimulatorProps> = ({
  initialTarget = 175,
  compact = false,
}) => {
  // State
  const [dataPoints, setDataPoints] = useState<DataPoint[]>(DEFAULT_SENSOR_DATA);
  const [targetAltitude, setTargetAltitude] = useState<number>(initialTarget);
  const [method, setMethod] = useState<'forward' | 'backward'>('forward');
  const [showIntermediate, setShowIntermediate] = useState<boolean>(true);
  const [showGraph, setShowGraph] = useState<boolean>(true);
  const [showRawPoints, setShowRawPoints] = useState<boolean>(true);
  const [showCurve, setShowCurve] = useState<boolean>(true);

  // Simulation Animation Playback
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simStep, setSimStep] = useState<number>(0);

  // Compute live mathematical result
  const result: InterpolationResult = useMemo(() => {
    return calculateInterpolation(dataPoints, targetAltitude, method);
  }, [dataPoints, targetAltitude, method]);

  // Simulation step-by-step playback runner
  useEffect(() => {
    let timer: any = null;
    if (isSimulating) {
      timer = setInterval(() => {
        setSimStep((prev) => {
          if (prev >= 4) {
            setIsSimulating(false);
            try {
              confetti({ particleCount: 50, spread: 60, origin: { y: 0.8 } });
            } catch (e) {}
            return 4;
          }
          return prev + 1;
        });
      }, 1200);
    }
    return () => clearInterval(timer);
  }, [isSimulating]);

  const handleStartSimulation = () => {
    setSimStep(0);
    setIsSimulating(true);
  };

  // Handlers for table editing
  const handlePointChange = (index: number, field: 'x' | 'y', value: string) => {
    const num = parseFloat(value);
    const updated = [...dataPoints];
    updated[index] = {
      ...updated[index],
      [field]: isNaN(num) ? 0 : num,
    };
    setDataPoints(updated);
  };

  const handleAddRow = () => {
    const last = dataPoints[dataPoints.length - 1];
    const prev = dataPoints[dataPoints.length - 2];
    const step = last && prev ? last.x - prev.x : 100;
    const newX = last ? last.x + step : 0;
    const newY = last ? Math.round((last.y - 2.0) * 10) / 10 : 20.0;
    setDataPoints([
      ...dataPoints,
      { id: `p_${Date.now()}`, x: newX, y: newY },
    ]);
  };

  const handleRemoveRow = (index: number) => {
    if (dataPoints.length <= 2) return;
    const updated = dataPoints.filter((_, i) => i !== index);
    setDataPoints(updated);
  };

  const handleResetData = () => {
    setDataPoints(DEFAULT_SENSOR_DATA);
    setTargetAltitude(175);
    setMethod('forward');
    setSimStep(0);
    setIsSimulating(false);
  };

  // Combine curve points and original points for chart
  const minX = dataPoints[0]?.x ?? 0;
  const maxX = dataPoints[dataPoints.length - 1]?.x ?? 400;

  const chartData = useMemo(() => {
    if (!result.isValid) return [];
    // Start with interpolated smooth curve points
    const map = new Map<number, { x: number; curveY?: number; rawY?: number }>();

    result.curvePoints.forEach((pt) => {
      map.set(pt.x, { x: pt.x, curveY: pt.y });
    });

    // Merge original data points
    dataPoints.forEach((dp) => {
      const existing = map.get(dp.x);
      if (existing) {
        existing.rawY = dp.y;
      } else {
        map.set(dp.x, { x: dp.x, rawY: dp.y });
      }
    });

    return Array.from(map.values()).sort((a, b) => a.x - b.x);
  }, [result, dataPoints]);

  return (
    <div className="w-full bg-navy-950/90 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-2xl backdrop-blur-md space-y-6">
      {/* Top Banner & Mode Toggle */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
              <Sliders className="w-4 h-4" />
            </span>
            <h3 className="text-base font-bold text-white">
              Interactive Newton–Gregory Simulator
            </h3>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800">
              Live Engine v2.0
            </span>
          </div>
          <p className="text-xs text-slate-400">
            Real-time finite difference computation, polynomial term evaluation, and curve tracking.
          </p>
        </div>

        {/* Global Action Buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-1 flex items-center text-xs">
            <button
              onClick={() => setMethod('forward')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                method === 'forward'
                  ? 'bg-cyan-500 text-navy-950 font-bold shadow-md shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Forward Formula
            </button>
            <button
              onClick={() => setMethod('backward')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                method === 'backward'
                  ? 'bg-cyan-500 text-navy-950 font-bold shadow-md shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Backward Formula
            </button>
          </div>

          <button
            onClick={handleStartSimulation}
            disabled={isSimulating || !result.isValid}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-navy-950 font-bold text-xs shadow-md shadow-amber-500/20 disabled:opacity-50 transition-all"
            title="Animate the 5-step numerical computation pipeline"
          >
            {isSimulating ? (
              <>
                <Pause className="w-3.5 h-3.5 animate-spin" />
                <span>Simulating...</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5" />
                <span>Run Simulation</span>
              </>
            )}
          </button>

          <button
            onClick={handleResetData}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white transition-colors"
            title="Reset to original drone dataset"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Simulation Stepper Pipeline Indicator (when simulation triggered) */}
      {(isSimulating || simStep > 0) && (
        <div className="bg-slate-900/90 border border-cyan-500/40 rounded-xl p-3.5 animate-in fade-in duration-300">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-cyan-300 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              Automated Simulation Pipeline
            </span>
            <span className="text-[11px] font-mono text-slate-400">Step {simStep + 1} of 5</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs">
            {[
              '1. Ingest Sensor Altitudes',
              '2. Check Uniform Grid h',
              '3. Compute Difference Table',
              '4. Map Dimensionless u',
              '5. Summate Polynomial Terms',
            ].map((stepLabel, idx) => (
              <div
                key={idx}
                className={`p-2 rounded-lg border text-center transition-all ${
                  simStep === idx
                    ? 'bg-cyan-950 border-cyan-400 text-cyan-200 font-bold shadow-md shadow-cyan-500/20 scale-105'
                    : simStep > idx
                    ? 'bg-slate-900 border-emerald-600/60 text-emerald-300 font-medium'
                    : 'bg-slate-950 border-slate-800 text-slate-500'
                }`}
              >
                {stepLabel}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Validation or Spacing Warning Banner */}
      {!result.isValid && (
        <div className="bg-red-950/40 border border-red-500/50 rounded-xl p-3 flex items-start gap-3 text-red-200 text-xs">
          <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
          <div>
            <div className="font-bold text-red-300 mb-0.5">Numerical Validation Alert</div>
            <div>{result.errorMessage}</div>
          </div>
        </div>
      )}

      {result.warnings && result.warnings.length > 0 && (
        <div className="bg-amber-950/40 border border-amber-500/50 rounded-xl p-3 flex items-start gap-3 text-amber-200 text-xs">
          <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <div className="font-bold text-amber-300 mb-0.5">Extrapolation Warning</div>
            <div>{result.warnings[0]}</div>
          </div>
        </div>
      )}

      {/* Target Altitude Control Section */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span className="text-xs uppercase font-bold text-slate-400 tracking-wider">
              Target Altitude Parameter
            </span>
            <h4 className="text-sm font-semibold text-white flex items-center gap-2">
              <span>x = {targetAltitude} m</span>
              {result.isValid && (
                <span className="text-xs font-mono text-cyan-300">
                  (u = {result.u.toFixed(4)})
                </span>
              )}
            </h4>
          </div>

          {/* Quick preset buttons */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[11px] text-slate-500 mr-1">Presets:</span>
            {[50, 125, 175, 250, 350].map((preset) => (
              <button
                key={preset}
                onClick={() => setTargetAltitude(preset)}
                className={`px-2 py-0.5 rounded text-xs font-mono transition-colors ${
                  targetAltitude === preset
                    ? 'bg-amber-500 text-navy-950 font-bold'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {preset}m
              </button>
            ))}
          </div>
        </div>

        {/* Dual Input: Slider & Numeric Input */}
        <div className="flex items-center gap-4">
          <input
            type="range"
            min={Math.min(0, minX)}
            max={Math.max(450, maxX + 50)}
            step={5}
            value={targetAltitude}
            onChange={(e) => setTargetAltitude(parseFloat(e.target.value))}
            className="flex-1 h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
          />
          <div className="flex items-center gap-1.5">
            <input
              type="number"
              value={targetAltitude}
              onChange={(e) => setTargetAltitude(parseFloat(e.target.value) || 0)}
              className="w-20 bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1 text-xs font-mono text-cyan-300 text-right focus:outline-none focus:border-cyan-400"
            />
            <span className="text-xs text-slate-400 font-mono">m</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Left Side Data & Difference Table | Right Side Graph & Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (5 Cols): Data Editor & Live Difference Table */}
        <div className="lg:col-span-5 space-y-4">
          {/* Editable Sensor Data Table */}
          <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                <Calculator className="w-3.5 h-3.5 text-cyan-400" />
                Raw Telemetry Nodes
              </div>
              <button
                onClick={handleAddRow}
                className="flex items-center gap-1 px-2 py-1 rounded bg-cyan-950 border border-cyan-800 hover:bg-cyan-900 text-cyan-300 text-[11px] font-semibold transition-colors"
                title="Add new sensor node"
              >
                <Plus className="w-3 h-3" /> Add Point
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 text-[11px]">
                    <th className="pb-2 w-8">#</th>
                    <th className="pb-2">Altitude x (m)</th>
                    <th className="pb-2">Temp y (°C)</th>
                    <th className="pb-2 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-mono">
                  {dataPoints.map((point, index) => {
                    const isContributing =
                      method === 'forward' ? index === 0 : index === dataPoints.length - 1;
                    return (
                      <tr
                        key={point.id}
                        className={`hover:bg-slate-800/40 transition-colors ${
                          isContributing ? 'bg-cyan-950/20' : ''
                        }`}
                      >
                        <td className="py-1.5 text-slate-500 text-[11px]">{index}</td>
                        <td className="py-1.5 pr-2">
                          <input
                            type="number"
                            value={point.x}
                            onChange={(e) => handlePointChange(index, 'x', e.target.value)}
                            className="w-20 bg-slate-950 border border-slate-800 hover:border-slate-700 rounded px-2 py-0.5 text-slate-200 text-xs focus:outline-none focus:border-cyan-400"
                          />
                        </td>
                        <td className="py-1.5 pr-2">
                          <input
                            type="number"
                            step="0.1"
                            value={point.y}
                            onChange={(e) => handlePointChange(index, 'y', e.target.value)}
                            className="w-20 bg-slate-950 border border-slate-800 hover:border-slate-700 rounded px-2 py-0.5 text-amber-300 text-xs focus:outline-none focus:border-cyan-400"
                          />
                        </td>
                        <td className="py-1.5 text-right">
                          <button
                            onClick={() => handleRemoveRow(index)}
                            disabled={dataPoints.length <= 2}
                            className="text-slate-600 hover:text-red-400 disabled:opacity-30 disabled:hover:text-slate-600 transition-colors p-1"
                            title="Remove row"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="mt-2 text-[11px] text-slate-500 italic">
              Constant interval <MathView math={`h = ${result.h} \\text{ m}`} /> detected.
            </div>
          </div>

          {/* Generated Forward Difference Table */}
          {result.isValid && (
            <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="text-xs font-bold text-white uppercase tracking-wider">
                  Computed Difference Table (Δ)
                </div>
                <span className="text-[10px] font-mono text-cyan-400">
                  Diagonal highlighted
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-xs text-center border-collapse">
                  <thead>
                    <tr className="border-b border-slate-800 text-[10px] text-slate-400">
                      <th className="p-1">x</th>
                      <th className="p-1">y</th>
                      <th className="p-1 text-cyan-400">Δy</th>
                      <th className="p-1 text-sky-400">Δ²y</th>
                      {result.degree >= 3 && <th className="p-1 text-amber-400">Δ³y</th>}
                      {result.degree >= 4 && <th className="p-1 text-purple-400">Δ⁴y</th>}
                    </tr>
                  </thead>
                  <tbody className="font-mono text-[11px]">
                    {result.table.map((row, rIdx) => (
                      <tr key={rIdx} className="border-b border-slate-800/40">
                        <td className="p-1 text-slate-400">{row.x}</td>
                        <td
                          className={`p-1 font-semibold ${
                            rIdx === 0 && method === 'forward'
                              ? 'text-cyan-300 bg-cyan-950/60 rounded'
                              : 'text-slate-200'
                          }`}
                        >
                          {row.y.toFixed(1)}
                        </td>
                        {row.diffs.map((diff, dIdx) => {
                          const isTopDiagonal = rIdx === 0 && method === 'forward';
                          return (
                            <td
                              key={dIdx}
                              className={`p-1 ${
                                isTopDiagonal
                                  ? 'text-cyan-300 font-bold bg-cyan-950/40 rounded'
                                  : 'text-slate-400'
                              }`}
                            >
                              {diff !== undefined ? diff.toFixed(dIdx >= 1 ? 1 : 1) : '—'}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Right Column (7 Cols): Synchronized Graph & Term Breakdown */}
        <div className="lg:col-span-7 space-y-4">
          {/* Synchronized Graph */}
          {showGraph && result.isValid && (
            <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-4">
              <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                <div>
                  <div className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                    <span>Telemetry Curve & Guideline Tracking</span>
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Continuous polynomial interpolation curve
                  </div>
                </div>

                {/* Layer Toggles */}
                <div className="flex items-center gap-2 text-[11px]">
                  <label className="flex items-center gap-1 text-slate-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={showRawPoints}
                      onChange={(e) => setShowRawPoints(e.target.checked)}
                      className="rounded bg-slate-800 border-slate-700 text-cyan-400"
                    />
                    <span>Nodes</span>
                  </label>
                  <label className="flex items-center gap-1 text-slate-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={showCurve}
                      onChange={(e) => setShowCurve(e.target.checked)}
                      className="rounded bg-slate-800 border-slate-700 text-cyan-400"
                    />
                    <span>Curve</span>
                  </label>
                </div>
              </div>

              {/* Chart */}
              <div className="h-64 sm:h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart
                    data={chartData}
                    margin={{ top: 10, right: 20, bottom: 20, left: 10 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                    <XAxis
                      dataKey="x"
                      type="number"
                      domain={['auto', 'auto']}
                      unit=" m"
                      stroke="#64748b"
                      fontSize={11}
                    />
                    <YAxis
                      dataKey="curveY"
                      type="number"
                      domain={['auto', 'auto']}
                      unit="°C"
                      stroke="#64748b"
                      fontSize={11}
                    />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload;
                          return (
                            <div className="bg-navy-950 border border-cyan-500/50 p-2.5 rounded-lg shadow-xl text-xs font-mono">
                              <div className="text-slate-300">Altitude: {data.x} m</div>
                              {data.curveY !== undefined && (
                                <div className="text-cyan-400">
                                  Curve: {data.curveY.toFixed(3)} °C
                                </div>
                              )}
                              {data.rawY !== undefined && (
                                <div className="text-amber-400 font-bold">
                                  Raw Node: {data.rawY.toFixed(2)} °C
                                </div>
                              )}
                            </div>
                          );
                        }
                        return null;
                      }}
                    />

                    {/* Smooth Interpolation Line */}
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

                    {/* Original Raw Data Points */}
                    {showRawPoints && (
                      <Scatter
                        dataKey="rawY"
                        fill="#f59e0b"
                        stroke="#fef08a"
                        strokeWidth={1.5}
                        isAnimationActive={false}
                      />
                    )}

                    {/* Vertical guideline at target altitude */}
                    <ReferenceLine
                      x={targetAltitude}
                      stroke="#f59e0b"
                      strokeDasharray="4 4"
                      strokeWidth={1.5}
                      label={{
                        value: `${targetAltitude}m`,
                        fill: '#f59e0b',
                        fontSize: 10,
                        position: 'top',
                      }}
                    />

                    {/* Horizontal guideline at estimated temperature */}
                    {result.isValid && !isNaN(result.yTarget) && (
                      <ReferenceLine
                        y={result.yTarget}
                        stroke="#22d3ee"
                        strokeDasharray="4 4"
                        strokeWidth={1.5}
                        label={{
                          value: `${result.yTarget.toFixed(2)}°C`,
                          fill: '#22d3ee',
                          fontSize: 10,
                          position: 'right',
                        }}
                      />
                    )}

                    {/* Marker at target */}
                    {result.isValid && !isNaN(result.yTarget) && (
                      <ReferenceDot
                        x={targetAltitude}
                        y={result.yTarget}
                        r={6}
                        fill="#f59e0b"
                        stroke="#ffffff"
                        strokeWidth={2}
                      />
                    )}
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {/* Computed Output Highlight Card */}
          {result.isValid && (
            <div className="bg-gradient-to-br from-navy-900 via-navy-850 to-slate-900 border border-cyan-500/50 rounded-2xl p-4 sm:p-5 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold mb-1">
                    Interpolated Temperature Result
                  </div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-white flex items-baseline gap-2">
                    <span className="text-amber-400">
                      T({targetAltitude} m) = {result.yTarget.toFixed(6)} °C
                    </span>
                  </div>
                  <div className="text-xs text-slate-400 mt-1">
                    Standard rounded representation:{' '}
                    <span className="text-white font-bold font-mono">
                      {result.yTarget.toFixed(2)} °C
                    </span>
                  </div>
                </div>

                <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3 text-xs space-y-1 font-mono">
                  <div className="text-slate-400 flex justify-between gap-3">
                    <span>Base (x₀):</span> <span className="text-cyan-300">{result.x0} m</span>
                  </div>
                  <div className="text-slate-400 flex justify-between gap-3">
                    <span>Step (h):</span> <span className="text-cyan-300">{result.h} m</span>
                  </div>
                  <div className="text-slate-400 flex justify-between gap-3">
                    <span>u parameter:</span> <span className="text-amber-300">{result.u.toFixed(4)}</span>
                  </div>
                </div>
              </div>

              {/* Term-by-term summation breakdown */}
              {showIntermediate && (
                <div className="mt-4 pt-4 border-t border-slate-800">
                  <div className="text-xs font-bold text-slate-300 mb-2 flex items-center justify-between">
                    <span>Polynomial Term Contribution Breakdown:</span>
                    <span className="text-[10px] text-slate-500 font-mono">P(x) = ∑ terms</span>
                  </div>

                  <div className="space-y-1.5 text-xs font-mono">
                    {result.terms.map((term) => (
                      <div
                        key={term.index}
                        className={`flex items-center justify-between p-2 rounded-lg border ${term.colorClass}`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="font-bold">Term {term.index}:</span>
                          <span className="text-[11px] opacity-80">{term.label}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="font-bold">
                            {term.termValue >= 0 ? `+${term.termValue.toFixed(6)}` : term.termValue.toFixed(6)}
                          </span>
                          <span className="text-slate-400 text-[10px]">
                            Sum: {term.runningSum.toFixed(4)} °C
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
