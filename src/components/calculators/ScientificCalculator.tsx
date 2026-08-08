import React, { useState } from 'react';
import { CalculationHistoryItem } from '../../types';

interface ScientificCalculatorProps {
  onAddHistory: (item: Omit<CalculationHistoryItem, 'id' | 'timestamp'>) => void;
}

export const ScientificCalculator: React.FC<ScientificCalculatorProps> = ({ onAddHistory }) => {
  const [display, setDisplay] = useState<string>('0');
  const [equation, setEquation] = useState<string>('');
  const [isRad, setIsRad] = useState<boolean>(true);
  const [memory, setMemory] = useState<number>(0);
  const [historyStack, setHistoryStack] = useState<string[]>([]);

  const handleNum = (n: string) => {
    if (display === '0' || display === 'Error') {
      setDisplay(n);
    } else {
      setDisplay(display + n);
    }
  };

  const handleOp = (op: string) => {
    setEquation(equation + ' ' + display + ' ' + op);
    setDisplay('0');
  };

  const handleClear = () => {
    setDisplay('0');
    setEquation('');
  };

  const handleEvaluate = () => {
    try {
      let fullExpr = equation + ' ' + display;
      
      // Clean display expression for eval
      let evalExpr = fullExpr
        .replace(/×/g, '*')
        .replace(/÷/g, '/')
        .replace(/π/g, 'Math.PI')
        .replace(/e/g, 'Math.E')
        .replace(/sin\(/g, isRad ? 'Math.sin(' : 'Math.sin((Math.PI/180)*')
        .replace(/cos\(/g, isRad ? 'Math.cos(' : 'Math.cos((Math.PI/180)*')
        .replace(/tan\(/g, isRad ? 'Math.tan(' : 'Math.tan((Math.PI/180)*')
        .replace(/log\(/g, 'Math.log10(')
        .replace(/ln\(/g, 'Math.log(')
        .replace(/√\(/g, 'Math.sqrt(');

      // Safe JS evaluation
      const result = Function(`"use strict"; return (${evalExpr})`)();
      const roundedResult = Number.isInteger(result) ? result.toString() : parseFloat(result.toFixed(8)).toString();

      const calcString = `${fullExpr} = ${roundedResult}`;
      setHistoryStack((prev) => [calcString, ...prev.slice(0, 9)]);
      setDisplay(roundedResult);
      setEquation('');

      onAddHistory({
        calculatorId: 'scientific',
        calculatorTitle: 'Scientific Calculator',
        summaryText: calcString,
        inputs: { fullExpr },
        results: { result: roundedResult },
      });
    } catch (err) {
      setDisplay('Error');
    }
  };

  const handleFunc = (funcName: string) => {
    if (funcName === 'sqrt') {
      setDisplay(`√(${display})`);
    } else if (['sin', 'cos', 'tan', 'log', 'ln'].includes(funcName)) {
      setDisplay(`${funcName}(${display})`);
    } else if (funcName === 'square') {
      setDisplay(`(${display})^2`);
    } else if (funcName === 'factorial') {
      const num = parseInt(display);
      if (!isNaN(num) && num >= 0 && num <= 100) {
        let f = 1;
        for (let i = 2; i <= num; i++) f *= i;
        setDisplay(f.toString());
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      
      {/* Display Screen */}
      <div className="p-4 bg-slate-900 text-white rounded-3xl border border-slate-800 space-y-1 shadow-inner font-mono">
        <div className="flex justify-between text-xs text-slate-400 h-5">
          <span>{isRad ? 'RAD' : 'DEG'} | MEM: {memory}</span>
          <span className="truncate">{equation}</span>
        </div>
        <div className="text-right text-3xl sm:text-4xl font-extrabold tracking-tight overflow-x-auto">
          {display}
        </div>
      </div>

      {/* Button Keyboard Grid */}
      <div className="grid grid-cols-5 gap-2 text-xs font-bold">
        {/* Row 1: Memory & Rad/Deg */}
        <button
          onClick={() => setIsRad(!isRad)}
          className={`p-3 rounded-2xl transition ${isRad ? 'bg-blue-600 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200'}`}
        >
          {isRad ? 'RAD' : 'DEG'}
        </button>
        <button onClick={() => setMemory(0)} className="p-3 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-2xl">MC</button>
        <button onClick={() => setDisplay(memory.toString())} className="p-3 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-2xl">MR</button>
        <button onClick={() => setMemory(memory + parseFloat(display || '0'))} className="p-3 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-2xl">M+</button>
        <button onClick={handleClear} className="p-3 bg-rose-500 text-white rounded-2xl">AC</button>

        {/* Row 2: Trig & Scientific */}
        <button onClick={() => handleFunc('sin')} className="p-3 bg-indigo-50 dark:bg-slate-800 text-indigo-600 dark:text-indigo-300 rounded-2xl">sin</button>
        <button onClick={() => handleFunc('cos')} className="p-3 bg-indigo-50 dark:bg-slate-800 text-indigo-600 dark:text-indigo-300 rounded-2xl">cos</button>
        <button onClick={() => handleFunc('tan')} className="p-3 bg-indigo-50 dark:bg-slate-800 text-indigo-600 dark:text-indigo-300 rounded-2xl">tan</button>
        <button onClick={() => handleFunc('log')} className="p-3 bg-indigo-50 dark:bg-slate-800 text-indigo-600 dark:text-indigo-300 rounded-2xl">log</button>
        <button onClick={() => handleOp('÷')} className="p-3 bg-blue-100 dark:bg-slate-700 text-blue-700 dark:text-blue-300 rounded-2xl text-base">÷</button>

        {/* Row 3: Math functions */}
        <button onClick={() => handleFunc('ln')} className="p-3 bg-indigo-50 dark:bg-slate-800 text-indigo-600 dark:text-indigo-300 rounded-2xl">ln</button>
        <button onClick={() => handleNum('7')} className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-2xl text-base">7</button>
        <button onClick={() => handleNum('8')} className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-2xl text-base">8</button>
        <button onClick={() => handleNum('9')} className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-2xl text-base">9</button>
        <button onClick={() => handleOp('×')} className="p-3 bg-blue-100 dark:bg-slate-700 text-blue-700 dark:text-blue-300 rounded-2xl text-base">×</button>

        {/* Row 4 */}
        <button onClick={() => handleFunc('sqrt')} className="p-3 bg-indigo-50 dark:bg-slate-800 text-indigo-600 dark:text-indigo-300 rounded-2xl">√</button>
        <button onClick={() => handleNum('4')} className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-2xl text-base">4</button>
        <button onClick={() => handleNum('5')} className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-2xl text-base">5</button>
        <button onClick={() => handleNum('6')} className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-2xl text-base">6</button>
        <button onClick={() => handleOp('-')} className="p-3 bg-blue-100 dark:bg-slate-700 text-blue-700 dark:text-blue-300 rounded-2xl text-base">-</button>

        {/* Row 5 */}
        <button onClick={() => handleNum('π')} className="p-3 bg-indigo-50 dark:bg-slate-800 text-indigo-600 dark:text-indigo-300 rounded-2xl">π</button>
        <button onClick={() => handleNum('1')} className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-2xl text-base">1</button>
        <button onClick={() => handleNum('2')} className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-2xl text-base">2</button>
        <button onClick={() => handleNum('3')} className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-2xl text-base">3</button>
        <button onClick={() => handleOp('+')} className="p-3 bg-blue-100 dark:bg-slate-700 text-blue-700 dark:text-blue-300 rounded-2xl text-base">+</button>

        {/* Row 6 */}
        <button onClick={() => handleNum('e')} className="p-3 bg-indigo-50 dark:bg-slate-800 text-indigo-600 dark:text-indigo-300 rounded-2xl">e</button>
        <button onClick={() => handleNum('0')} className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-2xl text-base">0</button>
        <button onClick={() => handleNum('.')} className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-2xl text-base">.</button>
        <button
          onClick={handleEvaluate}
          className="col-span-2 p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-extrabold text-base transition shadow-lg shadow-blue-500/20"
        >
          =
        </button>
      </div>

      {/* History Stack Log */}
      {historyStack.length > 0 && (
        <div className="p-4 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
          <span className="text-xs font-bold text-slate-400 uppercase">Calculation Log</span>
          <div className="space-y-1 font-mono text-xs">
            {historyStack.map((item, idx) => (
              <div key={idx} className="p-1.5 bg-white dark:bg-slate-900 rounded-lg border border-slate-100 dark:border-slate-800 text-slate-800 dark:text-slate-200">
                {item}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
