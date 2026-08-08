import React, { useState, useEffect } from 'react';
import { CalcInput } from '../common/CalcInput';
import { CalcSelect } from '../common/CalcSelect';
import { CalcResultCard } from '../common/CalcResultCard';
import { CalcErrorAlert } from '../common/CalcErrorAlert';
import { safeParseNumber, formatNumber } from '../../lib/mathUtils';

interface PetAgeCalculatorProps {
  onSaveHistory?: (summary: string, inputs: Record<string, any>, results: Record<string, any>) => void;
  resetSignal?: number;
  initialPreset?: Record<string, any> | null;
}

export const PetAgeCalculator: React.FC<PetAgeCalculatorProps> = ({
  onSaveHistory,
  resetSignal,
  initialPreset,
}) => {
  const [petType, setPetType] = useState<string>('dog'); // 'dog', 'cat'
  const [dogSize, setDogSize] = useState<string>('medium'); // small, medium, large, giant
  const [actualAgeYears, setActualAgeYears] = useState<string>('5');

  useEffect(() => {
    if (initialPreset) {
      if (initialPreset.actualAgeYears !== undefined) setActualAgeYears(String(initialPreset.actualAgeYears));
    }
  }, [initialPreset]);

  useEffect(() => {
    handleReset();
  }, [resetSignal]);

  const handleReset = () => {
    setPetType('dog');
    setDogSize('medium');
    setActualAgeYears('5');
  };

  const calculate = () => {
    const age = safeParseNumber(actualAgeYears, 0);

    if (age <= 0) {
      return { isValid: false, msg: 'Pet age must be greater than 0.' };
    }

    let humanEquivalentYears = 0;
    let lifeStage = '';

    if (petType === 'cat') {
      // Cat aging formula: Year 1 = 15 human years, Year 2 = +9 (24 total), subsequent years = +4 per year
      if (age <= 1) humanEquivalentYears = 15 * age;
      else if (age <= 2) humanEquivalentYears = 15 + (age - 1) * 9;
      else humanEquivalentYears = 24 + (age - 2) * 4;

      if (age < 1) lifeStage = 'Kitten';
      else if (age < 7) lifeStage = 'Adult Cat';
      else if (age < 11) lifeStage = 'Mature / Senior';
      else lifeStage = 'Super Senior';
    } else {
      // Dog aging formula (AVMA modern guidelines by weight class):
      // Year 1 = ~15 years for all dogs
      // Year 2 = ~24 years (+9)
      // Year 3+ multiplier varies by dog size:
      // Small (<20lbs): +4 years/yr
      // Medium (20-50lbs): +5 years/yr
      // Large (50-90lbs): +6 years/yr
      // Giant (>90lbs): +7 years/yr
      let multiplier = 5;
      if (dogSize === 'small') multiplier = 4;
      else if (dogSize === 'large') multiplier = 6;
      else if (dogSize === 'giant') multiplier = 7;

      if (age <= 1) humanEquivalentYears = 15 * age;
      else if (age <= 2) humanEquivalentYears = 15 + (age - 1) * 9;
      else humanEquivalentYears = 24 + (age - 2) * multiplier;

      if (age < 1) lifeStage = 'Puppy';
      else if (age < 6) lifeStage = 'Adult Dog';
      else if (age < 9) lifeStage = 'Senior Dog';
      else lifeStage = 'Geriatric / Super Senior';
    }

    return {
      isValid: true,
      msg: '',
      age,
      petType,
      humanEquivalentYears,
      lifeStage,
    };
  };

  const res = calculate();

  const handleSave = () => {
    if (onSaveHistory && res.isValid) {
      onSaveHistory(
        `${petType === 'dog' ? 'Dog' : 'Cat'} Age: ${res.age} pet years = ${formatNumber(res.humanEquivalentYears, 0)} human years (${res.lifeStage})`,
        { petType, dogSize, actualAgeYears },
        { humanYears: res.humanEquivalentYears, lifeStage: res.lifeStage }
      );
    }
  };

  return (
    <div className="space-y-6">
      {!res.isValid && res.msg && <CalcErrorAlert message={res.msg} />}

      <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Pet Category & Age Inputs
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <CalcSelect
            id="petType"
            label="Pet Species"
            value={petType}
            onChange={setPetType}
            options={[
              { value: 'dog', label: 'Dog' },
              { value: 'cat', label: 'Cat' },
            ]}
          />
          {petType === 'dog' && (
            <CalcSelect
              id="dogSize"
              label="Dog Weight Category"
              value={dogSize}
              onChange={setDogSize}
              options={[
                { value: 'small', label: 'Small (< 20 lbs)' },
                { value: 'medium', label: 'Medium (20 - 50 lbs)' },
                { value: 'large', label: 'Large (50 - 90 lbs)' },
                { value: 'giant', label: 'Giant (> 90 lbs)' },
              ]}
            />
          )}
          <CalcInput id="actualAgeYears" label="Pet Age" suffix="years" value={actualAgeYears} onChange={setActualAgeYears} min={0.1} max={30} />
        </div>
      </div>

      {res.isValid && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <CalcResultCard
              title="Human Equivalent Age"
              value={`${formatNumber(res.humanEquivalentYears, 0)} Years Old`}
              subtitle="Veterinary age benchmark"
              highlighted={true}
            />
            <CalcResultCard
              title="Life Stage"
              value={res.lifeStage}
              subtitle="Current developmental milestone"
              badgeText="Life Stage"
              badgeType="info"
            />
            <CalcResultCard
              title="Actual Pet Chronological Age"
              value={`${res.age} Years`}
              subtitle={`${petType === 'dog' ? 'Canine' : 'Feline'} calendar age`}
            />
          </div>

          <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 flex justify-between items-center">
            <span>Modern AVMA guidelines account for rapid physical development in the first 2 years of pet life.</span>
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
