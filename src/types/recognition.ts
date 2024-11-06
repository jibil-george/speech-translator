export type Language = 'en-US' | 'de-DE';

export interface TranscriptSegment {
  text: string;
  translated?: string;
  timestamp: number;
}

export interface RecognitionState {
  isListening: boolean;
  transcripts: TranscriptSegment[];
  targetLanguage: Language;
  error: string | null;
}