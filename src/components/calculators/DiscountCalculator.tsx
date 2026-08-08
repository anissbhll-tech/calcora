import React, { useState } from 'react';

export const DiscountCalculator: React.FC = () => {
  const [originalPrice, setOriginalPrice] = useState<number>(100);
  const [discountPercent, setDiscountPercent] = useState<number>(25);
  const [extraDiscountPercent, setExtraDiscountPercent] = useState<number>(10);
  const [salesTaxPercent, setSalesTaxPercent] = useState<number>(8);

  const primaryDiscountAmount = (originalPrice * discountPercent) / 100;
  const priceAfterFirstDiscount = originalPrice - primaryDiscountAmount;

  const extraDiscountAmount = (priceAfterFirstDiscount * extraDiscountPercent) / 100;
  const priceAfterDiscounts = priceAfterFirstDiscount - extraDiscountAmount;

  const salesTaxAmount = (priceAfterDiscounts * salesTaxPercent) / 100;
  const finalPrice = priceAfterDiscounts + salesTaxAmount;

  const totalSaved = originalPrice - priceAfterDiscounts;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-6 space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Original Price ($)</label>
          <input
            type="number"
            value={originalPrice}
            onChange={(e) => setOriginalPrice(Number(e.target.value))}
            className="w-full text-xs font-mono p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Main Discount (%)</label>
            <input
              type="number"
              value={discountPercent}
              onChange={(e) => setDiscountPercent(Number(e.target.value))}
              className="w-full text-xs font-mono p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Stacked Coupon (%)</label>
            <input
              type="number"
              value={extraDiscountPercent}
              onChange={(e) => setExtraDiscountPercent(Number(e.target.value))}
              className="w-full text-xs font-mono p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Sales Tax (%)</label>
          <input
            type="number"
            value={salesTaxPercent}
            onChange={(e) => setSalesTaxPercent(Number(e.target.value))}
            className="w-full text-xs font-mono p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
          />
        </div>
      </div>

      <div className="lg:col-span-6 bg-slate-50 dark:bg-slate-950 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Final Sale Price</span>
          <div className="text-4xl sm:text-5xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-1 font-mono">
            ${finalPrice.toFixed(2)}
          </div>
        </div>

        <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/60 dark:border-slate-800 space-y-2 text-xs">
          <div className="flex justify-between text-slate-600 dark:text-slate-400">
            <span>Total Discount Savings:</span>
            <span className="font-mono font-bold text-emerald-600">${totalSaved.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-slate-600 dark:text-slate-400">
            <span>Sales Tax Amount ({salesTaxPercent}%):</span>
            <span className="font-mono font-bold text-slate-900 dark:text-slate-100">${salesTaxAmount.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
