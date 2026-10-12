import { TeamMember, SpeakerNote, VivaQuestion } from '../types/index.ts';

export const DEFAULT_TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'ashish',
    name: 'ASHISH CHOUDHARY',
    usn: '25BTREC005',
    role: 'Leader',
    topic: 'Project Introduction, Real-World Scenario & Problem Formulation',
    slides: [1, 2, 3, 4],
  },
  {
    id: 'krishna',
    name: 'KUMMUSANI KRISHNA CHARAN',
    usn: '25BTREC020',
    role: 'Team Member',
    topic: 'Sensor Data Ingestion, Interpolation Foundations & Engineering Scope',
    slides: [5, 6, 7, 8],
  },
  {
    id: 'shomya',
    name: 'SHOMYA SNEHA CHOWDHURY',
    usn: '25BTREC055',
    role: 'Team Member',
    topic: 'Finite Difference Operators & Complete Forward Difference Tableau',
    slides: [9, 10, 11, 12],
  },
  {
    id: 'dhiraj',
    name: 'DHIRAJ D V',
    usn: '25BTREC012',
    role: 'Team Member',
    topic: 'Polynomial Derivation, Dimensionless Parameter & Term Computation',
    slides: [13, 14, 15],
  },
  {
    id: 'piyush',
    name: 'PIYUSH BHUSHAN',
    usn: 'JUUG26LBTECH17744',
    role: 'Team Member',
    topic: 'Graphical Analysis, Physical Plausibility & System Architecture',
    slides: [16, 17, 18, 19, 20],
  },
  {
    id: 'puneeth',
    name: 'T. PUNEETH REDDY',
    usn: '25BTREC049',
    role: 'Team Member',
    topic: 'Interactive Simulation, Real-time Engine, Reflections & Faculty Viva',
    slides: [21, 22, 23, 24],
  },
];

export interface SlideMeta {
  id: number;
  title: string;
  category: string;
  speakerId: string;
  badge: string;
}

export const SLIDES_METADATA: SlideMeta[] = [
  { id: 1, title: 'Title & Project Context', category: 'Introduction', speakerId: 'ashish', badge: 'Overview' },
  { id: 2, title: 'Presentation Roadmap', category: 'Introduction', speakerId: 'ashish', badge: 'Agenda' },
  { id: 3, title: 'Real-World Scenario: Drone Sounding', category: 'Context', speakerId: 'ashish', badge: 'Case Study' },
  { id: 4, title: 'Problem Statement & Target Definition', category: 'Problem', speakerId: 'ashish', badge: 'Objective' },
  { id: 5, title: 'Given Meteorological Sensor Data', category: 'Data', speakerId: 'krishna', badge: 'Input Data' },
  { id: 6, title: 'Why Interpolation vs Extrapolation?', category: 'Theory', speakerId: 'krishna', badge: 'Core Concept' },
  { id: 7, title: 'Engineering & ECE Relevance', category: 'Applications', speakerId: 'krishna', badge: 'Industry' },
  { id: 8, title: 'Why Newton–Gregory Forward?', category: 'Methodology', speakerId: 'krishna', badge: 'Method Selection' },
  { id: 9, title: 'Mathematical Symbols & Notation', category: 'Theory', speakerId: 'shomya', badge: 'Formulation' },
  { id: 10, title: 'First Forward Differences (Δy)', category: 'Differences', speakerId: 'shomya', badge: '1st Order' },
  { id: 11, title: 'Second Forward Differences (Δ²y)', category: 'Differences', speakerId: 'shomya', badge: '2nd Order' },
  { id: 12, title: 'Complete Forward Difference Table', category: 'Differences', speakerId: 'shomya', badge: 'Difference Table' },
  { id: 13, title: 'Derivation of the Forward Formula', category: 'Derivation', speakerId: 'dhiraj', badge: 'Formula' },
  { id: 14, title: 'Calculate Normalized Parameter (u)', category: 'Calculation', speakerId: 'dhiraj', badge: 'Parameter' },
  { id: 15, title: 'Step-by-Step Numerical Substitution', category: 'Calculation', speakerId: 'dhiraj', badge: 'Computation' },
  { id: 16, title: 'Graphical Interpretation & Curve', category: 'Visualization', speakerId: 'piyush', badge: 'Curves' },
  { id: 17, title: 'Verification & Physical Sanity Check', category: 'Validation', speakerId: 'piyush', badge: 'Sanity Check' },
  { id: 18, title: 'Engineering Implementation Workflow', category: 'Systems', speakerId: 'piyush', badge: 'Embedded Flow' },
  { id: 19, title: 'Advantages & Numerical Limitations', category: 'Analysis', speakerId: 'piyush', badge: 'Critique' },
  { id: 20, title: 'Comparison with Alternative Methods', category: 'Comparison', speakerId: 'piyush', badge: 'Benchmarking' },
  { id: 21, title: 'Live Simulator Walkthrough & Guide', category: 'Interactive', speakerId: 'puneeth', badge: 'Lab Guide' },
  { id: 22, title: 'Interactive Engineering Simulator', category: 'Interactive', speakerId: 'puneeth', badge: 'Live Simulator' },
  { id: 23, title: 'Real-Time Polynomial & Term Dynamics', category: 'Simulation', speakerId: 'puneeth', badge: 'Real-Time Math' },
  { id: 24, title: 'Conclusions, Reflections & Faculty Viva', category: 'Viva', speakerId: 'puneeth', badge: 'Viva & Q&A' },
];

