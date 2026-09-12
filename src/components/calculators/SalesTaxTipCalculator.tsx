import React, { useState, useMemo, useEffect } from 'react';
import { BaseCalculatorProps } from './index';
import { CalcInput } from '../common/CalcInput';
import { CalcResultCard } from '../common/CalcResultCard';
import { safeParseNumber, formatNumber } from '../../lib/mathUtils';
import { Receipt, Users, Sparkles, Copy, Check, DollarSign, Percent, ArrowUpRight } from 'lucide-react';

const TIP_TIERS = [
  { pct: 10, label: 'Adequate', desc: 'Standard service' },
  { pct: 15, label: 'Good', desc: 'Attentive service' },
  { pct: 18, label: 'Great', desc: 'US restaurant norm' },
  { pct: 20, label: 'Superior', desc: 'Excellent service' },
  { pct: 25, label: 'Exceptional', desc: 'Outstanding hospitality' },
];

export const SalesTaxTipCalculator: React.FC<BaseCalculatorProps> = ({ onSaveHistory, initialPreset }) => {
  const [subtotal, setSubtotal] = useState<number>(120);
  const [taxRate, setTaxRate] = useState<number>(8.875);
  const [tipPercent, setTipPercent] = useState<number>(18);
  const [customTip, setCustomTip] = useState<string>('');
  const [numberOfPeople, setNumberOfPeople] = useState<number>(3);
  const [tipOnPreTax, setTipOnPreTax] = useState<boolean>(true);
  const [roundUpToDollar, setRoundUpToDollar] = useState<boolean>(false);

  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  useEffect(() => {
    if (initialPreset) {
      if (initialPreset.subtotal !== undefined) setSubtotal(initialPreset.subtotal);
      if (initialPreset.taxRate !== undefined) setTaxRate(initialPreset.taxRate);
      if (initialPreset.tipPercent !== undefined) setTipPercent(initialPreset.tipPercent);
      if (initialPreset.numberOfPeople !== undefined) setNumberOfPeople(initialPreset.numberOfPeople);
    }
  }, [initialPreset]);

  const calculations = useMemo(() => {
    const rawSubtotal = Math.max(0, safeParseNumber(subtotal, 0));
    const rawTaxRate = Math.max(0, safeParseNumber(taxRate, 0));
    const effectiveTipPct = customTip !== '' ? safeParseNumber(customTip, 0) : safeParseNumber(tipPercent, 0);
    const people = Math.max(1, Math.floor(safeParseNumber(numberOfPeople, 1)));

    const taxAmount = (rawSubtotal * rawTaxRate) / 100;
    const tipBase = tipOnPreTax ? rawSubtotal : rawSubtotal + taxAmount;
    let tipAmount = (tipBase * effectiveTipPct) / 100;
    let totalBill = rawSubtotal + taxAmount + tipAmount;

    if (roundUpToDollar) {
      const roundedTotal = Math.ceil(totalBill);
      const extraTip = roundedTotal - totalBill;
      tipAmount += extraTip;
      totalBill = roundedTotal;
    }

    const perPersonSubtotal = rawSubtotal / people;
    const perPersonTax = taxAmount / people;
    const perPersonTip = tipAmount / people;
    const perPersonTotal = totalBill / people;

    return {
      rawSubtotal,
      rawTaxRate,
      effectiveTipPct,
      people,
      taxAmount,
      tipAmount,
      totalBill,
      perPersonSubtotal,
      perPersonTax,
      perPersonTip,
      perPersonTotal,
      subtotalSharePct: totalBill > 0 ? (rawSubtotal / totalBill) * 100 : 0,
      taxSharePct: totalBill > 0 ? (taxAmount / totalBill) * 100 : 0,
      tipSharePct: totalBill > 0 ? (tipAmount / totalBill) * 100 : 0,
    };
  }, [subtotal, taxRate, tipPercent, customTip, numberOfPeople, tipOnPreTax, roundUpToDollar]);

  const copyVal = (val: string, key: string) => {
    navigator.clipboard.writeText(val);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Bill & Tip Inputs Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-6 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-5 shadow-sm">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Receipt className="w-4 h-4 text-blue-500" />
            Bill &amp; Tax Parameters
          </h3>

          <CalcInput
            id="subtotal"
            label="Bill Subtotal (Before Tax & Tip)"
            value={subtotal}
            onChange={setSubtotal}
            min={0}
            step={0.5}
            prefix="$"
          />

          <div className="grid grid-cols-2 gap-3">
            <CalcInput
              id="taxRate"
              label="Sales Tax Rate (%)"
              value={taxRate}
              onChange={setTaxRate}
              min={0}
              step={0.125}
              suffix="%"
            />

            <CalcInput
              id="numberOfPeople"
              label="Number of People (Split)"
              value={numberOfPeople}
              onChange={setNumberOfPeople}
              min={1}
              max={100}
              step={1}
            />
          </div>

          {/* Tip Selector */}
          <div className="space-y-2 pt-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Tip Percentage
              </label>
              <span className="text-xs font-bold text-blue-600 dark:text-blue-400">
                {calculations.effectiveTipPct}% ({tipOnPreTax ? 'Pre-Tax' : 'Post-Tax'})
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {TIP_TIERS.map((tier) => (
                <button
                  key={tier.pct}
                  type="button"
                  onClick={() => {
                    setTipPercent(tier.pct);
                    setCustomTip('');
                  }}
                  className={`p-2.5 rounded-xl border text-left transition ${
                    customTip === '' && tipPercent === tier.pct
                      ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                      : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                  }`}
                >
                  <div className="font-extrabold text-sm">{tier.pct}%</div>
                  <div className="text-[10px] opacity-80 truncate">{tier.label}</div>
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 pt-2">
              <span className="text-xs text-slate-500">Custom Tip %:</span>
              <input
                type="number"
                placeholder="e.g. 22"
                value={customTip}
                onChange={(e) => setCustomTip(e.target.value)}
                className="w-24 text-xs font-mono p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Toggles */}
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
            <label className="flex items-center gap-2.5 cursor-pointer text-xs font-semibold text-slate-700 dark:text-slate-300">
              <input
                type="checkbox"
                checked={tipOnPreTax}
                onChange={(e) => setTipOnPreTax(e.target.checked)}
                className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              />
              Calculate tip on pre-tax subtotal (standard etiquette)
            </label>

            <label className="flex items-center gap-2.5 cursor-pointer text-xs font-semibold text-slate-700 dark:text-slate-300">
              <input
                type="checkbox"
                checked={roundUpToDollar}
                onChange={(e) => setRoundUpToDollar(e.target.checked)}
                className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              />
              Round up grand total to the nearest whole dollar
            </label>
          </div>
        </div>

        {/* Right Output Panel */}
        <div className="lg:col-span-6 bg-slate-50 dark:bg-slate-900/50 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Amount Per Person ({calculations.people} {calculations.people === 1 ? 'Person' : 'People'})
              </span>
              <button
                type="button"
                onClick={() => copyVal(formatNumber(calculations.perPersonTotal, 2), 'perPerson')}
                className="text-xs text-slate-400 hover:text-blue-500 flex items-center gap-1 font-semibold"
              >
                {copiedKey === 'perPerson' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedKey === 'perPerson' ? 'Copied' : 'Copy'}
              </button>
            </div>

            <div className="text-4xl sm:text-5xl font-black font-mono text-blue-600 dark:text-blue-400">
              ${formatNumber(calculations.perPersonTotal, 2)}
            </div>

            {/* Visual Composition Bar */}
            <div className="space-y-1.5 pt-2">
              <div className="flex justify-between text-[11px] font-bold text-slate-500">
                <span>Bill Share ({calculations.subtotalSharePct.toFixed(0)}%)</span>
                <span>Tax ({calculations.taxSharePct.toFixed(0)}%)</span>
                <span>Tip ({calculations.tipSharePct.toFixed(0)}%)</span>
              </div>
              <div className="h-3 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden flex">
                <div style={{ width: `${calculations.subtotalSharePct}%` }} className="bg-blue-600 h-full" />
                <div style={{ width: `${calculations.taxSharePct}%` }} className="bg-amber-500 h-full" />
                <div style={{ width: `${calculations.tipSharePct}%` }} className="bg-emerald-500 h-full" />
              </div>
            </div>
          </div>

          {/* Itemized Per-Person Table */}
          <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2.5 text-xs font-mono">
            <div className="flex justify-between text-slate-600 dark:text-slate-400">
              <span className="font-sans">Per Person Subtotal:</span>
              <strong className="text-slate-900 dark:text-white">${formatNumber(calculations.perPersonSubtotal, 2)}</strong>
            </div>
            <div className="flex justify-between text-slate-600 dark:text-slate-400">
              <span className="font-sans">Per Person Sales Tax ({taxRate}%):</span>
              <strong className="text-slate-900 dark:text-white">${formatNumber(calculations.perPersonTax, 2)}</strong>
            </div>
            <div className="flex justify-between text-slate-600 dark:text-slate-400">
              <span className="font-sans">Per Person Tip ({calculations.effectiveTipPct}%):</span>
              <strong className="text-emerald-600 dark:text-emerald-400">${formatNumber(calculations.perPersonTip, 2)}</strong>
            </div>
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex justify-between font-bold text-sm">
              <span className="font-sans text-slate-900 dark:text-white">Total per Person:</span>
              <span className="text-blue-600 dark:text-blue-400">${formatNumber(calculations.perPersonTotal, 2)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Grand Totals KPI Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <CalcResultCard
          title="Grand Total Bill"
          value={`$${formatNumber(calculations.totalBill, 2)}`}
          subtitle="Subtotal + Tax + Tip"
          highlighted={true}
        />

        <CalcResultCard
          title="Total Tip"
          value={`$${formatNumber(calculations.tipAmount, 2)}`}
          subtitle={`${calculations.effectiveTipPct}% gratuity`}
        />

        <CalcResultCard
          title="Total Sales Tax"
          value={`$${formatNumber(calculations.taxAmount, 2)}`}
          subtitle={`${taxRate}% local sales tax`}
        />

        <CalcResultCard
          title="Subtotal"
          value={`$${formatNumber(calculations.rawSubtotal, 2)}`}
          subtitle="Original food/service charge"
        />
      </div>
    </div>
  );
};
