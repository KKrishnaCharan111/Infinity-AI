import React, { useState, useEffect, useCallback } from 'react';
import { HeaderControls } from './components/presentation/HeaderControls.tsx';
import { FooterNav } from './components/presentation/FooterNav.tsx';
import { SlideDrawer } from './components/presentation/SlideDrawer.tsx';
import { SpeakerNotesModal } from './components/presentation/SpeakerNotesModal.tsx';
import { PrintReportModal } from './components/presentation/PrintReportModal.tsx';

// All 24 Slide Components
import { Slide01Title } from './components/slides/Slide01Title.tsx';
import { Slide02Roadmap } from './components/slides/Slide02Roadmap.tsx';
import { Slide03Scenario } from './components/slides/Slide03Scenario.tsx';
import { Slide04Problem } from './components/slides/Slide04Problem.tsx';
import { Slide05SensorData } from './components/slides/Slide05SensorData.tsx';
import { Slide06WhyInterpolation } from './components/slides/Slide06WhyInterpolation.tsx';
import { Slide07Relevance } from './components/slides/Slide07Relevance.tsx';
import { Slide08WhyForward } from './components/slides/Slide08WhyForward.tsx';
import { Slide09Symbols } from './components/slides/Slide09Symbols.tsx';
import { Slide10FirstDifferences } from './components/slides/Slide10FirstDifferences.tsx';
import { Slide11SecondDifferences } from './components/slides/Slide11SecondDifferences.tsx';
import { Slide12DifferenceTable } from './components/slides/Slide12DifferenceTable.tsx';
import { Slide13FormulaDerivation } from './components/slides/Slide13FormulaDerivation.tsx';
import { Slide14NormalizedParameter } from './components/slides/Slide14NormalizedParameter.tsx';
import { Slide15NumericalCalculation } from './components/slides/Slide15NumericalCalculation.tsx';
import { Slide16GraphicalInterpretation } from './components/slides/Slide16GraphicalInterpretation.tsx';
import { Slide17Verification } from './components/slides/Slide17Verification.tsx';
import { Slide18Workflow } from './components/slides/Slide18Workflow.tsx';
import { Slide19AdvantagesLimitations } from './components/slides/Slide19AdvantagesLimitations.tsx';
import { Slide20AlternativeMethods } from './components/slides/Slide20AlternativeMethods.tsx';
import { Slide21SimulatorIntro } from './components/slides/Slide21SimulatorIntro.tsx';
import { Slide22LiveSimulator } from './components/slides/Slide22LiveSimulator.tsx';
import { Slide23RealTimeDynamics } from './components/slides/Slide23RealTimeDynamics.tsx';
import { Slide24ConclusionViva } from './components/slides/Slide24ConclusionViva.tsx';

const TOTAL_SLIDES = 24;

