import React, { useState, useEffect } from 'react';
import { CalcInput } from '../common/CalcInput';
import { CalcResultCard } from '../common/CalcResultCard';
import { CalcErrorAlert } from '../common/CalcErrorAlert';

interface BinaryHexConverterCalculatorProps {
  onSaveHistory?: (summary: string, inputs: Record<string, any>, results: Record<string, any>) => void;
  resetSignal?: number;
  initialPreset?: Record<string, any> | null;
}

export const BinaryHexConverterCalculator: React.FC<BinaryHexConverterCalculatorProps> = ({
  onSaveHistory,
  resetSignal,
  initialPreset,
}) => {
  const [decimalInput, setDecimalInput] = useState<string>('255');

  useEffect(() => {
    if (initialPreset) {
      if (initialPreset.decimalInput !== undefined) setDecimalInput(String(initialPreset.decimalInput));
    }
  }, [initialPreset]);

  useEffect(() => {
    handleReset();
  }, [resetSignal]);

  const handleReset = () => {
    setDecimalInput('255');
  };

  const calculate = () => {
    const val = parseInt(decimalInput, 10);

    if (isNaN(val) || val < 0) {
      return { isValid: false, msg: 'Please enter a non-negative integer decimal value.' };
    }

    const binary = val.toString(2);
    const hex = val.toString(16).toUpperCase();
    const octal = val.toString(8);

    // Format binary with 4-bit nibble spacing
    const paddedBinary = binary.padStart(Math.ceil(binary.length / 4) * 4, '0');
    const binaryFormatted = paddedBinary.match(/.{1,4}/g)?.join(' ') || binary;

    return {
      isValid: true,
      msg: '',
      val,
      binaryFormatted,
      hex: `0x${hex}`,
      octal: `0o${octal}`,
      bitLength: binary.length,
    };
  };

  const res = calculate();

  const handleSave = () => {
    if (onSaveHistory && res.isValid) {
      onSaveHistory(
        `Base Conversion: Dec ${res.val} = Hex ${res.hex} = Bin ${res.binaryFormatted}`,
        { decimalInput },
        { binary: res.binaryFormatted, hex: res.hex, octal: res.octal }
      );
    }
  };

  return (
    <div className="space-y-6">
      {!res.isValid && res.msg && <CalcErrorAlert message={res.msg} />}

      <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Decimal Integer Input (Base 10)
        </h3>
        <CalcInput id="decimalInput" label="Decimal Value" value={decimalInput} onChange={setDecimalInput} min={0} />
      </div>

      {res.isValid && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <CalcResultCard
              title="Hexadecimal (Base 16)"
              value={res.hex}
              subtitle="0x prefix notation"
              highlighted={true}
            />
            <CalcResultCard
              title="Binary (Base 2)"
              value={res.binaryFormatted}
              subtitle="4-bit nibble groupings"
              badgeText={`${res.bitLength} Bits`}
              badgeType="info"
            />
            <CalcResultCard
              title="Octal (Base 8)"
              value={res.octal}
              subtitle="Base 8 octal string"
            />
            <CalcResultCard
              title="Decimal (Base 10)"
              value={String(res.val)}
              subtitle="Standard base 10 integer"
            />
          </div>

          <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 flex justify-between items-center">
            <span>Hexadecimal uses digits 0-9 and letters A-F to represent 4-bit binary values compactly.</span>
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
