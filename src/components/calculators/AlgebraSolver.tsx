import React, { useState, useMemo, useEffect } from 'react';
import { BaseCalculatorProps } from './index';
import { CalcInput } from '../common/CalcInput';
import { CalcResultCard } from '../common/CalcResultCard';
import { safeParseNumber, formatNumber } from '../../lib/mathUtils';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, ReferenceLine } from 'recharts';
import { Sigma, TrendingUp, Sparkles, Copy, Check, Info, ArrowRight } from 'lucide-react';

interface QuadraticPreset {
  name: string;
  a: number;
  b: number;
  c: number;
  desc: string;
}

const QUADRATIC_PRESETS: QuadraticPreset[] = [
  { name: 'Factoring Practice', a: 1, b: -5, c: 6, desc: '(x - 2)(x - 3) = 0 → Roots: 2, 3' },
  { name: 'Perfect Square', a: 1, b: -6, c: 9, desc: '(x - 3)² = 0 → Repeated Root: 3' },
  { name: 'Complex Roots', a: 1, b: 2, c: 5, desc: 'Δ < 0 → -1 ± 2i' },
  { name: 'Projectile Motion', a: -16, b: 64, c: 80, desc: 'h(t) = -16t² + 64t + 80 ft' },
  { name: 'Golden Ratio', a: 1, b: -1, c: -1, desc: 'x² - x - 1 = 0 → Φ ≈ 1.618' },
];

