import React, { useState, useEffect } from 'react';
import { CalcInput } from '../common/CalcInput';
import { CalcSelect } from '../common/CalcSelect';
import { CalcResultCard } from '../common/CalcResultCard';
import { CalcErrorAlert } from '../common/CalcErrorAlert';
import { safeParseNumber, formatNumber } from '../../lib/mathUtils';

interface SequenceSeriesCalculatorProps {
  onSaveHistory?: (summary: string, inputs: Record<string, any>, results: Record<string, any>) => void;
  resetSignal?: number;
  initialPreset?: Record<string, any> | null;
}

export const SequenceSeriesCalculator: React.FC<SequenceSeriesCalculatorProps> = ({
  onSaveHistory,
  resetSignal,
  initialPreset,
}) => {
  const [seqType, setSeqType] = useState<string>('arithmetic');
  const [firstTerm, setFirstTerm] = useState<string>('5');
  const [stepValue, setStepValue] = useState<string>('3'); // d for arithmetic, r for geometric
  const [numTerms, setNumTerms] = useState<string>('10');

  useEffect(() => {
    if (initialPreset) {
      if (initialPreset.firstTerm !== undefined) setFirstTerm(String(initialPreset.firstTerm));
    }
  }, [initialPreset]);

  useEffect(() => {
    handleReset();
  }, [resetSignal]);

  const handleReset = () => {
    setSeqType('arithmetic');
    setFirstTerm('5');
    setStepValue('3');
    setNumTerms('10');
  };

  const calculate = () => {
    const a1 = safeParseNumber(firstTerm, 0);
    const step = safeParseNumber(stepValue, 0);
    const n = Math.round(safeParseNumber(numTerms, 1));

    if (n <= 0) {
      return { isValid: false, msg: 'Number of terms (n) must be a positive integer.' };
    }

    let nthTerm = 0;
    let sumN = 0;
    let sequenceList: number[] = [];

    if (seqType === 'arithmetic') {
      // an = a1 + (n - 1) * d
      nthTerm = a1 + (n - 1) * step;
      // Sn = n * (a1 + an) / 2
      sumN = (n * (a1 + nthTerm)) / 2;

      for (let i = 0; i < Math.min(n, 10); i++) {
        sequenceList.push(a1 + i * step);
      }
    } else {
      // Geometric: an = a1 * r^(n-1)
      const r = step;
      nthTerm = a1 * Math.pow(r, n - 1);

      if (r === 1) {
        sumN = a1 * n;
      } else {
        sumN = (a1 * (1 - Math.pow(r, n))) / (1 - r);
      }

      for (let i = 0; i < Math.min(n, 10); i++) {
        sequenceList.push(a1 * Math.pow(r, i));
      }
    }

    const seqPreview = sequenceList.map((x) => formatNumber(x, 2)).join(', ') + (n > 10 ? ', ...' : '');

    return {
      isValid: true,
      msg: '',
      seqType,
      a1,
      n,
      nthTerm,
      sumN,
      seqPreview,
    };
  };

  const res = calculate();

  const handleSave = () => {
    if (onSaveHistory && res.isValid) {
      onSaveHistory(
        `${res.seqType} Series: a_${res.n} = ${formatNumber(res.nthTerm, 2)} | Sum = ${formatNumber(res.sumN, 2)}`,
        { seqType, firstTerm, stepValue, numTerms },
        { nthTerm: res.nthTerm, sumN: res.sumN }
      );
    }
  };

  return (
    <div className="space-y-6">
      {!res.isValid && res.msg && <CalcErrorAlert message={res.msg} />}

      <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Sequence Parameters
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <CalcSelect
            id="seqType"
            label="Sequence Type"
            value={seqType}
            onChange={setSeqType}
            options={[
              { value: 'arithmetic', label: 'Arithmetic Sequence (Common Difference d)' },
              { value: 'geometric', label: 'Geometric Sequence (Common Ratio r)' },
            ]}
          />
          <CalcInput id="firstTerm" label="First Term (a₁)" value={firstTerm} onChange={setFirstTerm} />
          <CalcInput
            id="stepValue"
            label={seqType === 'arithmetic' ? 'Common Difference (d)' : 'Common Ratio (r)'}
            value={stepValue}
            onChange={setStepValue}
          />
          <CalcInput id="numTerms" label="Number of Terms (n)" value={numTerms} onChange={setNumTerms} min={1} max={1000} />
        </div>
      </div>

      {res.isValid && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <CalcResultCard
              title={`nth Term (a_${res.n})`}
              value={formatNumber(res.nthTerm, 4)}
              subtitle={seqType === 'arithmetic' ? 'a₁ + (n-1)d' : 'a₁ × r^(n-1)'}
              highlighted={true}
            />
            <CalcResultCard
              title={`Sum of First ${res.n} Terms (S_${res.n})`}
              value={formatNumber(res.sumN, 4)}
              subtitle="Summation of sequence"
              badgeText="Total Sum"
              badgeType="success"
            />
            <CalcResultCard
              title="First Term (a₁)"
              value={formatNumber(res.a1, 2)}
              subtitle="Starting element"
            />
            <CalcResultCard
              title="Sequence Preview"
              value={res.seqPreview}
              subtitle="Initial terms in series"
            />
          </div>

          <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 flex justify-between items-center">
            <span>Arithmetic sequences change by adding a constant difference. Geometric sequences change by multiplying a constant ratio.</span>
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
