import React, { useState, useEffect, useRef } from 'react';
import { BaseCalculatorProps } from './index';
import { Copy, Check, RotateCcw, Trash2, HelpCircle, Sparkles, BookOpen } from 'lucide-react';

export const ScientificCalculator: React.FC<BaseCalculatorProps> = ({ onSaveHistory, initialPreset }) => {
  const [display, setDisplay] = useState<string>('0');
  const [equation, setEquation] = useState<string>('');
  const [isRad, setIsRad] = useState<boolean>(true);
  const [isInv, setIsInv] = useState<boolean>(false);
  const [memory, setMemory] = useState<number>(0);
  const [historyStack, setHistoryStack] = useState<string[]>([]);
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    if (initialPreset && initialPreset.initialDisplay) {
      setDisplay(String(initialPreset.initialDisplay));
    }
  }, [initialPreset]);

  // Factorial helper
  const factorial = (n: number): number => {
    if (n < 0 || !Number.isInteger(n)) return NaN;
    if (n === 0 || n === 1) return 1;
    if (n > 170) return Infinity; // JS float limit
    let res = 1;
    for (let i = 2; i <= n; i++) res *= i;
    return res;
  };

  const handleNum = (n: string) => {
    if (display === '0' || display === 'Error' || display === 'NaN' || display === 'Infinity') {
      setDisplay(n);
    } else {
      setDisplay(display + n);
    }
  };

  const handleDot = () => {
    if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const handleOp = (op: string) => {
    if (equation && display === '0') {
      // Replace last operator
      setEquation(equation.slice(0, -1) + op);
    } else {
      setEquation((prev) => (prev ? `${prev} ${display} ${op}` : `${display} ${op}`));
      setDisplay('0');
    }
  };

  const handleBackspace = () => {
    if (display.length > 1 && display !== 'Error') {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay('0');
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setEquation('');
  };

  const handleAllClear = () => {
    setDisplay('0');
    setEquation('');
    setHistoryStack([]);
  };

  const handleEvaluate = () => {
    try {
      let fullExpr = equation ? `${equation} ${display}` : display;
      if (!fullExpr) return;

      // Clean display expression for eval
      let evalExpr = fullExpr
        .replace(/×/g, '*')
        .replace(/÷/g, '/')
        .replace(/−/g, '-')
        .replace(/mod/g, '%')
        .replace(/\^/g, '**')
        .replace(/π/g, 'Math.PI')
        .replace(/e/g, 'Math.E')
        .replace(/asin\(/g, isRad ? 'Math.asin(' : '(180/Math.PI)*Math.asin(')
        .replace(/acos\(/g, isRad ? 'Math.acos(' : '(180/Math.PI)*Math.acos(')
        .replace(/atan\(/g, isRad ? 'Math.atan(' : '(180/Math.PI)*Math.atan(')
        .replace(/sin\(/g, isRad ? 'Math.sin(' : 'Math.sin((Math.PI/180)*')
        .replace(/cos\(/g, isRad ? 'Math.cos(' : 'Math.cos((Math.PI/180)*')
        .replace(/tan\(/g, isRad ? 'Math.tan(' : 'Math.tan((Math.PI/180)*')
        .replace(/sinh\(/g, 'Math.sinh(')
        .replace(/cosh\(/g, 'Math.cosh(')
        .replace(/tanh\(/g, 'Math.tanh(')
        .replace(/log\(/g, 'Math.log10(')
        .replace(/ln\(/g, 'Math.log(')
        .replace(/cbrt\(/g, 'Math.cbrt(')
        .replace(/sqrt\(/g, 'Math.sqrt(')
        .replace(/abs\(/g, 'Math.abs(');

      // Safe JS evaluation
      const result = Function(`"use strict"; return (${evalExpr})`)();

      if (isNaN(result) || result === undefined) {
        setDisplay('Error');
        return;
      }

      const formattedResult = Number.isInteger(result)
        ? result.toString()
        : Math.abs(result) < 1e-6 || Math.abs(result) > 1e12
        ? result.toExponential(6)
        : parseFloat(result.toFixed(10)).toString();

      const calcString = `${fullExpr} = ${formattedResult}`;
      setHistoryStack((prev) => [calcString, ...prev.slice(0, 19)]);
      setDisplay(formattedResult);
      setEquation('');

      if (onSaveHistory) {
        onSaveHistory(calcString, { expression: fullExpr }, { result: formattedResult });
      }
    } catch (err) {
      setDisplay('Error');
    }
  };

  const handleFunc = (funcName: string) => {
    const val = parseFloat(display);

    switch (funcName) {
      case 'sin':
        setDisplay(isInv ? `asin(${display})` : `sin(${display})`);
        break;
      case 'cos':
        setDisplay(isInv ? `acos(${display})` : `cos(${display})`);
        break;
      case 'tan':
        setDisplay(isInv ? `atan(${display})` : `tan(${display})`);
        break;
      case 'sinh':
        setDisplay(`sinh(${display})`);
        break;
      case 'cosh':
        setDisplay(`cosh(${display})`);
        break;
      case 'tanh':
        setDisplay(`tanh(${display})`);
        break;
      case 'log':
        setDisplay(isInv ? `10^(${display})` : `log(${display})`);
        break;
      case 'ln':
        setDisplay(isInv ? `e^(${display})` : `ln(${display})`);
        break;
      case 'sqrt':
        setDisplay(`sqrt(${display})`);
        break;
      case 'cbrt':
        setDisplay(`cbrt(${display})`);
        break;
      case 'square':
        if (!isNaN(val)) setDisplay((val * val).toString());
        break;
      case 'cube':
        if (!isNaN(val)) setDisplay((val * val * val).toString());
        break;
      case 'power':
        handleOp('^');
        break;
      case 'reciprocal':
        if (!isNaN(val) && val !== 0) setDisplay((1 / val).toString());
        else setDisplay('Error');
        break;
      case 'abs':
        setDisplay(`abs(${display})`);
        break;
      case 'factorial':
        if (!isNaN(val)) {
          const res = factorial(Math.floor(val));
          setDisplay(isNaN(res) ? 'Error' : res.toString());
        }
        break;
      case 'negate':
        if (display !== '0' && display !== 'Error') {
          setDisplay(display.startsWith('-') ? display.slice(1) : '-' + display);
        }
        break;
      case 'percent':
        if (!isNaN(val)) setDisplay((val / 100).toString());
        break;
      default:
        break;
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(display);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['input', 'textarea'].includes((e.target as HTMLElement)?.tagName?.toLowerCase())) return;

      if (e.key >= '0' && e.key <= '9') handleNum(e.key);
      else if (e.key === '.') handleDot();
      else if (e.key === '+') handleOp('+');
      else if (e.key === '-') handleOp('−');
      else if (e.key === '*') handleOp('×');
      else if (e.key === '/') handleOp('÷');
      else if (e.key === '^') handleOp('^');
      else if (e.key === '(' || e.key === ')') handleNum(e.key);
      else if (e.key === 'Enter' || e.key === '=') {
        e.preventDefault();
        handleEvaluate();
      } else if (e.key === 'Backspace') {
        handleBackspace();
      } else if (e.key === 'Escape') {
        handleClear();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [display, equation, isRad, isInv]);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Display Screen */}
      <div className="p-6 bg-slate-950 text-white rounded-3xl border border-slate-800 space-y-2 shadow-2xl font-mono relative overflow-hidden">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-3">
            <span className="px-2 py-0.5 rounded bg-slate-800 text-blue-400 font-bold">
              {isRad ? 'RAD' : 'DEG'}
            </span>
            {isInv && <span className="px-2 py-0.5 rounded bg-amber-900/60 text-amber-300 font-bold">INV</span>}
            {memory !== 0 && (
              <span className="px-2 py-0.5 rounded bg-emerald-900/60 text-emerald-300 font-bold">
                M: {memory}
              </span>
            )}
          </div>
          <span className="text-slate-400 truncate max-w-[60%] text-right">{equation || 'Ready'}</span>
        </div>

        <div className="flex items-center justify-between pt-2">
          <button
            onClick={copyToClipboard}
            className="text-slate-500 hover:text-slate-300 p-1 rounded-lg transition"
            title="Copy current value"
          >
            {copied ? <Check className="w-5 h-5 text-emerald-400" /> : <Copy className="w-5 h-5" />}
          </button>
          <div className="text-right text-3xl sm:text-5xl font-black tracking-tight overflow-x-auto select-all">
            {display}
          </div>
        </div>
      </div>

      {/* Button Keypad Layout */}
      <div className="grid grid-cols-5 sm:grid-cols-7 gap-2 text-xs font-bold">
        {/* Rad/Deg and Mode Toggles */}
        <button
          onClick={() => setIsRad(!isRad)}
          className={`p-3 rounded-2xl transition ${
            isRad ? 'bg-blue-600 text-white shadow-sm' : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
          }`}
        >
          {isRad ? 'RAD' : 'DEG'}
        </button>

        <button
          onClick={() => setIsInv(!isInv)}
          className={`p-3 rounded-2xl transition ${
            isInv ? 'bg-amber-600 text-white shadow-sm' : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
          }`}
        >
          INV
        </button>

        {/* Memory Buttons */}
        <button
          onClick={() => setMemory(0)}
          className="p-3 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-2xl hover:bg-slate-300 dark:hover:bg-slate-700 transition"
        >
          MC
        </button>
        <button
          onClick={() => setDisplay(memory.toString())}
          className="p-3 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-2xl hover:bg-slate-300 dark:hover:bg-slate-700 transition"
        >
          MR
        </button>
        <button
          onClick={() => setMemory(memory + parseFloat(display || '0'))}
          className="p-3 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-2xl hover:bg-slate-300 dark:hover:bg-slate-700 transition"
        >
          M+
        </button>
        <button
          onClick={handleBackspace}
          className="p-3 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-2xl hover:bg-slate-300 dark:hover:bg-slate-700 transition"
        >
          ⌫
        </button>
        <button
          onClick={handleClear}
          className="p-3 bg-rose-500 hover:bg-rose-600 text-white rounded-2xl shadow-sm transition font-extrabold"
        >
          AC
        </button>

        {/* Row 2: Trig & Constants */}
        <button
          onClick={() => handleFunc('sin')}
          className="p-3 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 rounded-2xl hover:bg-indigo-100 transition"
        >
          {isInv ? 'sin⁻¹' : 'sin'}
        </button>
        <button
          onClick={() => handleFunc('cos')}
          className="p-3 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 rounded-2xl hover:bg-indigo-100 transition"
        >
          {isInv ? 'cos⁻¹' : 'cos'}
        </button>
        <button
          onClick={() => handleFunc('tan')}
          className="p-3 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 rounded-2xl hover:bg-indigo-100 transition"
        >
          {isInv ? 'tan⁻¹' : 'tan'}
        </button>
        <button
          onClick={() => handleFunc('log')}
          className="p-3 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 rounded-2xl hover:bg-indigo-100 transition"
        >
          {isInv ? '10ˣ' : 'log'}
        </button>
        <button
          onClick={() => handleNum('(')}
          className="p-3 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-2xl hover:bg-slate-200 transition"
        >
          (
        </button>
        <button
          onClick={() => handleNum(')')}
          className="p-3 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-2xl hover:bg-slate-200 transition"
        >
          )
        </button>
        <button
          onClick={() => handleOp('÷')}
          className="p-3 bg-blue-100 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 rounded-2xl text-base font-bold hover:bg-blue-200 transition"
        >
          ÷
        </button>

        {/* Row 3: Powers & 7-8-9 */}
        <button
          onClick={() => handleFunc('ln')}
          className="p-3 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 rounded-2xl hover:bg-indigo-100 transition"
        >
          {isInv ? 'eˣ' : 'ln'}
        </button>
        <button
          onClick={() => handleFunc('power')}
          className="p-3 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 rounded-2xl hover:bg-indigo-100 transition"
        >
          xʸ
        </button>
        <button
          onClick={() => handleFunc('square')}
          className="p-3 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 rounded-2xl hover:bg-indigo-100 transition"
        >
          x²
        </button>
        <button
          onClick={() => handleNum('7')}
          className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-2xl text-base hover:border-blue-500 transition"
        >
          7
        </button>
        <button
          onClick={() => handleNum('8')}
          className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-2xl text-base hover:border-blue-500 transition"
        >
          8
        </button>
        <button
          onClick={() => handleNum('9')}
          className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-2xl text-base hover:border-blue-500 transition"
        >
          9
        </button>
        <button
          onClick={() => handleOp('×')}
          className="p-3 bg-blue-100 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 rounded-2xl text-base font-bold hover:bg-blue-200 transition"
        >
          ×
        </button>

        {/* Row 4: Roots & 4-5-6 */}
        <button
          onClick={() => handleFunc('sqrt')}
          className="p-3 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 rounded-2xl hover:bg-indigo-100 transition"
        >
          √x
        </button>
        <button
          onClick={() => handleFunc('cbrt')}
          className="p-3 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 rounded-2xl hover:bg-indigo-100 transition"
        >
          ∛x
        </button>
        <button
          onClick={() => handleFunc('factorial')}
          className="p-3 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 rounded-2xl hover:bg-indigo-100 transition"
        >
          x!
        </button>
        <button
          onClick={() => handleNum('4')}
          className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-2xl text-base hover:border-blue-500 transition"
        >
          4
        </button>
        <button
          onClick={() => handleNum('5')}
          className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-2xl text-base hover:border-blue-500 transition"
        >
          5
        </button>
        <button
          onClick={() => handleNum('6')}
          className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-2xl text-base hover:border-blue-500 transition"
        >
          6
        </button>
        <button
          onClick={() => handleOp('−')}
          className="p-3 bg-blue-100 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 rounded-2xl text-base font-bold hover:bg-blue-200 transition"
        >
          −
        </button>

        {/* Row 5: Constants & 1-2-3 */}
        <button
          onClick={() => handleNum('π')}
          className="p-3 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 rounded-2xl hover:bg-indigo-100 transition"
        >
          π
        </button>
        <button
          onClick={() => handleNum('e')}
          className="p-3 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 rounded-2xl hover:bg-indigo-100 transition"
        >
          e
        </button>
        <button
          onClick={() => handleFunc('reciprocal')}
          className="p-3 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 rounded-2xl hover:bg-indigo-100 transition"
        >
          1/x
        </button>
        <button
          onClick={() => handleNum('1')}
          className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-2xl text-base hover:border-blue-500 transition"
        >
          1
        </button>
        <button
          onClick={() => handleNum('2')}
          className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-2xl text-base hover:border-blue-500 transition"
        >
          2
        </button>
        <button
          onClick={() => handleNum('3')}
          className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-2xl text-base hover:border-blue-500 transition"
        >
          3
        </button>
        <button
          onClick={() => handleOp('+')}
          className="p-3 bg-blue-100 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 rounded-2xl text-base font-bold hover:bg-blue-200 transition"
        >
          +
        </button>

        {/* Row 6: 0, Dot, Mod, Negate, Equal */}
        <button
          onClick={() => handleOp('mod')}
          className="p-3 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 rounded-2xl hover:bg-indigo-100 transition"
        >
          mod
        </button>
        <button
          onClick={() => handleFunc('negate')}
          className="p-3 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 rounded-2xl hover:bg-indigo-100 transition"
        >
          ±
        </button>
        <button
          onClick={() => handleFunc('percent')}
          className="p-3 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 rounded-2xl hover:bg-indigo-100 transition"
        >
          %
        </button>
        <button
          onClick={() => handleNum('0')}
          className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-2xl text-base hover:border-blue-500 transition"
        >
          0
        </button>
        <button
          onClick={handleDot}
          className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-2xl text-base hover:border-blue-500 transition"
        >
          .
        </button>
        <button
          onClick={handleEvaluate}
          className="col-span-2 p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black text-lg transition shadow-lg shadow-blue-500/25 active:scale-[0.98]"
        >
          =
        </button>
      </div>

      {/* History Calculation Stack */}
      {historyStack.length > 0 && (
        <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-blue-500" />
              Session Calculation Tape ({historyStack.length})
            </span>
            <button
              type="button"
              onClick={handleAllClear}
              className="text-xs text-rose-500 hover:text-rose-600 flex items-center gap-1 font-semibold"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Clear Tape
            </button>
          </div>

          <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
            {historyStack.map((item, idx) => (
              <div
                key={idx}
                onClick={() => {
                  const parts = item.split(' = ');
                  if (parts[1]) setDisplay(parts[1]);
                }}
                className="p-2.5 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-mono flex items-center justify-between hover:border-blue-500 cursor-pointer transition"
                title="Click to load result"
              >
                <span className="text-slate-500 dark:text-slate-400">{item.split(' = ')[0]} =</span>
                <span className="font-bold text-slate-900 dark:text-white">{item.split(' = ')[1]}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
