import type { DataPoint, DifferenceTableRow, InterpolationResult, InterpolationTerm } from '../types/index.ts';

export function cleanFloat(val: number, precision = 8): number {
  return Number(Math.round(Number(val + 'e' + precision)) + 'e-' + precision);
}

/**
 * Validates points array for numerical interpolation
 */
export function validatePoints(points: DataPoint[]): { isValid: boolean; error?: string } {
  if (!points || points.length < 2) {
    return { isValid: false, error: 'At least 2 data points are required for interpolation.' };
  }

  for (let i = 0; i < points.length; i++) {
    if (!Number.isFinite(points[i].x) || !Number.isFinite(points[i].y)) {
      return { isValid: false, error: `Point ${i + 1} contains non-numeric or infinite values.` };
    }
  }

  // Check strictly increasing x
  for (let i = 1; i < points.length; i++) {
    if (points[i].x <= points[i - 1].x) {
      return {
        isValid: false,
        error: `Altitudes must be strictly increasing. Altitude at row ${i + 1} (${points[i].x}m) is not greater than row ${i} (${points[i - 1].x}m).`,
      };
    }
  }

  return { isValid: true };
}

/**
 * Checks whether altitudes are equally spaced with a given tolerance
 */
export function checkEqualSpacing(points: DataPoint[], tolerance = 1e-4): { isEquallySpaced: boolean; h: number; error?: string } {
  if (points.length < 2) return { isEquallySpaced: false, h: 0, error: 'Need at least 2 points.' };

  const h = points[1].x - points[0].x;
  if (h <= 0) return { isEquallySpaced: false, h: 0, error: 'Step size must be strictly positive.' };

  for (let i = 2; i < points.length; i++) {
    const diff = points[i].x - points[i - 1].x;
    if (Math.abs(diff - h) > tolerance) {
      return {
        isEquallySpaced: false,
        h,
        error: `Altitudes are not equally spaced. Interval between x[${i - 1}] and x[${i}] is ${diff.toFixed(2)} m, but expected ${h.toFixed(2)} m. Newton–Gregory interpolation requires constant interval h.`,
      };
    }
  }

  return { isEquallySpaced: true, h };
}

/**
 * Computes forward difference table
 * table[i].diffs[k] represents Δ^(k+1) y_i
 */
export function computeForwardDifferenceTable(points: DataPoint[]): DifferenceTableRow[] {
  const n = points.length;
  // Initialize matrix of differences
  // D[order][i]
  const D: number[][] = [];
  D[0] = points.map(p => p.y);

  for (let order = 1; order < n; order++) {
    D[order] = [];
    for (let i = 0; i < n - order; i++) {
      const diff = D[order - 1][i + 1] - D[order - 1][i];
      // round near zero precision artifacts
      D[order][i] = Math.abs(diff) < 1e-12 ? 0 : cleanFloat(diff, 6);
    }
  }

  const table: DifferenceTableRow[] = [];
  for (let i = 0; i < n; i++) {
    const diffs: number[] = [];
    for (let order = 1; order < n - i; order++) {
      diffs.push(D[order][i]);
    }
    table.push({
      x: points[i].x,
      y: points[i].y,
      diffs,
    });
  }

  return table;
}

/**
 * Computes factorial of integer n
 */
export function factorial(n: number): number {
  if (n <= 1) return 1;
  let res = 1;
  for (let i = 2; i <= n; i++) res *= i;
  return res;
}

/**
 * Computes binomial factor u(u-1)(u-2)...(u-k+1) / k!
 */
export function computeUFactor(u: number, k: number, method: 'forward' | 'backward' = 'forward'): number {
  if (k === 0) return 1;
  let prod = 1;
  for (let j = 0; j < k; j++) {
    if (method === 'forward') {
      prod *= (u - j);
    } else {
      prod *= (u + j);
    }
  }
  return prod / factorial(k);
}

const TERM_COLORS = [
  'text-cyan-400 bg-cyan-950/40 border-cyan-800/60',
  'text-electric-400 bg-sky-950/40 border-sky-800/60',
  'text-amber-400 bg-amber-950/40 border-amber-800/60',
  'text-purple-400 bg-purple-950/40 border-purple-800/60',
  'text-emerald-400 bg-emerald-950/40 border-emerald-800/60',
];

/**
 * Evaluates Newton-Gregory interpolation at target x
 */
