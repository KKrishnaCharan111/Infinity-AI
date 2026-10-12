import React from 'react';
import { Sliders, Play, RotateCcw, ArrowRight, CheckCircle2, Layers } from 'lucide-react';

interface Slide21SimulatorIntroProps {
  onGoToSimulator: () => void;
}

export const Slide21SimulatorIntro: React.FC<Slide21SimulatorIntroProps> = ({ onGoToSimulator }) => {
  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in duration-300">
      <div className="border-b border-slate-800 pb-3">
        <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
          Interactive Experiential Lab • Slide 21
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
          Interactive Simulator: Architecture & User Guide
        </h2>
      </div>

      <div className="bg-gradient-to-br from-navy-900 via-navy-850 to-slate-900 border-2 border-amber-500/50 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400">
              Real-Time Computing Engine
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              “Change the target altitude, adjust sensor data, and observe real-time recalculation.”
            </h3>
            <p className="text-xs text-slate-300">
              The next slide embeds our custom numerical interpolation engine executing live in TypeScript.
            </p>
          </div>

          <button
            onClick={onGoToSimulator}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-navy-950 font-black text-sm shadow-xl shadow-amber-500/25 transition-all hover:scale-105 active:scale-95 shrink-0"
          >
            <span>Launch Live Simulator</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* 4 Feature Guide Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5 text-xs">
            <div className="font-bold text-cyan-300 flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-cyan-400" />
              1. Real-Time Altitude Slider
            </div>
            <p className="text-slate-400 text-[11px]">
              Drag the altitude slider or enter any number (0 m to 450 m). Watch parameter u update continuously.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5 text-xs">
            <div className="font-bold text-sky-300 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-sky-400" />
              2. Inline Table Editor
            </div>
            <p className="text-slate-400 text-[11px]">
              Edit raw temperature values, add sensor nodes, or test non-uniform spacings to test validation alerts.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5 text-xs">
            <div className="font-bold text-amber-300 flex items-center gap-1.5">
              <Play className="w-3.5 h-3.5 text-amber-400" />
              3. Run Simulation Mode
            </div>
            <p className="text-slate-400 text-[11px]">
              Step through the automated 5-stage algorithm pipeline with synchronized animated step indicators.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5 text-xs">
            <div className="font-bold text-emerald-300 flex items-center gap-1.5">
              <RotateCcw className="w-3.5 h-3.5 text-emerald-400" />
              4. Forward / Backward Toggle
            </div>
            <p className="text-slate-400 text-[11px]">
              Switch between Forward and Backward methods and observe identical mathematical polynomial agreement!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
