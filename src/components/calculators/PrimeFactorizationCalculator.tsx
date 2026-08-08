import React, { useState, useEffect } from 'react';
import { CalcInput } from '../common/CalcInput';
import { CalcResultCard } from '../common/CalcResultCard';
import { CalcErrorAlert } from '../common/CalcErrorAlert';
import { safeParseNumber } from '../../lib/mathUtils';

interface PrimeFactorizationCalculatorProps {
  onSaveHistory?: (summary: string, inputs: Record<string, any>, results: Record<string, any>) => void;
  resetSignal?: number;
  initialPreset?: Record<string, any> | null;
}

export const PrimeFactorizationCalculator: React.FC<PrimeFactorizationCalculatorProps> = ({
  onSaveHistory,
  resetSignal,
  initialPreset,
}) => {
  const [numA, setNumA] = useState<string>('360');
  const [numB, setNumB] = useState<string>('480');

  useEffect(() => {
    if (initialPreset) {
      if (initialPreset.numA !== undefined) setNumA(String(initialPreset.numA));
    }
  }, [initialPreset]);

  useEffect(() => {
    handleReset();
  }, [resetSignal]);

  const handleReset = () => {
    setNumA('360');
    setNumB('480');
  };

  const getPrimeFactors = (n: number) => {
    const factors: number[] = [];
    let d = 2;
    let temp = n;
    while (temp >= 2) {
      if (temp % d === 0) {
        factors.push(d);
        temp = temp / d;
      } else {
        d++;
        if (d * d > temp) {
          if (temp > 1) factors.push(temp);
          break;
        }
      }
    }
    return factors;
  };

  const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));

  const calculate = () => {
    const a = Math.round(safeParseNumber(numA, 0));
    const b = Math.round(safeParseNumber(numB, 0));

    if (a <= 1 || b <= 1) {
      return { isValid: false, msg: 'Please enter integers greater than 1.' };
    }

    const factorsA = getPrimeFactors(a);
    const factorsB = getPrimeFactors(b);

    const isPrimeA = factorsA.length === 1;
    const isPrimeB = factorsB.length === 1;

    const greatestCommonDivisor = gcd(a, b);
    const leastCommonMultiple = (a * b) / greatestCommonDivisor;

    const formatFactors = (list: number[]) => {
      const map: Record<number, number> = {};
      list.forEach((f) => (map[f] = (map[f] || 0) + 1));
      return Object.entries(map)
        .map(([factor, exp]) => (exp > 1 ? `${factor}^${exp}` : `${factor}`))
        .join(' × ');
    };

    return {
      isValid: true,
      msg: '',
      a,
      b,
      factorsAStr: formatFactors(factorsA),
      factorsBStr: formatFactors(factorsB),
      isPrimeA,
      isPrimeB,
      greatestCommonDivisor,
      leastCommonMultiple,
    };
  };

  const res = calculate();

  const handleSave = () => {
    if (onSaveHistory && res.isValid) {
      onSaveHistory(
        `Prime Factors: ${res.a} = [${res.factorsAStr}] | GCD(${res.a}, ${res.b}) = ${res.greatestCommonDivisor}`,
        { numA, numB },
        { factorsA: res.factorsAStr, gcd: res.greatestCommonDivisor, lcm: res.leastCommonMultiple }
      );
    }
  };

  return (
    <div className="space-y-6">
      {!res.isValid && res.msg && <CalcErrorAlert message={res.msg} />}

      <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Integer Factorization Inputs
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <CalcInput id="numA" label="First Integer (A)" value={numA} onChange={setNumA} min={2} />
          <CalcInput id="numB" label="Second Integer (B)" value={numB} onChange={setNumB} min={2} />
        </div>
      </div>

      {res.isValid && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <CalcResultCard
              title={`Prime Factors of ${res.a}`}
              value={res.factorsAStr}
              subtitle={res.isPrimeA ? 'Prime Number' : 'Composite Number'}
              highlighted={true}
            />
            <CalcResultCard
              title={`Prime Factors of ${res.b}`}
              value={res.factorsBStr}
              subtitle={res.isPrimeB ? 'Prime Number' : 'Composite Number'}
            />
            <CalcResultCard
              title="Greatest Common Divisor (GCD)"
              value={String(res.greatestCommonDivisor)}
              subtitle={`Largest factor dividing both ${res.a} and ${res.b}`}
              badgeText="GCD / HCF"
              badgeType="success"
            />
            <CalcResultCard
              title="Least Common Multiple (LCM)"
              value={String(res.leastCommonMultiple)}
              subtitle={`Smallest multiple shared by ${res.a} and ${res.b}`}
            />
          </div>

          <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 flex justify-between items-center">
            <span>Fundamental Theorem of Arithmetic: Every integer greater than 1 has a unique prime factorization.</span>
            {onSaveHistory && (
              <button
                type="button"
                onClick={handleSave}
                className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-700 transition"
              >
                Save Calculation
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
