import React, { useState } from 'react';
import { AtmosphereGraphic } from '../common/AtmosphereGraphic.tsx';
import { DroneGraphic } from '../common/DroneGraphic.tsx';
import { MathView } from '../common/MathView.tsx';
import { Wind, Gauge, AlertCircle, Play, Pause } from 'lucide-react';

interface Slide03ScenarioProps {
  reducedMotion: boolean;
}

export const Slide03Scenario: React.FC<Slide03ScenarioProps> = ({ reducedMotion }) => {
  const [altitude, setAltitude] = useState<number>(100);
  const [isAscending, setIsAscending] = useState<boolean>(false);

  const altitudes = [0, 100, 200, 300, 400];

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in duration-300">
      <div className="border-b border-slate-800 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
            Operational Engineering Context • Slide 03
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            Real-World Scenario: Atmospheric Drone Sounding
          </h2>
        </div>
        <div className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono">
          Simplified Educational Case Study
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Left Column (7 Cols): Narrative & Scientific Context */}
        <div className="lg:col-span-7 space-y-4">
          <div className="p-4 rounded-2xl bg-navy-900/60 border border-slate-800 space-y-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Wind className="w-4 h-4 text-cyan-400" />
              The Mission: Vertical Lapse Rate Profiling
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              A meteorological research quadcopter rises vertically through the lower boundary layer of the atmosphere. To optimize onboard battery longevity and telemetry transmission bandwidth, its digital thermal sensor samples ambient air temperature at discrete, uniformly spaced intervals of <MathView math="h = 100\text{ m}" />.
            </p>
          </div>

          {/* Cards for Situation, Challenge, Why It Matters */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3.5 rounded-xl bg-slate-900/70 border border-cyan-500/30">
              <div className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 mb-1">
                The Engineering Dilemma
              </div>
              <h4 className="text-xs font-bold text-white mb-1">Telemetry Discontinuity</h4>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Sensors do not sample continuously at every centimeter. Physical gaps exist between sampled points where microclimates or inversions may occur.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/70 border border-amber-500/30">
              <div className="text-[10px] font-bold uppercase tracking-wider text-amber-400 mb-1">
                The Practical Need
              </div>
              <h4 className="text-xs font-bold text-white mb-1">Critical Altitude Query</h4>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Flight controllers, acoustic sounders, or environmental models require the estimated temperature at <strong className="text-white">175 m</strong>—an unsampled intermediate level.
              </p>
            </div>
          </div>

          {/* Interactive Altitude Switcher */}
          <div className="p-4 rounded-xl bg-navy-950/80 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-300">Test Drone Telemetry Altitude:</span>
              <span className="font-mono text-cyan-300 font-bold">{altitude} m</span>
            </div>
            <div className="flex items-center gap-2">
              {altitudes.map((alt) => (
                <button
                  key={alt}
                  onClick={() => setAltitude(alt)}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-mono transition-all ${
                    altitude === alt
                      ? 'bg-cyan-500 text-navy-950 font-bold shadow-md shadow-cyan-500/20'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {alt}m
                </button>
              ))}
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/50 border border-slate-800 text-[11px] text-slate-400 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <span>
              <strong>Scientific Disclaimer:</strong> In real atmospheric science, lapse rates are influenced by humidity, turbulence, and solar heating. For this experiential learning study, we model the standard localized negative gradient.
            </span>
          </div>
        </div>

        {/* Right Column (5 Cols): Animated Atmospheric Column & Drone Graphic */}
        <div className="lg:col-span-5 space-y-4">
          <AtmosphereGraphic
            currentAltitude={altitude}
            targetAltitude={175}
            onSelectAltitude={(alt) => setAltitude(alt)}
          />

          <div className="flex items-center justify-center">
            <DroneGraphic
              className="w-48 h-32"
              altitude={altitude}
              temperature={altitude === 0 ? 28.5 : altitude === 100 ? 26.1 : altitude === 200 ? 23.8 : altitude === 300 ? 21.6 : 19.5}
              reducedMotion={reducedMotion}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
