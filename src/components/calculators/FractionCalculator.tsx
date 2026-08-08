import React, { useState, useEffect } from 'react';
import { CalcInput } from '../common/CalcInput';
import { CalcSelect } from '../common/CalcSelect';
import { CalcResultCard } from '../common/CalcResultCard';
import { CalcErrorAlert } from '../common/CalcErrorAlert';
import { safeParseNumber, formatNumber } from '../../lib/mathUtils';

interface FractionCalculatorProps {
  onSaveHistory?: (summary: string, inputs: Record<string, any>, results: Record<string, any>) => void;
  resetSignal?: number;
  initialPreset?: Record<string, any> | null;
}

function gcd(a: number, b: number): number {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) {
    const t = b;
    b = a % b;
    a = t;
  }
  return a;
}

export const FractionCalculator: React.FC<FractionCalculatorProps> = ({
  onSaveHistory,
  resetSignal,
  initialPreset,
}) => {
  const [operation, setOperation] = useState<string>('add'); // 'add', 'subtract', 'multiply', 'divide', 'simplify'
  const [num1, setNum1] = useState<string>('3');
  const [den1, setDen1] = useState<string>('4');
  const [num2, setNum2] = useState<string>('2');
  const [den2, setDen2] = useState<string>('5');

  useEffect(() => {
    if (initialPreset) {
      if (initialPreset.num1 !== undefined) setNum1(String(initialPreset.num1));
      if (initialPreset.den1 !== undefined) setDen1(String(initialPreset.den1));
    }
  }, [initialPreset]);

  useEffect(() => {
    handleReset();
  }, [resetSignal]);

  const handleReset = () => {
    setOperation('add');
    setNum1('3');
    setDen1('4');
    setNum2('2');
    setDen2('5');
  };

  const calculate = () => {
    const n1 = safeParseNumber(num1, 0);
    const d1 = safeParseNumber(den1, 1);
    const n2 = safeParseNumber(num2, 0);
    const d2 = safeParseNumber(den2, 1);

    if (d1 === 0) {
      return {
        isValid: false,
        msg: 'Denominator of Fraction 1 cannot be zero.',
        resNum: 0,
        resDen: 1,
        decimalVal: 0,
        mixedStr: '',
        steps: [],
      };
    }

    if (operation !== 'simplify' && d2 === 0) {
      return {
        isValid: false,
        msg: 'Denominator of Fraction 2 cannot be zero.',
        resNum: 0,
        resDen: 1,
        decimalVal: 0,
        mixedStr: '',
        steps: [],
      };
    }

    let rawNum = 0;
    let rawDen = 1;
    const steps: string[] = [];

    if (operation === 'simplify') {
      rawNum = n1;
      rawDen = d1;
      steps.push(`Simplify ${n1}/${d1}`);
    } else if (operation === 'add') {
      rawNum = n1 * d2 + n2 * d1;
      rawDen = d1 * d2;
      steps.push(`Find common denominator: (${n1} × ${d2}) + (${n2} × ${d1}) = ${rawNum}`);
      steps.push(`Denominator = ${d1} × ${d2} = ${rawDen}`);
    } else if (operation === 'subtract') {
      rawNum = n1 * d2 - n2 * d1;
      rawDen = d1 * d2;
      steps.push(`Find common denominator: (${n1} × ${d2}) - (${n2} × ${d1}) = ${rawNum}`);
      steps.push(`Denominator = ${d1} × ${d2} = ${rawDen}`);
    } else if (operation === 'multiply') {
      rawNum = n1 * n2;
      rawDen = d1 * d2;
      steps.push(`Multiply numerators: ${n1} × ${n2} = ${rawNum}`);
      steps.push(`Multiply denominators: ${d1} × ${d2} = ${rawDen}`);
    } else if (operation === 'divide') {
      if (n2 === 0) {
        return {
          isValid: false,
          msg: 'Cannot divide by a fraction with numerator 0.',
          resNum: 0,
          resDen: 1,
          decimalVal: 0,
          mixedStr: '',
          steps: [],
        };
      }
      rawNum = n1 * d2;
      rawDen = d1 * n2;
      steps.push(`Flip second fraction and multiply: (${n1}/${d1}) × (${d2}/${n2}) = ${rawNum}/${rawDen}`);
    }

    if (rawDen < 0) {
      rawNum = -rawNum;
      rawDen = -rawDen;
    }

    const divisor = gcd(rawNum, rawDen);
    const resNum = rawNum / (divisor || 1);
    const resDen = rawDen / (divisor || 1);

    steps.push(`Reduce fraction by greatest common divisor (${divisor}): ${resNum}/${resDen}`);

    const decimalVal = resNum / resDen;

    // Mixed fraction string
    let mixedStr = '';
    if (Math.abs(resNum) >= resDen && resDen !== 1) {
      const whole = Math.floor(Math.abs(resNum) / resDen) * (resNum < 0 ? -1 : 1);
      const rem = Math.abs(resNum) % resDen;
      mixedStr = rem === 0 ? `${whole}` : `${whole} ${rem}/${resDen}`;
    } else if (resDen === 1) {
      mixedStr = `${resNum}`;
    } else {
      mixedStr = `${resNum}/${resDen}`;
    }

    return {
      isValid: true,
      msg: '',
      resNum,
      resDen,
      decimalVal,
      mixedStr,
      steps,
    };
  };

  const res = calculate();

  const handleSave = () => {
    if (onSaveHistory && res.isValid) {
      onSaveHistory(
        `Fraction Calculation (${operation}): Result = ${res.resNum}/${res.resDen} (${res.decimalVal})`,
        { num1, den1, num2, den2, operation },
        { resultFraction: `${res.resNum}/${res.resDen}`, decimal: res.decimalVal }
      );
    }
  };

  return (
    <div className="space-y-6">
      {!res.isValid && res.msg && <CalcErrorAlert message={res.msg} />}

      <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 space-y-4">
        <CalcSelect
          id="operation"
          label="Mathematical Operation"
          value={operation}
          onChange={setOperation}
          options={[
            { value: 'add', label: 'Addition (+)' },
            { value: 'subtract', label: 'Subtraction (-)' },
            { value: 'multiply', label: 'Multiplication (×)' },
            { value: 'divide', label: 'Division (÷)' },
            { value: 'simplify', label: 'Simplify Single Fraction' },
          ]}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
          {/* Fraction 1 */}
          <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 space-y-3">
            <h4 className="text-xs font-bold text-slate-500 uppercase">First Fraction</h4>
            <CalcInput
              id="num1"
              label="Numerator"
              value={num1}
              onChange={setNum1}
            />
            <div className="border-t border-slate-300 dark:border-slate-600 my-1"></div>
            <CalcInput
              id="den1"
              label="Denominator"
              value={den1}
              onChange={setDen1}
            />
          </div>

          {/* Fraction 2 */}
          {operation !== 'simplify' && (
            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 space-y-3">
              <h4 className="text-xs font-bold text-slate-500 uppercase">Second Fraction</h4>
              <CalcInput
                id="num2"
                label="Numerator"
                value={num2}
                onChange={setNum2}
              />
              <div className="border-t border-slate-300 dark:border-slate-600 my-1"></div>
              <CalcInput
                id="den2"
                label="Denominator"
                value={den2}
                onChange={setDen2}
              />
            </div>
          )}
        </div>
      </div>

      {res.isValid && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <CalcResultCard
              title="Simplified Fraction"
              value={`${res.resNum} / ${res.resDen}`}
              subtitle={`Reduced form`}
              highlighted={true}
            />

            <CalcResultCard
              title="Mixed Number"
              value={res.mixedStr}
              subtitle="Whole number + fraction"
              badgeText="Mixed Form"
              badgeType="info"
            />

            <CalcResultCard
              title="Decimal & Percentage"
              value={formatNumber(res.decimalVal, 4)}
              subtitle={`Or ${formatNumber(res.decimalVal * 100, 2)}%`}
              badgeText="Decimal"
              badgeType="neutral"
            />
          </div>

          <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 space-y-2">
            <span className="font-bold block text-slate-900 dark:text-white">Solution Steps:</span>
            <ol className="list-disc list-inside space-y-1">
              {res.steps.map((step, idx) => (
                <li key={idx}>{step}</li>
              ))}
            </ol>
          </div>
        </div>
      )}
    </div>
  );
};
