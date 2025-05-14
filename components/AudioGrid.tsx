'use client';

import { useState } from 'react';
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

  const [modalAudioId, setModalAudioId] = useState<string | null>(null);

  const openRenameModal = (audioId: string) => {
    setModalAudioId(audioId);
  };

  const closeRenameModal = () => {
    setModalAudioId(null);
  };

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
            <div className="mt-2" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => openRenameModal(audio.id)}
                className="text-blue-600 hover:underline text-sm"
              >
                Rename
              </button>
            </div>
          </div>
        ))}
      </div>

      {modalAudioId && (
        <RenameModal audioId={modalAudioId} closeModal={closeRenameModal} />
      )}
    </div>
  );
}