export const SPEAKER_NOTES: Record<number, SpeakerNote> = {
  1: {
    slideNumber: 1,
    assignedMember: 'Ashish Choudhary (Leader)',
    usn: '25BTREC005',
    keyPoints: [
      'Welcome respected evaluators and faculty members to our Experiential Learning presentation.',
      'Topic bridges Applied Engineering Mathematics with practical Electronic & Communication Systems.',
      'Highlight our focus: Using discrete telemetry data from an atmospheric drone to reconstruct continuous lapse rates.',
    ],
    transitionCue: 'Let us begin by reviewing the structured 10-stage engineering roadmap of our presentation.',
    potentialFacultyQuestions: [
      {
        question: 'Why did your team choose a weather drone over stationary meteorological towers?',
        answer: 'Drones provide dynamic vertical profiling with high spatial flexibility, allowing rapid ascents across microclimates where fixed sensor towers cannot be deployed.',
      },
    ],
  },
  2: {
    slideNumber: 2,
    assignedMember: 'Ashish Choudhary (Leader)',
    usn: '25BTREC005',
    keyPoints: [
      'Present the end-to-end journey from raw sensor capture to difference tables, derivation, simulation, and hardware implementation.',
      'Stress that all calculations on this deck are executed live by our mathematical engine.',
    ],
    transitionCue: 'Now let us examine the operational meteorological scenario.',
    potentialFacultyQuestions: [
      {
        question: 'How does this project satisfy Experiential Learning outcomes?',
        answer: 'It connects abstract finite difference calculus with real sensor sampling constraints, polynomial truncation errors, and interactive software simulation.',
      },
    ],
  },
  3: {
    slideNumber: 3,
    assignedMember: 'Ashish Choudhary (Leader)',
    usn: '25BTREC005',
    keyPoints: [
      'Describe the research quadcopter climbing from 0 m to 400 m in the planetary boundary layer.',
      'Explain that high-speed ascent or power-saving duty cycling creates discrete altitude samples rather than continuous readings.',
      'Clarify that this is an educational case study with synthetic boundary-layer data.',
    ],
    transitionCue: 'This brings us to our specific numerical mission.',
    potentialFacultyQuestions: [
      {
        question: 'Why not sample at 175 m directly in flight?',
        answer: 'Drones sample periodically based on fixed clock ticks or altitude steps (100 m) to conserve telemetry bandwidth and sensor battery life. Post-processing interpolation reconstructs arbitrary intermediate altitudes.',
      },
    ],
  },
  4: {
    slideNumber: 4,
    assignedMember: 'Ashish Choudhary (Leader)',
    usn: '25BTREC005',
    keyPoints: [
      'Define the target altitude: x = 175 m.',
      'Target lies between 100 m (26.1 °C) and 200 m (23.8 °C).',
      'Goal: Compute exact T(175) using the forward difference framework.',
    ],
    transitionCue: 'I now hand over to Kummusani Krishna Charan to explain the sensor dataset and interpolation rationale.',
    potentialFacultyQuestions: [
      {
        question: 'What is the physical expectation for T(175)?',
        answer: 'Because atmospheric temperature in the troposphere exhibits a negative lapse rate, T(175) must be bounded strictly between 23.8 °C and 26.1 °C.',
      },
    ],
  },
  5: {
    slideNumber: 5,
    assignedMember: 'Kummusani Krishna Charan',
    usn: '25BTREC020',
    keyPoints: [
      'Detail the 5 calibrated sensor points: (0m, 28.5°C), (100m, 26.1°C), (200m, 23.8°C), (300m, 21.6°C), (400m, 19.5°C).',
      'Point out that the grid interval h = 100 m is strictly uniform.',
      'Highlight table interactivity: hovering highlights points on the synchronized telemetry graph.',
    ],
    transitionCue: 'Let us understand why interpolation is mathematically essential here.',
    potentialFacultyQuestions: [
      {
        question: 'What happens if one of the sensor readings contains calibration drift?',
        answer: 'A single outlier propagates through higher differences (amplified by binomial factors), which is why sensor filtering and difference checking are critical before interpolation.',
      },
    ],
  },
  6: {
    slideNumber: 6,
    assignedMember: 'Kummusani Krishna Charan',
    usn: '25BTREC020',
    keyPoints: [
      'Define interpolation: estimating within [x0, xn]. Here 175 m is safely bracketed by 0 m and 400 m.',
      'Contrast with extrapolation (e.g. estimating at 550 m), which rapidly diverges and lacks physical bounding.',
      'Emphasize: Interpolation creates a mathematical surrogate model, not a physical sensor reading.',
    ],
    transitionCue: 'How does this principle apply across engineering systems?',
    potentialFacultyQuestions: [
      {
        question: 'Why does extrapolation diverge so violently for polynomial methods?',
        answer: 'Outside the sample interval, polynomial terms grow exponentially without constraint, leading to Runge phenomenon and severe numerical instability.',
      },
    ],
  },
  7: {
    slideNumber: 7,
    assignedMember: 'Kummusani Krishna Charan',
    usn: '25BTREC020',
    keyPoints: [
      'Explore 6 engineering domains: ECE Thermocouple calibration, flight trajectory reconstruction, ADC sub-sampling, avionics airspeed corrections, robotics motor control, and industrial process PLCs.',
      'Clarify that modern systems often choose between finite differences, splines, or Kalman filters depending on noise and timing.',
    ],
    transitionCue: 'Why specifically choose the Newton–Gregory Forward method?',
    potentialFacultyQuestions: [
      {
        question: 'When would an ECE engineer use Newton–Gregory over Lagrange interpolation?',
        answer: 'Newton–Gregory requires O(n²) operations to construct and only O(n) to add new points, whereas Lagrange requires recomputing all cardinal basis polynomials from scratch at O(n²).',
      },
    ],
  },
  8: {
    slideNumber: 8,
    assignedMember: 'Kummusani Krishna Charan',
    usn: '25BTREC020',
    keyPoints: [
      '1. Uniform spacing h = 100 m allows using simple forward difference operator Δ instead of divided differences.',
      '2. Target 175 m is located in the top half of the table (between 100 m and 200 m, u = 1.75), making forward formula numerically optimal.',
    ],
    transitionCue: 'I now hand over to Shomya Sneha Chowdhury to walk us through the difference operators and table construction.',
    potentialFacultyQuestions: [
      {
        question: 'If the target was 385 m, which formula would you use?',
        answer: 'Newton–Gregory Backward Interpolation, because 385 m is near the bottom node (400 m), making backward parameter v = (385-400)/100 = -0.15 very small and well-conditioned.',
      },
    ],
  },
  9: {
    slideNumber: 9,
    assignedMember: 'Shomya Sneha Chowdhury',
    usn: '25BTREC055',
    keyPoints: [
      'Explain symbol glossary: base point x0, step h, base reading y0, forward difference operator Δ, second difference Δ², and normalized coordinate u = (x - x0)/h.',
      'Explain that u is dimensionless, turning spatial coordinates into pure step fractions.',
    ],
    transitionCue: 'Let us now calculate the first forward differences row by row.',
    potentialFacultyQuestions: [
      {
        question: 'What is the relationship between the shift operator E and forward difference operator Δ?',
        answer: 'E = 1 + Δ, which means E^u = (1 + Δ)^u. Expanding this with the binomial theorem directly yields the Newton–Gregory forward formula.',
      },
    ],
  },
  10: {
    slideNumber: 10,
    assignedMember: 'Shomya Sneha Chowdhury',
    usn: '25BTREC055',
    keyPoints: [
      'Δy0 = 26.1 - 28.5 = -2.4 °C.',
      'Δy1 = 23.8 - 26.1 = -2.3 °C.',
      'Δy2 = 21.6 - 23.8 = -2.2 °C.',
      'Δy3 = 19.5 - 21.6 = -2.1 °C.',
      'Notice that the drop per 100 m is getting slightly smaller (-2.4 to -2.1).',
    ],
    transitionCue: 'Now let us compute the differences between these differences: the second forward differences.',
    potentialFacultyQuestions: [
      {
        question: 'What physical quantity does Δy represent here?',
        answer: 'It represents the discrete atmospheric temperature gradient or lapse rate per 100 m ascent.',
      },
    ],
  },
  11: {
    slideNumber: 11,
    assignedMember: 'Shomya Sneha Chowdhury',
    usn: '25BTREC055',
    keyPoints: [
      'Δ²y0 = -2.3 - (-2.4) = +0.1 °C.',
      'Δ²y1 = -2.2 - (-2.3) = +0.1 °C.',
      'Δ²y2 = -2.1 - (-2.2) = +0.1 °C.',
      'Crucial mathematical discovery: Second differences are exactly constant (+0.1)!',
      'This proves that the underlying discrete temperature curve is perfectly quadratic (degree 2).',
    ],
    transitionCue: 'Let us see all differences arranged in the triangular forward-difference tableau.',
    potentialFacultyQuestions: [
      {
        question: 'What does a constant second difference imply about Δ³y and Δ⁴y?',
        answer: 'Because Δ²y is constant (+0.1), its differences (0.1 - 0.1) are identically zero! Third and all higher-order differences vanish completely.',
      },
    ],
  },
  12: {
    slideNumber: 12,
    assignedMember: 'Shomya Sneha Chowdhury',
    usn: '25BTREC055',
    keyPoints: [
      'Display the full 5×6 triangular difference table.',
      'Demonstrate progressive column reveal (presenter control button).',
      'Highlight the diagonal originating from (x0, y0): 28.5 -> -2.4 -> 0.1 -> 0 -> 0.',
      'These top diagonal entries are the exact coefficients used in the forward formula.',
    ],
    transitionCue: 'I now pass the floor to Dhiraj D V to derive the formula and calculate our target estimate.',
    potentialFacultyQuestions: [
      {
        question: 'Which entries from the table are actually used in the forward formula?',
        answer: 'Only the topmost diagonal entries starting at row 0: y0, Δy0, Δ²y0, Δ³y0, ... Entries below the diagonal belong to later starting nodes.',
      },
    ],
  },
  13: {
    slideNumber: 13,
    assignedMember: 'Dhiraj D V',
    usn: '25BTREC012',
    keyPoints: [
      'Present the general Newton–Gregory forward expansion.',
      'Compare with Taylor series: where Taylor uses continuous derivatives d^k y / dx^k, Newton–Gregory uses discrete differences Δ^k y / h^k.',
      'Highlight the color-coded terms: constant term (cyan), linear term (electric blue), quadratic curvature (amber).',
    ],
    transitionCue: 'First, we must calculate the normalized target parameter u.',
    potentialFacultyQuestions: [
      {
        question: 'Can you show how the binomial expansion (1+Δ)^u relates to this formula?',
        answer: 'y(x) = E^u y0 = (1 + Δ)^u y0 = [1 + uΔ + u(u-1)/2! Δ² + u(u-1)(u-2)/3! Δ³ + ...] y0. Expanding gives the exact Gregory-Newton polynomial.',
      },
    ],
  },
  14: {
    slideNumber: 14,
    assignedMember: 'Dhiraj D V',
    usn: '25BTREC012',
    keyPoints: [
      'Substitute: x0 = 0 m, h = 100 m, target x = 175 m.',
      'u = (175 - 0) / 100 = 1.75.',
      'Physical meaning: 175 m is exactly 1.75 grid units above sea level.',
    ],
    transitionCue: 'Now let us substitute u = 1.75 and our table differences into the polynomial.',
    potentialFacultyQuestions: [
      {
        question: 'What if we chose x0 = 100 m instead?',
        answer: 'If x0 = 100, then u = (175-100)/100 = 0.75. We would use row 1 entries (26.1, -2.3, 0.1). By polynomial uniqueness, the calculated temperature is identical!',
      },
    ],
  },
  15: {
    slideNumber: 15,
    assignedMember: 'Dhiraj D V',
    usn: '25BTREC012',
    keyPoints: [
      'Term 0: y0 = 28.5 °C.',
      'Term 1: 1.75 × (-2.4) = -4.2 °C (running sum = 24.3 °C).',
      'Term 2: [1.75 × 0.75 / 2] × 0.1 = 0.65625 × 0.1 = +0.065625 °C.',
      'Term 3 & 4: 0 °C (vanish).',
      'Exact result: T(175) = 28.5 - 4.2 + 0.065625 = 24.365625 °C.',
      'Rounded to 2 decimal places: 24.37 °C.',
    ],
    transitionCue: 'I now hand over to Piyush Bhushan to visually interpret the polynomial and discuss engineering validation.',
    potentialFacultyQuestions: [
      {
        question: 'Why does the quadratic term add a positive correction (+0.065625 °C)?',
        answer: 'Because the lapse rate is decreasing in magnitude (-2.4 to -2.1), indicating an upward curvature (convex profile), so the linear approximation slightly underestimates the temperature.',
      },
    ],
  },
  16: {
    slideNumber: 16,
    assignedMember: 'Piyush Bhushan',
    usn: 'JUUG26LBTECH17744',
    keyPoints: [
      'Interactive chart with real plotted points and the continuous fitted polynomial curve.',
      'Vertical guideline intersects at 175 m; horizontal guideline reads 24.37 °C.',
      'Show layer controls: toggle raw sensor points, polynomial curve, and guideline markers.',
    ],
    transitionCue: 'Let us perform an engineering sanity check on this estimate.',
    potentialFacultyQuestions: [
      {
        question: 'Does the fitted curve pass exactly through the original data points?',
        answer: 'Yes! An n-point interpolating polynomial of degree n-1 passes through all n points with zero residual error at the nodes.',
      },
    ],
  },
  17: {
    slideNumber: 17,
    assignedMember: 'Piyush Bhushan',
    usn: 'JUUG26LBTECH17744',
    keyPoints: [
      'Sanity check: At 100 m, T = 26.1 °C. At 200 m, T = 23.8 °C.',
      'Estimated T(175 m) = 24.37 °C lies safely within (23.8, 26.1).',
      'It is closer to 200 m (23.8 °C) than 100 m (26.1 °C), consistent with 175 being 75% along the interval.',
      'Remind evaluators: This confirms numerical plausibility, not proof of true micro-atmospheric temperature.',
    ],
    transitionCue: 'How would we implement this inside an embedded telemetry payload?',
    potentialFacultyQuestions: [
      {
        question: 'What factors in real flight could cause the true temperature to deviate from 24.37 °C?',
        answer: 'Localized thermals, solar radiation heating the probe body, drone rotor downwash turbulence, and sensor thermal time constants (response lag).',
      },
    ],
  },
  18: {
    slideNumber: 18,
    assignedMember: 'Piyush Bhushan',
    usn: 'JUUG26LBTECH17744',
    keyPoints: [
      'Walk through the 7-step embedded processing pipeline: ADC Ingestion -> Uniformity Check -> Difference Table Generation -> Parameter Mapping -> Fixed-Point Polynomial Accumulation -> Plausibility Bounds Filter -> Ground Station Telemetry.',
      'Can be implemented in C/C++ on an STM32 or ESP32 microcontroller in under 200 clock cycles.',
    ],
    transitionCue: 'Let us assess the trade-offs of this numerical approach.',
    potentialFacultyQuestions: [
      {
        question: 'Why use fixed-point arithmetic instead of floating-point on an edge MCU?',
        answer: 'On low-power microcontrollers lacking a hardware FPU (e.g., ARM Cortex-M0+), fixed-point finite difference calculations execute significantly faster and consume less battery power.',
      },
    ],
  },
  19: {
    slideNumber: 19,
    assignedMember: 'Piyush Bhushan',
    usn: 'JUUG26LBTECH17744',
    keyPoints: [
      'Advantages: Low algorithmic complexity O(n), zero transcendental functions, progressive coefficient updates.',
      'Limitations: Strictly requires uniform spacing h; sensitive to sensor noise; high-degree polynomials risk Runge oscillations near edges.',
    ],
    transitionCue: 'How does it compare against other interpolation methods?',
    potentialFacultyQuestions: [
      {
        question: 'What is Runge’s phenomenon, and how do we prevent it?',
        answer: 'It is the oscillation at the edges of an interval when interpolating with high-degree equidistant polynomials. We prevent it by keeping polynomial degrees low (degree ≤ 3 or 4) or using cubic splines.',
      },
    ],
  },
  20: {
    slideNumber: 20,
    assignedMember: 'Piyush Bhushan',
    usn: 'JUUG26LBTECH17744',
    keyPoints: [
      'Comparative benchmarking: Linear (piecewise continuous, low accuracy), Newton–Gregory (optimal for uniform grids), Lagrange (flexible for arbitrary non-uniform points), Cubic Splines (smooth C² curvature, ideal for dense uneven telemetry).',
      'Summary: Newton–Gregory is the cleanest choice when sensors are triggered at regular altitude interrupts.',
    ],
    transitionCue: 'I now hand over to T. Puneeth Reddy for the interactive simulator and faculty viva session.',
    potentialFacultyQuestions: [
      {
        question: 'Why not use Cubic Splines for this exact 5-point dataset?',
        answer: 'With only 5 points and a constant second difference, the data is already a pure global quadratic! A cubic spline adds unnecessary piecewise complexity without adding precision.',
      },
    ],
  },
  21: {
    slideNumber: 21,
    assignedMember: 'T. Puneeth Reddy',
    usn: '25BTREC049',
    keyPoints: [
      'Introduce the live simulator architecture built into our presentation.',
      'Explain key controls: interactive altitude slider, editable data points, method toggle (Forward vs Backward), and automated step-by-step playback.',
      'All calculations are performed live in TypeScript; nothing is pre-recorded or mock.',
    ],
    transitionCue: 'Let us now open and test the working interactive simulator.',
    potentialFacultyQuestions: [
      {
        question: 'Does the simulator handle non-default values and custom sensor inputs?',
        answer: 'Yes! Evaluators can edit any altitude or temperature value, add rows, or change the target altitude, and the mathematical engine recomputes all differences in real time.',
      },
    ],
  },
  22: {
    slideNumber: 22,
    assignedMember: 'T. Puneeth Reddy',
    usn: '25BTREC049',
    keyPoints: [
      'Live demonstration of the simulator: Move slider to 175 m -> confirm 24.37 °C.',
      'Test target at 50 m (u = 0.5), 125 m, 250 m.',
      'Switch between Forward and Backward methods: observe that polynomial output matches to 10 decimal digits.',
      'Demonstrate error handling: if someone introduces unequal spacing, the simulator safely alerts the user with mathematical diagnostics.',
    ],
    transitionCue: 'Let us inspect the live term dynamics and polynomial sensitivity breakdown.',
    potentialFacultyQuestions: [
      {
        question: 'Can you show what happens if the target altitude is moved to 450 m?',
        answer: 'The system flags an extrapolation warning because 450 m is outside [0, 400], reminding the engineer of increased divergence risk.',
      },
    ],
  },
  23: {
    slideNumber: 23,
    assignedMember: 'T. Puneeth Reddy',
    usn: '25BTREC049',
    keyPoints: [
      'Visual breakdown of term contributions: y0 dominates (28.5), linear term drops it by -4.2, and quadratic curvature nudges it back up by +0.0656.',
      'Run Simulation automated pipeline: highlights data ingestion -> step sizing -> difference calculation -> normalized mapping -> final result.',
    ],
    transitionCue: 'To conclude our presentation, let us review our team reflections and take faculty viva questions.',
    potentialFacultyQuestions: [
      {
        question: 'What is the significance of the term contribution breakdown?',
        answer: 'It reveals how rapidly the finite difference series converges: higher-order terms decrease in magnitude, proving whether truncation at degree 2 is justified.',
      },
    ],
  },
  24: {
    slideNumber: 24,
    assignedMember: 'T. Puneeth Reddy',
    usn: '25BTREC049',
    keyPoints: [
      'Summarize key takeaways: Bridged mathematical finite differences with realistic drone sensor telemetry.',
      'Highlight team reflections and learnings across numerical methods, ECE sensor calibration, and full-stack interactive engineering.',
      'Open the interactive faculty viva bank with expandable answers.',
      'Thank the evaluators and invite questions.',
    ],
    transitionCue: 'Thank you respected professors. We are ready for your questions.',
    potentialFacultyQuestions: [
      {
        question: 'How did your team collaborate on this project?',
        answer: 'Each member owned a critical pillar: formulation (Ashish), data & scoping (Krishna Charan), finite differences (Shomya), polynomial derivation (Dhiraj), system architecture (Piyush), and interactive software simulation & viva (Puneeth).',
      },
    ],
  },
};

