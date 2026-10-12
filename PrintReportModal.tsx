import React from 'react';
import { X, Printer, Download, CheckCircle2 } from 'lucide-react';
import { DEFAULT_TEAM_MEMBERS } from '../../data/presentationData.ts';
import { MathView } from '../common/MathView.tsx';

interface PrintReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrintReportModal: React.FC<PrintReportModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-4 overflow-y-auto">
      <div className="w-full max-w-4xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header Bar */}
        <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <span>Experiential Learning Project Report</span>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                Print & PDF
              </span>
            </h2>
            <p className="text-xs text-slate-400">Department of Electronics & Communication Engineering</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-navy-950 font-bold text-xs transition-colors shadow-md"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save as PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Report Document Body */}
        <div className="flex-1 overflow-y-auto p-8 bg-slate-950 text-slate-200 font-sans space-y-6 text-sm print:bg-white print:text-black">
          {/* Document Header */}
          <div className="border-b border-slate-800 pb-6 text-center">
            <div className="text-xs uppercase tracking-widest text-cyan-400 font-bold mb-1">
              Engineering Experiential Learning • Academic Project Evaluation
            </div>
            <h1 className="text-2xl font-extrabold text-white mb-2">
              Real-Life Application of Newton–Gregory Forward Interpolation: Atmospheric Temperature Estimation Using a Research Drone
            </h1>
            <p className="text-sm text-slate-400">
              Department of Electronics & Communication Engineering | Engineering Mathematics Course
            </p>
          </div>

          {/* Team Members Roster */}
          <div>
            <h3 className="text-xs uppercase font-bold tracking-wider text-cyan-400 mb-2 border-b border-slate-800 pb-1">
              Project Team Roster
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {DEFAULT_TEAM_MEMBERS.map((member) => (
                <div key={member.id} className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-xs">
                  <div className="font-bold text-white">{member.name}</div>
                  <div className="text-cyan-400 font-mono text-[11px]">USN: {member.usn}</div>
                  <div className="text-slate-400 text-[10px]">{member.role}</div>
                </div>
              ))}
            </div>
          </div>

          {/* 1. Problem Formulation */}
          <div>
            <h3 className="text-xs uppercase font-bold tracking-wider text-cyan-400 mb-2 border-b border-slate-800 pb-1">
              1. Problem Formulation & Meteorological Context
            </h3>
            <p className="text-slate-300 leading-relaxed text-xs">
              A meteorological research quadcopter ascends vertically through the lower troposphere, sampling atmospheric temperature at uniform altitude steps of <MathView math="h = 100\text{ m}" />. Telemetry captures readings at <MathView math="x \in \{0, 100, 200, 300, 400\}\text{ m}" />. Engineers require an accurate temperature estimate at an unmeasured intermediate altitude of <MathView math="x = 175\text{ m}" />.
            </p>
          </div>

          {/* 2. Measured Sensor Data Table */}
          <div>
            <h3 className="text-xs uppercase font-bold tracking-wider text-cyan-400 mb-2 border-b border-slate-800 pb-1">
              2. Raw Telemetry Dataset
            </h3>
            <table className="w-full text-xs text-left border-collapse border border-slate-800">
              <thead>
                <tr className="bg-slate-900 text-cyan-300">
                  <th className="p-2 border border-slate-800">Node (i)</th>
                  <th className="p-2 border border-slate-800">Altitude x (m)</th>
                  <th className="p-2 border border-slate-800">Measured Temperature y (°C)</th>
                  <th className="p-2 border border-slate-800">Sensor Status</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className="p-2 border border-slate-800">0</td><td className="p-2 border border-slate-800">0</td><td className="p-2 border border-slate-800 font-bold">28.5</td><td className="p-2 border border-slate-800 text-green-400">Calibrated</td></tr>
                <tr><td className="p-2 border border-slate-800">1</td><td className="p-2 border border-slate-800">100</td><td className="p-2 border border-slate-800 font-bold">26.1</td><td className="p-2 border border-slate-800 text-green-400">Calibrated</td></tr>
                <tr><td className="p-2 border border-slate-800">2</td><td className="p-2 border border-slate-800">200</td><td className="p-2 border border-slate-800 font-bold">23.8</td><td className="p-2 border border-slate-800 text-green-400">Calibrated</td></tr>
                <tr><td className="p-2 border border-slate-800">3</td><td className="p-2 border border-slate-800">300</td><td className="p-2 border border-slate-800 font-bold">21.6</td><td className="p-2 border border-slate-800 text-green-400">Calibrated</td></tr>
                <tr><td className="p-2 border border-slate-800">4</td><td className="p-2 border border-slate-800">400</td><td className="p-2 border border-slate-800 font-bold">19.5</td><td className="p-2 border border-slate-800 text-green-400">Calibrated</td></tr>
              </tbody>
            </table>
          </div>

          {/* 3. Forward Difference Table */}
          <div>
            <h3 className="text-xs uppercase font-bold tracking-wider text-cyan-400 mb-2 border-b border-slate-800 pb-1">
              3. Forward Difference Tableau (Δ)
            </h3>
            <table className="w-full text-xs text-left border-collapse border border-slate-800">
              <thead>
                <tr className="bg-slate-900 text-cyan-300">
                  <th className="p-2 border border-slate-800">x (m)</th>
                  <th className="p-2 border border-slate-800">y (°C)</th>
                  <th className="p-2 border border-slate-800">Δy</th>
                  <th className="p-2 border border-slate-800">Δ²y</th>
                  <th className="p-2 border border-slate-800">Δ³y</th>
                  <th className="p-2 border border-slate-800">Δ⁴y</th>
                </tr>
              </thead>
              <tbody className="font-mono">
                <tr><td className="p-2 border border-slate-800">0</td><td className="p-2 border border-slate-800 font-bold text-cyan-300">28.5</td><td className="p-2 border border-slate-800 font-bold text-cyan-300">-2.4</td><td className="p-2 border border-slate-800 font-bold text-cyan-300">+0.1</td><td className="p-2 border border-slate-800 font-bold text-cyan-300">0</td><td className="p-2 border border-slate-800 font-bold text-cyan-300">0</td></tr>
                <tr><td className="p-2 border border-slate-800">100</td><td className="p-2 border border-slate-800">26.1</td><td className="p-2 border border-slate-800">-2.3</td><td className="p-2 border border-slate-800">+0.1</td><td className="p-2 border border-slate-800">0</td><td className="p-2 border border-slate-800">—</td></tr>
                <tr><td className="p-2 border border-slate-800">200</td><td className="p-2 border border-slate-800">23.8</td><td className="p-2 border border-slate-800">-2.2</td><td className="p-2 border border-slate-800">+0.1</td><td className="p-2 border border-slate-800">—</td><td className="p-2 border border-slate-800">—</td></tr>
                <tr><td className="p-2 border border-slate-800">300</td><td className="p-2 border border-slate-800">21.6</td><td className="p-2 border border-slate-800">-2.1</td><td className="p-2 border border-slate-800">—</td><td className="p-2 border border-slate-800">—</td><td className="p-2 border border-slate-800">—</td></tr>
                <tr><td className="p-2 border border-slate-800">400</td><td className="p-2 border border-slate-800">19.5</td><td className="p-2 border border-slate-800">—</td><td className="p-2 border border-slate-800">—</td><td className="p-2 border border-slate-800">—</td><td className="p-2 border border-slate-800">—</td></tr>
              </tbody>
            </table>
            <p className="text-[11px] text-slate-400 mt-1 italic">
              Notice: Second forward differences are strictly constant (+0.1), implying that the discrete temperature curve is perfectly quadratic with zero 3rd and higher-order residual differences.
            </p>
          </div>

          {/* 4. Formula & Derivation */}
          <div>
            <h3 className="text-xs uppercase font-bold tracking-wider text-cyan-400 mb-2 border-b border-slate-800 pb-1">
              4. Newton–Gregory Forward Polynomial Calculation
            </h3>
            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2">
              <MathView
                block
                math="y(x) = y_0 + u\Delta y_0 + \frac{u(u-1)}{2!}\Delta^2 y_0 + \frac{u(u-1)(u-2)}{3!}\Delta^3 y_0 + \cdots"
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-slate-400">Step size (h):</span> <span className="font-mono text-cyan-300">100 m</span>
                </div>
                <div>
                  <span className="text-slate-400">Base point (x₀, y₀):</span> <span className="font-mono text-cyan-300">(0 m, 28.5 °C)</span>
                </div>
                <div>
                  <span className="text-slate-400">Target altitude (x):</span> <span className="font-mono text-cyan-300">175 m</span>
                </div>
                <div>
                  <span className="text-slate-400">Normalized parameter (u):</span> <span className="font-mono text-cyan-300">u = (175 - 0)/100 = 1.75</span>
                </div>
              </div>
              <div className="border-t border-slate-800 pt-3">
                <MathView
                  block
                  math="T(175) = 28.5 + (1.75)(-2.4) + \frac{1.75(1.75-1)}{2}(0.1) = 28.5 - 4.2 + 0.065625"
                />
                <div className="text-center font-bold text-amber-400 text-sm mt-2">
                  <MathView block math="T(175) = 24.365625^\circ\text{C} \approx \mathbf{24.37^\circ\text{C}}" />
                </div>
              </div>
            </div>
          </div>

          {/* 5. Physical Validation & Sanity Check */}
          <div>
            <h3 className="text-xs uppercase font-bold tracking-wider text-cyan-400 mb-2 border-b border-slate-800 pb-1">
              5. Physical Verification & Sanity Check
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              At 100 m, the temperature is 26.1 °C; at 200 m, it is 23.8 °C. The estimated temperature <strong className="text-amber-400">24.37 °C</strong> is strictly bounded between 23.8 °C and 26.1 °C, and lies closer to 200 m, reflecting <MathView math="u = 1.75" /> (75% along the bracket). This satisfies the negative lapse rate physical continuity criterion.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
