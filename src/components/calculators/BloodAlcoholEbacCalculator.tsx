import React, { useState, useEffect } from 'react';
import { CalcInput } from '../common/CalcInput';
import { CalcSelect } from '../common/CalcSelect';
import { CalcResultCard } from '../common/CalcResultCard';
import { CalcErrorAlert } from '../common/CalcErrorAlert';
import { safeParseNumber, formatNumber } from '../../lib/mathUtils';

interface BloodAlcoholEbacCalculatorProps {
  onSaveHistory?: (summary: string, inputs: Record<string, any>, results: Record<string, any>) => void;
  resetSignal?: number;
  initialPreset?: Record<string, any> | null;
}

export const BloodAlcoholEbacCalculator: React.FC<BloodAlcoholEbacCalculatorProps> = ({
  onSaveHistory,
  resetSignal,
  initialPreset,
}) => {
  const [sex, setSex] = useState<string>('male');
  const [weightLbs, setWeightLbs] = useState<string>('170');
  const [standardDrinks, setStandardDrinks] = useState<string>('3'); // 14g alcohol per standard drink
  const [hoursElapsed, setHoursElapsed] = useState<string>('2');

  useEffect(() => {
    if (initialPreset) {
      if (initialPreset.weightLbs !== undefined) setWeightLbs(String(initialPreset.weightLbs));
    }
  }, [initialPreset]);

  useEffect(() => {
    handleReset();
  }, [resetSignal]);

  const handleReset = () => {
    setSex('male');
    setWeightLbs('170');
    setStandardDrinks('3');
    setHoursElapsed('2');
  };

  const calculate = () => {
    const wLbs = safeParseNumber(weightLbs, 0);
    const drinks = safeParseNumber(standardDrinks, 0);
    const hrs = safeParseNumber(hoursElapsed, 0);

    if (wLbs <= 0) {
      return { isValid: false, msg: 'Body weight must be greater than 0.' };
    }

    // Widmark Formula for EBAC
    // EBAC = [ (0.806 x SD x 1.2) / (BW x r) ] - (beta x H)
    // SD = standard drinks (14g pure ethanol)
    // BW = body weight in kg = wLbs * 0.453592
    // r = gender factor (0.68 male, 0.55 female)
    // beta = metabolism rate per hour (~0.015% per hour)
    const wKg = wLbs * 0.453592;
    const r = sex === 'male' ? 0.68 : 0.55;
    const beta = 0.015;

    const totalAlcoholGrams = drinks * 14;
    const peakBac = (totalAlcoholGrams / (wKg * 1000 * r)) * 100;
    const currentBac = Math.max(0, peakBac - beta * hrs);

    const hoursToZero = currentBac > 0 ? currentBac / beta : 0;

    return {
      isValid: true,
      msg: '',
      currentBac,
      peakBac,
      hoursToZero,
      isLegalToDrive: currentBac < 0.08,
    };
  };

  const res = calculate();

  const handleSave = () => {
    if (onSaveHistory && res.isValid) {
      onSaveHistory(
        `Estimated BAC: ${formatNumber(res.currentBac, 3)}% (${res.isLegalToDrive ? 'Under Legal Limit' : 'Over Legal Limit'})`,
        { sex, weightLbs, standardDrinks, hoursElapsed },
        { currentBac: res.currentBac, hoursToZero: res.hoursToZero }
      );
    }
  };

  return (
    <div className="space-y-6">
      {!res.isValid && res.msg && <CalcErrorAlert message={res.msg} />}

      <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Individual & Consumption Parameters
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <CalcSelect
            id="sex"
            label="Biological Sex"
            value={sex}
            onChange={setSex}
            options={[
              { value: 'male', label: 'Male' },
              { value: 'female', label: 'Female' },
            ]}
          />
          <CalcInput id="weightLbs" label="Body Weight" suffix="lbs" value={weightLbs} onChange={setWeightLbs} min={50} />
          <CalcInput id="standardDrinks" label="Standard Drinks Consumed" value={standardDrinks} onChange={setStandardDrinks} min={0} helperText="1 drink = 12oz beer / 5oz wine / 1.5oz shot" />
          <CalcInput id="hoursElapsed" label="Hours Since First Drink" suffix="hrs" value={hoursElapsed} onChange={setHoursElapsed} min={0} />
        </div>
      </div>

      {res.isValid && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <CalcResultCard
              title="Estimated BAC %"
              value={`${formatNumber(res.currentBac, 3)}%`}
              subtitle="Blood Alcohol Concentration"
              highlighted={true}
              badgeText={res.currentBac < 0.08 ? 'Below 0.08% Limit' : 'Over Legal Limit (0.08%)'}
              badgeType={res.currentBac < 0.08 ? 'success' : 'error'}
            />
            <CalcResultCard
              title="Time to 0.00% Sober BAC"
              value={`${formatNumber(res.hoursToZero, 1)} Hours`}
              subtitle="Metabolic clearance estimate"
            />
            <CalcResultCard
              title="Peak Initial BAC"
              value={`${formatNumber(res.peakBac, 3)}%`}
              subtitle="Before liver metabolism decay"
            />
            <CalcResultCard
              title="Driving Impairment Status"
              value={res.currentBac === 0 ? 'Sober' : res.currentBac < 0.05 ? 'Mild Impairment' : 'Significant Impairment'}
              subtitle="Motor & cognitive impact"
            />
          </div>

          <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 flex justify-between items-center">
            <span>Disclaimer: This Widmark BAC calculation is an estimate and must not be used for legal or driving safety decisions.</span>
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
