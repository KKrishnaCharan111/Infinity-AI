import React from 'react';
import {
  CloudSun,
  Activity,
  Radio,
  Factory,
  Bot,
  Cpu,
  CheckCircle2,
} from 'lucide-react';

export const Slide07Relevance: React.FC = () => {
  const domains = [
    {
      title: 'Atmospheric Research & Sounding',
      icon: CloudSun,
      color: 'text-cyan-400 bg-cyan-950/40 border-cyan-500/40',
      example:
        'Vertical drone and weather balloon radiosondes sample pressure and temperature at fixed altitude tiers to estimate the boundary layer thermal inversion height.',
      note: 'Aids weather forecasting models without requiring continuous multi-kilometer sensor towers.',
    },
    {
      title: 'ECE Sensor Calibration & LUTs',
      icon: Activity,
      color: 'text-blue-400 bg-blue-950/40 border-blue-500/40',
      example:
        'Calibrating thermocouples, RTDs, or thermistors. Calibration laboratories provide discrete voltage-to-temperature calibration points at 10°C intervals.',
      note: 'Microcontrollers interpolate intermediate millivolt inputs without storing massive high-resolution tables.',
    },
    {
      title: 'Digital Signal Reconstruction',
      icon: Radio,
      color: 'text-indigo-400 bg-indigo-950/40 border-indigo-500/40',
      example:
        'Reconstructing missing audio or telemetry samples dropped during wireless packet loss over Bluetooth or telemetry RF links.',
      note: 'Finite difference approximations provide computationally lightweight interpolation when DSP cycles are constrained.',
    },
    {
      title: 'Industrial Measurement & PLCs',
      icon: Factory,
      color: 'text-teal-400 bg-teal-950/40 border-teal-500/40',
      example:
        'Industrial mass-flow meters and pressure transducers operating in hazardous petrochemical plants provide sparse calibration tables.',
      note: 'PLCs use forward difference approximations to compute instantaneous intermediate flow rates.',
    },
    {
      title: 'Robotics & Motion Trajectory',
      icon: Bot,
      color: 'text-amber-400 bg-amber-950/40 border-amber-500/40',
      example:
        'Autonomous mobile robot path planners generate waypoint waypoints at 100 ms intervals. Motor controllers interpolate intermediate velocity commands.',
      note: 'Prevents jerk and motor torque spikes between sparse navigational waypoints.',
    },
    {
      title: 'Embedded Systems & Edge DAQ',
      icon: Cpu,
      color: 'text-purple-400 bg-purple-950/40 border-purple-500/40',
      example:
        'Low-cost 8-bit and 32-bit microcontrollers (e.g., STM32, ESP32) with limited Flash memory store sparse 5-to-10 point calibration curves.',
      note: 'Forward differences execute in integer fixed-point math using only basic adds and shifts.',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in duration-300">
      <div className="border-b border-slate-800 pb-3">
        <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
          Practical Engineering Scope • Slide 07
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
          Engineering & ECE Relevance Across Technical Domains
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Practical applications of finite-difference numerical interpolation in modern electronic systems.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {domains.map((dom, idx) => {
          const Icon = dom.icon;
          return (
            <div
              key={idx}
              className={`p-4 rounded-2xl border transition-all hover:scale-[1.01] flex flex-col justify-between ${dom.color}`}
            >
              <div>
                <div className="flex items-center gap-2.5 mb-2.5">
                  <div className="p-2 rounded-xl bg-slate-900/90 border border-slate-800">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h3 className="text-xs font-bold text-white">{dom.title}</h3>
                </div>

                <div className="text-xs text-slate-300 leading-relaxed space-y-1">
                  <div className="font-semibold text-slate-200">Practical Example:</div>
                  <p>{dom.example}</p>
                </div>
              </div>

              <div className="mt-3 pt-2.5 border-t border-slate-800/60 text-[11px] text-slate-400 italic flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                <span>{dom.note}</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="p-3.5 rounded-xl bg-slate-900/50 border border-slate-800 text-xs text-slate-400">
        <strong>Academic Nuance:</strong> While sophisticated production flight controllers may deploy extended Kalman filters or spline interpolators, finite difference methods provide the fundamental, mathematically transparent bedrock for discrete sensor modeling.
      </div>
    </div>
  );
};
