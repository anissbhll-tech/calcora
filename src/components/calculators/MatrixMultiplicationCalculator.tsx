import React, { useState, useEffect } from 'react';
import { CalcSelect } from '../common/CalcSelect';
import { CalcResultCard } from '../common/CalcResultCard';
import { CalcErrorAlert } from '../common/CalcErrorAlert';
import { safeParseNumber, formatNumber } from '../../lib/mathUtils';

interface MatrixMultiplicationCalculatorProps {
  onSaveHistory?: (summary: string, inputs: Record<string, any>, results: Record<string, any>) => void;
  resetSignal?: number;
  initialPreset?: Record<string, any> | null;
}

export const MatrixMultiplicationCalculator: React.FC<MatrixMultiplicationCalculatorProps> = ({
  onSaveHistory,
  resetSignal,
  initialPreset,
}) => {
  const [size, setSize] = useState<string>('2'); // '2' (2x2) or '3' (3x3)
  const [matrixA, setMatrixA] = useState<number[][]>([
    [1, 2],
    [3, 4],
  ]);
  const [matrixB, setMatrixB] = useState<number[][]>([
    [5, 6],
    [7, 8],
  ]);

  useEffect(() => {
    handleReset();
  }, [resetSignal]);

  const handleReset = () => {
    setSize('2');
    setMatrixA([
      [1, 2],
      [3, 4],
    ]);
    setMatrixB([
      [5, 6],
      [7, 8],
    ]);
  };

  const handleSizeChange = (newSize: string) => {
    setSize(newSize);
    if (newSize === '2') {
      setMatrixA([
        [1, 2],
        [3, 4],
      ]);
      setMatrixB([
        [5, 6],
        [7, 8],
      ]);
    } else {
      setMatrixA([
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
      ]);
      setMatrixB([
        [9, 8, 7],
        [6, 5, 4],
        [3, 2, 1],
      ]);
    }
  };

  const updateCell = (matrix: 'A' | 'B', row: number, col: number, value: string) => {
    const num = safeParseNumber(value, 0);
    if (matrix === 'A') {
      setMatrixA((prev) => {
        const next = prev.map((r) => [...r]);
        next[row][col] = num;
        return next;
      });
    } else {
      setMatrixB((prev) => {
        const next = prev.map((r) => [...r]);
        next[row][col] = num;
        return next;
      });
    }
  };

  const calculate = () => {
    const n = parseInt(size, 10);

    // Matrix Multiplication C = A * B
    const resultMatrix: number[][] = Array(n)
      .fill(0)
      .map(() => Array(n).fill(0));

    for (let r = 0; r < n; r++) {
      for (let c = 0; c < n; c++) {
        let sum = 0;
        for (let k = 0; k < n; k++) {
          sum += matrixA[r][k] * matrixB[k][c];
        }
        resultMatrix[r][c] = sum;
      }
    }

    // Determinants
    let detA = 0;
    let detB = 0;

    if (n === 2) {
      detA = matrixA[0][0] * matrixA[1][1] - matrixA[0][1] * matrixA[1][0];
      detB = matrixB[0][0] * matrixB[1][1] - matrixB[0][1] * matrixB[1][0];
    } else {
      detA =
        matrixA[0][0] * (matrixA[1][1] * matrixA[2][2] - matrixA[1][2] * matrixA[2][1]) -
        matrixA[0][1] * (matrixA[1][0] * matrixA[2][2] - matrixA[1][2] * matrixA[2][0]) +
        matrixA[0][2] * (matrixA[1][0] * matrixA[2][1] - matrixA[1][1] * matrixA[2][0]);

      detB =
        matrixB[0][0] * (matrixB[1][1] * matrixB[2][2] - matrixB[1][2] * matrixB[2][1]) -
        matrixB[0][1] * (matrixB[1][0] * matrixB[2][2] - matrixB[1][2] * matrixB[2][0]) +
        matrixB[0][2] * (matrixB[1][0] * matrixB[2][1] - matrixB[1][1] * matrixB[2][0]);
    }

    return {
      isValid: true,
      msg: '',
      resultMatrix,
      detA,
      detB,
      size: n,
    };
  };

  const res = calculate();

  const handleSave = () => {
    if (onSaveHistory && res.isValid) {
      onSaveHistory(
        `Matrix Multiplication (${res.size}x${res.size}): det(A)=${res.detA}, det(B)=${res.detB}`,
        { size: res.size },
        { detA: res.detA, detB: res.detB }
      );
    }
  };

  return (
    <div className="space-y-6">
      {!res.isValid && res.msg && <CalcErrorAlert message={res.msg} />}

      <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 space-y-4">
        <CalcSelect
          id="size"
          label="Matrix Dimensions"
          value={size}
          onChange={handleSizeChange}
          options={[
            { value: '2', label: '2 x 2 Matrices' },
            { value: '3', label: '3 x 3 Matrices' },
          ]}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Matrix A */}
          <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 space-y-3">
            <h4 className="text-xs font-bold text-slate-500 uppercase">Matrix A</h4>
            <div
              className={`grid gap-2 ${
                size === '2' ? 'grid-cols-2' : 'grid-cols-3'
              }`}
            >
              {matrixA.map((row, r) =>
                row.map((val, c) => (
                  <input
                    key={`A-${r}-${c}`}
                    type="number"
                    value={val}
                    onChange={(e) => updateCell('A', r, c, e.target.value)}
                    className="w-full text-center text-sm font-semibold bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-teal-500 dark:text-white"
                  />
                ))
              )}
            </div>
          </div>

          {/* Matrix B */}
          <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 space-y-3">
            <h4 className="text-xs font-bold text-slate-500 uppercase">Matrix B</h4>
            <div
              className={`grid gap-2 ${
                size === '2' ? 'grid-cols-2' : 'grid-cols-3'
              }`}
            >
              {matrixB.map((row, r) =>
                row.map((val, c) => (
                  <input
                    key={`B-${r}-${c}`}
                    type="number"
                    value={val}
                    onChange={(e) => updateCell('B', r, c, e.target.value)}
                    className="w-full text-center text-sm font-semibold bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-teal-500 dark:text-white"
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {res.isValid && (
        <div className="space-y-4">
          <div className="p-5 rounded-2xl bg-teal-50/50 dark:bg-teal-950/20 border border-teal-200 dark:border-teal-800/60 space-y-3">
            <h4 className="text-sm font-bold text-teal-900 dark:text-teal-300">
              Product Matrix C = A × B
            </h4>
            <div className="flex justify-center">
              <div
                className={`grid gap-3 p-4 bg-white dark:bg-slate-900 rounded-xl border border-teal-200 dark:border-teal-800 shadow-sm ${
                  res.size === 2 ? 'grid-cols-2 min-w-[200px]' : 'grid-cols-3 min-w-[280px]'
                }`}
              >
                {res.resultMatrix.map((row, r) =>
                  row.map((val, c) => (
                    <div
                      key={`C-${r}-${c}`}
                      className="p-3 bg-teal-50 dark:bg-teal-950/50 border border-teal-200 dark:border-teal-800 text-center text-base font-extrabold text-teal-700 dark:text-teal-300 rounded-lg"
                    >
                      {formatNumber(val, 2)}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <CalcResultCard
              title="Determinant det(A)"
              value={formatNumber(res.detA, 2)}
              subtitle={res.detA === 0 ? 'Matrix A is singular (no inverse)' : 'Non-singular matrix'}
              highlighted={false}
            />

            <CalcResultCard
              title="Determinant det(B)"
              value={formatNumber(res.detB, 2)}
              subtitle={res.detB === 0 ? 'Matrix B is singular (no inverse)' : 'Non-singular matrix'}
              highlighted={false}
            />
          </div>

          {onSaveHistory && (
            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleSave}
                className="px-4 py-2 rounded-xl bg-teal-600 text-white font-bold hover:bg-teal-700 transition shrink-0"
              >
                Save Result
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
