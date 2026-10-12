import React from 'react';
import { InteractiveSimulator } from '../simulator/InteractiveSimulator.tsx';

export const Slide22LiveSimulator: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-4 animate-in fade-in duration-300">
      <div className="border-b border-slate-800 pb-2">
        <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
          Hands-On Engineering Simulator • Slide 22
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-0.5">
          Live Interactive Simulator: Test Any Node & Target
        </h2>
      </div>

      <InteractiveSimulator initialTarget={175} />
    </div>
  );
};
