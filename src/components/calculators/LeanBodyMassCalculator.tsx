import React, { useState, useEffect } from 'react';
import { BaseCalculatorProps } from './index';
import { Activity, User, Scale, Ruler, RotateCcw, Save } from 'lucide-react';

export const LeanBodyMassCalculator: React.FC<BaseCalculatorProps> = ({
  onSaveHistory,
  resetSignal,
  initialPreset
}) => {
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [unit, setUnit] = useState<'imperial' | 'metric'>('imperial');
  const [weightLbs, setWeightLbs] = useState<number>(180);
  const [heightInches, setHeightInches] = useState<number>(70); // 5'10"
  const [weightKg, setWeightKg] = useState<number>(81.6);
  const [heightCm, setHeightCm] = useState<number>(178);

  useEffect(() => {
    if (resetSignal) {
      handleReset();
    }
  }, [resetSignal]);

  const handleReset = () => {
    setGender('male');
    setUnit('imperial');
    setWeightLbs(180);
    setHeightInches(70);
    setWeightKg(81.6);
    setHeightCm(178);
  };

  const currentWeightKg = unit === 'imperial' ? weightLbs * 0.453592 : weightKg;
  const currentHeightCm = unit === 'imperial' ? heightInches * 2.54 : heightCm;
  const currentHeightM = currentHeightCm / 100;

  // Boer Formula (1984)
  const calculateBoer = () => {
    if (gender === 'male') {
      return (0.407 * currentWeightKg) + (0.267 * currentHeightCm) - 19.2;
    } else {
      return (0.252 * currentWeightKg) + (0.473 * currentHeightCm) - 48.3;
    }
  };

  // James Formula (1976)
  const calculateJames = () => {
    if (gender === 'male') {
      return (1.1 * currentWeightKg) - 128 * Math.pow(currentWeightKg / currentHeightCm, 2);
    } else {
      return (1.07 * currentWeightKg) - 148 * Math.pow(currentWeightKg / currentHeightCm, 2);
    }
  };

  // Hume Formula (1966)
  const calculateHume = () => {
    if (gender === 'male') {
      return (0.32810 * currentWeightKg) + (0.33929 * currentHeightCm) - 29.5336;
    } else {
      return (0.29569 * currentWeightKg) + (0.41813 * currentHeightCm) - 43.2933;
    }
  };

  const boerLbmKg = Math.max(0, calculateBoer());
  const jamesLbmKg = Math.max(0, calculateJames());
  const humeLbmKg = Math.max(0, calculateHume());

  const averageLbmKg = (boerLbmKg + jamesLbmKg + humeLbmKg) / 3;
  const averageLbmLbs = averageLbmKg * 2.20462;

  const displayWeight = unit === 'imperial' ? weightLbs : currentWeightKg;
  const displayLbm = unit === 'imperial' ? averageLbmLbs : averageLbmKg;
  const fatMassKg = Math.max(0, currentWeightKg - averageLbmKg);
  const displayFatMass = unit === 'imperial' ? fatMassKg * 2.20462 : fatMassKg;
  const fatPercentage = currentWeightKg > 0 ? (fatMassKg / currentWeightKg) * 100 : 0;

  // Fat Free Mass Index (FFMI)
  const ffmi = currentHeightM > 0 ? averageLbmKg / (currentHeightM * currentHeightM) : 0;

  const getFfmiRating = (score: number) => {
    if (score < 18) return 'Below Average Muscle Mass';
    if (score < 20) return 'Average Muscle Mass';
    if (score < 22) return 'Above Average Athletic Build';
    if (score < 25) return 'Excellent / Elite Natural Builder';
    return 'Exceptionally High / Natural Limit';
  };

  const handleSave = () => {
    if (onSaveHistory) {
      onSaveHistory(
        `Lean Body Mass: ${displayLbm.toFixed(1)} ${unit === 'imperial' ? 'lbs' : 'kg'} (${(100 - fatPercentage).toFixed(1)}% LBM, FFMI: ${ffmi.toFixed(1)})`,
        { gender, weight: displayWeight, height: currentHeightCm },
        { lbm: displayLbm, fatMass: displayFatMass, fatPercentage, ffmi }
      );
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-br from-indigo-900 via-slate-900 to-teal-900 text-white p-6 rounded-xl shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          <div>
            <div className="text-xs uppercase tracking-wider text-indigo-200 font-medium">Estimated Lean Body Mass</div>
            <div className="text-4xl font-extrabold mt-1">
              {displayLbm.toFixed(1)} <span className="text-xl font-normal text-indigo-200">{unit === 'imperial' ? 'lbs' : 'kg'}</span>
            </div>
            <div className="text-xs text-indigo-200 mt-1">
              {(100 - fatPercentage).toFixed(1)}% Fat-Free Muscle & Tissue
            </div>
          </div>

          <div>
            <div className="text-xs uppercase tracking-wider text-teal-200 font-medium">Body Fat Mass</div>
            <div className="text-2xl font-bold mt-1 text-teal-300">
              {displayFatMass.toFixed(1)} {unit === 'imperial' ? 'lbs' : 'kg'}
            </div>
            <div className="text-xs text-slate-300 mt-1">
              {fatPercentage.toFixed(1)}% Estimated Body Fat
            </div>
          </div>

          <div>
            <div className="text-xs uppercase tracking-wider text-emerald-200 font-medium">Fat-Free Mass Index (FFMI)</div>
            <div className="text-2xl font-bold mt-1 text-emerald-300">
              {ffmi.toFixed(1)}
            </div>
            <div className="text-xs text-emerald-200 mt-1">
              {getFfmiRating(ffmi)}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Input Parameters */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex justify-between items-center border-b pb-2">
            <h3 className="font-semibold text-slate-800 flex items-center gap-2">
              <Scale className="w-5 h-5 text-indigo-600" /> Physical Measurements
            </h3>
            <div className="flex bg-slate-100 p-1 rounded-lg text-xs font-semibold">
              <button
                onClick={() => setUnit('imperial')}
                className={`px-3 py-1 rounded-md transition ${unit === 'imperial' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-600'}`}
              >
                Imperial (lbs/in)
              </button>
              <button
                onClick={() => setUnit('metric')}
                className={`px-3 py-1 rounded-md transition ${unit === 'metric' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-600'}`}
              >
                Metric (kg/cm)
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Biological Sex</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setGender('male')}
                className={`py-2 text-xs font-semibold rounded-lg border transition ${gender === 'male' ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-slate-50 text-slate-700 hover:bg-slate-100'}`}
              >
                Male
              </button>
              <button
                onClick={() => setGender('female')}
                className={`py-2 text-xs font-semibold rounded-lg border transition ${gender === 'female' ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-slate-50 text-slate-700 hover:bg-slate-100'}`}
              >
                Female
              </button>
            </div>
          </div>

          {unit === 'imperial' ? (
            <>
              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Total Body Weight (lbs)</label>
                <input
                  type="number"
                  value={weightLbs}
                  onChange={(e) => setWeightLbs(Math.max(0, Number(e.target.value)))}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Height (Inches)</label>
                <input
                  type="number"
                  value={heightInches}
                  onChange={(e) => setHeightInches(Math.max(0, Number(e.target.value)))}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>
            </>
          ) : (
            <>
              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Total Body Weight (kg)</label>
                <input
                  type="number"
                  value={weightKg}
                  onChange={(e) => setWeightKg(Math.max(0, Number(e.target.value)))}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Height (cm)</label>
                <input
                  type="number"
                  value={heightCm}
                  onChange={(e) => setHeightCm(Math.max(0, Number(e.target.value)))}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>
            </>
          )}

          <div className="flex gap-2 pt-2">
            <button
              onClick={handleReset}
              className="flex-1 py-2 px-3 border border-slate-300 rounded-lg text-slate-700 font-medium hover:bg-slate-50 transition flex items-center justify-center gap-1 text-sm"
            >
              <RotateCcw className="w-4 h-4" /> Reset
            </button>
            <button
              onClick={handleSave}
              className="flex-1 py-2 px-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition flex items-center justify-center gap-1 text-sm"
            >
              <Save className="w-4 h-4" /> Save
            </button>
          </div>
        </div>

        {/* Clinical Formulas Breakdown */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="font-semibold text-slate-800 border-b pb-2 text-sm">
            Clinical LBM Formula Comparison
          </h3>

          <div className="space-y-3 text-xs">
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 flex justify-between items-center">
              <div>
                <div className="font-semibold text-slate-800">Boer Formula (1984)</div>
                <div className="text-slate-500">Standard clinical dosing reference</div>
              </div>
              <div className="text-sm font-bold text-indigo-700">
                {(unit === 'imperial' ? boerLbmKg * 2.20462 : boerLbmKg).toFixed(1)} {unit === 'imperial' ? 'lbs' : 'kg'}
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 flex justify-between items-center">
              <div>
                <div className="font-semibold text-slate-800">James Formula (1976)</div>
                <div className="text-slate-500">Classic anthropological formula</div>
              </div>
              <div className="text-sm font-bold text-indigo-700">
                {(unit === 'imperial' ? jamesLbmKg * 2.20462 : jamesLbmKg).toFixed(1)} {unit === 'imperial' ? 'lbs' : 'kg'}
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 flex justify-between items-center">
              <div>
                <div className="font-semibold text-slate-800">Hume Formula (1966)</div>
                <div className="text-slate-500">Widely used in pharmacological studies</div>
              </div>
              <div className="text-sm font-bold text-indigo-700">
                {(unit === 'imperial' ? humeLbmKg * 2.20462 : humeLbmKg).toFixed(1)} {unit === 'imperial' ? 'lbs' : 'kg'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
