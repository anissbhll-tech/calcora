import React, { useState, useEffect } from 'react';
import { CalcInput } from '../common/CalcInput';
import { CalcSelect } from '../common/CalcSelect';
import { CalcResultCard } from '../common/CalcResultCard';
import { CalcErrorAlert } from '../common/CalcErrorAlert';
import { safeParseNumber, formatNumber, formatCurrency } from '../../lib/mathUtils';

interface DeckBoardCalculatorProps {
  onSaveHistory?: (summary: string, inputs: Record<string, any>, results: Record<string, any>) => void;
  resetSignal?: number;
  initialPreset?: Record<string, any> | null;
}

export const DeckBoardCalculator: React.FC<DeckBoardCalculatorProps> = ({
  onSaveHistory,
  resetSignal,
  initialPreset,
}) => {
  const [deckLengthFt, setDeckLengthFt] = useState<string>('20');
  const [deckWidthFt, setDeckWidthFt] = useState<string>('12');
  const [boardWidthInches, setBoardWidthInches] = useState<string>('5.5'); // Nominal 5/4x6 = 5.5in actual
  const [boardLengthFt, setBoardLengthFt] = useState<string>('12');
  const [boardCost, setBoardCost] = useState<string>('18');

  useEffect(() => {
    if (initialPreset) {
      if (initialPreset.deckLengthFt !== undefined) setDeckLengthFt(String(initialPreset.deckLengthFt));
    }
  }, [initialPreset]);

  useEffect(() => {
    handleReset();
  }, [resetSignal]);

  const handleReset = () => {
    setDeckLengthFt('20');
    setDeckWidthFt('12');
    setBoardWidthInches('5.5');
    setBoardLengthFt('12');
    setBoardCost('18');
  };

  const calculate = () => {
    const l = safeParseNumber(deckLengthFt, 0);
    const w = safeParseNumber(deckWidthFt, 0);
    const bWidthIn = safeParseNumber(boardWidthInches, 5.5);
    const bLenFt = safeParseNumber(boardLengthFt, 12);
    const price = safeParseNumber(boardCost, 0);

    if (l <= 0 || w <= 0 || bWidthIn <= 0 || bLenFt <= 0) {
      return { isValid: false, msg: 'Deck and board dimensions must be greater than 0.' };
    }

    const deckAreaSqFt = l * w;

    // Number of rows across width: w (ft) * 12 / (board width + 0.25 gap)
    const rowsCount = Math.ceil((w * 12) / (bWidthIn + 0.25));

    // Linear feet of decking boards needed = rowsCount * l
    const totalLinearFeet = rowsCount * l;

    // Add 10% waste
    const totalLinearFeetWithWaste = totalLinearFeet * 1.1;
    const totalBoardsNeeded = Math.ceil(totalLinearFeetWithWaste / bLenFt);

    const totalDeckingCost = totalBoardsNeeded * price;

    return {
      isValid: true,
      msg: '',
      deckAreaSqFt,
      rowsCount,
      totalLinearFeet,
      totalBoardsNeeded,
      totalDeckingCost,
    };
  };

  const res = calculate();

  const handleSave = () => {
    if (onSaveHistory && res.isValid) {
      onSaveHistory(
        `Deck Lumber: ${res.totalBoardsNeeded} boards (${boardLengthFt}ft) | Cost ${formatCurrency(res.totalDeckingCost)}`,
        { deckLengthFt, deckWidthFt, boardWidthInches, boardLengthFt, boardCost },
        { totalBoardsNeeded: res.totalBoardsNeeded, totalDeckingCost: res.totalDeckingCost }
      );
    }
  };

  return (
    <div className="space-y-6">
      {!res.isValid && res.msg && <CalcErrorAlert message={res.msg} />}

      <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Deck Footprint & Lumber Specs
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <CalcInput id="deckLengthFt" label="Deck Length" suffix="ft" value={deckLengthFt} onChange={setDeckLengthFt} min={1} />
          <CalcInput id="deckWidthFt" label="Deck Width" suffix="ft" value={deckWidthFt} onChange={setDeckWidthFt} min={1} />
          <CalcInput id="boardWidthInches" label="Actual Board Width" suffix="inches" value={boardWidthInches} onChange={setBoardWidthInches} helperText="Nominal 6in = 5.5in actual" />
          <CalcSelect
            id="boardLengthFt"
            label="Board Length to Order"
            value={boardLengthFt}
            onChange={setBoardLengthFt}
            options={[
              { value: '8', label: '8 Feet' },
              { value: '10', label: '10 Feet' },
              { value: '12', label: '12 Feet' },
              { value: '16', label: '16 Feet' },
            ]}
          />
          <CalcInput id="boardCost" label="Cost per Board" prefix="$" value={boardCost} onChange={setBoardCost} min={0} />
        </div>
      </div>

      {res.isValid && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <CalcResultCard
              title="Deck Boards Required"
              value={`${res.totalBoardsNeeded} Boards`}
              subtitle={`Includes 10% waste buffer (${boardLengthFt}ft boards)`}
              highlighted={true}
            />
            <CalcResultCard
              title="Total Linear Feet"
              value={`${formatNumber(res.totalLinearFeet, 0)} lin. ft`}
              subtitle="Net length of decking boards"
            />
            <CalcResultCard
              title="Estimated Decking Cost"
              value={formatCurrency(res.totalDeckingCost)}
              subtitle="Deck board surface material cost"
              badgeText="Lumber Cost"
              badgeType="success"
            />
            <CalcResultCard
              title="Deck Surface Area"
              value={`${formatNumber(res.deckAreaSqFt, 0)} sq. ft`}
              subtitle="Total footprint area"
            />
          </div>

          <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 flex justify-between items-center">
            <span>Calculations assume standard 1/4 inch board gapping for weather expansion and drainage.</span>
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
