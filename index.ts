export interface DataPoint {
  id: string;
  x: number; // Altitude in meters
  y: number; // Temperature in °C
}

export interface DifferenceTableRow {
  x: number;
  y: number;
  diffs: number[]; // diffs[0] = Δy, diffs[1] = Δ²y, etc.
}

export interface InterpolationTerm {
  index: number; // k = 0, 1, 2, ...
  label: string; // e.g. "Constant term y0", "Linear term u·Δy0"
  formulaLatex: string;
  uFactor: number; // 1, u, u(u-1)/2, etc.
  diffValue: number; // y0 or Δ^k y0
  termValue: number; // product
  runningSum: number;
  colorClass: string;
}

export interface InterpolationResult {
  xTarget: number;
  yTarget: number;
  x0: number;
  y0: number;
  h: number;
  u: number;
  method: 'forward' | 'backward';
  isEquallySpaced: boolean;
  spacingError?: string;
  table: DifferenceTableRow[];
  terms: InterpolationTerm[];
  degree: number;
  curvePoints: { x: number; y: number }[];
  isValid: boolean;
  errorMessage?: string;
  warnings?: string[];
}

export interface TeamMember {
  id: string;
  name: string;
  usn: string;
  role: string;
  topic: string;
  slides: number[];
}

export interface SpeakerNote {
  slideNumber: number;
  assignedMember: string;
  usn: string;
  keyPoints: string[];
  transitionCue: string;
  potentialFacultyQuestions: {
    question: string;
    answer: string;
  }[];
}

export interface VivaQuestion {
  id: number;
  question: string;
  formula?: string;
  answer: string;
  category: 'Mathematical Theory' | 'Algorithm & Computation' | 'ECE / Engineering Application' | 'Error Analysis';
}
