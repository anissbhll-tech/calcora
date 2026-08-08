import React, { useState, useEffect } from 'react';
import { BaseCalculatorProps } from './index';
import { DollarSign, Clock, Calendar, RotateCcw, Save } from 'lucide-react';

export const OvertimePayCalculator: React.FC<BaseCalculatorProps> = ({
  onSaveHistory,
  resetSignal,
  initialPreset
}) => {
  const [baseHourlyRate, setBaseHourlyRate] = useState<number>(25.00);
  const [regularHours, setRegularHours] = useState<number>(40);
  const [overtimeHours, setOvertimeHours] = useState<number>(10);
  const [doubleTimeHours, setDoubleTimeHours] = useState<number>(2);
  const [payPeriod, setPayPeriod] = useState<'weekly' | 'biweekly'>('weekly');

  useEffect(() => {
    if (resetSignal) {
      handleReset();
    }
  }, [resetSignal]);

  const handleReset = () => {
    setBaseHourlyRate(25.00);
    setRegularHours(40);
    setOvertimeHours(10);
    setDoubleTimeHours(2);
    setPayPeriod('weekly');
  };

  // Calculations
  const regularPay = baseHourlyRate * regularHours;
  const overtimeRate = baseHourlyRate * 1.5;
  const overtimePay = overtimeRate * overtimeHours;
  const doubleTimeRate = baseHourlyRate * 2.0;
  const doubleTimePay = doubleTimeRate * doubleTimeHours;

  const totalPeriodPay = regularPay + overtimePay + doubleTimePay;
  const totalPeriodHours = regularHours + overtimeHours + doubleTimeHours;
  const effectiveHourlyRate = totalPeriodHours > 0 ? totalPeriodPay / totalPeriodHours : baseHourlyRate;

  const annualMultiplier = payPeriod === 'weekly' ? 52 : 26;
  const annualGrossProjected = totalPeriodPay * annualMultiplier;

  const handleSave = () => {
    if (onSaveHistory) {
      onSaveHistory(
        `Overtime Pay: $${totalPeriodPay.toFixed(2)} (${payPeriod}, ${totalPeriodHours} hrs @ eff rate $${effectiveHourlyRate.toFixed(2)}/hr)`,
        { baseHourlyRate, regularHours, overtimeHours, doubleTimeHours, payPeriod },
        { totalPeriodPay, overtimePay, doubleTimePay, annualGrossProjected }
      );
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Pay Banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white p-6 rounded-xl shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          <div>
            <div className="text-xs uppercase tracking-wider text-emerald-200 font-medium">Gross Pay ({payPeriod})</div>
            <div className="text-4xl font-extrabold mt-1">
              ${totalPeriodPay.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <div className="text-xs text-emerald-200 mt-1">
              {totalPeriodHours} Total Work Hours (Eff. ${effectiveHourlyRate.toFixed(2)}/hr)
            </div>
          </div>

          <div>
            <div className="text-xs uppercase tracking-wider text-teal-200 font-medium">Overtime Premium Pay</div>
            <div className="text-3xl font-bold mt-1 text-teal-300">
              ${(overtimePay + doubleTimePay).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <div className="text-xs text-slate-300 mt-1">
              {overtimeHours}h @ 1.5x (${overtimeRate.toFixed(2)}) + {doubleTimeHours}h @ 2x (${doubleTimeRate.toFixed(2)})
            </div>
          </div>

          <div>
            <div className="text-xs uppercase tracking-wider text-indigo-200 font-medium">Projected Annual Earnings</div>
            <div className="text-3xl font-bold mt-1 text-indigo-200">
              ${annualGrossProjected.toLocaleString(undefined, { maximumFractionDigits: 0 })}
            </div>
            <div className="text-xs text-slate-300 mt-1">
              Based on {annualMultiplier} {payPeriod} pay cycles per year
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Controls */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex justify-between items-center border-b pb-2">
            <h3 className="font-semibold text-slate-800 flex items-center gap-2">
              <Clock className="w-5 h-5 text-emerald-600" /> Pay Rate & Hour Inputs
            </h3>
            <div className="flex bg-slate-100 p-1 rounded-lg text-xs font-semibold">
              <button
                onClick={() => setPayPeriod('weekly')}
                className={`px-3 py-1 rounded-md transition ${payPeriod === 'weekly' ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-600'}`}
              >
                Weekly
              </button>
              <button
                onClick={() => setPayPeriod('biweekly')}
                className={`px-3 py-1 rounded-md transition ${payPeriod === 'biweekly' ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-600'}`}
              >
                Bi-Weekly
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Base Regular Hourly Rate ($)</label>
            <input
              type="number"
              step="0.50"
              value={baseHourlyRate}
              onChange={(e) => setBaseHourlyRate(Math.max(0, Number(e.target.value)))}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Regular Hours Worked</label>
            <input
              type="number"
              value={regularHours}
              onChange={(e) => setRegularHours(Math.max(0, Number(e.target.value)))}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">1.5x Overtime Hours</label>
            <input
              type="number"
              value={overtimeHours}
              onChange={(e) => setOvertimeHours(Math.max(0, Number(e.target.value)))}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">2.0x Double-Time Hours</label>
            <input
              type="number"
              value={doubleTimeHours}
              onChange={(e) => setDoubleTimeHours(Math.max(0, Number(e.target.value)))}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          <div className="flex gap-2 pt-2">
            <button
              onClick={handleReset}
              className="flex-1 py-2 px-3 border border-slate-300 rounded-lg text-slate-700 font-medium hover:bg-slate-50 transition flex items-center justify-center gap-1 text-sm"
            >
              <RotateCcw className="w-4 h-4" /> Reset
            </button>
            <button
              onClick={handleSave}
              className="flex-1 py-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition flex items-center justify-center gap-1 text-sm"
            >
              <Save className="w-4 h-4" /> Save Earnings
            </button>
          </div>
        </div>

        {/* Detailed Breakdown */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="font-semibold text-slate-800 border-b pb-2 text-sm">Paycheck Breakdown</h3>

          <div className="space-y-3 text-xs">
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 flex justify-between items-center">
              <div>
                <div className="font-semibold text-slate-800">Regular Pay ({regularHours} hrs)</div>
                <div className="text-slate-500">${baseHourlyRate.toFixed(2)} / hr</div>
              </div>
              <div className="text-sm font-bold text-slate-800">${regularPay.toFixed(2)}</div>
            </div>

            <div className="p-3 bg-teal-50/60 rounded-lg border border-teal-100 flex justify-between items-center">
              <div>
                <div className="font-semibold text-teal-900">1.5x Overtime ({overtimeHours} hrs)</div>
                <div className="text-teal-700">${overtimeRate.toFixed(2)} / hr</div>
              </div>
              <div className="text-sm font-bold text-teal-800">${overtimePay.toFixed(2)}</div>
            </div>

            <div className="p-3 bg-indigo-50/60 rounded-lg border border-indigo-100 flex justify-between items-center">
              <div>
                <div className="font-semibold text-indigo-900">2.0x Double Time ({doubleTimeHours} hrs)</div>
                <div className="text-indigo-700">${doubleTimeRate.toFixed(2)} / hr</div>
              </div>
              <div className="text-sm font-bold text-indigo-800">${doubleTimePay.toFixed(2)}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