export function calculateInterpolation(
  points: DataPoint[],
  xTarget: number,
  method: 'forward' | 'backward' = 'forward'
): InterpolationResult {
  const validation = validatePoints(points);
  if (!validation.isValid) {
    return {
      xTarget,
      yTarget: NaN,
      x0: 0,
      y0: 0,
      h: 0,
      u: 0,
      method,
      isEquallySpaced: false,
      isValid: false,
      errorMessage: validation.error,
      table: [],
      terms: [],
      degree: 0,
      curvePoints: [],
    };
  }

  const spacing = checkEqualSpacing(points);
  if (!spacing.isEquallySpaced) {
    return {
      xTarget,
      yTarget: NaN,
      x0: points[0].x,
      y0: points[0].y,
      h: spacing.h,
      u: 0,
      method,
      isEquallySpaced: false,
      spacingError: spacing.error,
      isValid: false,
      errorMessage: spacing.error,
      table: [],
      terms: [],
      degree: 0,
      curvePoints: [],
    };
  }

  const n = points.length;
  const h = spacing.h;
  const table = computeForwardDifferenceTable(points);

  const minX = points[0].x;
  const maxX = points[n - 1].x;
  const warnings: string[] = [];

  if (xTarget < minX || xTarget > maxX) {
    warnings.push(`Target ${xTarget}m is outside the measured bracket [${minX}m, ${maxX}m]. You are extrapolating, which carries higher numerical uncertainty.`);
  }

  let xBase: number;
  let yBase: number;
  let u: number;

  if (method === 'forward') {
    xBase = points[0].x;
    yBase = points[0].y;
    u = (xTarget - xBase) / h;
  } else {
    xBase = points[n - 1].x;
    yBase = points[n - 1].y;
    u = (xTarget - xBase) / h; // v = (x - x_n)/h
  }

  const terms: InterpolationTerm[] = [];
  let runningSum = yBase;

  // k = 0 term
  terms.push({
    index: 0,
    label: method === 'forward' ? 'Base Temperature y₀' : 'Base Temperature yₙ',
    formulaLatex: method === 'forward' ? 'y_0' : 'y_n',
    uFactor: 1,
    diffValue: yBase,
    termValue: yBase,
    runningSum: yBase,
    colorClass: TERM_COLORS[0],
  });

  // Subsequent difference terms
  for (let k = 1; k < n; k++) {
    let diffVal: number;
    let formulaLatex: string;
    let label: string;

    if (method === 'forward') {
      diffVal = table[0].diffs[k - 1] ?? 0;
      label = k === 1 ? 'Linear term (1st diff)' : k === 2 ? 'Quadratic term (2nd diff)' : `${k}-th order term`;
      formulaLatex = k === 1 
        ? 'u \\Delta y_0' 
        : `\\frac{${Array.from({ length: k }, (_, j) => (j === 0 ? 'u' : `(u-${j})`)).join('')}}{${k}!}\\Delta^{${k}} y_0`;
    } else {
      // Backward differences from last row:
      // In table[n - 1 - k].diffs[k - 1] is ∇^k y_n
      diffVal = table[n - 1 - k]?.diffs[k - 1] ?? 0;
      label = k === 1 ? 'Linear term (1st back diff)' : k === 2 ? 'Quadratic term (2nd back diff)' : `${k}-th order term`;
      formulaLatex = k === 1 
        ? 'v \\nabla y_n' 
        : `\\frac{${Array.from({ length: k }, (_, j) => (j === 0 ? 'v' : `(v+${j})`)).join('')}}{${k}!}\\nabla^{${k}} y_n`;
    }

    const uFactor = cleanFloat(computeUFactor(u, k, method));
    const termVal = cleanFloat(uFactor * diffVal);
    runningSum = cleanFloat(runningSum + termVal);

    terms.push({
      index: k,
      label,
      formulaLatex,
      uFactor,
      diffValue: cleanFloat(diffVal),
      termValue: termVal,
      runningSum,
      colorClass: TERM_COLORS[k % TERM_COLORS.length],
    });
  }

  // Generate smooth polynomial curve points across [minX - 20, maxX + 20]
  const curvePoints: { x: number; y: number }[] = [];
  const startX = Math.min(minX, xTarget) - 20;
  const endX = Math.max(maxX, xTarget) + 20;
  const steps = 120;
  const stepSize = (endX - startX) / steps;

  for (let i = 0; i <= steps; i++) {
    const cx = startX + i * stepSize;
    const cu = (cx - points[0].x) / h;
    let cy = points[0].y;
    for (let k = 1; k < n; k++) {
      const dVal = table[0].diffs[k - 1] ?? 0;
      cy += computeUFactor(cu, k, 'forward') * dVal;
    }
    curvePoints.push({ x: Number(cx.toFixed(2)), y: Number(cy.toFixed(4)) });
  }

  return {
    xTarget,
    yTarget: runningSum,
    x0: xBase,
    y0: yBase,
    h,
    u,
    method,
    isEquallySpaced: true,
    table,
    terms,
    degree: n - 1,
    curvePoints,
    isValid: true,
    warnings: warnings.length > 0 ? warnings : undefined,
  };
}

/**
 * Default drone temperature dataset
 */
export const DEFAULT_SENSOR_DATA: DataPoint[] = [
  { id: 'p0', x: 0, y: 28.5 },
  { id: 'p1', x: 100, y: 26.1 },
  { id: 'p2', x: 200, y: 23.8 },
  { id: 'p3', x: 300, y: 21.6 },
  { id: 'p4', x: 400, y: 19.5 },
];