export const AlgebraSolver: React.FC<BaseCalculatorProps> = ({ onSaveHistory, initialPreset }) => {
  const [mode, setMode] = useState<'quadratic' | 'system'>('quadratic');

  // Quadratic coefficients: ax² + bx + c = 0
  const [a, setA] = useState<number>(1);
  const [b, setB] = useState<number>(-5);
  const [c, setC] = useState<number>(6);

  // 2x2 Linear System: a1*x + b1*y = c1; a2*x + b2*y = c2
  const [sysA1, setSysA1] = useState<number>(2);
  const [sysB1, setSysB1] = useState<number>(3);
  const [sysC1, setSysC1] = useState<number>(13);
  const [sysA2, setSysA2] = useState<number>(1);
  const [sysB2, setSysB2] = useState<number>(-1);
  const [sysC2, setSysC2] = useState<number>(-1);

  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  useEffect(() => {
    if (initialPreset) {
      if (initialPreset.a !== undefined) setA(initialPreset.a);
      if (initialPreset.b !== undefined) setB(initialPreset.b);
      if (initialPreset.c !== undefined) setC(initialPreset.c);
    }
  }, [initialPreset]);

  // Quadratic Evaluation
  const quadResult = useMemo(() => {
    const coeffA = safeParseNumber(a, 1);
    const coeffB = safeParseNumber(b, 0);
    const coeffC = safeParseNumber(c, 0);

    if (coeffA === 0) {
      // Linear equation: bx + c = 0
      const root = coeffB !== 0 ? -coeffC / coeffB : null;
      return {
        isLinear: true,
        discriminant: 0,
        rootType: 'Linear Equation',
        r1Display: root !== null ? formatNumber(root, 4) : coeffC === 0 ? 'Infinite Solutions' : 'No Solution',
        r2Display: 'N/A (Linear)',
        vertexH: 0,
        vertexK: 0,
        opens: 'None',
        yIntercept: coeffC,
        axisOfSymmetry: root !== null ? `x = ${formatNumber(root, 2)}` : 'N/A',
        factoredForm: coeffB !== 0 ? `${coeffB}(x ${coeffC / coeffB >= 0 ? `+ ${formatNumber(coeffC / coeffB, 2)}` : `- ${formatNumber(Math.abs(coeffC / coeffB), 2)}`}) = 0` : 'N/A',
        chartPoints: [],
      };
    }

    const discriminant = coeffB * coeffB - 4 * coeffA * coeffC;
    const vertexH = -coeffB / (2 * coeffA);
    const vertexK = coeffA * vertexH * vertexH + coeffB * vertexH + coeffC;
    const opens = coeffA > 0 ? 'Upward (Minimum at vertex)' : 'Downward (Maximum at vertex)';

    let r1Display = '';
    let r2Display = '';
    let rootType = '';
    let factoredForm = '';

    if (discriminant > 0) {
      const r1 = (-coeffB + Math.sqrt(discriminant)) / (2 * coeffA);
      const r2 = (-coeffB - Math.sqrt(discriminant)) / (2 * coeffA);
      r1Display = formatNumber(r1, 4);
      r2Display = formatNumber(r2, 4);
      rootType = 'Two Distinct Real Roots';
      factoredForm = `${coeffA !== 1 ? `${coeffA}` : ''}(x ${r1 >= 0 ? `- ${formatNumber(r1, 2)}` : `+ ${formatNumber(Math.abs(r1), 2)}`})(x ${r2 >= 0 ? `- ${formatNumber(r2, 2)}` : `+ ${formatNumber(Math.abs(r2), 2)}`}) = 0`;
    } else if (discriminant === 0) {
      const r = -coeffB / (2 * coeffA);
      r1Display = formatNumber(r, 4);
      r2Display = `${formatNumber(r, 4)} (Multiplicity 2)`;
      rootType = 'One Repeated Real Root';
      factoredForm = `${coeffA !== 1 ? `${coeffA}` : ''}(x ${r >= 0 ? `- ${formatNumber(r, 2)}` : `+ ${formatNumber(Math.abs(r), 2)}`})² = 0`;
    } else {
      const real = -coeffB / (2 * coeffA);
      const imag = Math.sqrt(Math.abs(discriminant)) / (2 * Math.abs(coeffA));
      r1Display = `${formatNumber(real, 3)} + ${formatNumber(imag, 3)}i`;
      r2Display = `${formatNumber(real, 3)} − ${formatNumber(imag, 3)}i`;
      rootType = 'Two Complex Conjugate Roots';
      factoredForm = `No real linear factors (Irreducible over ℝ)`;
    }

    // Generate Parabola Curve Coordinates
    const xSpan = Math.max(5, Math.abs(vertexH) + 4);
    const step = (2 * xSpan) / 24;
    const chartPoints = [];
    for (let xVal = vertexH - xSpan; xVal <= vertexH + xSpan + 0.001; xVal += step) {
      const yVal = coeffA * xVal * xVal + coeffB * xVal + coeffC;
      chartPoints.push({
        x: parseFloat(xVal.toFixed(2)),
        y: parseFloat(yVal.toFixed(2)),
      });
    }

    return {
      isLinear: false,
      discriminant,
      rootType,
      r1Display,
      r2Display,
      vertexH,
      vertexK,
      opens,
      yIntercept: coeffC,
      axisOfSymmetry: `x = ${formatNumber(vertexH, 2)}`,
      factoredForm,
      chartPoints,
    };
  }, [a, b, c]);

  // 2x2 Linear System Evaluation (Cramer's Rule)
  const sysResult = useMemo(() => {
    const a1 = safeParseNumber(sysA1, 0);
    const b1 = safeParseNumber(sysB1, 0);
    const c1 = safeParseNumber(sysC1, 0);
    const a2 = safeParseNumber(sysA2, 0);
    const b2 = safeParseNumber(sysB2, 0);
    const c2 = safeParseNumber(sysC2, 0);

    const det = a1 * b2 - a2 * b1;
    const detX = c1 * b2 - c2 * b1;
    const detY = a1 * c2 - a2 * c1;

    if (det !== 0) {
      const x = detX / det;
      const y = detY / det;
      return {
        status: 'Unique Solution',
        x: formatNumber(x, 4),
        y: formatNumber(y, 4),
        det,
        detX,
        detY,
      };
    } else {
      if (detX === 0 && detY === 0) {
        return {
          status: 'Infinitely Many Solutions (Coincident Lines)',
          x: 'Dependent',
          y: 'Dependent',
          det: 0,
          detX: 0,
          detY: 0,
        };
      } else {
        return {
          status: 'No Solution (Parallel Inconsistent Lines)',
          x: 'Undefined',
          y: 'Undefined',
          det: 0,
          detX,
          detY,
        };
      }
    }
  }, [sysA1, sysB1, sysC1, sysA2, sysB2, sysC2]);

  const copyVal = (val: string, key: string) => {
    navigator.clipboard.writeText(val);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Mode Selector */}
      <div className="flex gap-2 p-1.5 bg-slate-100 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700">
        <button
          type="button"
          onClick={() => setMode('quadratic')}
          className={`flex-1 py-2.5 px-4 text-xs font-bold rounded-xl transition ${
            mode === 'quadratic'
              ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm border border-slate-200/60 dark:border-slate-700'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          Quadratic Equation (ax² + bx + c = 0)
        </button>

        <button
          type="button"
          onClick={() => setMode('system')}
          className={`flex-1 py-2.5 px-4 text-xs font-bold rounded-xl transition ${
            mode === 'system'
              ? 'bg-white dark:bg-slate-900 text-purple-600 dark:text-purple-400 shadow-sm border border-slate-200/60 dark:border-slate-700'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          System of 2 Linear Equations (Cramer's Rule)
        </button>
      </div>

      {mode === 'quadratic' ? (
        <div className="space-y-6">
          {/* Presets Header */}
          <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2.5">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-blue-500" />
              Example Scenarios &amp; Presets
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {QUADRATIC_PRESETS.map((p, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setA(p.a);
                    setB(p.b);
                    setC(p.c);
                  }}
                  className="p-2.5 text-left rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-500 transition text-xs"
                >
                  <div className="font-bold text-slate-800 dark:text-slate-200 truncate">{p.name}</div>
                  <div className="text-[10px] text-slate-400 truncate">{p.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Equation Banner */}
          <div className="p-5 bg-blue-50/60 dark:bg-blue-950/40 rounded-2xl border border-blue-100 dark:border-blue-900/60 text-center font-mono text-xl sm:text-2xl font-black text-blue-950 dark:text-blue-100">
            {a === 1 ? 'x²' : a === -1 ? '−x²' : `${a}x²`}{' '}
            {b >= 0 ? `+ ${b === 1 ? '' : b}x` : `− ${Math.abs(b) === 1 ? '' : Math.abs(b)}x`}{' '}
            {c >= 0 ? `+ ${c}` : `− ${Math.abs(c)}`} = 0
          </div>

          {/* Coefficient Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <CalcInput
              id="coeffA"
              label="Coefficient a (x²)"
              value={a}
              onChange={setA}
              step={0.5}
            />

            <CalcInput
              id="coeffB"
              label="Coefficient b (x)"
              value={b}
              onChange={setB}
              step={0.5}
            />

            <CalcInput
              id="coeffC"
              label="Constant c"
              value={c}
              onChange={setC}
              step={0.5}
            />
          </div>

          {/* Roots Result Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">First Root (x₁)</span>
                <button
                  type="button"
                  onClick={() => copyVal(quadResult.r1Display, 'r1')}
                  className="text-slate-400 hover:text-blue-500"
                >
                  {copiedKey === 'r1' ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              <div className="text-2xl sm:text-3xl font-black font-mono text-blue-600 dark:text-blue-400">
                x₁ = {quadResult.r1Display}
              </div>
              <div className="text-[11px] text-slate-400">{quadResult.rootType}</div>
            </div>

            <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Second Root (x₂)</span>
                <button
                  type="button"
                  onClick={() => copyVal(quadResult.r2Display, 'r2')}
                  className="text-slate-400 hover:text-blue-500"
                >
                  {copiedKey === 'r2' ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              <div className="text-2xl sm:text-3xl font-black font-mono text-blue-600 dark:text-blue-400">
                x₂ = {quadResult.r2Display}
              </div>
              <div className="text-[11px] text-slate-400">Quadratic formula: (-b ± √Δ) / 2a</div>
            </div>
          </div>

          {/* Detailed Geometric & Algebraic Breakdown */}
          <div className="bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <Sigma className="w-4 h-4 text-blue-500" />
              Parabola Geometry &amp; Properties
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
              <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                <span className="text-slate-400 block text-[10px] font-sans">Discriminant (Δ)</span>
                <strong className="text-slate-900 dark:text-white text-sm">{quadResult.discriminant}</strong>
              </div>

              <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                <span className="text-slate-400 block text-[10px] font-sans">Vertex (h, k)</span>
                <strong className="text-slate-900 dark:text-white text-sm">
                  ({formatNumber(quadResult.vertexH, 2)}, {formatNumber(quadResult.vertexK, 2)})
                </strong>
              </div>

              <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                <span className="text-slate-400 block text-[10px] font-sans">Axis of Symmetry</span>
                <strong className="text-slate-900 dark:text-white text-sm">{quadResult.axisOfSymmetry}</strong>
              </div>

              <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                <span className="text-slate-400 block text-[10px] font-sans">Y-Intercept</span>
                <strong className="text-slate-900 dark:text-white text-sm">(0, {quadResult.yIntercept})</strong>
              </div>
            </div>

            {/* Factored Form & Parabola Curve */}
            <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-xs">
              <span className="text-slate-400 block font-sans text-[11px]">Factored Polynomial Form:</span>
              <span className="font-mono font-bold text-slate-800 dark:text-slate-200">{quadResult.factoredForm}</span>
            </div>

            {/* Parabola Visual Chart */}
            {quadResult.chartPoints.length > 0 && (
              <div className="pt-2 space-y-2">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                  Parabola Curve f(x) = {a}x² {b >= 0 ? `+ ${b}x` : `− ${Math.abs(b)}x`} {c >= 0 ? `+ ${c}` : `− ${Math.abs(c)}`}
                </span>
                <div className="h-44 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={quadResult.chartPoints} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <XAxis dataKey="x" tick={{ fontSize: 10 }} />
                      <YAxis tick={{ fontSize: 10 }} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#0f172a',
                          borderRadius: '0.75rem',
                          border: 'none',
                          color: '#fff',
                          fontSize: '11px',
                        }}
                      />
                      <ReferenceLine y={0} stroke="#94a3b8" strokeDasharray="3 3" />
                      <ReferenceLine x={0} stroke="#94a3b8" strokeDasharray="3 3" />
                      <Line type="monotone" dataKey="y" stroke="#2563eb" strokeWidth={2.5} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* System of 2 Equations Mode */
        <div className="space-y-6">
          <div className="bg-purple-50/60 dark:bg-purple-950/40 p-5 rounded-2xl border border-purple-100 dark:border-purple-900/60 font-mono text-center space-y-1">
            <div className="text-lg font-bold text-purple-950 dark:text-purple-200">
              {sysA1}x + ({sysB1}y) = {sysC1}
            </div>
            <div className="text-lg font-bold text-purple-950 dark:text-purple-200">
              {sysA2}x + ({sysB2}y) = {sysC2}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Equation 1 */}
            <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                Equation 1: a₁x + b₁y = c₁
              </span>
              <div className="grid grid-cols-3 gap-2">
                <CalcInput id="sysA1" label="a₁" value={sysA1} onChange={setSysA1} />
                <CalcInput id="sysB1" label="b₁" value={sysB1} onChange={setSysB1} />
                <CalcInput id="sysC1" label="c₁" value={sysC1} onChange={setSysC1} />
              </div>
            </div>

            {/* Equation 2 */}
            <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                Equation 2: a₂x + b₂y = c₂
              </span>
              <div className="grid grid-cols-3 gap-2">
                <CalcInput id="sysA2" label="a₂" value={sysA2} onChange={setSysA2} />
                <CalcInput id="sysB2" label="b₂" value={sysB2} onChange={setSysB2} />
                <CalcInput id="sysC2" label="c₂" value={sysC2} onChange={setSysC2} />
              </div>
            </div>
          </div>

          {/* System Solutions Result */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <CalcResultCard
              title="Solution for x"
              value={`x = ${sysResult.x}`}
              subtitle={sysResult.status}
              highlighted={true}
            />

            <CalcResultCard
              title="Solution for y"
              value={`y = ${sysResult.y}`}
              subtitle={`Cramer determinant D = ${sysResult.det}`}
            />
          </div>

          {/* Step-by-Step Cramer Determinants */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 text-xs space-y-2 font-mono">
            <div className="font-sans font-bold text-slate-700 dark:text-slate-300">Cramer's Rule Determinants:</div>
            <div className="text-slate-600 dark:text-slate-400">1. Main Determinant D = (a₁b₂ − a₂b₁) = ({sysA1} × {sysB2}) − ({sysA2} × {sysB1}) = <strong>{sysResult.det}</strong></div>
            <div className="text-slate-600 dark:text-slate-400">2. Dx = (c₁b₂ − c₂b₁) = <strong>{sysResult.detX}</strong> → x = Dx / D = <strong>{sysResult.x}</strong></div>
            <div className="text-slate-600 dark:text-slate-400">3. Dy = (a₁c₂ − a₂c₁) = <strong>{sysResult.detY}</strong> → y = Dy / D = <strong>{sysResult.y}</strong></div>
          </div>
        </div>
      )}
    </div>
  );
};