export const App: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState<number>(1);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [showSpeakerNotes, setShowSpeakerNotes] = useState<boolean>(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState<boolean>(false);
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);

  // Next / Prev slide handlers
  const handleNext = useCallback(() => {
    setCurrentSlide((prev) => Math.min(TOTAL_SLIDES, prev + 1));
  }, []);

  const handlePrev = useCallback(() => {
    setCurrentSlide((prev) => Math.max(1, prev - 1));
  }, []);

  const handleJumpToSlide = useCallback((slideNum: number) => {
    if (slideNum >= 1 && slideNum <= TOTAL_SLIDES) {
      setCurrentSlide(slideNum);
    }
  }, []);

  // Listen to custom jump events
  useEffect(() => {
    const handleJumpEvent = (e: any) => {
      if (e.detail) handleJumpToSlide(e.detail);
    };
    window.addEventListener('jump-slide', handleJumpEvent);
    return () => window.removeEventListener('jump-slide', handleJumpEvent);
  }, [handleJumpToSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Avoid intercepting if user is typing into an input
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }

      if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        handlePrev();
      } else if (e.key === 'Home') {
        e.preventDefault();
        handleJumpToSlide(1);
      } else if (e.key === 'End') {
        e.preventDefault();
        handleJumpToSlide(TOTAL_SLIDES);
      } else if (e.key === 'Escape') {
        setIsDrawerOpen(false);
        setIsReportModalOpen(false);
        setShowSpeakerNotes(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev, handleJumpToSlide]);

  // Render current slide component
  const renderSlide = () => {
    switch (currentSlide) {
      case 1:
        return <Slide01Title onNext={handleNext} reducedMotion={reducedMotion} />;
      case 2:
        return <Slide02Roadmap onSelectSlide={handleJumpToSlide} />;
      case 3:
        return <Slide03Scenario reducedMotion={reducedMotion} />;
      case 4:
        return <Slide04Problem onNext={handleNext} />;
      case 5:
        return <Slide05SensorData />;
      case 6:
        return <Slide06WhyInterpolation />;
      case 7:
        return <Slide07Relevance />;
      case 8:
        return <Slide08WhyForward />;
      case 9:
        return <Slide09Symbols />;
      case 10:
        return <Slide10FirstDifferences />;
      case 11:
        return <Slide11SecondDifferences />;
      case 12:
        return <Slide12DifferenceTable />;
      case 13:
        return <Slide13FormulaDerivation />;
      case 14:
        return <Slide14NormalizedParameter />;
      case 15:
        return <Slide15NumericalCalculation />;
      case 16:
        return <Slide16GraphicalInterpretation />;
      case 17:
        return <Slide17Verification />;
      case 18:
        return <Slide18Workflow />;
      case 19:
        return <Slide19AdvantagesLimitations />;
      case 20:
        return <Slide20AlternativeMethods />;
      case 21:
        return <Slide21SimulatorIntro onGoToSimulator={() => handleJumpToSlide(22)} />;
      case 22:
        return <Slide22LiveSimulator />;
      case 23:
        return <Slide23RealTimeDynamics />;
      case 24:
        return <Slide24ConclusionViva />;
      default:
        return <Slide01Title onNext={handleNext} reducedMotion={reducedMotion} />;
    }
  };

  return (
    <div className="min-h-screen bg-navy-950 text-slate-100 flex flex-col selection:bg-cyan-500 selection:text-navy-950">
      {/* Header Controls */}
      <HeaderControls
        currentSlide={currentSlide}
        totalSlides={TOTAL_SLIDES}
        onJumpToSlide={handleJumpToSlide}
        onToggleDrawer={() => setIsDrawerOpen(!isDrawerOpen)}
        onToggleSpeakerNotes={() => setShowSpeakerNotes(!showSpeakerNotes)}
        showSpeakerNotes={showSpeakerNotes}
        reducedMotion={reducedMotion}
        onToggleReducedMotion={() => setReducedMotion(!reducedMotion)}
        onOpenReportModal={() => setIsReportModalOpen(true)}
        onOpenSimulatorDirectly={() => handleJumpToSlide(22)}
      />

      {/* Main Slide Presentation Stage */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 pb-24 overflow-x-hidden">
        <div key={currentSlide} className="transition-all duration-300">
          {renderSlide()}
        </div>
      </main>

      {/* Slide Overview Drawer / Table of Contents */}
      <SlideDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        currentSlide={currentSlide}
        onSelectSlide={handleJumpToSlide}
      />

      {/* Presenter Mode Speaker Notes Modal */}
      <SpeakerNotesModal
        isOpen={showSpeakerNotes}
        onClose={() => setShowSpeakerNotes(false)}
        currentSlide={currentSlide}
      />

      {/* Printable Report / PDF Modal */}
      <PrintReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
      />

      {/* Bottom Sticky Presentation Navigation Bar */}
      <FooterNav
        currentSlide={currentSlide}
        totalSlides={TOTAL_SLIDES}
        onPrev={handlePrev}
        onNext={handleNext}
        onResetToStart={() => handleJumpToSlide(1)}
        onToggleDrawer={() => setIsDrawerOpen(!isDrawerOpen)}
      />
    </div>
  );
};

export default App;
