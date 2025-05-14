'use client';

import { useAudio } from '../context/AudioContext';
import RenameModal from './RenameModal';
import { formatDuration } from '../lib/utils';
import { FaMusic } from 'react-icons/fa';

export default function AudioTable() {
  const {
    audioFiles,
    currentAudioIndex,
    playAudio,
  } = useAudio();

  return (
    <div className="mt-4 border border-gray-300 rounded overflow-hidden">
      <div className="max-h-[400px] overflow-y-auto">
        <table className="w-full table-fixed border-collapse">
          <thead>
            <tr className="bg-gray-200 sticky top-0 z-10">
              <th className="w-[60px] p-3 text-left">Thumbnail</th>
              <th className="w-[50%] p-3 text-left">Name</th>
              <th className="w-[100px] p-3 text-left">Duration</th>
              <th className="w-[120px] p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {audioFiles.map((audio, index) => (
              <tr
                key={audio.id}
                onClick={() => playAudio(index)}
                className={`cursor-pointer transition-all ${
                  index === currentAudioIndex
                    ? 'bg-green-100 font-semibold'
                    : 'hover:bg-gray-100'
                }`}
              >
                <td className="p-3">
                  {audio.thumbnailUrl ? (
                    <img
                      src={audio.thumbnailUrl}
                      alt="Thumbnail"
                      className="w-10 h-10 object-cover rounded"
                    />
                  ) : (
                    <FaMusic className="text-2xl text-gray-600" />
                  )}
                </td>
                <td className="p-3 truncate">{audio.name}</td>
                <td className="p-3">{formatDuration(audio.duration)}</td>
                <td className="p-3 text-center">
                  <RenameModal audioId={audio.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
