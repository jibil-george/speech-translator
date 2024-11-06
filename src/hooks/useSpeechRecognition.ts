import { useState, useEffect, useCallback } from 'react';
import { RecognitionState, Language, TranscriptSegment } from '../types/recognition';
import { translateText } from '../services/translateService';

export const useSpeechRecognition = () => {
  const [state, setState] = useState<RecognitionState>({
    isListening: false,
    transcripts: [],
    targetLanguage: 'en-US',
    error: null,
  });

  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = state.targetLanguage;

        recognition.onstart = () => {
          setState(prev => ({ ...prev, isListening: true }));
        };

        recognition.onerror = (event) => {
          console.error('Speech recognition error:', event.error);
          setState(prev => ({ 
            ...prev, 
            error: `Microphone error: ${event.error}. Please ensure microphone permissions are granted.`,
            isListening: false 
          }));
        };

        recognition.onend = () => {
          setState(prev => ({ ...prev, isListening: false }));
        };

        recognition.onresult = async (event) => {
          const current = event.resultIndex;
          const transcript = event.results[current][0].transcript;

          if (event.results[current].isFinal) {
            const newSegment: TranscriptSegment = {
              text: transcript.trim(),
              timestamp: Date.now(),
            };

            try {
              const translated = await translateText(
                newSegment.text,
                state.targetLanguage
              );
              newSegment.translated = translated;
            } catch (error) {
              console.error('Translation error:', error);
            }

            setState(prev => ({
              ...prev,
              transcripts: [...prev.transcripts, newSegment],
            }));
          }
        };

        setRecognition(recognition);
      } else {
        setState(prev => ({ 
          ...prev, 
          error: 'Speech recognition is not supported in this browser.' 
        }));
      }
    }
  }, [state.targetLanguage]);

  const startListening = useCallback(() => {
    if (recognition) {
      try {
        recognition.start();
      } catch (error) {
        console.error('Failed to start recognition:', error);
      }
    }
  }, [recognition]);

  const stopListening = useCallback(() => {
    if (recognition) {
      try {
        recognition.stop();
      } catch (error) {
        console.error('Failed to stop recognition:', error);
      }
    }
  }, [recognition]);

  const setTargetLanguage = useCallback((language: Language) => {
    setState(prev => ({ ...prev, targetLanguage: language }));
    if (recognition) {
      recognition.lang = language;
    }
  }, [recognition]);

  const clearTranscripts = useCallback(() => {
    setState(prev => ({ ...prev, transcripts: [] }));
  }, []);

  return {
    ...state,
    startListening,
    stopListening,
    setTargetLanguage,
    clearTranscripts,
  };
};