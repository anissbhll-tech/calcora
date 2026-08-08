import React, { useState, useEffect } from 'react';
import { CalcInput } from '../common/CalcInput';
import { CalcResultCard } from '../common/CalcResultCard';
import { CalcErrorAlert } from '../common/CalcErrorAlert';
import { safeParseNumber, formatNumber, formatCurrency } from '../../lib/mathUtils';

interface ElectricityBillCalculatorProps {
  onSaveHistory?: (summary: string, inputs: Record<string, any>, results: Record<string, any>) => void;
  resetSignal?: number;
  initialPreset?: Record<string, any> | null;
}

export const ElectricityBillCalculator: React.FC<ElectricityBillCalculatorProps> = ({
  onSaveHistory,
  resetSignal,
  initialPreset,
}) => {
  const [deviceWatts, setDeviceWatts] = useState<string>('1500'); // e.g. Space heater or AC unit
  const [hoursPerDay, setHoursPerDay] = useState<string>('8');
  const [utilityRateKwh, setUtilityRateKwh] = useState<string>('0.16'); // $0.16 per kWh US average

  useEffect(() => {
    if (initialPreset) {
      if (initialPreset.deviceWatts !== undefined) setDeviceWatts(String(initialPreset.deviceWatts));
    }
  }, [initialPreset]);

  useEffect(() => {
    handleReset();
  }, [resetSignal]);

  const handleReset = () => {
    setDeviceWatts('1500');
    setHoursPerDay('8');
    setUtilityRateKwh('0.16');
  };

  const calculate = () => {
    const watts = safeParseNumber(deviceWatts, 0);
    const hrs = safeParseNumber(hoursPerDay, 0);
    const rate = safeParseNumber(utilityRateKwh, 0);

    if (watts <= 0 || hrs <= 0 || rate <= 0) {
      return { isValid: false, msg: 'Power wattage, daily usage hours, and utility rate must be greater than 0.' };
    }

    const dailyKwh = (watts * hrs) / 1000;
    const monthlyKwh = dailyKwh * 30.4;
    const annualKwh = dailyKwh * 365;

    const dailyCost = dailyKwh * rate;
    const monthlyCost = monthlyKwh * rate;
    const annualCost = annualKwh * rate;

    return {
      isValid: true,
      msg: '',
      dailyKwh,
      monthlyKwh,
      dailyCost,
      monthlyCost,
      annualCost,
    };
  };

  const res = calculate();

  const handleSave = () => {
    if (onSaveHistory && res.isValid) {
      onSaveHistory(
        `Appliance Electricity: ${formatCurrency(res.monthlyCost)}/month (${formatNumber(res.monthlyKwh, 1)} kWh)`,
        { deviceWatts, hoursPerDay, utilityRateKwh },
        { monthlyCost: res.monthlyCost, annualCost: res.annualCost }
      );
    }
  };

  return (
    <div className="space-y-6">
      {!res.isValid && res.msg && <CalcErrorAlert message={res.msg} />}

      <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Appliance Power & Utility Rate
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <CalcInput id="deviceWatts" label="Appliance Power Rating" suffix="Watts" value={deviceWatts} onChange={setDeviceWatts} min={1} helperText="e.g. Space heater (1500W), TV (150W), Fridge (200W)" />
          <CalcInput id="hoursPerDay" label="Daily Operating Hours" suffix="hrs/day" value={hoursPerDay} onChange={setHoursPerDay} min={0.1} max={24} />
          <CalcInput id="utilityRateKwh" label="Electricity Utility Rate" prefix="$" suffix="/ kWh" value={utilityRateKwh} onChange={setUtilityRateKwh} min={0.01} helperText="US average rate is ~$0.16 / kWh" />
        </div>
      </div>

      {res.isValid && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <CalcResultCard
              title="Estimated Monthly Cost"
              value={formatCurrency(res.monthlyCost)}
              subtitle={`${formatNumber(res.monthlyKwh, 1)} kWh energy used / month`}
              highlighted={true}
            />
            <CalcResultCard
              title="Estimated Annual Cost"
              value={formatCurrency(res.annualCost)}
              subtitle="Full 365-day operating expense"
              badgeText="Annual Total"
              badgeType="info"
            />
            <CalcResultCard
              title="Daily Power Expense"
              value={formatCurrency(res.dailyCost)}
              subtitle={`${formatNumber(res.dailyKwh, 2)} kWh daily consumption`}
            />
            <CalcResultCard
              title="Monthly Energy Consumption"
              value={`${formatNumber(res.monthlyKwh, 1)} kWh`}
              subtitle="Kilowatt-hours billed"
            />
          </div>

          <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 flex justify-between items-center">
            <span>Energy consumption formula: kWh = (Watts × Hours) / 1000.</span>
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
