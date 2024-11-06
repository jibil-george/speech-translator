import React from 'react';
import { Mic, MicOff, Trash2 } from 'lucide-react';
import { Language } from '../types/recognition';

interface ControlsProps {
  isListening: boolean;
  targetLanguage: Language;
  onStartListening: () => void;
  onStopListening: () => void;
  onLanguageChange: (lang: Language) => void;
  onClear: () => void;
}

export const Controls: React.FC<ControlsProps> = ({
  isListening,
  targetLanguage,
  onStartListening,
  onStopListening,
  onLanguageChange,
  onClear,
}) => {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <button
        onClick={isListening ? onStopListening : onStartListening}
        className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
          isListening
            ? 'bg-red-500 hover:bg-red-600 text-white'
            : 'bg-indigo-500 hover:bg-indigo-600 text-white'
        }`}
      >
        {isListening ? (
          <>
            <MicOff className="w-5 h-5" />
            <span>Stop</span>
          </>
        ) : (
          <>
            <Mic className="w-5 h-5" />
            <span>Start</span>
          </>
        )}
      </button>

      <select
        value={targetLanguage}
        onChange={(e) => onLanguageChange(e.target.value as Language)}
        className="px-4 py-2 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        <option value="en-US">English</option>
        <option value="de-DE">German</option>
      </select>

      <button
        onClick={onClear}
        className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition-colors"
      >
        <Trash2 className="w-5 h-5" />
        <span>Clear</span>
      </button>
    </div>
  );
};