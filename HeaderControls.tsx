import React, { useState, useEffect } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Maximize2,
  Minimize2,
  FileText,
  List,
  Sparkles,
  UserCheck,
  ChevronRight,
  Eye,
  Sliders,
} from 'lucide-react';
import { SLIDES_METADATA } from '../../data/presentationData.ts';

interface HeaderControlsProps {
  currentSlide: number;
  totalSlides: number;
  onJumpToSlide: (slide: number) => void;
  onToggleDrawer: () => void;
  onToggleSpeakerNotes: () => void;
  showSpeakerNotes: boolean;
  reducedMotion: boolean;
  onToggleReducedMotion: () => void;
  onOpenReportModal: () => void;
  onOpenSimulatorDirectly: () => void;
}

export const HeaderControls: React.FC<HeaderControlsProps> = ({
  currentSlide,
  totalSlides,
  onJumpToSlide,
  onToggleDrawer,
  onToggleSpeakerNotes,
  showSpeakerNotes,
  reducedMotion,
  onToggleReducedMotion,
  onOpenReportModal,
  onOpenSimulatorDirectly,
}) => {
  const [seconds, setSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Timer effect
  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const formatTimer = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const s = sec % 60;
    return `${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  const progress = ((currentSlide - 1) / (totalSlides - 1)) * 100;
  const currentMeta = SLIDES_METADATA.find((s) => s.id === currentSlide) || SLIDES_METADATA[0];

  return (
    <header className="sticky top-0 z-40 bg-navy-950/85 backdrop-blur-md border-b border-slate-800/80 px-4 py-2.5 transition-all">
      {/* Top Thin Progress Bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-slate-800/80 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-cyan-500 via-sky-400 to-amber-400 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 flex-wrap">
        {/* Left: Branding & Current Slide Meta */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onJumpToSlide(1)}
            className="flex items-center gap-2 group text-left focus:outline-none"
            title="Return to Slide 1"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-md shadow-cyan-500/20 group-hover:scale-105 transition-transform">
              <span className="font-bold font-mono text-sm">NG</span>
            </div>
            <div className="hidden sm:block">
              <div className="text-xs font-bold text-white tracking-wide flex items-center gap-1.5">
                Newton–Gregory
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                  ECE Exp Learn
                </span>
              </div>
              <div className="text-[11px] text-slate-400 truncate max-w-xs">
                Drone Atmospheric Temperature
              </div>
            </div>
          </button>

          <div className="h-6 w-px bg-slate-800 hidden md:block" />

          {/* Slide Indicator & Breadcrumb */}
          <div className="flex items-center gap-2">
            <button
              onClick={onToggleDrawer}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-navy-900 border border-slate-700 hover:border-cyan-500/50 text-slate-200 text-xs font-mono transition-colors"
              title="Open Slide Drawer / Table of Contents"
            >
              <List className="w-3.5 h-3.5 text-cyan-400" />
              <span className="font-bold text-cyan-300">
                {currentSlide.toString().padStart(2, '0')}
              </span>
              <span className="text-slate-500">/</span>
              <span className="text-slate-400">{totalSlides}</span>
            </button>

            <span className="hidden lg:inline-flex items-center gap-1 text-xs text-slate-400 font-medium bg-slate-900/60 px-2 py-0.5 rounded border border-slate-800">
              <span className="text-cyan-400 font-semibold">{currentMeta.category}</span>
              <ChevronRight className="w-3 h-3 text-slate-600" />
              <span className="text-slate-200 truncate max-w-[200px]">{currentMeta.title}</span>
            </span>
          </div>
        </div>

        {/* Right: Presentation Utilities & Interactive Controls */}
        <div className="flex items-center gap-2">
          {/* Direct Simulator Launch Shortcut */}
          <button
            onClick={onOpenSimulatorDirectly}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
              currentSlide === 22
                ? 'bg-amber-500 text-navy-950 shadow-md shadow-amber-500/30'
                : 'bg-amber-500/15 text-amber-300 border border-amber-500/40 hover:bg-amber-500/25'
            }`}
            title="Jump directly to Slide 22 (Interactive Simulator)"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Live Simulator</span>
          </button>

          {/* Presentation Timer */}
          <div className="flex items-center gap-1 bg-navy-900 border border-slate-800 rounded-lg px-2 py-1 text-xs font-mono text-slate-300">
            <span className="text-cyan-400 font-semibold">{formatTimer(seconds)}</span>
            <button
              onClick={() => setIsTimerRunning(!isTimerRunning)}
              className="p-1 hover:text-white transition-colors"
              title={isTimerRunning ? 'Pause presentation timer' : 'Resume presentation timer'}
            >
              {isTimerRunning ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3 text-green-400" />}
            </button>
            <button
              onClick={() => setSeconds(0)}
              className="p-1 hover:text-white text-slate-400 transition-colors"
              title="Reset timer"
            >
              <RotateCcw className="w-3 h-3" />
            </button>
          </div>

          {/* Speaker Notes Toggle */}
          <button
            onClick={onToggleSpeakerNotes}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
              showSpeakerNotes
                ? 'bg-cyan-500 text-navy-950 font-bold shadow-md shadow-cyan-500/30'
                : 'bg-navy-900 border border-slate-800 text-slate-300 hover:border-slate-700'
            }`}
            title="Toggle Speaker Notes Panel"
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Speaker Notes</span>
          </button>

          {/* Reduced Motion Toggle */}
          <button
            onClick={onToggleReducedMotion}
            className={`p-1.5 rounded-lg text-xs border transition-colors ${
              reducedMotion
                ? 'bg-amber-950/60 border-amber-600/70 text-amber-300'
                : 'bg-navy-900 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
            title={reducedMotion ? 'Reduced motion enabled (click to disable)' : 'Enable reduced motion'}
          >
            <Sparkles className="w-3.5 h-3.5" />
          </button>

          {/* Printable Report / PDF Modal Button */}
          <button
            onClick={onOpenReportModal}
            className="flex items-center gap-1 px-2 py-1 rounded-lg bg-navy-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white text-xs transition-colors"
            title="Generate Printable Academic Summary Report"
          >
            <FileText className="w-3.5 h-3.5 text-blue-400" />
            <span className="hidden sm:inline">Report</span>
          </button>

          {/* Fullscreen Button */}
          <button
            onClick={toggleFullscreen}
            className="p-1.5 rounded-lg bg-navy-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white text-xs transition-colors"
            title={isFullscreen ? 'Exit full screen' : 'Enter full screen presentation mode'}
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>
    </header>
  );
};
