import React, { useState } from 'react';
import {
  Compass,
  Cpu,
  Table,
  Sigma,
  Calculator,
  LineChart,
  ShieldCheck,
  Sliders,
  Award,
  ChevronRight,
  Database,
} from 'lucide-react';

interface Slide02RoadmapProps {
  onSelectSlide: (slideNum: number) => void;
}

export const Slide02Roadmap: React.FC<Slide02RoadmapProps> = ({ onSelectSlide }) => {
  const [activeStage, setActiveStage] = useState<number>(0);

  const stages = [
    {
      id: 1,
      title: '1. Real-World Problem',
      slideTarget: 3,
      desc: 'Ascending weather drone sounding and telemetry gap at 175 m',
      icon: Compass,
      color: 'border-cyan-500/50 text-cyan-400 bg-cyan-950/20',
    },
    {
      id: 2,
      title: '2. Sensor Data',
      slideTarget: 5,
      desc: 'Equally spaced temperature readings at 0, 100, 200, 300, 400 m',
      icon: Database,
      color: 'border-blue-500/50 text-blue-400 bg-blue-950/20',
    },
    {
      id: 3,
      title: '3. Mathematical Concept',
      slideTarget: 6,
      desc: 'Interpolation versus risky extrapolation within sampled limits',
      icon: Sigma,
      color: 'border-indigo-500/50 text-indigo-400 bg-indigo-950/20',
    },
    {
      id: 4,
      title: '4. Forward-Difference Table',
      slideTarget: 10,
      desc: 'Finite difference operators Δ, Δ² and diagonal coefficient table',
      icon: Table,
      color: 'border-cyan-400/50 text-cyan-300 bg-cyan-950/30',
    },
    {
      id: 5,
      title: '5. Formula Derivation',
      slideTarget: 13,
      desc: 'Gregory–Newton polynomial derived from binomial shift operator (1+Δ)^u',
      icon: Cpu,
      color: 'border-sky-500/50 text-sky-400 bg-sky-950/20',
    },
    {
      id: 6,
      title: '6. Numerical Calculation',
      slideTarget: 14,
      desc: 'Normalized u = 1.75 and exact substitution yielding 24.365625 °C',
      icon: Calculator,
      color: 'border-amber-500/50 text-amber-400 bg-amber-950/20',
    },
    {
      id: 7,
      title: '7. Graphical Interpretation',
      slideTarget: 16,
      desc: 'Continuous polynomial curve and target intersection guidelines',
      icon: LineChart,
      color: 'border-emerald-500/50 text-emerald-400 bg-emerald-950/20',
    },
    {
      id: 8,
      title: '8. Engineering Applications',
      slideTarget: 7,
      desc: 'Embedded firmware, ECE sensor calibration, avionics & robotics',
      icon: ShieldCheck,
      color: 'border-teal-500/50 text-teal-400 bg-teal-950/20',
    },
    {
      id: 9,
      title: '9. Live Simulator',
      slideTarget: 22,
      desc: 'Interactive mathematical lab with real-time editing & calculation',
      icon: Sliders,
      color: 'border-amber-400/60 text-amber-300 bg-amber-950/30 font-bold',
    },
    {
      id: 10,
      title: '10. Conclusions & Viva',
      slideTarget: 24,
      desc: 'Experiential reflections, error analysis & faculty viva defense bank',
      icon: Award,
      color: 'border-purple-500/50 text-purple-400 bg-purple-950/20',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in duration-300">
      <div className="border-b border-slate-800 pb-3">
        <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
          Presentation Roadmap • Complete Learning Journey
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
          From Sensor Sounding to Finite Differences & Live Simulation
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Click any phase below to explore its objectives, or use presentation navigation to proceed sequentially.
        </p>
      </div>

      {/* Grid of 10 Stages */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
        {stages.map((stage, idx) => {
          const Icon = stage.icon;
          const isSelected = activeStage === idx;

          return (
            <div
              key={stage.id}
              onClick={() => setActiveStage(idx)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between group ${
                stage.color
              } ${
                isSelected
                  ? 'ring-2 ring-cyan-400 shadow-xl scale-[1.02]'
                  : 'hover:border-slate-700 hover:scale-[1.01]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 rounded-xl bg-slate-900/80 border border-slate-800 group-hover:scale-110 transition-transform">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-slate-900/80 text-slate-400">
                    Step {stage.id.toString().padStart(2, '0')}
                  </span>
                </div>

                <h3 className="text-xs font-bold text-white mb-1 leading-snug group-hover:text-cyan-300 transition-colors">
                  {stage.title}
                </h3>
                <p className="text-[11px] text-slate-300 line-clamp-3 leading-relaxed">
                  {stage.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectSlide(stage.slideTarget);
                  }}
                  className="text-[10px] font-bold text-cyan-400 group-hover:text-cyan-200 flex items-center gap-1 hover:underline"
                >
                  Jump to Slide {stage.slideTarget} <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Active Stage Callout */}
      <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold">
            Focused Stage Overview
          </span>
          <h4 className="text-sm font-bold text-white mt-0.5">{stages[activeStage].title}</h4>
          <p className="text-xs text-slate-300">{stages[activeStage].desc}</p>
        </div>

        <button
          onClick={() => onSelectSlide(stages[activeStage].slideTarget)}
          className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-navy-950 font-bold text-xs shrink-0 transition-colors shadow-md shadow-cyan-500/20"
        >
          Navigate to Section
        </button>
      </div>
    </div>
  );
};
