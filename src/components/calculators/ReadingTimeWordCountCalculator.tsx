import React, { useState, useEffect } from 'react';
import { BaseCalculatorProps } from './index';
import { FileText, Clock, AlignLeft, RotateCcw, Save } from 'lucide-react';

export const ReadingTimeWordCountCalculator: React.FC<BaseCalculatorProps> = ({
  onSaveHistory,
  resetSignal,
  initialPreset
}) => {
  const [textInput, setTextInput] = useState<string>(
    `Calcora is an all-in-one suite of free, high-precision web calculators designed for financial planning, medical and health assessments, mathematical modeling, and construction estimation. Our mission is to make mathematical analysis accessible, instantaneous, and educational for users worldwide.`
  );
  const [readingWpm, setReadingWpm] = useState<number>(230); // Avg adult reading speed
  const [speakingWpm, setSpeakingWpm] = useState<number>(140); // Avg speech rate

  useEffect(() => {
    if (resetSignal) {
      handleReset();
    }
  }, [resetSignal]);

  const handleReset = () => {
    setTextInput('');
    setReadingWpm(230);
    setSpeakingWpm(140);
  };

  // Text Metrics
  const trimmedText = textInput.trim();
  const words = trimmedText ? trimmedText.split(/\s+/) : [];
  const wordCount = words.length;
  const charCountWithSpaces = textInput.length;
  const charCountNoSpaces = textInput.replace(/\s+/g, '').length;
  const sentences = trimmedText ? trimmedText.split(/[.!?]+/).filter(Boolean) : [];
  const sentenceCount = sentences.length;
  const paragraphs = trimmedText ? trimmedText.split(/\n+/).filter(Boolean) : [];
  const paragraphCount = paragraphs.length;

  const readingTimeMinutes = wordCount > 0 ? wordCount / readingWpm : 0;
  const readingTimeSeconds = Math.round(readingTimeMinutes * 60);

  const speakingTimeMinutes = wordCount > 0 ? wordCount / speakingWpm : 0;
  const speakingTimeSeconds = Math.round(speakingTimeMinutes * 60);

  const formatDuration = (totalSec: number) => {
    if (totalSec < 60) return `${totalSec} sec`;
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins} min ${secs} sec`;
  };

  const handleSave = () => {
    if (onSaveHistory) {
      onSaveHistory(
        `Text Analysis: ${wordCount} words, ${charCountWithSpaces} chars (Read: ${formatDuration(readingTimeSeconds)}, Speak: ${formatDuration(speakingTimeSeconds)})`,
        { wordCount, charCountWithSpaces, readingWpm, speakingWpm },
        { readingTimeSeconds, speakingTimeSeconds, sentenceCount, paragraphCount }
      );
    }
  };

  return (
    <div className="space-y-6">
      {/* Metrics Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 rounded-xl shadow-md">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-xs uppercase text-indigo-200">Word Count</div>
            <div className="text-3xl font-extrabold mt-1 text-white">{wordCount.toLocaleString()}</div>
          </div>

          <div>
            <div className="text-xs uppercase text-indigo-200">Silent Reading Time</div>
            <div className="text-2xl font-bold mt-1 text-emerald-300">{formatDuration(readingTimeSeconds)}</div>
            <div className="text-[10px] text-slate-300">@{readingWpm} WPM</div>
          </div>

          <div>
            <div className="text-xs uppercase text-indigo-200">Speaking Duration</div>
            <div className="text-2xl font-bold mt-1 text-amber-300">{formatDuration(speakingTimeSeconds)}</div>
            <div className="text-[10px] text-slate-300">@{speakingWpm} WPM Speech</div>
          </div>

          <div>
            <div className="text-xs uppercase text-indigo-200">Characters</div>
            <div className="text-2xl font-bold mt-1 text-indigo-200">{charCountWithSpaces.toLocaleString()}</div>
            <div className="text-[10px] text-slate-300">{charCountNoSpaces.toLocaleString()} no spaces</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main Textarea */}
        <div className="md:col-span-2 bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-3">
          <div className="flex justify-between items-center border-b pb-2">
            <h3 className="font-semibold text-slate-800 flex items-center gap-2">
              <FileText className="w-5 h-5 text-indigo-600" /> Input or Paste Document Text
            </h3>
            <button
              onClick={() => setTextInput('')}
              className="text-xs text-rose-600 hover:underline font-medium"
            >
              Clear Text
            </button>
          </div>

          <textarea
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            placeholder="Type or paste your essay, speech, blog post, or manuscript here..."
            className="w-full h-56 p-3 text-sm border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none font-sans leading-relaxed"
          />

          <div className="flex justify-between text-xs text-slate-500">
            <span>Sentences: {sentenceCount}</span>
            <span>Paragraphs: {paragraphCount}</span>
            <span>Avg Word Length: {wordCount > 0 ? (charCountNoSpaces / wordCount).toFixed(1) : 0} chars</span>
          </div>
        </div>

        {/* Speed Controls & Save */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="font-semibold text-slate-800 border-b pb-2 text-sm flex items-center gap-2">
            <Clock className="w-5 h-5 text-indigo-600" /> Reading Speed Presets
          </h3>

          <div>
            <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">
              Silent Reading Speed (WPM)
            </label>
            <div className="grid grid-cols-3 gap-1 mb-2">
              {[180, 230, 300].map((w) => (
                <button
                  key={w}
                  onClick={() => setReadingWpm(w)}
                  className={`py-1.5 text-xs font-semibold rounded border ${readingWpm === w ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-slate-50 text-slate-700'}`}
                >
                  {w} WPM
                </button>
              ))}
            </div>
            <input
              type="number"
              value={readingWpm}
              onChange={(e) => setReadingWpm(Math.max(50, Number(e.target.value)))}
              className="w-full px-3 py-1.5 text-xs border rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">
              Speech / Presentation Rate (WPM)
            </label>
            <div className="grid grid-cols-3 gap-1 mb-2">
              {[120, 140, 160].map((w) => (
                <button
                  key={w}
                  onClick={() => setSpeakingWpm(w)}
                  className={`py-1.5 text-xs font-semibold rounded border ${speakingWpm === w ? 'bg-amber-600 text-white border-amber-600' : 'bg-slate-50 text-slate-700'}`}
                >
                  {w} WPM
                </button>
              ))}
            </div>
            <input
              type="number"
              value={speakingWpm}
              onChange={(e) => setSpeakingWpm(Math.max(50, Number(e.target.value)))}
              className="w-full px-3 py-1.5 text-xs border rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

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
      </div>
    </div>
  );
};
