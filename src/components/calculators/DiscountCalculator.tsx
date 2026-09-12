import React, { useState, useMemo, useEffect } from 'react';
import { BaseCalculatorProps } from './index';
import { CalcInput } from '../common/CalcInput';
import { CalcResultCard } from '../common/CalcResultCard';
import { safeParseNumber, formatNumber } from '../../lib/mathUtils';
import { Tag, Sparkles, Copy, Check, ShoppingBag, Percent, ArrowRight } from 'lucide-react';

type DiscountMode = 'percentage' | 'fixed' | 'bogo' | 'quantity';

const DISCOUNT_PRESETS = [
  { name: 'Black Friday Double Stack', mode: 'percentage', orig: 150, d1: 40, d2: 15, tax: 8.875, desc: '40% off + 15% VIP code' },
  { name: 'End of Season Clearance', mode: 'percentage', orig: 89.99, d1: 60, d2: 0, tax: 7, desc: '60% instant markdown' },
  { name: 'BOGO 50% Off (2 items)', mode: 'bogo', orig: 60, buyQty: 1, getQty: 1, getDisc: 50, tax: 8.25, desc: 'Buy 1, Get 2nd at half price' },
  { name: 'Buy 2 Get 1 Free', mode: 'bogo', orig: 45, buyQty: 2, getQty: 1, getDisc: 100, tax: 6.5, desc: '3 total items, 1 free' },
  { name: '$20 Off $100 Voucher', mode: 'fixed', orig: 125, fixedOff: 20, tax: 8, desc: 'Flat $20 instant coupon' },
];

