import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';

interface Course {
  id: string;
  name: string;
  gradePoints: number;
  credits: number;
}

export const GpaCalculator: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([
    { id: '1', name: 'Mathematics 101', gradePoints: 4.0, credits: 3 },
    { id: '2', name: 'Physics II', gradePoints: 3.3, credits: 4 },
    { id: '3', name: 'World History', gradePoints: 3.7, credits: 3 },
    { id: '4', name: 'Computer Science', gradePoints: 4.0, credits: 4 },
  ]);

  const addCourse = () => {
    setCourses([
      ...courses,
      { id: Date.now().toString(), name: `Course ${courses.length + 1}`, gradePoints: 3.7, credits: 3 },
    ]);
  };

  const removeCourse = (id: string) => {
    setCourses(courses.filter((c) => c.id !== id));
  };

  const updateCourse = (id: string, field: keyof Course, val: any) => {
    setCourses(courses.map((c) => (c.id === id ? { ...c, [field]: val } : c)));
  };

  const totalCredits = courses.reduce((acc, c) => acc + c.credits, 0);
  const totalQualityPoints = courses.reduce((acc, c) => acc + c.gradePoints * c.credits, 0);
  const gpa = totalCredits > 0 ? totalQualityPoints / totalCredits : 0;

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex justify-between items-center text-xs font-bold text-slate-400 uppercase">
          <span>Course Name</span>
          <span>Grade</span>
          <span>Credits</span>
          <span></span>
        </div>

        {courses.map((c) => (
          <div key={c.id} className="grid grid-cols-12 gap-2 items-center">
            <input
              type="text"
              value={c.name}
              onChange={(e) => updateCourse(c.id, 'name', e.target.value)}
              className="col-span-5 p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium"
            />
            <select
              value={c.gradePoints}
              onChange={(e) => updateCourse(c.id, 'gradePoints', Number(e.target.value))}
              className="col-span-3 p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold"
            >
              <option value={4.0}>A (4.0)</option>
              <option value={3.7}>A- (3.7)</option>
              <option value={3.3}>B+ (3.3)</option>
              <option value={3.0}>B (3.0)</option>
              <option value={2.7}>B- (2.7)</option>
              <option value={2.3}>C+ (2.3)</option>
              <option value={2.0}>C (2.0)</option>
              <option value={1.0}>D (1.0)</option>
              <option value={0.0}>F (0.0)</option>
            </select>
            <input
              type="number"
              min={1}
              max={6}
              value={c.credits}
              onChange={(e) => updateCourse(c.id, 'credits', Number(e.target.value))}
              className="col-span-3 p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-mono text-center"
            />
            <button
              onClick={() => removeCourse(c.id)}
              className="col-span-1 p-2 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950 rounded-xl flex justify-center"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={addCourse}
        className="px-4 py-2 bg-blue-50 dark:bg-slate-800 text-blue-600 dark:text-blue-400 rounded-xl font-bold text-xs flex items-center gap-1 hover:bg-blue-100 transition"
      >
        <Plus className="w-4 h-4" /> Add Course
      </button>

      <div className="p-6 bg-slate-50 dark:bg-slate-950 rounded-3xl border border-slate-200 dark:border-slate-800 flex items-center justify-between">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Cumulative GPA (4.0 Scale)</span>
          <div className="text-4xl font-extrabold text-blue-600 font-mono mt-1">
            {gpa.toFixed(2)}
          </div>
        </div>
        <div className="text-right text-xs text-slate-500 font-mono">
          <div>Total Credits: {totalCredits}</div>
          <div>Total Quality Points: {totalQualityPoints.toFixed(1)}</div>
        </div>
      </div>
    </div>
  );
};
