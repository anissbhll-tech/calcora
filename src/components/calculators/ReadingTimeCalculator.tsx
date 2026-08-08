import React, { useState, useEffect } from 'react';
import { CalcInput } from '../common/CalcInput';
import { CalcSelect } from '../common/CalcSelect';
import { CalcResultCard } from '../common/CalcResultCard';
import { CalcErrorAlert } from '../common/CalcErrorAlert';
import { safeParseNumber, formatNumber } from '../../lib/mathUtils';

interface ReadingTimeCalculatorProps {
  onSaveHistory?: (summary: string, inputs: Record<string, any>, results: Record<string, any>) => void;
  resetSignal?: number;
  initialPreset?: Record<string, any> | null;
}

export const ReadingTimeCalculator: React.FC<ReadingTimeCalculatorProps> = ({
  onSaveHistory,
  resetSignal,
  initialPreset,
}) => {
  const [wordCount, setWordCount] = useState<string>('12000');
  const [readingSpeedWpm, setReadingSpeedWpm] = useState<string>('230'); // Average adult is 200-250 WPM
  const [readingPaceCategory, setReadingPaceCategory] = useState<string>('average');

  useEffect(() => {
    if (initialPreset) {
      if (initialPreset.wordCount !== undefined) setWordCount(String(initialPreset.wordCount));
    }
  }, [initialPreset]);

  useEffect(() => {
    handleReset();
  }, [resetSignal]);

  const handleReset = () => {
    setWordCount('12000');
    setReadingSpeedWpm('230');
    setReadingPaceCategory('average');
  };

  const calculate = () => {
    const words = safeParseNumber(wordCount, 0);
    let wpm = safeParseNumber(readingSpeedWpm, 230);

    if (readingPaceCategory === 'slow') wpm = 150;
    else if (readingPaceCategory === 'fast') wpm = 350;
    else if (readingPaceCategory === 'speed') wpm = 500;

    if (words <= 0 || wpm <= 0) {
      return { isValid: false, msg: 'Word count and reading speed must be greater than 0.' };
    }

    const totalMinutes = words / wpm;
    const hours = Math.floor(totalMinutes / 60);
    const minutes = Math.round(totalMinutes % 60);

    const timeFormatted =
      hours > 0 ? `${hours} hr ${minutes} min` : `${minutes} min`;

    // Standard novel page = ~300 words
    const estimatedPages = Math.ceil(words / 300);

    return {
      isValid: true,
      msg: '',
      words,
      wpm,
      totalMinutes,
      timeFormatted,
      estimatedPages,
    };
  };

  const res = calculate();

  const handleSave = () => {
    if (onSaveHistory && res.isValid) {
      onSaveHistory(
        `Reading Duration: ${res.timeFormatted} (${res.words} words at ${res.wpm} WPM)`,
        { wordCount, readingSpeedWpm, readingPaceCategory },
        { timeFormatted: res.timeFormatted, estimatedPages: res.estimatedPages }
      );
    }
  };

  return (
    <div className="space-y-6">
      {!res.isValid && res.msg && <CalcErrorAlert message={res.msg} />}

      <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Text Length & Speed Parameters
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <CalcInput id="wordCount" label="Total Word Count" suffix="words" value={wordCount} onChange={setWordCount} min={1} />
          <CalcSelect
            id="readingPaceCategory"
            label="Reading Speed Level"
            value={readingPaceCategory}
            onChange={setReadingPaceCategory}
            options={[
              { value: 'slow', label: 'Slow / Technical Material (150 WPM)' },
              { value: 'average', label: 'Average Adult Reading (230 WPM)' },
              { value: 'fast', label: 'Fast Reader (350 WPM)' },
              { value: 'speed', label: 'Speed Reader (500 WPM)' },
            ]}
          />
          <CalcInput id="readingSpeedWpm" label="Custom Words Per Minute" suffix="WPM" value={readingSpeedWpm} onChange={setReadingSpeedWpm} min={50} max={1000} />
        </div>
      </div>

      {res.isValid && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <CalcResultCard
              title="Estimated Reading Time"
              value={res.timeFormatted}
              subtitle={`At ${res.wpm} Words Per Minute`}
              highlighted={true}
            />
            <CalcResultCard
              title="Total Book Pages"
              value={`${res.estimatedPages} Pages`}
              subtitle="Standard ~300 words per page"
            />
            <CalcResultCard
              title="Reading Speed Rate"
              value={`${res.wpm} WPM`}
              subtitle="Words processed per minute"
            />
            <CalcResultCard
              title="Total Word Count"
              value={formatNumber(res.words, 0)}
              subtitle="Net document words"
            />
          </div>

          <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 flex justify-between items-center">
            <span>Average adults read non-technical prose at approximately 200 to 250 words per minute.</span>
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
