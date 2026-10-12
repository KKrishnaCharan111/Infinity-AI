# Real-Life Application of Newton–Gregory Forward Interpolation
### Atmospheric Temperature Estimation Using a Research Drone

> **Course:** Engineering Experiential Learning • ECE / Applied Engineering Mathematics  
> **Topic:** Estimating Ambient Temperature at an Unmeasured Altitude ($x = 175\text{ m}$) from Drone Telemetry  
> **Tech Stack:** React 18, TypeScript, Vite, Tailwind CSS, Recharts, KaTeX, Lucide React, Canvas Confetti  

---

## 🚁 Project Overview

This application is a **comprehensive, 24-slide interactive engineering presentation website and mathematical simulator** built for faculty evaluation. 

The project demonstrates the practical application of finite-difference numerical calculus in Electronics and Communication Engineering:
- A meteorological research drone ascends through the lower troposphere, sampling atmospheric temperature at uniform $100\text{ m}$ intervals:
  $$\{(0\text{ m}, 28.5^\circ\text{C}), (100\text{ m}, 26.1^\circ\text{C}), (200\text{ m}, 23.8^\circ\text{C}), (300\text{ m}, 21.6^\circ\text{C}), (400\text{ m}, 19.5^\circ\text{C})\}$$
- Engineers require an accurate, continuous estimate at an unmeasured intermediate elevation of **$175\text{ m}$**.
- Using the Newton–Gregory forward difference polynomial, the application calculates:
  $$u = \frac{175 - 0}{100} = 1.75$$
  $$T(175) = 28.5 + (1.75)(-2.4) + \frac{1.75(0.75)}{2}(0.1) = 28.5 - 4.2 + 0.065625 = \mathbf{24.365625^\circ\text{C}} \approx \mathbf{24.37^\circ\text{C}}$$

---

## 👥 Project Team Roster

| University Seat Number (USN) | Student Name | Role | Assigned Modules |
| :--- | :--- | :--- | :--- |
| **25BTREC005** | **ASHISH CHOUDHARY** | **Team Leader** | Project Scope, Drone Scenario & Problem Formulation (Slides 1–4) |
| **25BTREC020** | **KUMMUSANI KRISHNA CHARAN** | Team Member | Sensor Ingestion, Interpolation Concepts & Industry Relevance (Slides 5–8) |
| **25BTREC055** | **SHOMYA SNEHA CHOWDHURY** | Team Member | Finite Difference Operators & Forward Difference Tableau (Slides 9–12) |
| **25BTREC012** | **DHIRAJ D V** | Team Member | Formula Derivation, Coordinate Mapping & Step Calculation (Slides 13–15) |
| **JUUG26LBTECH17744** | **PIYUSH BHUSHAN** | Team Member | Graphical Analysis, Sanity Check & Embedded System Architecture (Slides 16–20) |
| **25BTREC049** | **T. PUNEETH REDDY** | Team Member | Interactive Simulator Lab, Term Dynamics, Reflections & Viva Defense (Slides 21–24) |

---

## 🚀 Installation & Local Launch

### Prerequisites
- Node.js (v18.0.0 or later, tested with v24.20.0 LTS)
- npm (tested with npm v11/v12)

### 1. Clone or Navigate to Project
```bash
cd "C:\Users\K KRISHNA CHARAN\.gemini\antigravity\scratch\drone-temperature-interpolation"
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Development Server
```bash
npm run dev
```
Open your browser at `http://localhost:5173` (or the network URL displayed in terminal).

### 4. Run Mathematical Unit Tests
```bash
node --experimental-strip-types test/interpolation.test.mjs
```

### 5. Production Build & Preview
```bash
npm run build
npm run preview
```

---

## 🖥️ Presentation Controls & Interactive Features

- **Keyboard Navigation:** 
  - `→` or `Space` or `PageDown`: Next Slide
  - `←` or `PageUp`: Previous Slide
  - `Home`: Jump to Slide 01
  - `End`: Jump to Slide 24
  - `Esc`: Close open drawers/modals
- **Presentation Timer:** Running stopwatch in the header with pause/resume and reset.
- **Table of Contents (Slide Drawer):** Click the slide counter (`01 / 24`) in the top bar or footer to open a thumbnail drawer for direct random-access slide jumping.
- **Speaker Notes Modal:** Dedicated presenter panel with speaking points, transition cues, and anticipated faculty questions for every slide.
- **Printable Academic Report:** One-click generation of an academic submission report formatted for PDF printing.
- **Reduced Motion Toggle:** Disables rotor spins and floating loops for projectors or presenter preference.
- **Full-Screen Presentation Mode:** One-click presentation mode using browser fullscreen APIs.

---

## 🧮 Mathematical Simulator Architecture (`src/math/interpolation.ts`)

The simulator is built with a pure, tested numerical engine:
1. **Validation (`validatePoints`):** Asserts finite values, strict ascending monotonic order, and minimum 2 points.
2. **Equidistant Verification (`checkEqualSpacing`):** Validates $|x_{i+1} - x_i - h| < 10^{-4}\text{ m}$.
3. **Forward Tableau (`computeForwardDifferenceTable`):**
   $$\Delta^k y_i = \Delta^{k-1} y_{i+1} - \Delta^{k-1} y_i$$
4. **Normalized Parameter:**
   $$u = \frac{x - x_0}{h} \quad (\text{Forward}) \quad \text{or} \quad v = \frac{x - x_n}{h} \quad (\text{Backward})$$
5. **Exact Series Evaluation:**
   $$P(x) = y_0 + \sum_{k=1}^{n-1} \frac{\prod_{j=0}^{k-1}(u - j)}{k!} \Delta^k y_0$$
6. **Floating-point cleanup (`cleanFloat`):** Eliminates IEEE-754 precision artifacts so terms sum cleanly to exact values.
