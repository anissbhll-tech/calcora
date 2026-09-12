import React, { useState, useMemo, useEffect } from 'react';
import { BaseCalculatorProps } from './index';
import { CalcInput } from '../common/CalcInput';
import { CalcResultCard } from '../common/CalcResultCard';
import { safeParseNumber, formatNumber } from '../../lib/mathUtils';
import { GraduationCap, Plus, Trash2, Sparkles, Copy, Check, Target, Award, BookOpen } from 'lucide-react';

type GpaMode = 'semester' | 'cumulative' | 'final_exam';
type CourseWeight = 'regular' | 'honors' | 'ap';

interface Course {
  id: string;
  name: string;
  grade: string;
  credits: number;
  weight: CourseWeight;
}

const GRADE_POINTS: Record<string, number> = {
  'A+': 4.0,
  'A': 4.0,
  'A-': 3.7,
  'B+': 3.3,
  'B': 3.0,
  'B-': 2.7,
  'C+': 2.3,
  'C': 2.0,
  'C-': 1.7,
  'D+': 1.3,
  'D': 1.0,
  'F': 0.0,
};

const DEFAULT_COURSES: Course[] = [
  { id: '1', name: 'Calculus I / Math 101', grade: 'A', credits: 4, weight: 'regular' },
  { id: '2', name: 'University Physics II', grade: 'B+', credits: 4, weight: 'regular' },
  { id: '3', name: 'Computer Science Data Structures', grade: 'A', credits: 3, weight: 'regular' },
  { id: '4', name: 'Academic Writing & Rhetoric', grade: 'A-', credits: 3, weight: 'regular' },
  { id: '5', name: 'Introductory Economics', grade: 'B', credits: 3, weight: 'regular' },
];

