import React, { useState } from 'react';
import { DroneGraphic } from '../common/DroneGraphic.tsx';
import { MathView } from '../common/MathView.tsx';
import { DEFAULT_TEAM_MEMBERS } from '../../data/presentationData.ts';
import { Sparkles, Edit3, Check, Award, ArrowRight } from 'lucide-react';

interface Slide01TitleProps {
  onNext: () => void;
  reducedMotion: boolean;
}

export const Slide01Title: React.FC<Slide01TitleProps> = ({ onNext, reducedMotion }) => {
  const [team, setTeam] = useState(DEFAULT_TEAM_MEMBERS);
  const [isEditingTeam, setIsEditingTeam] = useState(false);

  const handleUpdateName = (index: number, newName: string) => {
    const updated = [...team];
    updated[index].name = newName;
    setTeam(updated);
  };

  const handleUpdateUSN = (index: number, newUSN: string) => {
    const updated = [...team];
    updated[index].usn = newUSN;
    setTeam(updated);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
      {/* Top Badge */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-semibold tracking-wide">
          <Award className="w-3.5 h-3.5 text-amber-400" />
          <span>EXPERIENTIAL LEARNING • APPLICATION CASE STUDY</span>
        </div>
        <div className="text-xs font-mono text-slate-400">
          ECE / Engineering Mathematics | Academic Presentation
        </div>
      </div>

      {/* Hero Presentation Header & Visualizer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-gradient-to-br from-navy-900/90 via-navy-850/80 to-slate-900/90 border border-cyan-500/30 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />

        {/* Left Column: Titles & Case Context */}
        <div className="lg:col-span-7 space-y-4">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Newton–Gregory <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-amber-300">
              Forward Interpolation
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 font-medium leading-relaxed">
            Estimating atmospheric temperature at an unmeasured altitude using research drone telemetry.
          </p>

          <div className="p-4 rounded-xl bg-navy-950/70 border border-slate-800 space-y-2 text-xs">
            <div className="flex items-center gap-2 text-amber-400 font-semibold">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span>Operational Flight Mission Profile:</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-slate-300 font-mono text-[11px]">
              <div>• Domain: Planetary Boundary Layer</div>
              <div>• Interval: <MathView math="h = 100\text{ m}" /></div>
              <div>• Target: <MathView math="x = 175\text{ m}" /></div>
            </div>
          </div>

          <div className="pt-2 flex items-center gap-3">
            <button
              onClick={onNext}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-navy-950 font-bold text-sm shadow-lg shadow-cyan-500/25 transition-all hover:scale-105 active:scale-95"
            >
              <span>Begin Presentation</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right Column: Realistic Scientific Drone */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center">
          <DroneGraphic
            className="w-full max-w-sm h-64 sm:h-72"
            altitude={175}
            temperature={24.37}
            reducedMotion={reducedMotion}
          />
          <div className="text-center mt-2 text-xs text-slate-400">
            Meteorological Telemetry Quadcopter Drone
          </div>
        </div>
      </div>

      {/* Team Members Roster & Editable Placeholders */}
      <div className="bg-navy-900/40 border border-slate-800/80 rounded-2xl p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-400">
              Project Team Roster & Faculty Evaluation Record
            </h3>
            <p className="text-[11px] text-slate-400">
              Assigned presenter modules and university seat numbers (USN)
            </p>
          </div>
          <button
            onClick={() => setIsEditingTeam(!isEditingTeam)}
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-colors"
          >
            {isEditingTeam ? (
              <>
                <Check className="w-3.5 h-3.5 text-green-400" /> Done Editing
              </>
            ) : (
              <>
                <Edit3 className="w-3.5 h-3.5 text-cyan-400" /> Edit Members
              </>
            )}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {team.map((member, idx) => (
            <div
              key={member.id}
              className={`p-3 rounded-xl border transition-all ${
                member.role === 'Leader'
                  ? 'bg-cyan-950/30 border-cyan-500/50'
                  : 'bg-slate-900/60 border-slate-800'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    member.role === 'Leader'
                      ? 'bg-amber-500 text-navy-950 font-black'
                      : 'bg-slate-800 text-slate-300'
                  }`}
                >
                  {member.role}
                </span>
                <span className="text-[10px] text-slate-500 font-mono">Member #{idx + 1}</span>
              </div>

              {isEditingTeam ? (
                <div className="space-y-1.5 mt-2">
                  <input
                    type="text"
                    value={member.name}
                    onChange={(e) => handleUpdateName(idx, e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded px-2 py-1 text-xs text-white"
                    placeholder="Member Name"
                  />
                  <input
                    type="text"
                    value={member.usn}
                    onChange={(e) => handleUpdateUSN(idx, e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded px-2 py-1 text-xs text-cyan-300 font-mono"
                    placeholder="USN"
                  />
                </div>
              ) : (
                <div className="mt-1">
                  <h4 className="text-xs font-bold text-white tracking-wide">{member.name}</h4>
                  <div className="text-[11px] font-mono text-cyan-300">{member.usn}</div>
                  <div className="text-[10px] text-slate-400 mt-1 line-clamp-1">{member.topic}</div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
