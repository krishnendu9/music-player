'use client';

import { useState } from 'react';
import { useAudio } from '../context/AudioContext';

interface RenameModalProps {
  audioId: string;
}

export default function RenameModal({ audioId }: RenameModalProps) {
  const { audioFiles, renameAudioFile } = useAudio();
  const audio = audioFiles.find((a) => a.id === audioId);

  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(audio?.name || '');

  if (!audio) return null;

  const handleSave = () => {
    if (newName.trim() && newName !== audio.name) {
      renameAudioFile(audioId, newName.trim());
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setNewName(audio.name);
    setIsEditing(false);
  };

  return (
    <div className="mt-2">
      {!isEditing ? (
        <button
          className="text-blue-600 hover:underline text-sm"
          onClick={() => setIsEditing(true)}
        >
          Rename
        </button>
      ) : (
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="border rounded px-2 py-1 text-sm w-40"
            autoFocus
          />
          <button
            onClick={handleSave}
            className="bg-green-500 text-white px-2 py-1 rounded text-sm"
          >
            Save
          </button>
          <button
            onClick={handleCancel}
            className="bg-gray-300 text-black px-2 py-1 rounded text-sm"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}
