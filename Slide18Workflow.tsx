import React, { useState } from 'react';
import {
  Radio,
  CheckSquare,
  Table,
  Calculator,
  Sigma,
  Send,
  ShieldCheck,
  ChevronRight,
  Cpu,
} from 'lucide-react';

export const Slide18Workflow: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);

  const steps = [
    {
      id: 1,
      title: 'Collect Sensor Readings',
      icon: Radio,
      desc: 'Telemetry DMA buffer ingests ADC sensor samples [x_i, y_i] from digital barometer and PT100 thermistor.',
      hardware: 'ADC Interrupt Handler / SPI Bus',
    },
    {
      id: 2,
      title: 'Check Equal Spacing (h)',
      icon: CheckSquare,
      desc: 'Verify constant difference: |x[i] - x[i-1] - h| < ε. If spacing fluctuates, trigger non-uniform fallback.',
      hardware: 'Sanity Validation Routine',
    },
    {
      id: 3,
      title: 'Construct Difference Table',
      icon: Table,
      desc: 'Perform O(n²) vectorized subtractions in fixed-point registers to populate the top forward diagonal (Δ^k y_0).',
      hardware: 'DSP Vector ALU / Scratch RAM',
    },
    {
      id: 4,
      title: 'Compute Normalized u',
      icon: Calculator,
      desc: 'Evaluate u = (x - x_0)/h. Check that 0 ≤ u ≤ n to confirm target is in interpolation domain.',
      hardware: 'Hardware Divider / Floating Core',
    },
    {
      id: 5,
      title: 'Apply Gregory–Newton Series',
      icon: Sigma,
      desc: 'Accumulate terms: y_0 + u·Δy_0 + u(u-1)/2·Δ²y_0 using Horner-like multiplication for low precision error.',
      hardware: 'FPU Multiply-Accumulate (MAC)',
    },
    {
      id: 6,
      title: 'Validate Against Measurements',
      icon: ShieldCheck,
      desc: 'Ensure estimated result is physically bracketed between adjacent nodes y_k and y_{k+1}.',
      hardware: 'Fault Management & Plausibility Watchdog',
    },
    {
      id: 7,
      title: 'Transmit & Display Result',
      icon: Send,
      desc: 'Package estimated temperature into telemetry packet and downlink to ground station dashboard.',
      hardware: 'LoRa / MavLink Telemetry Radio',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in duration-300">
      <div className="border-b border-slate-800 pb-3">
        <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
          Embedded Architecture • Slide 18
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
          Engineering Implementation Workflow: Edge MCU Pipeline
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Execution pipeline inside an onboard flight computer (STM32 / ESP32 / ARM Cortex-M4).
        </p>
      </div>

      {/* Horizontal Flowchart */}
      <div className="bg-navy-900/80 border border-slate-800 rounded-2xl p-5 overflow-x-auto shadow-xl">
        <div className="flex items-center justify-between min-w-[750px] gap-2">
          {steps.map((st, idx) => {
            const Icon = st.icon;
            const isSelected = activeStep === idx;
            return (
              <React.Fragment key={st.id}>
                <div
                  onClick={() => setActiveStep(idx)}
                  className={`flex-1 p-3 rounded-xl border transition-all cursor-pointer flex flex-col items-center text-center group ${
                    isSelected
                      ? 'bg-cyan-950 border-cyan-400 shadow-md ring-1 ring-cyan-400 scale-105'
                      : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div
                    className={`p-2 rounded-lg mb-2 transition-transform group-hover:scale-110 ${
                      isSelected ? 'bg-cyan-500 text-navy-950' : 'bg-slate-900 text-slate-400'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="text-[10px] font-mono font-bold text-slate-500">
                    Step {st.id}
                  </div>
                  <div className="text-[11px] font-bold text-white mt-0.5 line-clamp-2">
                    {st.title}
                  </div>
                </div>

                {idx < steps.length - 1 && (
                  <ChevronRight className="w-4 h-4 text-slate-600 shrink-0" />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Detailed Pipeline Stage Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        <div className="md:col-span-8 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
              Active Pipeline Stage {steps[activeStep].id} / 7
            </span>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-950 text-amber-400 border border-slate-800">
              {steps[activeStep].hardware}
            </span>
          </div>

          <h3 className="text-base font-bold text-white">{steps[activeStep].title}</h3>
          <p className="text-xs text-slate-300 leading-relaxed">{steps[activeStep].desc}</p>
        </div>

        <div className="md:col-span-4 bg-navy-950 border border-cyan-500/30 rounded-2xl p-5 space-y-2 text-xs">
          <div className="text-xs font-bold text-white flex items-center gap-1.5">
            <Cpu className="w-4 h-4 text-cyan-400" />
            Hardware Execution Profile
          </div>
          <div className="text-slate-300 font-mono text-[11px] space-y-1">
            <div>• Execution cycles: ~180 cycles</div>
            <div>• RAM footprint: &lt; 128 bytes</div>
            <div>• Real-time latency: &lt; 2.5 µs @ 80MHz</div>
          </div>
        </div>
      </div>
    </div>
  );
};
