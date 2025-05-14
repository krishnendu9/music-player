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
              <th className="p-3 text-left w-[60px] sm:w-[80px] md:w-[100px] truncate">Thumbnail</th>
              <th className="p-3 text-left w-[50%] sm:w-[40%] md:w-[45%] lg:w-[50%]">Name</th>
              <th className="p-3 text-left w-[100px] sm:w-[120px] md:w-[150px]">Duration</th>
              <th className="p-3 text-center w-[120px] sm:w-[140px] md:w-[160px]">Actions</th>
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
                <td className="p-3 text-center" onClick={(e) => e.stopPropagation()}>
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
