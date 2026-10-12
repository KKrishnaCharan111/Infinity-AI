import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateInterpolation, computeForwardDifferenceTable, DEFAULT_SENSOR_DATA } from '../src/math/interpolation.ts';

test('Default drone dataset forward difference table', () => {
  const table = computeForwardDifferenceTable(DEFAULT_SENSOR_DATA);
  assert.equal(table.length, 5);
  
  // y values
  assert.equal(table[0].y, 28.5);
  assert.equal(table[1].y, 26.1);
  assert.equal(table[2].y, 23.8);
  assert.equal(table[3].y, 21.6);
  assert.equal(table[4].y, 19.5);

  // Δy
  assert.equal(table[0].diffs[0].toFixed(1), '-2.4');
  assert.equal(table[1].diffs[0].toFixed(1), '-2.3');
  assert.equal(table[2].diffs[0].toFixed(1), '-2.2');
  assert.equal(table[3].diffs[0].toFixed(1), '-2.1');

  // Δ²y
  assert.equal(table[0].diffs[1].toFixed(1), '0.1');
  assert.equal(table[1].diffs[1].toFixed(1), '0.1');
  assert.equal(table[2].diffs[1].toFixed(1), '0.1');

  // Δ³y
  assert.equal(table[0].diffs[2], 0);
  assert.equal(table[1].diffs[2], 0);

  // Δ⁴y
  assert.equal(table[0].diffs[3], 0);
});

test('Forward interpolation at target x = 175 m', () => {
  const result = calculateInterpolation(DEFAULT_SENSOR_DATA, 175, 'forward');
  assert.equal(result.isValid, true);
  assert.equal(result.u, 1.75);
  assert.equal(result.h, 100);
  
  // Term 0 = 28.5
  assert.equal(result.terms[0].termValue, 28.5);
  // Term 1 = 1.75 * (-2.4) = -4.2
  assert.equal(result.terms[1].termValue, -4.2);
  // Term 2 = 1.75 * 0.75 / 2 * 0.1 = 0.065625
  assert.equal(result.terms[2].termValue, 0.065625);
  
  // Final sum = 28.5 - 4.2 + 0.065625 = 24.365625
  assert.equal(result.yTarget, 24.365625);
  assert.equal(result.yTarget.toFixed(2), '24.37');
});

test('Backward interpolation at target x = 175 m produces identical polynomial value', () => {
  const result = calculateInterpolation(DEFAULT_SENSOR_DATA, 175, 'backward');
  assert.equal(result.isValid, true);
  assert.equal(Math.abs(result.yTarget - 24.365625) < 1e-10, true);
});

test('Validation detects unequally spaced data', () => {
  const badData = [
    { id: '1', x: 0, y: 10 },
    { id: '2', x: 100, y: 20 },
    { id: '3', x: 250, y: 30 }, // unequal jump
  ];
  const result = calculateInterpolation(badData, 150, 'forward');
  assert.equal(result.isValid, false);
  assert.match(result.errorMessage, /not equally spaced/);
});
