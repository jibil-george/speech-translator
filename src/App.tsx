import React, { useEffect } from 'react';
import { useSpeechRecognition } from './hooks/useSpeechRecognition';
import { Controls } from './components/Controls';
import { TranscriptList } from './components/TranscriptList';
import { Languages } from 'lucide-react';

function App() {
  const {
    isListening,
    transcripts,
    targetLanguage,
    error,
    startListening,
    stopListening,
    setTargetLanguage,
    clearTranscripts,
  } = useSpeechRecognition();

  useEffect(() => {
    // Request microphone permission on component mount
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(() => {
        console.log('Microphone permission granted');
      })
      .catch((err) => {
        console.error('Microphone permission denied:', err);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div className="flex items-center space-x-3 mb-6">
              <Languages className="w-8 h-8 text-indigo-600" />
              <h1 className="text-2xl font-bold text-gray-800">
                Voice Recognition & Translation
              </h1>
            </div>

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                {error}
              </div>
            )}

            <div className="mb-8">
              <Controls
                isListening={isListening}
                targetLanguage={targetLanguage}
                onStartListening={startListening}
                onStopListening={stopListening}
                onLanguageChange={setTargetLanguage}
                onClear={clearTranscripts}
              />
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-lg font-semibold text-gray-700 mb-4">
                Transcripts
              </h2>
              {transcripts.length === 0 ? (
                <p className="text-gray-500 text-center py-8">
                  {isListening 
                    ? 'Listening... Start speaking'
                    : 'Click the microphone button and start speaking'}
                </p>
              ) : (
                <TranscriptList transcripts={transcripts} />
              )}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Coming Soon Features
            </h2>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-indigo-500 rounded-full mr-2"></span>
                Real-time voice translation
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-indigo-500 rounded-full mr-2"></span>
                Voice cloning capabilities
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-indigo-500 rounded-full mr-2"></span>
                Support for more languages
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;