export const DiscountCalculator: React.FC<BaseCalculatorProps> = ({ onSaveHistory, initialPreset }) => {
  const [mode, setMode] = useState<DiscountMode>('percentage');

  // Percentage Mode inputs
  const [originalPrice, setOriginalPrice] = useState<number>(120);
  const [discountPercent, setDiscountPercent] = useState<number>(25);
  const [extraDiscountPercent, setExtraDiscountPercent] = useState<number>(10);
  const [fixedCoupon, setFixedCoupon] = useState<number>(0);
  const [salesTaxPercent, setSalesTaxPercent] = useState<number>(8.875);

  // Fixed Amount Mode inputs
  const [fixedOrigPrice, setFixedOrigPrice] = useState<number>(100);
  const [fixedDiscountAmount, setFixedDiscountAmount] = useState<number>(20);

  // BOGO Mode inputs
  const [bogoItemPrice, setBogoItemPrice] = useState<number>(50);
  const [bogoBuyQty, setBogoBuyQty] = useState<number>(1);
  const [bogoGetQty, setBogoGetQty] = useState<number>(1);
  const [bogoDiscountPct, setBogoDiscountPct] = useState<number>(50); // 50% or 100% (free)

  // Quantity / Bulk Mode inputs
  const [unitPrice, setUnitPrice] = useState<number>(25);
  const [quantity, setQuantity] = useState<number>(5);
  const [bulkDiscountPct, setBulkDiscountPct] = useState<number>(15);

  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  useEffect(() => {
    if (initialPreset) {
      if (initialPreset.mode) setMode(initialPreset.mode);
      if (initialPreset.originalPrice !== undefined) setOriginalPrice(initialPreset.originalPrice);
      if (initialPreset.discountPercent !== undefined) setDiscountPercent(initialPreset.discountPercent);
    }
  }, [initialPreset]);

  // Main Calculation Engine
  const calculations = useMemo(() => {
    let grossPrice = 0;
    let netBeforeTax = 0;
    let totalDiscountDollars = 0;
    let effectiveDiscountPct = 0;
    const taxRate = Math.max(0, safeParseNumber(salesTaxPercent, 0));

    if (mode === 'percentage') {
      grossPrice = Math.max(0, safeParseNumber(originalPrice, 0));
      const d1 = Math.max(0, Math.min(100, safeParseNumber(discountPercent, 0)));
      const d2 = Math.max(0, Math.min(100, safeParseNumber(extraDiscountPercent, 0)));
      const coupon = Math.max(0, safeParseNumber(fixedCoupon, 0));

      const afterD1 = grossPrice * (1 - d1 / 100);
      const afterD2 = afterD1 * (1 - d2 / 100);
      netBeforeTax = Math.max(0, afterD2 - coupon);
      totalDiscountDollars = grossPrice - netBeforeTax;
      effectiveDiscountPct = grossPrice > 0 ? (totalDiscountDollars / grossPrice) * 100 : 0;
    } else if (mode === 'fixed') {
      grossPrice = Math.max(0, safeParseNumber(fixedOrigPrice, 0));
      const off = Math.max(0, safeParseNumber(fixedDiscountAmount, 0));
      netBeforeTax = Math.max(0, grossPrice - off);
      totalDiscountDollars = grossPrice - netBeforeTax;
      effectiveDiscountPct = grossPrice > 0 ? (totalDiscountDollars / grossPrice) * 100 : 0;
    } else if (mode === 'bogo') {
      const priceEach = Math.max(0, safeParseNumber(bogoItemPrice, 0));
      const buy = Math.max(1, Math.floor(safeParseNumber(bogoBuyQty, 1)));
      const get = Math.max(1, Math.floor(safeParseNumber(bogoGetQty, 1)));
      const disc = Math.max(0, Math.min(100, safeParseNumber(bogoDiscountPct, 100)));

      const totalItems = buy + get;
      grossPrice = totalItems * priceEach;
      const fullPriceItemsCost = buy * priceEach;
      const discountedItemsCost = get * priceEach * (1 - disc / 100);
      netBeforeTax = fullPriceItemsCost + discountedItemsCost;
      totalDiscountDollars = grossPrice - netBeforeTax;
      effectiveDiscountPct = grossPrice > 0 ? (totalDiscountDollars / grossPrice) * 100 : 0;
    } else if (mode === 'quantity') {
      const uPrice = Math.max(0, safeParseNumber(unitPrice, 0));
      const qty = Math.max(1, Math.floor(safeParseNumber(quantity, 1)));
      const bulkPct = Math.max(0, Math.min(100, safeParseNumber(bulkDiscountPct, 0)));

      grossPrice = uPrice * qty;
      netBeforeTax = grossPrice * (1 - bulkPct / 100);
      totalDiscountDollars = grossPrice - netBeforeTax;
      effectiveDiscountPct = bulkPct;
    }

    const taxAmount = (netBeforeTax * taxRate) / 100;
    const finalPriceWithTax = netBeforeTax + taxAmount;

    return {
      grossPrice,
      netBeforeTax,
      totalDiscountDollars,
      effectiveDiscountPct,
      taxAmount,
      finalPriceWithTax,
      taxRate,
    };
  }, [
    mode,
    originalPrice,
    discountPercent,
    extraDiscountPercent,
    fixedCoupon,
    salesTaxPercent,
    fixedOrigPrice,
    fixedDiscountAmount,
    bogoItemPrice,
    bogoBuyQty,
    bogoGetQty,
    bogoDiscountPct,
    unitPrice,
    quantity,
    bulkDiscountPct,
  ]);

  const copyVal = (val: string, key: string) => {
    navigator.clipboard.writeText(val);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const applyPreset = (p: typeof DISCOUNT_PRESETS[0]) => {
    setMode(p.mode as DiscountMode);
    setSalesTaxPercent(p.tax);
    if (p.mode === 'percentage') {
      setOriginalPrice(p.orig);
      setDiscountPercent(p.d1);
      setExtraDiscountPercent(p.d2);
      setFixedCoupon(0);
    } else if (p.mode === 'fixed') {
      setFixedOrigPrice(p.orig);
      setFixedDiscountAmount(p.fixedOff || 20);
    } else if (p.mode === 'bogo') {
      setBogoItemPrice(p.orig);
      setBogoBuyQty(p.buyQty || 1);
      setBogoGetQty(p.getQty || 1);
      setBogoDiscountPct(p.getDisc || 100);
    }
  };

  return (
    <div className="space-y-8">
      {/* Mode Selector Tabs */}
      <div className="flex flex-wrap gap-1.5 p-1.5 bg-slate-100 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700">
        <button
          type="button"
          onClick={() => setMode('percentage')}
          className={`py-2 px-3 rounded-xl text-xs font-bold transition flex-1 min-w-[120px] text-center ${
            mode === 'percentage'
              ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm border border-slate-200/60 dark:border-slate-700'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          Percentage Off (% + Stacked)
        </button>

        <button
          type="button"
          onClick={() => setMode('fixed')}
          className={`py-2 px-3 rounded-xl text-xs font-bold transition flex-1 min-w-[120px] text-center ${
            mode === 'fixed'
              ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-sm border border-slate-200/60 dark:border-slate-700'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          Fixed Amount Off ($ Off)
        </button>

        <button
          type="button"
          onClick={() => setMode('bogo')}
          className={`py-2 px-3 rounded-xl text-xs font-bold transition flex-1 min-w-[120px] text-center ${
            mode === 'bogo'
              ? 'bg-white dark:bg-slate-900 text-purple-600 dark:text-purple-400 shadow-sm border border-slate-200/60 dark:border-slate-700'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          BOGO Deals (Buy X, Get Y)
        </button>

        <button
          type="button"
          onClick={() => setMode('quantity')}
          className={`py-2 px-3 rounded-xl text-xs font-bold transition flex-1 min-w-[120px] text-center ${
            mode === 'quantity'
              ? 'bg-white dark:bg-slate-900 text-amber-600 dark:text-amber-400 shadow-sm border border-slate-200/60 dark:border-slate-700'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          Bulk Quantity Tier
        </button>
      </div>

      {/* Quick Deal Presets */}
      <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-blue-500" />
          Shopping Deal Presets
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {DISCOUNT_PRESETS.map((p, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => applyPreset(p)}
              className="p-2 text-left rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-500 transition text-xs"
            >
              <div className="font-bold text-slate-800 dark:text-slate-200 truncate">{p.name}</div>
              <div className="text-[10px] text-slate-400 truncate">{p.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Input Panels Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-6 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Tag className="w-4 h-4 text-blue-500" />
            Pricing &amp; Discount Configuration
          </h3>

          {mode === 'percentage' && (
            <div className="space-y-4">
              <CalcInput
                id="originalPrice"
                label="Original Retail Price"
                value={originalPrice}
                onChange={setOriginalPrice}
                min={0}
                step={0.5}
                prefix="$"
              />

              <div className="grid grid-cols-2 gap-3">
                <CalcInput
                  id="discountPercent"
                  label="Primary Discount (%)"
                  value={discountPercent}
                  onChange={setDiscountPercent}
                  min={0}
                  max={100}
                  step={5}
                  suffix="%"
                />
                <CalcInput
                  id="extraDiscountPercent"
                  label="Extra Stacked Promo (%)"
                  value={extraDiscountPercent}
                  onChange={setExtraDiscountPercent}
                  min={0}
                  max={100}
                  step={5}
                  suffix="%"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <CalcInput
                  id="fixedCoupon"
                  label="Additional Dollar Coupon"
                  value={fixedCoupon}
                  onChange={setFixedCoupon}
                  min={0}
                  step={1}
                  prefix="$"
                />
                <CalcInput
                  id="salesTaxPercent"
                  label="Sales Tax Rate"
                  value={salesTaxPercent}
                  onChange={setSalesTaxPercent}
                  min={0}
                  step={0.125}
                  suffix="%"
                />
              </div>
            </div>
          )}

          {mode === 'fixed' && (
            <div className="space-y-4">
              <CalcInput
                id="fixedOrigPrice"
                label="Original Item Price"
                value={fixedOrigPrice}
                onChange={setFixedOrigPrice}
                min={0}
                step={1}
                prefix="$"
              />
              <div className="grid grid-cols-2 gap-3">
                <CalcInput
                  id="fixedDiscountAmount"
                  label="Discount Amount ($ Off)"
                  value={fixedDiscountAmount}
                  onChange={setFixedDiscountAmount}
                  min={0}
                  step={1}
                  prefix="$"
                />
                <CalcInput
                  id="fixedTax"
                  label="Sales Tax Rate"
                  value={salesTaxPercent}
                  onChange={setSalesTaxPercent}
                  min={0}
                  step={0.125}
                  suffix="%"
                />
              </div>
            </div>
          )}

          {mode === 'bogo' && (
            <div className="space-y-4">
              <CalcInput
                id="bogoItemPrice"
                label="Single Item Price"
                value={bogoItemPrice}
                onChange={setBogoItemPrice}
                min={0}
                step={1}
                prefix="$"
              />
              <div className="grid grid-cols-3 gap-2">
                <CalcInput id="bogoBuy" label="Buy Qty" value={bogoBuyQty} onChange={setBogoBuyQty} min={1} />
                <CalcInput id="bogoGet" label="Get Qty" value={bogoGetQty} onChange={setBogoGetQty} min={1} />
                <CalcInput
                  id="bogoDisc"
                  label="Get % Off"
                  value={bogoDiscountPct}
                  onChange={setBogoDiscountPct}
                  min={0}
                  max={100}
                  suffix="%"
                />
              </div>
              <CalcInput
                id="bogoTax"
                label="Sales Tax Rate"
                value={salesTaxPercent}
                onChange={setSalesTaxPercent}
                min={0}
                step={0.125}
                suffix="%"
              />
            </div>
          )}

          {mode === 'quantity' && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <CalcInput
                  id="unitPrice"
                  label="Single Unit Price"
                  value={unitPrice}
                  onChange={setUnitPrice}
                  min={0}
                  step={0.5}
                  prefix="$"
                />
                <CalcInput
                  id="quantity"
                  label="Quantity Purchased"
                  value={quantity}
                  onChange={setQuantity}
                  min={1}
                  step={1}
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <CalcInput
                  id="bulkDiscountPct"
                  label="Bulk Discount Rate (%)"
                  value={bulkDiscountPct}
                  onChange={setBulkDiscountPct}
                  min={0}
                  max={100}
                  step={5}
                  suffix="%"
                />
                <CalcInput
                  id="bulkTax"
                  label="Sales Tax Rate"
                  value={salesTaxPercent}
                  onChange={setSalesTaxPercent}
                  min={0}
                  step={0.125}
                  suffix="%"
                />
              </div>
            </div>
          )}
        </div>

        {/* Right Output Panel */}
        <div className="lg:col-span-6 bg-slate-50 dark:bg-slate-900/50 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 flex flex-col justify-between space-y-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Final Out-Of-Pocket Price (With Tax)
              </span>
              <button
                type="button"
                onClick={() => copyVal(formatNumber(calculations.finalPriceWithTax, 2), 'final')}
                className="text-xs text-slate-400 hover:text-blue-500 flex items-center gap-1 font-semibold"
              >
                {copiedKey === 'final' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedKey === 'final' ? 'Copied' : 'Copy'}
              </button>
            </div>

            <div className="text-4xl sm:text-5xl font-black font-mono text-emerald-600 dark:text-emerald-400">
              ${formatNumber(calculations.finalPriceWithTax, 2)}
            </div>

            {/* Savings Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 font-bold rounded-xl border border-emerald-200 dark:border-emerald-800 text-xs font-mono">
              You Save: ${formatNumber(calculations.totalDiscountDollars, 2)} ({formatNumber(calculations.effectiveDiscountPct, 1)}% Off)
            </div>
          </div>

          {/* Itemized Calculation Summary */}
          <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2.5 text-xs font-mono">
            <div className="flex justify-between text-slate-600 dark:text-slate-400">
              <span className="font-sans">Original Gross Price:</span>
              <strong className="text-slate-900 dark:text-white">${formatNumber(calculations.grossPrice, 2)}</strong>
            </div>

            <div className="flex justify-between text-slate-600 dark:text-slate-400">
              <span className="font-sans">Total Markdown Savings:</span>
              <strong className="text-emerald-600 dark:text-emerald-400">−${formatNumber(calculations.totalDiscountDollars, 2)}</strong>
            </div>

            <div className="flex justify-between text-slate-600 dark:text-slate-400">
              <span className="font-sans">Sale Price (Pre-Tax):</span>
              <strong className="text-slate-900 dark:text-white">${formatNumber(calculations.netBeforeTax, 2)}</strong>
            </div>

            <div className="flex justify-between text-slate-600 dark:text-slate-400">
              <span className="font-sans">Sales Tax ({calculations.taxRate}%):</span>
              <strong className="text-slate-900 dark:text-white">+${formatNumber(calculations.taxAmount, 2)}</strong>
            </div>

            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex justify-between font-bold text-sm">
              <span className="font-sans text-slate-900 dark:text-white">Final Total:</span>
              <span className="text-emerald-600 dark:text-emerald-400">${formatNumber(calculations.finalPriceWithTax, 2)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <CalcResultCard
          title="Total Cash Saved"
          value={`$${formatNumber(calculations.totalDiscountDollars, 2)}`}
          subtitle="Dollars saved from original price"
          highlighted={true}
        />

        <CalcResultCard
          title="Effective Discount"
          value={`${formatNumber(calculations.effectiveDiscountPct, 1)}%`}
          subtitle="Overall effective % off"
        />

        <CalcResultCard
          title="Pre-Tax Price"
          value={`$${formatNumber(calculations.netBeforeTax, 2)}`}
          subtitle="Discounted subtotal"
        />

        <CalcResultCard
          title="Sales Tax"
          value={`$${formatNumber(calculations.taxAmount, 2)}`}
          subtitle={`At ${calculations.taxRate}% tax rate`}
        />
      </div>
    </div>
  );
};