export const VIVA_QUESTIONS: VivaQuestion[] = [
  {
    id: 1,
    category: 'Mathematical Theory',
    question: 'Why is the Newton–Gregory Forward formula only applicable to equally spaced data points?',
    formula: 'u = \\frac{x - x_0}{h}',
    answer: 'The derivation relies on the constant step size h to relate the shift operator E = 1 + Δ with the continuous coordinate x = x0 + uh. If intervals vary, the finite difference operator Δ is no longer homogeneous, and one must switch to divided differences (Newton’s Divided Difference formula) or Lagrange polynomials.',
  },
  {
    id: 2,
    category: 'Mathematical Theory',
    question: 'Why did the 3rd and higher-order forward differences evaluate to exactly zero in our drone dataset?',
    formula: '\\Delta^2 y_0 = \\Delta^2 y_1 = \\Delta^2 y_2 = +0.1 \\implies \\Delta^3 y_i = 0.1 - 0.1 = 0',
    answer: 'The second forward differences for our drone readings were constant (+0.1 °C). In finite difference calculus, the n-th difference of an n-th degree polynomial is constant, and all (n+1)-th and higher differences vanish identically. This proves our drone temperature profile corresponds exactly to a degree-2 (quadratic) polynomial.',
  },
  {
    id: 3,
    category: 'Algorithm & Computation',
    question: 'How do you choose between Newton–Gregory Forward and Newton–Gregory Backward interpolation?',
    formula: 'u = \\frac{x - x_0}{h} \\quad \\text{vs.} \\quad v = \\frac{x - x_n}{h}',
    answer: 'Newton–Gregory Forward interpolation is preferred when the target value x lies near the beginning of the table (u is small positive, e.g. 0 < u < 2). Newton–Gregory Backward interpolation is preferred when the target lies near the end of the table (v is small negative, e.g. -1 < v < 0), minimizing truncation and round-off accumulation.',
  },
  {
    id: 4,
    category: 'ECE / Engineering Application',
    question: 'In an embedded sensor telemetry system, what are the computational advantages of Newton–Gregory over Lagrange interpolation?',
    formula: '\\mathcal{O}(n) \\text{ update complexity vs } \\mathcal{O}(n^2)',
    answer: 'To add an additional sensor point to an existing dataset, Newton’s difference table only requires calculating one new diagonal element (O(n) operations). In contrast, Lagrange interpolation requires re-evaluating all cardinal basis polynomials from scratch (O(n²)). Furthermore, difference tables can be evaluated using Horner’s-like nested multiplication with minimal memory overhead.',
  },
  {
    id: 5,
    category: 'Error Analysis',
    question: 'What is the theoretical truncation error of the Newton–Gregory Forward formula?',
    formula: 'R_n(x) = \\frac{u(u-1)(u-2)\\cdots(u-n)}{(n+1)!} h^{n+1} f^{(n+1)}(\\xi), \\quad \\xi \\in (x_0, x_n)',
    answer: 'The remainder term Rn(x) is proportional to the (n+1)-th derivative of the underlying function evaluated at an intermediate point ξ. Because our drone profile has constant 2nd differences, its 3rd derivative is approximately zero, making truncation error negligible for our quadratic fit.',
  },
  {
    id: 6,
    category: 'ECE / Engineering Application',
    question: 'How do real atmospheric drones compensate for sensor thermal lag during vertical ascents?',
    formula: '\\tau \\frac{dT_{\\text{measured}}}{dt} + T_{\\text{measured}} = T_{\\text{ambient}}',
    answer: 'Real temperature probes (e.g. platinum RTDs or thermistors) exhibit a thermal time constant τ (typically 1–3 seconds). If the drone climbs rapidly, measured temperatures lag behind actual ambient temperatures. Engineers apply first-order dynamic inverse filtering (deconvolution) to raw sensor readings before passing the data into interpolation algorithms.',
  },
  {
    id: 7,
    category: 'Algorithm & Computation',
    question: 'What would happen if the drone sensor measurements were noisy or had random jitter?',
    formula: '\\Delta^k (y_i + \\epsilon_i) = \\Delta^k y_i + \\sum_{j=0}^k (-1)^{k-j} \\binom{k}{j} \\epsilon_{i+j}',
    answer: 'High-order finite differences act as high-pass filters and dramatically amplify random noise due to alternating binomial coefficients (+1, -3, +3, -1). In noisy real-world environments, raw data must first pass through low-pass filtering, least-squares smoothing, or a Savitzky–Golay filter before constructing difference tables.',
  },
  {
    id: 8,
    category: 'Mathematical Theory',
    question: 'Can Newton–Gregory Forward interpolation be used for extrapolation beyond 400 m?',
    formula: 'x > 400 \\implies u > 4',
    answer: 'Technically the polynomial can be evaluated for any u, but extrapolation (u > 4) is mathematically hazardous. Unbounded polynomial growth outside the sampled interval and unmodeled atmospheric layers (such as inversion layers or the tropopause) can cause catastrophic estimation errors. Engineers enforce strict bounding clamps.',
  },
];
