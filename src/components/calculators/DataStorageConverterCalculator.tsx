import React, { useState, useEffect } from 'react';
import { CalcInput } from '../common/CalcInput';
import { CalcSelect } from '../common/CalcSelect';
import { CalcResultCard } from '../common/CalcResultCard';
import { CalcErrorAlert } from '../common/CalcErrorAlert';
import { safeParseNumber, formatNumber } from '../../lib/mathUtils';

interface DataStorageConverterCalculatorProps {
  onSaveHistory?: (summary: string, inputs: Record<string, any>, results: Record<string, any>) => void;
  resetSignal?: number;
  initialPreset?: Record<string, any> | null;
}

export const DataStorageConverterCalculator: React.FC<DataStorageConverterCalculatorProps> = ({
  onSaveHistory,
  resetSignal,
  initialPreset,
}) => {
  const [dataValue, setDataValue] = useState<string>('500');
  const [dataUnit, setDataUnit] = useState<string>('GB'); // KB, MB, GB, TB

  useEffect(() => {
    if (initialPreset) {
      if (initialPreset.dataValue !== undefined) setDataValue(String(initialPreset.dataValue));
    }
  }, [initialPreset]);

  useEffect(() => {
    handleReset();
  }, [resetSignal]);

  const handleReset = () => {
    setDataValue('500');
    setDataUnit('GB');
  };

  const calculate = () => {
    const val = safeParseNumber(dataValue, 0);

    if (val < 0) {
      return { isValid: false, msg: 'Data value must be a non-negative number.' };
    }

    // Convert input value to Bytes
    let bytes = 0;
    if (dataUnit === 'KB') bytes = val * 1024;
    else if (dataUnit === 'MB') bytes = val * 1024 * 1024;
    else if (dataUnit === 'GB') bytes = val * 1024 * 1024 * 1024;
    else if (dataUnit === 'TB') bytes = val * 1024 * 1024 * 1024 * 1024;
    else bytes = val; // Bytes

    const kb = bytes / 1024;
    const mb = kb / 1024;
    const gb = mb / 1024;
    const tb = gb / 1024;

    const bits = bytes * 8;

    return {
      isValid: true,
      msg: '',
      val,
      bytes,
      kb,
      mb,
      gb,
      tb,
      bits,
    };
  };

  const res = calculate();

  const handleSave = () => {
    if (onSaveHistory && res.isValid) {
      onSaveHistory(
        `Data Storage: ${dataValue} ${dataUnit} = ${formatNumber(res.gb, 2)} GB / ${formatNumber(res.tb, 3)} TB`,
        { dataValue, dataUnit },
        { bytes: res.bytes, gb: res.gb, tb: res.tb }
      );
    }
  };

  return (
    <div className="space-y-6">
      {!res.isValid && res.msg && <CalcErrorAlert message={res.msg} />}

      <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Data Quantity & Storage Unit
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <CalcInput id="dataValue" label="Data Value" value={dataValue} onChange={setDataValue} min={0} />
          <CalcSelect
            id="dataUnit"
            label="Data Unit"
            value={dataUnit}
            onChange={setDataUnit}
            options={[
              { value: 'Bytes', label: 'Bytes (B)' },
              { value: 'KB', label: 'Kilobytes (KB)' },
              { value: 'MB', label: 'Megabytes (MB)' },
              { value: 'GB', label: 'Gigabytes (GB)' },
              { value: 'TB', label: 'Terabytes (TB)' },
            ]}
          />
        </div>
      </div>

      {res.isValid && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <CalcResultCard
              title="Gigabytes (GB)"
              value={formatNumber(res.gb, 3)}
              subtitle="1 GB = 1,024 MB"
              highlighted={true}
            />
            <CalcResultCard
              title="Terabytes (TB)"
              value={formatNumber(res.tb, 4)}
              subtitle="1 TB = 1,024 GB"
            />
            <CalcResultCard
              title="Megabytes (MB)"
              value={formatNumber(res.mb, 2)}
              subtitle="1 MB = 1,024 KB"
            />
            <CalcResultCard
              title="Total Bytes / Bits"
              value={`${formatNumber(res.bytes, 0)} B`}
              subtitle={`${formatNumber(res.bits, 0)} Bits`}
            />
          </div>

          <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 flex justify-between items-center">
            <span>Binary computer data storage uses power-of-two multiples where 1 KB = 1024 Bytes.</span>
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
