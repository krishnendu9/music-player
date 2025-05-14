'use client';

import { useState } from 'react';
import { useAudio } from '../context/AudioContext';

interface RenameModalProps {
  audioId: string;
  closeModal: () => void;  // Function to close the modal
}

export default function RenameModal({ audioId, closeModal }: RenameModalProps) {
  const { audioFiles, renameAudioFile } = useAudio();
  const audio = audioFiles.find((a) => a.id === audioId);

  const [newName, setNewName] = useState(audio?.name || '');

  if (!audio) return null;

  const handleSave = () => {
    if (newName.trim() && newName !== audio.name) {
      renameAudioFile(audioId, newName.trim());
    }
    closeModal();
  };

  const handleCancel = () => {
    setNewName(audio.name);
    closeModal();
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full sm:w-[400px]">
        <h2 className="text-xl font-semibold mb-4">Rename Audio</h2>
        <div className="flex flex-col space-y-4">
          <div>
            <label className="block text-sm font-medium">New Name</label>
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="border rounded px-2 py-1 w-full text-sm"
              autoFocus
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              onClick={handleCancel}
              className="bg-gray-300 text-black px-4 py-2 rounded text-sm"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="bg-green-500 text-white px-4 py-2 rounded text-sm"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
