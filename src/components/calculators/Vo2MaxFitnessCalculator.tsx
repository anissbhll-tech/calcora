import React, { useState, useMemo } from 'react';
import { CalcInput } from '../common/CalcInput';
import { CalcResultCard } from '../common/CalcResultCard';
import { safeParseNumber, formatNumber } from '../../lib/mathUtils';
import { Activity, Heart, Award, ShieldCheck, Flame, Zap, ArrowUpRight, Gauge, CheckCircle2 } from 'lucide-react';

interface Props {
  onSaveHistory?: (summary: string, inputs: Record<string, any>, results: Record<string, any>) => void;
  resetSignal?: number;
}

type Vo2Protocol = 'cooper' | 'hr_ratio' | 'rockport_walk' | 'run_1_5';
type Gender = 'male' | 'female';

export const Vo2MaxFitnessCalculator: React.FC<Props> = ({ onSaveHistory }) => {
  const [protocol, setProtocol] = useState<Vo2Protocol>('cooper');
  const [gender, setGender] = useState<Gender>('male');
  const [age, setAge] = useState<number>(30);
  const [weightLbs, setWeightLbs] = useState<number>(170);

  // Cooper 12-min Run parameters
  const [cooperDistanceMeters, setCooperDistanceMeters] = useState<number>(2600); // 2.6 km

  // Heart Rate Ratio parameters
  const [restingHeartRate, setRestingHeartRate] = useState<number>(60);
  const [maxHeartRate, setMaxHeartRate] = useState<number>(190);

  // Rockport 1-mile walk parameters
  const [walkMinutes, setWalkMinutes] = useState<number>(14);
  const [walkSeconds, setWalkSeconds] = useState<number>(30);
  const [postWalkHeartRate, setPostWalkHeartRate] = useState<number>(130);

  // 1.5-mile run parameters
  const [run15Minutes, setRun15Minutes] = useState<number>(11);
  const [run15Seconds, setRun15Seconds] = useState<number>(15);

  const calculation = useMemo(() => {
    const ageVal = Math.max(15, Math.min(95, safeParseNumber(age, 30)));
    const wtLbs = Math.max(70, Math.min(500, safeParseNumber(weightLbs, 170)));
    const wtKg = wtLbs * 0.45359237;
    const isMale = gender === 'male' ? 1 : 0;

    let estimatedVo2Max = 0;
    let protocolName = '';

    if (protocol === 'cooper') {
      protocolName = 'Cooper 12-Minute Run Test';
      const dist = Math.max(500, safeParseNumber(cooperDistanceMeters, 2400));
      // Formula: (Distance in meters - 504.9) / 44.73
      estimatedVo2Max = (dist - 504.9) / 44.73;
    } else if (protocol === 'hr_ratio') {
      protocolName = 'Uth-Sørensen Heart Rate Ratio';
      const hrRest = Math.max(35, Math.min(120, safeParseNumber(restingHeartRate, 60)));
      const hrMax = Math.max(120, Math.min(230, safeParseNumber(maxHeartRate, 208 - 0.7 * ageVal)));
      // Formula: 15.3 * (HRmax / HRrest)
      estimatedVo2Max = 15.3 * (hrMax / hrRest);
    } else if (protocol === 'rockport_walk') {
      protocolName = 'Rockport 1-Mile Walk Test';
      const totalTimeMin = safeParseNumber(walkMinutes, 15) + safeParseNumber(walkSeconds, 0) / 60;
      const hrPost = Math.max(60, safeParseNumber(postWalkHeartRate, 130));
      // Formula: 132.853 - (0.0769 * wtLbs) - (0.3877 * age) + (6.315 * gender) - (3.2649 * timeMin) - (0.1565 * hrPost)
      estimatedVo2Max =
        132.853 -
        0.0769 * wtLbs -
        0.3877 * ageVal +
        6.315 * isMale -
        3.2649 * totalTimeMin -
        0.1565 * hrPost;
    } else if (protocol === 'run_1_5') {
      protocolName = 'George 1.5-Mile Run Test';
      const totalTimeMin = safeParseNumber(run15Minutes, 11) + safeParseNumber(run15Seconds, 0) / 60;
      // Formula: 88.02 - (0.1656 * wtKg) - (2.76 * timeMin) + (3.716 * gender)
      estimatedVo2Max = 88.02 - 0.1656 * wtKg - 2.76 * totalTimeMin + 3.716 * isMale;
    }

    estimatedVo2Max = Math.max(10, Math.min(95, Number(estimatedVo2Max.toFixed(1))));

    // ACSM / Cooper Institute Normative Percentile Evaluation
    // Standards based on age cohort and sex
    let fitnessRating: 'Superior' | 'Excellent' | 'Good' | 'Fair' | 'Poor' | 'Very Poor' = 'Fair';
    let ratingBadgeClass = '';
    let percentileEstimate = 50;

    // Male thresholds for 20-29 / 30-39 / 40-49 / 50-59 / 60+
    if (gender === 'male') {
      if (ageVal < 30) {
        if (estimatedVo2Max >= 52.5) { fitnessRating = 'Superior'; percentileEstimate = 95; }
        else if (estimatedVo2Max >= 46.5) { fitnessRating = 'Excellent'; percentileEstimate = 80; }
        else if (estimatedVo2Max >= 42.5) { fitnessRating = 'Good'; percentileEstimate = 60; }
        else if (estimatedVo2Max >= 38.0) { fitnessRating = 'Fair'; percentileEstimate = 40; }
        else { fitnessRating = 'Poor'; percentileEstimate = 20; }
      } else if (ageVal < 40) {
        if (estimatedVo2Max >= 50.0) { fitnessRating = 'Superior'; percentileEstimate = 95; }
        else if (estimatedVo2Max >= 44.0) { fitnessRating = 'Excellent'; percentileEstimate = 80; }
        else if (estimatedVo2Max >= 40.0) { fitnessRating = 'Good'; percentileEstimate = 60; }
        else if (estimatedVo2Max >= 35.5) { fitnessRating = 'Fair'; percentileEstimate = 40; }
        else { fitnessRating = 'Poor'; percentileEstimate = 20; }
      } else if (ageVal < 50) {
        if (estimatedVo2Max >= 47.0) { fitnessRating = 'Superior'; percentileEstimate = 95; }
        else if (estimatedVo2Max >= 41.0) { fitnessRating = 'Excellent'; percentileEstimate = 80; }
        else if (estimatedVo2Max >= 37.0) { fitnessRating = 'Good'; percentileEstimate = 60; }
        else if (estimatedVo2Max >= 32.5) { fitnessRating = 'Fair'; percentileEstimate = 40; }
        else { fitnessRating = 'Poor'; percentileEstimate = 20; }
      } else {
        if (estimatedVo2Max >= 43.5) { fitnessRating = 'Superior'; percentileEstimate = 95; }
        else if (estimatedVo2Max >= 37.5) { fitnessRating = 'Excellent'; percentileEstimate = 80; }
        else if (estimatedVo2Max >= 33.5) { fitnessRating = 'Good'; percentileEstimate = 60; }
        else if (estimatedVo2Max >= 29.5) { fitnessRating = 'Fair'; percentileEstimate = 40; }
        else { fitnessRating = 'Poor'; percentileEstimate = 20; }
      }
    } else {
      // Female thresholds
      if (ageVal < 30) {
        if (estimatedVo2Max >= 44.0) { fitnessRating = 'Superior'; percentileEstimate = 95; }
        else if (estimatedVo2Max >= 38.5) { fitnessRating = 'Excellent'; percentileEstimate = 80; }
        else if (estimatedVo2Max >= 34.5) { fitnessRating = 'Good'; percentileEstimate = 60; }
        else if (estimatedVo2Max >= 31.0) { fitnessRating = 'Fair'; percentileEstimate = 40; }
        else { fitnessRating = 'Poor'; percentileEstimate = 20; }
      } else if (ageVal < 40) {
        if (estimatedVo2Max >= 41.5) { fitnessRating = 'Superior'; percentileEstimate = 95; }
        else if (estimatedVo2Max >= 36.0) { fitnessRating = 'Excellent'; percentileEstimate = 80; }
        else if (estimatedVo2Max >= 32.5) { fitnessRating = 'Good'; percentileEstimate = 60; }
        else if (estimatedVo2Max >= 28.5) { fitnessRating = 'Fair'; percentileEstimate = 40; }
        else { fitnessRating = 'Poor'; percentileEstimate = 20; }
      } else if (ageVal < 50) {
        if (estimatedVo2Max >= 39.0) { fitnessRating = 'Superior'; percentileEstimate = 95; }
        else if (estimatedVo2Max >= 33.5) { fitnessRating = 'Excellent'; percentileEstimate = 80; }
        else if (estimatedVo2Max >= 30.0) { fitnessRating = 'Good'; percentileEstimate = 60; }
        else if (estimatedVo2Max >= 26.5) { fitnessRating = 'Fair'; percentileEstimate = 40; }
        else { fitnessRating = 'Poor'; percentileEstimate = 20; }
      } else {
        if (estimatedVo2Max >= 35.5) { fitnessRating = 'Superior'; percentileEstimate = 95; }
        else if (estimatedVo2Max >= 30.0) { fitnessRating = 'Excellent'; percentileEstimate = 80; }
        else if (estimatedVo2Max >= 26.5) { fitnessRating = 'Good'; percentileEstimate = 60; }
        else if (estimatedVo2Max >= 23.5) { fitnessRating = 'Fair'; percentileEstimate = 40; }
        else { fitnessRating = 'Poor'; percentileEstimate = 20; }
      }
    }

    if (fitnessRating === 'Superior' || fitnessRating === 'Excellent') {
      ratingBadgeClass = 'text-emerald-700 bg-emerald-50 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800';
    } else if (fitnessRating === 'Good') {
      ratingBadgeClass = 'text-teal-700 bg-teal-50 border-teal-200 dark:bg-teal-950/40 dark:text-teal-300 dark:border-teal-800';
    } else if (fitnessRating === 'Fair') {
      ratingBadgeClass = 'text-amber-700 bg-amber-50 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800';
    } else {
      ratingBadgeClass = 'text-rose-700 bg-rose-50 border-rose-200 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-800';
    }

    // Tanaka Max Heart Rate
    const tanakaMaxHr = Math.round(208 - 0.7 * ageVal);

    // Heart Rate Training Zones (Karvonen / % Max HR)
    const hrZones = [
      { name: 'Zone 1: Active Recovery', pct: '50% - 60%', minHr: Math.round(tanakaMaxHr * 0.50), maxHr: Math.round(tanakaMaxHr * 0.60), purpose: 'Warm-up, cooldown, active tissue regeneration' },
      { name: 'Zone 2: Aerobic Base (FatMax)', pct: '60% - 70%', minHr: Math.round(tanakaMaxHr * 0.60), maxHr: Math.round(tanakaMaxHr * 0.70), purpose: 'Mitochondrial density, fat oxidation, endurance capacity' },
      { name: 'Zone 3: Aerobic Tempo', pct: '70% - 80%', minHr: Math.round(tanakaMaxHr * 0.70), maxHr: Math.round(tanakaMaxHr * 0.80), purpose: 'Glycogen efficiency and sustained aerobic speed' },
      { name: 'Zone 4: Lactate Threshold', pct: '80% - 90%', minHr: Math.round(tanakaMaxHr * 0.80), maxHr: Math.round(tanakaMaxHr * 0.90), purpose: 'Lactate clearance, high-intensity threshold pacing' },
      { name: 'Zone 5: VO2 Max Peak', pct: '90% - 100%', minHr: Math.round(tanakaMaxHr * 0.90), maxHr: tanakaMaxHr, purpose: 'Maximal oxygen uptake and neuromuscular speed' },
    ];

    // Estimated 5K finish time based on VO2 Max (Daniels VDOT regression approximation)
    // t_5k_min approx = 1600 / VO2Max
    const est5kMin = Number((1120 / (estimatedVo2Max - 5)).toFixed(1));

    return {
      estimatedVo2Max,
      protocolName,
      fitnessRating,
      ratingBadgeClass,
      percentileEstimate,
      tanakaMaxHr,
      hrZones,
      est5kMin,
    };
  }, [
    protocol,
    gender,
    age,
    weightLbs,
    cooperDistanceMeters,
    restingHeartRate,
    maxHeartRate,
    walkMinutes,
    walkSeconds,
    postWalkHeartRate,
    run15Minutes,
    run15Seconds,
  ]);

  const handleSave = () => {
    if (onSaveHistory) {
      onSaveHistory(
        `VO2 Max: ${calculation.estimatedVo2Max} ml/kg/min (${calculation.fitnessRating} - Top ${100 - calculation.percentileEstimate}%) via ${calculation.protocolName}`,
        {
          protocol,
          gender,
          age,
          weightLbs,
        },
        {
          vo2Max: calculation.estimatedVo2Max,
          fitnessRating: calculation.fitnessRating,
          maxHeartRate: calculation.tanakaMaxHr,
        }
      );
    }
  };

  return (
    <div className="space-y-8">
      {/* Highlight Header Banner */}
      <div className="bg-gradient-to-r from-teal-50 to-emerald-50 dark:from-teal-950/30 dark:to-emerald-950/30 p-5 rounded-2xl border border-teal-200 dark:border-teal-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-teal-600 dark:text-teal-400" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Cardiorespiratory Fitness &amp; VO2 Max Assessment
            </h3>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300">
            Estimated VO2 Max:{' '}
            <strong className="text-teal-700 dark:text-teal-300 font-bold font-mono text-sm">
              {calculation.estimatedVo2Max} mL/kg/min
            </strong>{' '}
            — Classified as{' '}
            <strong className="font-bold">{calculation.fitnessRating}</strong> (Top{' '}
            {100 - calculation.percentileEstimate}% of {age}-year-old {gender} cohort).
          </p>
        </div>

        <div className={`px-4 py-2.5 rounded-xl border text-xs font-bold shrink-0 ${calculation.ratingBadgeClass}`}>
          <div className="text-[10px] uppercase tracking-wider opacity-75">Cardio Cohort Rating</div>
          <div className="text-base font-black">{calculation.fitnessRating}</div>
        </div>
      </div>

      {/* Protocol Selection & Demographics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
        {/* Left: Test Protocol Selection */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
            <Gauge className="w-4 h-4 text-teal-600 dark:text-teal-400" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Testing Protocol &amp; Demographics
            </h4>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Select Testing Protocol
            </label>
            <div className="grid grid-cols-2 gap-2 bg-white dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
              <button
                type="button"
                onClick={() => setProtocol('cooper')}
                className={`py-2 rounded-lg text-xs font-bold transition-all ${
                  protocol === 'cooper'
                    ? 'bg-teal-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                Cooper 12-Min Run
              </button>
              <button
                type="button"
                onClick={() => setProtocol('hr_ratio')}
                className={`py-2 rounded-lg text-xs font-bold transition-all ${
                  protocol === 'hr_ratio'
                    ? 'bg-teal-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                Resting Heart Rate
              </button>
              <button
                type="button"
                onClick={() => setProtocol('rockport_walk')}
                className={`py-2 rounded-lg text-xs font-bold transition-all ${
                  protocol === 'rockport_walk'
                    ? 'bg-teal-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                Rockport 1-Mi Walk
              </button>
              <button
                type="button"
                onClick={() => setProtocol('run_1_5')}
                className={`py-2 rounded-lg text-xs font-bold transition-all ${
                  protocol === 'run_1_5'
                    ? 'bg-teal-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                1.5-Mile Timed Run
              </button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Sex
              </label>
              <div className="grid grid-cols-2 gap-1 bg-white dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
                <button
                  type="button"
                  onClick={() => setGender('male')}
                  className={`py-1.5 rounded-lg text-xs font-bold transition-all ${
                    gender === 'male' ? 'bg-teal-600 text-white' : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  M
                </button>
                <button
                  type="button"
                  onClick={() => setGender('female')}
                  className={`py-1.5 rounded-lg text-xs font-bold transition-all ${
                    gender === 'female' ? 'bg-teal-600 text-white' : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  F
                </button>
              </div>
            </div>

            <CalcInput
              id="age"
              label="Age"
              value={age}
              onChange={(val) => setAge(val)}
              min={15}
              max={95}
              step={1}
              suffix="yrs"
            />

            <CalcInput
              id="weightLbs"
              label="Weight"
              value={weightLbs}
              onChange={(val) => setWeightLbs(val)}
              min={70}
              max={400}
              step={1}
              suffix="lbs"
            />
          </div>
        </div>

        {/* Right: Protocol-Specific Test Inputs */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
            <Heart className="w-4 h-4 text-rose-500" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Protocol Test Performance Inputs
            </h4>
          </div>

          {protocol === 'cooper' && (
            <div className="space-y-3">
              <CalcInput
                id="cooperDistanceMeters"
                label="12-Minute Maximum Run Distance"
                value={cooperDistanceMeters}
                onChange={(val) => setCooperDistanceMeters(val)}
                min={500}
                max={5000}
                step={50}
                suffix="meters"
                helpText={`Equivalent to ${(cooperDistanceMeters / 1000).toFixed(2)} km or ${(cooperDistanceMeters / 1609.34).toFixed(2)} miles in 12 min.`}
              />
            </div>
          )}

          {protocol === 'hr_ratio' && (
            <div className="grid grid-cols-2 gap-3">
              <CalcInput
                id="restingHeartRate"
                label="Resting Heart Rate (BPM)"
                value={restingHeartRate}
                onChange={(val) => setRestingHeartRate(val)}
                min={35}
                max={120}
                step={1}
                suffix="bpm"
                helpText="Measured upon waking up in bed."
              />
              <CalcInput
                id="maxHeartRate"
                label="Max Heart Rate (BPM)"
                value={maxHeartRate}
                onChange={(val) => setMaxHeartRate(val)}
                min={120}
                max={230}
                step={1}
                suffix="bpm"
                helpText={`Formula estimate: ${calculation.tanakaMaxHr} bpm`}
              />
            </div>
          )}

          {protocol === 'rockport_walk' && (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <CalcInput
                  id="walkMinutes"
                  label="Walk Time (Minutes)"
                  value={walkMinutes}
                  onChange={(val) => setWalkMinutes(val)}
                  min={8}
                  max={30}
                  step={1}
                  suffix="min"
                />
                <CalcInput
                  id="walkSeconds"
                  label="Walk Time (Seconds)"
                  value={walkSeconds}
                  onChange={(val) => setWalkSeconds(val)}
                  min={0}
                  max={59}
                  step={1}
                  suffix="sec"
                />
              </div>
              <CalcInput
                id="postWalkHeartRate"
                label="Heart Rate Immediately at 1-Mile Finish"
                value={postWalkHeartRate}
                onChange={(val) => setPostWalkHeartRate(val)}
                min={60}
                max={220}
                step={1}
                suffix="bpm"
              />
            </div>
          )}

          {protocol === 'run_1_5' && (
            <div className="grid grid-cols-2 gap-3">
              <CalcInput
                id="run15Minutes"
                label="1.5-Mile Time (Minutes)"
                value={run15Minutes}
                onChange={(val) => setRun15Minutes(val)}
                min={6}
                max={30}
                step={1}
                suffix="min"
              />
              <CalcInput
                id="run15Seconds"
                label="1.5-Mile Time (Seconds)"
                value={run15Seconds}
                onChange={(val) => setRun15Seconds(val)}
                min={0}
                max={59}
                step={1}
                suffix="sec"
              />
            </div>
          )}
        </div>
      </div>

      {/* Main KPI Result Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <CalcResultCard
          title="Estimated VO2 Max"
          value={`${calculation.estimatedVo2Max} mL/kg/min`}
          subtitle={`Protocol: ${calculation.protocolName}`}
          highlighted={true}
          icon={<Activity className="w-5 h-5 text-teal-600 dark:text-teal-400" />}
        />

        <CalcResultCard
          title="Fitness Classification"
          value={calculation.fitnessRating}
          subtitle={`Top ${100 - calculation.percentileEstimate}% of age/sex peers`}
          icon={<Award className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />}
        />

        <CalcResultCard
          title="Max Heart Rate (Tanaka)"
          value={`${calculation.tanakaMaxHr} BPM`}
          subtitle="208 - (0.7 × Age) physiological standard"
          icon={<Heart className="w-5 h-5 text-rose-500" />}
        />

        <CalcResultCard
          title="Estimated 5K Potential"
          value={`~${calculation.est5kMin} min`}
          subtitle="Aerobic capacity race projection"
          icon={<Flame className="w-5 h-5 text-amber-500" />}
        />
      </div>

      {/* Heart Rate Training Zones Matrix */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Heart className="w-4 h-4 text-rose-500" />
          Personalized 5-Zone Cardiovascular Training Matrix
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400">
                <th className="py-2.5 px-3 font-semibold">Training Zone</th>
                <th className="py-2.5 px-3 font-semibold">% Max HR</th>
                <th className="py-2.5 px-3 font-semibold">Target Heart Rate</th>
                <th className="py-2.5 px-3 font-semibold">Primary Physiological Adaptation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {calculation.hrZones.map((zone, idx) => (
                <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                  <td className="py-2.5 px-3 font-bold text-slate-900 dark:text-white">
                    {zone.name}
                  </td>
                  <td className="py-2.5 px-3 font-mono text-slate-600 dark:text-slate-400">
                    {zone.pct}
                  </td>
                  <td className="py-2.5 px-3 font-mono font-bold text-teal-600 dark:text-teal-400">
                    {zone.minHr} - {zone.maxHr} BPM
                  </td>
                  <td className="py-2.5 px-3 text-slate-600 dark:text-slate-300">
                    {zone.purpose}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
