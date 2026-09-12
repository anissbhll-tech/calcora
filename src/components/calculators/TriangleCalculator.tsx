import React, { useState, useMemo, useEffect } from 'react';
import { BaseCalculatorProps } from './index';
import { CalcInput } from '../common/CalcInput';
import { CalcResultCard } from '../common/CalcResultCard';
import { safeParseNumber, formatNumber } from '../../lib/mathUtils';
import { Triangle, Sparkles, Copy, Check, Info, Layers, Compass } from 'lucide-react';

type SolvingMode = 'SAS' | 'SSS' | 'ASA' | 'RIGHT';

export const TriangleCalculator: React.FC<BaseCalculatorProps> = ({ onSaveHistory, initialPreset }) => {
  const [mode, setMode] = useState<SolvingMode>('SAS');

  // SAS inputs: side a, side b, angle C (degrees)
  const [sasA, setSasA] = useState<number>(6);
  const [sasB, setSasB] = useState<number>(8);
  const [sasAngleC, setSasAngleC] = useState<number>(90);

  // SSS inputs: side a, side b, side c
  const [sssA, setSssA] = useState<number>(5);
  const [sssB, setSssB] = useState<number>(6);
  const [sssC, setSssC] = useState<number>(7);

  // ASA inputs: angle A, side c, angle B
  const [asaAngleA, setAsaAngleA] = useState<number>(50);
  const [asaSideC, setAsaSideC] = useState<number>(10);
  const [asaAngleB, setAsaAngleB] = useState<number>(60);

  // Right Triangle: leg a, leg b
  const [rtLegA, setRtLegA] = useState<number>(3);
  const [rtLegB, setRtLegB] = useState<number>(4);

  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  useEffect(() => {
    if (initialPreset) {
      if (initialPreset.mode) setMode(initialPreset.mode);
      if (initialPreset.a) setSasA(initialPreset.a);
      if (initialPreset.b) setSasB(initialPreset.b);
      if (initialPreset.angleC) setSasAngleC(initialPreset.angleC);
    }
  }, [initialPreset]);

  // Main Geometry Solver
  const solution = useMemo(() => {
    const toRad = (deg: number) => (deg * Math.PI) / 180;
    const toDeg = (rad: number) => (rad * 180) / Math.PI;

    let a = 0;
    let b = 0;
    let c = 0;
    let angleA = 0;
    let angleB = 0;
    let angleC = 0;
    let isValid = true;
    let errorMessage = '';

    if (mode === 'SAS') {
      a = safeParseNumber(sasA, 1);
      b = safeParseNumber(sasB, 1);
      angleC = safeParseNumber(sasAngleC, 1);

      if (a <= 0 || b <= 0 || angleC <= 0 || angleC >= 180) {
        isValid = false;
        errorMessage = 'Sides must be > 0 and Angle C must be strictly between 0° and 180°.';
      } else {
        const radC = toRad(angleC);
        // Law of Cosines: c² = a² + b² - 2ab cos(C)
        c = Math.sqrt(Math.max(0.0001, a * a + b * b - 2 * a * b * Math.cos(radC)));

        // Law of Sines / Cosines for A and B
        const cosA = (b * b + c * c - a * a) / (2 * b * c);
        angleA = toDeg(Math.acos(Math.max(-1, Math.min(1, cosA))));
        angleB = 180 - angleA - angleC;
      }
    } else if (mode === 'SSS') {
      a = safeParseNumber(sssA, 1);
      b = safeParseNumber(sssB, 1);
      c = safeParseNumber(sssC, 1);

      // Triangle Inequality Theorem
      if (a <= 0 || b <= 0 || c <= 0 || a + b <= c || a + c <= b || b + c <= a) {
        isValid = false;
        errorMessage = 'Invalid triangle: The sum of any two sides must be strictly greater than the third side (a + b > c).';
      } else {
        const cosA = (b * b + c * c - a * a) / (2 * b * c);
        const cosB = (a * a + c * c - b * b) / (2 * a * c);
        const cosC = (a * a + b * b - c * c) / (2 * a * b);

        angleA = toDeg(Math.acos(Math.max(-1, Math.min(1, cosA))));
        angleB = toDeg(Math.acos(Math.max(-1, Math.min(1, cosB))));
        angleC = 180 - angleA - angleB;
      }
    } else if (mode === 'ASA') {
      angleA = safeParseNumber(asaAngleA, 1);
      c = safeParseNumber(asaSideC, 1);
      angleB = safeParseNumber(asaAngleB, 1);

      if (angleA <= 0 || angleB <= 0 || angleA + angleB >= 180 || c <= 0) {
        isValid = false;
        errorMessage = 'Sum of Angle A and Angle B must be < 180°, and Side c must be > 0.';
      } else {
        angleC = 180 - angleA - angleB;
        const radA = toRad(angleA);
        const radB = toRad(angleB);
        const radC = toRad(angleC);

        // Law of Sines: a = c * sin(A) / sin(C)
        a = (c * Math.sin(radA)) / Math.sin(radC);
        b = (c * Math.sin(radB)) / Math.sin(radC);
      }
    } else if (mode === 'RIGHT') {
      a = safeParseNumber(rtLegA, 1);
      b = safeParseNumber(rtLegB, 1);

      if (a <= 0 || b <= 0) {
        isValid = false;
        errorMessage = 'Both leg lengths must be positive numbers.';
      } else {
        c = Math.sqrt(a * a + b * b);
        angleC = 90;
        angleA = toDeg(Math.atan2(a, b));
        angleB = 90 - angleA;
      }
    }

    if (!isValid) {
      return {
        isValid: false,
        errorMessage,
        a: 0,
        b: 0,
        c: 0,
        angleA: 0,
        angleB: 0,
        angleC: 0,
        perimeter: 0,
        area: 0,
        semiPerimeter: 0,
        inradius: 0,
        circumradius: 0,
        ha: 0,
        hb: 0,
        hc: 0,
        sideType: 'Invalid',
        angleType: 'Invalid',
        svgCoords: null,
      };
    }

    // Geometry Metrics
    const perimeter = a + b + c;
    const s = perimeter / 2; // semi-perimeter
    // Heron's Formula
    const area = Math.sqrt(Math.max(0, s * (s - a) * (s - b) * (s - c)));

    // Altitudes
    const ha = area > 0 ? (2 * area) / a : 0;
    const hb = area > 0 ? (2 * area) / b : 0;
    const hc = area > 0 ? (2 * area) / c : 0;

    // Inradius (r = Area / s) and Circumradius (R = abc / 4Area)
    const inradius = s > 0 ? area / s : 0;
    const circumradius = area > 0 ? (a * b * c) / (4 * area) : 0;

    // Classifications
    let sideType = 'Scalene';
    const eps = 0.001;
    if (Math.abs(a - b) < eps && Math.abs(b - c) < eps) {
      sideType = 'Equilateral';
    } else if (Math.abs(a - b) < eps || Math.abs(b - c) < eps || Math.abs(a - c) < eps) {
      sideType = 'Isosceles';
    }

    let angleType = 'Acute';
    const maxAngle = Math.max(angleA, angleB, angleC);
    if (Math.abs(maxAngle - 90) < 0.1) {
      angleType = 'Right-Angled';
    } else if (maxAngle > 90.1) {
      angleType = 'Obtuse';
    }

    // Calculate SVG Polygon Coordinates for Visualizer
    // Let side c be base along the horizontal axis: A at (0, 0), B at (c, 0)
    // Point C at (b * cos(A), b * sin(A))
    const radA = toRad(angleA);
    const rawCx = b * Math.cos(radA);
    const rawCy = b * Math.sin(radA);

    // Normalize into SVG box (300 x 180)
    const minX = Math.min(0, rawCx);
    const maxX = Math.max(c, rawCx);
    const width = maxX - minX || 1;
    const height = rawCy || 1;

    const pad = 35;
    const svgW = 320;
    const svgH = 190;
    const scale = Math.min((svgW - 2 * pad) / width, (svgH - 2 * pad) / height);

    const ax = pad + (0 - minX) * scale;
    const ay = svgH - pad;
    const bx = pad + (c - minX) * scale;
    const by = svgH - pad;
    const cx = pad + (rawCx - minX) * scale;
    const cy = svgH - pad - rawCy * scale;

    return {
      isValid: true,
      errorMessage: '',
      a,
      b,
      c,
      angleA,
      angleB,
      angleC,
      perimeter,
      area,
      semiPerimeter: s,
      inradius,
      circumradius,
      ha,
      hb,
      hc,
      sideType,
      angleType,
      svgCoords: { ax, ay, bx, by, cx, cy },
    };
  }, [mode, sasA, sasB, sasAngleC, sssA, sssB, sssC, asaAngleA, asaSideC, asaAngleB, rtLegA, rtLegB]);

  const copyVal = (val: string, key: string) => {
    navigator.clipboard.writeText(val);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Mode Selector */}
      <div className="flex flex-wrap gap-2 p-1.5 bg-slate-100 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700">
        <button
          type="button"
          onClick={() => setMode('SAS')}
          className={`flex-1 min-w-[130px] py-2.5 px-3 text-xs font-bold rounded-xl transition ${
            mode === 'SAS'
              ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm border border-slate-200/60 dark:border-slate-700'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          Side-Angle-Side (SAS)
        </button>

        <button
          type="button"
          onClick={() => setMode('SSS')}
          className={`flex-1 min-w-[130px] py-2.5 px-3 text-xs font-bold rounded-xl transition ${
            mode === 'SSS'
              ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-sm border border-slate-200/60 dark:border-slate-700'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          Side-Side-Side (SSS)
        </button>

        <button
          type="button"
          onClick={() => setMode('ASA')}
          className={`flex-1 min-w-[130px] py-2.5 px-3 text-xs font-bold rounded-xl transition ${
            mode === 'ASA'
              ? 'bg-white dark:bg-slate-900 text-purple-600 dark:text-purple-400 shadow-sm border border-slate-200/60 dark:border-slate-700'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          Angle-Side-Angle (ASA)
        </button>

        <button
          type="button"
          onClick={() => setMode('RIGHT')}
          className={`flex-1 min-w-[130px] py-2.5 px-3 text-xs font-bold rounded-xl transition ${
            mode === 'RIGHT'
              ? 'bg-white dark:bg-slate-900 text-amber-600 dark:text-amber-400 shadow-sm border border-slate-200/60 dark:border-slate-700'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          Right Triangle (90°)
        </button>
      </div>

      {/* Input Configuration & Interactive Diagram Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Inputs Panel */}
        <div className="lg:col-span-6 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Compass className="w-4 h-4 text-blue-500" />
            Enter Given Dimensions
          </h3>

          {mode === 'SAS' && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <CalcInput id="sasA" label="Side a" value={sasA} onChange={setSasA} min={0.1} step={0.5} />
                <CalcInput id="sasB" label="Side b" value={sasB} onChange={setSasB} min={0.1} step={0.5} />
              </div>
              <CalcInput
                id="sasAngleC"
                label="Included Angle C (between a and b)"
                value={sasAngleC}
                onChange={setSasAngleC}
                min={0.1}
                max={179.9}
                step={1}
                suffix="°"
              />
            </div>
          )}

          {mode === 'SSS' && (
            <div className="grid grid-cols-3 gap-3">
              <CalcInput id="sssA" label="Side a" value={sssA} onChange={setSssA} min={0.1} step={0.5} />
              <CalcInput id="sssB" label="Side b" value={sssB} onChange={setSssB} min={0.1} step={0.5} />
              <CalcInput id="sssC" label="Side c" value={sssC} onChange={setSssC} min={0.1} step={0.5} />
            </div>
          )}

          {mode === 'ASA' && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <CalcInput id="asaAngleA" label="Angle A" value={asaAngleA} onChange={setAsaAngleA} min={1} max={178} suffix="°" />
                <CalcInput id="asaAngleB" label="Angle B" value={asaAngleB} onChange={setAsaAngleB} min={1} max={178} suffix="°" />
              </div>
              <CalcInput id="asaSideC" label="Base Side c (between A and B)" value={asaSideC} onChange={setAsaSideC} min={0.1} step={0.5} />
            </div>
          )}

          {mode === 'RIGHT' && (
            <div className="grid grid-cols-2 gap-3">
              <CalcInput id="rtLegA" label="Base Leg a" value={rtLegA} onChange={setRtLegA} min={0.1} step={0.5} />
              <CalcInput id="rtLegB" label="Vertical Leg b" value={rtLegB} onChange={setRtLegB} min={0.1} step={0.5} />
            </div>
          )}

          {/* Classification Tags */}
          {solution.isValid && (
            <div className="pt-2 flex flex-wrap gap-2 text-xs">
              <span className="px-3 py-1 bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 font-bold rounded-lg border border-blue-200 dark:border-blue-800">
                {solution.sideType}
              </span>
              <span className="px-3 py-1 bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 font-bold rounded-lg border border-purple-200 dark:border-purple-800">
                {solution.angleType}
              </span>
            </div>
          )}
        </div>

        {/* Right SVG Triangle Visualizer */}
        <div className="lg:col-span-6 bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
            Geometric Shape &amp; Vertex Preview
          </span>

          {solution.isValid && solution.svgCoords ? (
            <div className="w-full flex items-center justify-center py-2">
              <svg viewBox="0 0 320 190" className="w-full max-h-48 drop-shadow-sm font-mono text-[11px]">
                {/* Triangle Polygon */}
                <polygon
                  points={`${solution.svgCoords.ax},${solution.svgCoords.ay} ${solution.svgCoords.bx},${solution.svgCoords.by} ${solution.svgCoords.cx},${solution.svgCoords.cy}`}
                  className="fill-blue-500/15 stroke-blue-600 dark:stroke-blue-400 stroke-2"
                />

                {/* Vertex Labels */}
                <circle cx={solution.svgCoords.ax} cy={solution.svgCoords.ay} r={4} className="fill-blue-600" />
                <text x={solution.svgCoords.ax - 12} y={solution.svgCoords.ay + 14} className="font-bold fill-slate-700 dark:fill-slate-300">A</text>

                <circle cx={solution.svgCoords.bx} cy={solution.svgCoords.by} r={4} className="fill-blue-600" />
                <text x={solution.svgCoords.bx + 8} y={solution.svgCoords.by + 14} className="font-bold fill-slate-700 dark:fill-slate-300">B</text>

                <circle cx={solution.svgCoords.cx} cy={solution.svgCoords.cy} r={4} className="fill-blue-600" />
                <text x={solution.svgCoords.cx} y={solution.svgCoords.cy - 8} textAnchor="middle" className="font-bold fill-slate-700 dark:fill-slate-300">C</text>

                {/* Side Lengths */}
                <text x={(solution.svgCoords.ax + solution.svgCoords.bx) / 2} y={solution.svgCoords.ay + 16} textAnchor="middle" className="fill-slate-500 font-semibold text-[10px]">
                  c = {formatNumber(solution.c, 2)}
                </text>
                <text x={(solution.svgCoords.ax + solution.svgCoords.cx) / 2 - 12} y={(solution.svgCoords.ay + solution.svgCoords.cy) / 2} textAnchor="middle" className="fill-slate-500 font-semibold text-[10px]">
                  b = {formatNumber(solution.b, 2)}
                </text>
                <text x={(solution.svgCoords.bx + solution.svgCoords.cx) / 2 + 14} y={(solution.svgCoords.by + solution.svgCoords.cy) / 2} textAnchor="middle" className="fill-slate-500 font-semibold text-[10px]">
                  a = {formatNumber(solution.a, 2)}
                </text>
              </svg>
            </div>
          ) : (
            <div className="p-8 text-center text-rose-500 font-bold text-xs">
              {solution.errorMessage || 'Invalid triangle parameters'}
            </div>
          )}

          <div className="text-[11px] text-slate-400 text-center">
            Angles: A = {solution.angleA.toFixed(1)}°, B = {solution.angleB.toFixed(1)}°, C = {solution.angleC.toFixed(1)}°
          </div>
        </div>
      </div>

      {/* KPI Results Grid */}
      {solution.isValid && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <CalcResultCard
            title="Total Area"
            value={formatNumber(solution.area, 3)}
            subtitle="Heron's formula: √s(s-a)(s-b)(s-c)"
            highlighted={true}
          />

          <CalcResultCard
            title="Total Perimeter"
            value={formatNumber(solution.perimeter, 3)}
            subtitle={`Semi-perimeter s = ${formatNumber(solution.semiPerimeter, 2)}`}
          />

          <CalcResultCard
            title="Inradius (r)"
            value={formatNumber(solution.inradius, 3)}
            subtitle="Inscribed circle radius"
          />

          <CalcResultCard
            title="Circumradius (R)"
            value={formatNumber(solution.circumradius, 3)}
            subtitle="Circumscribed circle radius"
          />
        </div>
      )}

      {/* Full Dimensions & Altitudes Table */}
      {solution.isValid && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Triangle className="w-4 h-4 text-blue-500" />
            Complete Geometry &amp; Altitudes Table
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl space-y-1">
              <span className="font-sans font-bold text-slate-500 block">Side a &amp; Altitude hₐ</span>
              <div className="text-sm font-bold text-slate-900 dark:text-white">a = {formatNumber(solution.a, 4)}</div>
              <div className="text-slate-500">Altitude hₐ = {formatNumber(solution.ha, 3)}</div>
              <div className="text-blue-600 dark:text-blue-400">Angle A = {solution.angleA.toFixed(2)}°</div>
            </div>

            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl space-y-1">
              <span className="font-sans font-bold text-slate-500 block">Side b &amp; Altitude h_b</span>
              <div className="text-sm font-bold text-slate-900 dark:text-white">b = {formatNumber(solution.b, 4)}</div>
              <div className="text-slate-500">Altitude h_b = {formatNumber(solution.hb, 3)}</div>
              <div className="text-blue-600 dark:text-blue-400">Angle B = {solution.angleB.toFixed(2)}°</div>
            </div>

            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl space-y-1">
              <span className="font-sans font-bold text-slate-500 block">Side c &amp; Altitude h_c</span>
              <div className="text-sm font-bold text-slate-900 dark:text-white">c = {formatNumber(solution.c, 4)}</div>
              <div className="text-slate-500">Altitude h_c = {formatNumber(solution.hc, 3)}</div>
              <div className="text-blue-600 dark:text-blue-400">Angle C = {solution.angleC.toFixed(2)}°</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
