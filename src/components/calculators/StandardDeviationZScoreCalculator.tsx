import React, { useState, useEffect } from 'react';
import { CalcInput } from '../common/CalcInput';
import { CalcResultCard } from '../common/CalcResultCard';
import { CalcErrorAlert } from '../common/CalcErrorAlert';
import { safeParseNumber, formatNumber } from '../../lib/mathUtils';

interface StandardDeviationZScoreCalculatorProps {
  onSaveHistory?: (summary: string, inputs: Record<string, any>, results: Record<string, any>) => void;
  resetSignal?: number;
  initialPreset?: Record<string, any> | null;
}

export const StandardDeviationZScoreCalculator: React.FC<StandardDeviationZScoreCalculatorProps> = ({
  onSaveHistory,
  resetSignal,
  initialPreset,
}) => {
  const [rawScore, setRawScore] = useState<string>('85');
  const [mean, setMean] = useState<string>('70');
  const [stdDev, setStdDev] = useState<string>('10');

  useEffect(() => {
    if (initialPreset) {
      if (initialPreset.rawScore !== undefined) setRawScore(String(initialPreset.rawScore));
    }
  }, [initialPreset]);

  useEffect(() => {
    handleReset();
  }, [resetSignal]);

  const handleReset = () => {
    setRawScore('85');
    setMean('70');
    setStdDev('10');
  };

  const calculate = () => {
    const x = safeParseNumber(rawScore, 0);
    const mu = safeParseNumber(mean, 0);
    const sigma = safeParseNumber(stdDev, 0);

    if (sigma <= 0) {
      return { isValid: false, msg: 'Standard deviation (σ) must be greater than 0.' };
    }

    const zScore = (x - mu) / sigma;

    // Normal Cumulative Distribution Function approximation for percentile
    const errorFunction = (z: number) => {
      const t = 1 / (1 + 0.2316419 * Math.abs(z));
      const d = 0.3989423 * Math.exp((-z * z) / 2);
      const prob =
        d *
        t *
        (0.3193815 +
          t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
      return z > 0 ? 1 - prob : prob;
    };

    const cdf = errorFunction(zScore);
    const percentile = cdf * 100;

    return {
      isValid: true,
      msg: '',
      x,
      mu,
      sigma,
      zScore,
      percentile,
    };
  };

  const res = calculate();

  const handleSave = () => {
    if (onSaveHistory && res.isValid) {
      onSaveHistory(
        `Z-Score: ${formatNumber(res.zScore, 2)} (${formatNumber(res.percentile, 1)}th Percentile)`,
        { rawScore, mean, stdDev },
        { zScore: res.zScore, percentile: res.percentile }
      );
    }
  };

  return (
    <div className="space-y-6">
      {!res.isValid && res.msg && <CalcErrorAlert message={res.msg} />}

      <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Distribution & Score Parameters
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <CalcInput id="rawScore" label="Raw Score (x)" value={rawScore} onChange={setRawScore} />
          <CalcInput id="mean" label="Population Mean (μ)" value={mean} onChange={setMean} />
          <CalcInput id="stdDev" label="Standard Deviation (σ)" value={stdDev} onChange={setStdDev} min={0.0001} />
        </div>
      </div>

      {res.isValid && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <CalcResultCard
              title="Z-Score (Standard Score)"
              value={formatNumber(res.zScore, 3)}
              subtitle="z = (x - μ) / σ"
              highlighted={true}
            />
            <CalcResultCard
              title="Percentile Rank"
              value={`${formatNumber(res.percentile, 2)}%`}
              subtitle="% of scores lying below x"
              badgeText="Percentile"
              badgeType="info"
            />
            <CalcResultCard
              title="Probability P(X < x)"
              value={formatNumber(res.percentile / 100, 4)}
              subtitle="Area under normal curve"
            />
            <CalcResultCard
              title="Distance from Mean"
              value={`${formatNumber(Math.abs(res.x - res.mu), 2)}`}
              subtitle={res.x >= res.mu ? 'Above Mean' : 'Below Mean'}
            />
          </div>

          <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 flex justify-between items-center">
            <span>A Z-score indicates how many standard deviations an observation is above or below the population mean.</span>
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
