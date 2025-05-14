'use client';

import { useAudio } from '../context/AudioContext';
import RenameModal from './RenameModal';
import { formatDuration } from '../lib/utils';
import { FaMusic } from 'react-icons/fa';

export default function AudioGrid() {
  const {
    audioFiles,
    currentAudioIndex,
    playAudio,
  } = useAudio();

  return (
    <div className="overflow-y-auto max-h-[300px] mt-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {audioFiles.map((audio, index) => (
          <div
            key={audio.id}
            onClick={() => playAudio(index)}
            className={`p-4 border rounded-lg shadow-sm transition cursor-pointer ${
              index === currentAudioIndex ? 'bg-green-100 border-green-400' : 'hover:bg-gray-100'
            }`}
          >
            {audio.thumbnailUrl ? (
              <img
                src={audio.thumbnailUrl}
                alt="Thumbnail"
                className="w-full h-32 object-cover rounded mb-2"
              />
            ) : (
              <FaMusic className="text-2xl text-gray-600 w-full h-32 flex items-center justify-center rounded mb-2" />
            )}
            <p className="font-medium truncate">{audio.name}</p>
            <p className="text-sm text-gray-600">{formatDuration(audio.duration)}</p>
            <div className="mt-2"  onClick={(e) => e.stopPropagation()}>
              <RenameModal audioId={audio.id} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
