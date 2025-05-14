'use client';

import { useState } from 'react';
import { AudioProvider } from '../context/AudioContext';
import UploadDropzone from '../components/UploadDropzone';
import AudioTable from '../components/AudioTable';
import AudioGrid from '../components/AudioGrid';
import AudioPlayer from '../components/AudioPlayer';

export default function Home() {
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');

  return (
    <AudioProvider>
      <main className="min-h-screen bg-gray-50 text-gray-800 flex flex-col">
        <header className="p-6 shadow bg-white">
          <h1 className="text-3xl font-bold text-center">Audio Player</h1>
        </header>

        <div className="flex-grow p-6 flex flex-col">
          <UploadDropzone />

          <div className="my-6 flex gap-4 justify-end">
            <button
              onClick={() => setViewMode('table')}
              className={`px-5 py-2 rounded-full font-medium transition-all duration-200 shadow-sm ${
                viewMode === 'table'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white border border-blue-600 text-blue-600'
              } hover:shadow-md hover:ring-2 hover:ring-blue-300 cursor-pointer`}
            >
              Table View
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`px-5 py-2 rounded-full font-medium transition-all duration-200 shadow-sm ${
                viewMode === 'grid'
                  ? 'bg-green-600 text-white'
                  : 'bg-white border border-green-600 text-green-600'
              } hover:shadow-md hover:ring-2 hover:ring-green-300 cursor-pointer`}
            >
              Grid View
            </button>
          </div>

          <div className="flex-grow overflow-y-auto rounded-lg bg-white p-4 shadow pb-40">
            {viewMode === 'table' ? <AudioTable /> : <AudioGrid />}
          </div>
        </div>

        <AudioPlayer />
      </main>
    </AudioProvider>
  );
}

