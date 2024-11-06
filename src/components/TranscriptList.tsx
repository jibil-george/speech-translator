import React from 'react';
import { TranscriptSegment } from '../types/recognition';

interface TranscriptListProps {
  transcripts: TranscriptSegment[];
}

export const TranscriptList: React.FC<TranscriptListProps> = ({ transcripts }) => {
  return (
    <div className="space-y-4">
      {transcripts.map((segment, index) => (
        <div key={segment.timestamp} className="bg-white p-4 rounded-lg shadow">
          <div className="mb-2">
            <span className="text-sm text-gray-500">Original:</span>
            <p className="text-gray-800">{segment.text}</p>
          </div>
          {segment.translated && (
            <div>
              <span className="text-sm text-gray-500">Translated:</span>
              <p className="text-gray-800">{segment.translated}</p>
            </div>
          )}
          <div className="text-xs text-gray-400 mt-2">
            {new Date(segment.timestamp).toLocaleTimeString()}
          </div>
        </div>
      ))}
    </div>
  );
};