export const GpaCalculator: React.FC<BaseCalculatorProps> = ({ onSaveHistory, initialPreset }) => {
  const [mode, setMode] = useState<GpaMode>('semester');

  // Semester Courses
  const [courses, setCourses] = useState<Course[]>(DEFAULT_COURSES);

  // Cumulative Target Planner
  const [currentGpa, setCurrentGpa] = useState<number>(3.35);
  const [currentCredits, setCurrentCredits] = useState<number>(45);
  const [targetGpa, setTargetGpa] = useState<number>(3.65);
  const [remainingCredits, setRemainingCredits] = useState<number>(30);

  // Final Exam Target
  const [currentGradePct, setCurrentGradePct] = useState<number>(84.5);
  const [desiredGradePct, setDesiredGradePct] = useState<number>(90.0);
  const [finalExamWeightPct, setFinalExamWeightPct] = useState<number>(25.0);

  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  useEffect(() => {
    if (initialPreset) {
      if (initialPreset.mode) setMode(initialPreset.mode);
      if (initialPreset.currentGpa !== undefined) setCurrentGpa(initialPreset.currentGpa);
      if (initialPreset.targetGpa !== undefined) setTargetGpa(initialPreset.targetGpa);
    }
  }, [initialPreset]);

  // Semester GPA Calculation
  const semesterResults = useMemo(() => {
    let totalCredits = 0;
    let totalUnweightedPoints = 0;
    let totalWeightedPoints = 0;

    courses.forEach((c) => {
      const cr = Math.max(0, safeParseNumber(c.credits, 0));
      const basePoints = GRADE_POINTS[c.grade] ?? 4.0;
      let weightBonus = 0;
      if (c.weight === 'honors') weightBonus = 0.5;
      if (c.weight === 'ap') weightBonus = 1.0;

      totalCredits += cr;
      totalUnweightedPoints += basePoints * cr;
      totalWeightedPoints += (basePoints + (basePoints > 0 ? weightBonus : 0)) * cr;
    });

    const unweightedGpa = totalCredits > 0 ? totalUnweightedPoints / totalCredits : 0;
    const weightedGpa = totalCredits > 0 ? totalWeightedPoints / totalCredits : 0;

    // Academic Honor
    let honors = 'Good Standing';
    if (unweightedGpa >= 3.9) honors = 'Summa Cum Laude (Highest Honors)';
    else if (unweightedGpa >= 3.7) honors = 'Magna Cum Laude (High Honors)';
    else if (unweightedGpa >= 3.5) honors = 'Dean\'s List / Cum Laude (Honors)';
    else if (unweightedGpa < 2.0) honors = 'Academic Warning / Probation';

    return {
      unweightedGpa,
      weightedGpa,
      totalCredits,
      totalQualityPoints: totalUnweightedPoints,
      honors,
    };
  }, [courses]);

  // Cumulative GPA Target Calculation
  const cumulativeResults = useMemo(() => {
    const curGpa = Math.max(0, Math.min(4, safeParseNumber(currentGpa, 0)));
    const curCr = Math.max(0, safeParseNumber(currentCredits, 0));
    const tgtGpa = Math.max(0, Math.min(4, safeParseNumber(targetGpa, 0)));
    const remCr = Math.max(1, safeParseNumber(remainingCredits, 1));

    const currentTotalPoints = curGpa * curCr;
    const finalTotalCredits = curCr + remCr;
    const targetTotalPoints = tgtGpa * finalTotalCredits;
    const neededPoints = targetTotalPoints - currentTotalPoints;
    const requiredFutureGpa = neededPoints / remCr;

    const isPossible = requiredFutureGpa <= 4.0 && requiredFutureGpa >= 0;

    return {
      requiredFutureGpa,
      isPossible,
      finalTotalCredits,
      neededPoints,
    };
  }, [currentGpa, currentCredits, targetGpa, remainingCredits]);

  // Final Exam Target Calculation
  const finalExamResults = useMemo(() => {
    const cur = safeParseNumber(currentGradePct, 0);
    const des = safeParseNumber(desiredGradePct, 0);
    const weight = Math.max(1, Math.min(99, safeParseNumber(finalExamWeightPct, 25)));

    // Desired = Cur * (1 - w) + Exam * w  => Exam = (Desired - Cur*(1-w)) / w
    const weightDec = weight / 100;
    const currentWeightDec = 1 - weightDec;
    const requiredScore = (des - cur * currentWeightDec) / weightDec;

    return {
      requiredScore,
      isAchievable: requiredScore <= 100,
      weight,
    };
  }, [currentGradePct, desiredGradePct, finalExamWeightPct]);

  const addCourse = () => {
    setCourses([
      ...courses,
      {
        id: Date.now().toString(),
        name: `Elective Course ${courses.length + 1}`,
        grade: 'A',
        credits: 3,
        weight: 'regular',
      },
    ]);
  };

  const removeCourse = (id: string) => {
    if (courses.length <= 1) return;
    setCourses(courses.filter((c) => c.id !== id));
  };

  const updateCourse = (id: string, field: keyof Course, val: any) => {
    setCourses(courses.map((c) => (c.id === id ? { ...c, [field]: val } : c)));
  };

  const copyVal = (val: string, key: string) => {
    navigator.clipboard.writeText(val);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Mode Selector Tabs */}
      <div className="flex flex-wrap gap-1.5 p-1.5 bg-slate-100 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700">
        <button
          type="button"
          onClick={() => setMode('semester')}
          className={`py-2 px-3 rounded-xl text-xs font-bold transition flex-1 min-w-[130px] text-center ${
            mode === 'semester'
              ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm border border-slate-200/60 dark:border-slate-700'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          Semester / Coursework GPA
        </button>

        <button
          type="button"
          onClick={() => setMode('cumulative')}
          className={`py-2 px-3 rounded-xl text-xs font-bold transition flex-1 min-w-[130px] text-center ${
            mode === 'cumulative'
              ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-sm border border-slate-200/60 dark:border-slate-700'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          Target Cumulative GPA Planner
        </button>

        <button
          type="button"
          onClick={() => setMode('final_exam')}
          className={`py-2 px-3 rounded-xl text-xs font-bold transition flex-1 min-w-[130px] text-center ${
            mode === 'final_exam'
              ? 'bg-white dark:bg-slate-900 text-purple-600 dark:text-purple-400 shadow-sm border border-slate-200/60 dark:border-slate-700'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          Final Exam Grade Target
        </button>
      </div>

      {/* Mode 1: Semester GPA */}
      {mode === 'semester' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-blue-500" />
                Course Schedule &amp; Grades
              </h3>
              <button
                type="button"
                onClick={addCourse}
                className="px-3 py-1.5 bg-blue-50 dark:bg-slate-800 text-blue-600 dark:text-blue-400 rounded-xl font-bold text-xs flex items-center gap-1 hover:bg-blue-100 transition border border-blue-200 dark:border-slate-700"
              >
                <Plus className="w-3.5 h-3.5" /> Add Course
              </button>
            </div>

            {/* Course Table Header */}
            <div className="hidden sm:grid sm:grid-cols-12 gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider px-2">
              <span className="col-span-5">Course Title</span>
              <span className="col-span-2">Letter Grade</span>
              <span className="col-span-2 text-center">Credit Hours</span>
              <span className="col-span-2">Level / Weight</span>
              <span className="col-span-1 text-center">Action</span>
            </div>

            {/* Courses Rows */}
            <div className="space-y-2.5">
              {courses.map((c) => (
                <div
                  key={c.id}
                  className="grid grid-cols-1 sm:grid-cols-12 gap-2 items-center p-2.5 sm:p-2 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/80 dark:border-slate-700"
                >
                  <input
                    type="text"
                    value={c.name}
                    onChange={(e) => updateCourse(c.id, 'name', e.target.value)}
                    placeholder="Course name"
                    className="sm:col-span-5 p-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold"
                  />

                  <select
                    value={c.grade}
                    onChange={(e) => updateCourse(c.id, 'grade', e.target.value)}
                    className="sm:col-span-2 p-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-800 dark:text-slate-200"
                  >
                    {Object.keys(GRADE_POINTS).map((g) => (
                      <option key={g} value={g}>
                        {g} ({GRADE_POINTS[g].toFixed(1)})
                      </option>
                    ))}
                  </select>

                  <input
                    type="number"
                    min={0.5}
                    max={12}
                    step={0.5}
                    value={c.credits}
                    onChange={(e) => updateCourse(c.id, 'credits', Number(e.target.value))}
                    className="sm:col-span-2 p-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-mono text-center font-bold"
                  />

                  <select
                    value={c.weight}
                    onChange={(e) => updateCourse(c.id, 'weight', e.target.value as CourseWeight)}
                    className="sm:col-span-2 p-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold"
                  >
                    <option value="regular">Regular (4.0)</option>
                    <option value="honors">Honors (+0.5)</option>
                    <option value="ap">AP / IB (+1.0)</option>
                  </select>

                  <div className="sm:col-span-1 flex justify-center">
                    <button
                      type="button"
                      onClick={() => removeCourse(c.id)}
                      disabled={courses.length <= 1}
                      className="p-2 text-slate-400 hover:text-rose-500 rounded-lg transition disabled:opacity-30"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Results Summary Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <CalcResultCard
              title="Unweighted GPA (4.0)"
              value={formatNumber(semesterResults.unweightedGpa, 2)}
              subtitle={semesterResults.honors}
              highlighted={true}
            />

            <CalcResultCard
              title="Weighted GPA (5.0 Max)"
              value={formatNumber(semesterResults.weightedGpa, 2)}
              subtitle="Includes Honors / AP scale"
            />

            <CalcResultCard
              title="Total Credit Hours"
              value={`${semesterResults.totalCredits} Credits`}
              subtitle={`${courses.length} courses enrolled`}
            />

            <CalcResultCard
              title="Quality Points"
              value={formatNumber(semesterResults.totalQualityPoints, 1)}
              subtitle="Sum of (Credits × Grade)"
            />
          </div>
        </div>
      )}

      {/* Mode 2: Target Cumulative GPA Planner */}
      {mode === 'cumulative' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-6 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Target className="w-4 h-4 text-emerald-500" />
                Current Record &amp; Target Goal
              </h3>

              <div className="grid grid-cols-2 gap-3">
                <CalcInput
                  id="currentGpa"
                  label="Current Cumulative GPA"
                  value={currentGpa}
                  onChange={setCurrentGpa}
                  min={0}
                  max={4.0}
                  step={0.01}
                />
                <CalcInput
                  id="currentCredits"
                  label="Completed Credits"
                  value={currentCredits}
                  onChange={setCurrentCredits}
                  min={0}
                  step={1}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <CalcInput
                  id="targetGpa"
                  label="Target Cumulative GPA"
                  value={targetGpa}
                  onChange={setTargetGpa}
                  min={0}
                  max={4.0}
                  step={0.01}
                />
                <CalcInput
                  id="remainingCredits"
                  label="Remaining Future Credits"
                  value={remainingCredits}
                  onChange={setRemainingCredits}
                  min={1}
                  step={1}
                />
              </div>
            </div>

            <div className="lg:col-span-6 bg-slate-50 dark:bg-slate-900/50 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 flex flex-col justify-between space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Required Average Future GPA
                </span>
                <div
                  className={`text-4xl sm:text-5xl font-black font-mono ${
                    cumulativeResults.isPossible
                      ? 'text-emerald-600 dark:text-emerald-400'
                      : 'text-rose-600 dark:text-rose-400'
                  }`}
                >
                  {formatNumber(cumulativeResults.requiredFutureGpa, 2)}
                </div>

                <div className="text-xs font-bold">
                  {cumulativeResults.isPossible ? (
                    <span className="text-emerald-600 dark:text-emerald-400">
                      ✓ Achievable target across your remaining {remainingCredits} credits.
                    </span>
                  ) : (
                    <span className="text-rose-600 dark:text-rose-400">
                      ⚠ Mathematically unattainable (exceeds maximum 4.00 standard scale).
                    </span>
                  )}
                </div>
              </div>

              <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs font-mono space-y-1">
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span>Total Graduation Credits:</span>
                  <strong className="text-slate-900 dark:text-white">{cumulativeResults.finalTotalCredits} credits</strong>
                </div>
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span>Additional Quality Points Needed:</span>
                  <strong className="text-slate-900 dark:text-white">
                    {formatNumber(cumulativeResults.neededPoints, 1)} pts
                  </strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mode 3: Final Exam Target */}
      {mode === 'final_exam' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-6 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Award className="w-4 h-4 text-purple-500" />
                Course Standing &amp; Exam Weight
              </h3>

              <CalcInput
                id="currentGradePct"
                label="Current Course Grade (%)"
                value={currentGradePct}
                onChange={setCurrentGradePct}
                min={0}
                max={100}
                step={0.5}
                suffix="%"
              />

              <div className="grid grid-cols-2 gap-3">
                <CalcInput
                  id="desiredGradePct"
                  label="Target Overall Grade (%)"
                  value={desiredGradePct}
                  onChange={setDesiredGradePct}
                  min={0}
                  max={100}
                  step={0.5}
                  suffix="%"
                />
                <CalcInput
                  id="finalExamWeightPct"
                  label="Final Exam Weight (%)"
                  value={finalExamWeightPct}
                  onChange={setFinalExamWeightPct}
                  min={1}
                  max={99}
                  step={1}
                  suffix="%"
                />
              </div>
            </div>

            <div className="lg:col-span-6 bg-slate-50 dark:bg-slate-900/50 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 flex flex-col justify-between space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Required Final Exam Score
                </span>
                <div
                  className={`text-4xl sm:text-5xl font-black font-mono ${
                    finalExamResults.isAchievable
                      ? 'text-purple-600 dark:text-purple-400'
                      : 'text-rose-600 dark:text-rose-400'
                  }`}
                >
                  {formatNumber(finalExamResults.requiredScore, 1)}%
                </div>

                <div className="text-xs font-bold">
                  {finalExamResults.isAchievable ? (
                    <span className="text-purple-600 dark:text-purple-400">
                      You need at least {formatNumber(finalExamResults.requiredScore, 1)}% on the final to get your desired {desiredGradePct}% grade.
                    </span>
                  ) : (
                    <span className="text-rose-600 dark:text-rose-400">
                      Requires over 100% (requires extra credit to reach target).
                    </span>
                  )}
                </div>
              </div>

              <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs font-mono space-y-1">
                <div className="text-slate-500">
                  Formula: Final Score = [Target% − Current% × (100% − Weight%)] / Weight%
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
