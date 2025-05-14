'use client';

import { useState } from 'react';
import { AudioProvider } from '../context/AudioContext';
import UploadDropzone from '../components/UploadDropzone';
import AudioTable from '../components/AudioTable';
import AudioGrid from '../components/AudioGrid';
import AudioPlayer from '../components/AudioPlayer';
import { FaList, FaThLarge } from 'react-icons/fa';

export default function Home() {
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');

  const toggleView = () => {
    setViewMode(prev => (prev === 'table' ? 'grid' : 'table'));
  };

  return (
    <AudioProvider>
      <main className="min-h-screen bg-gray-50 text-gray-800 flex flex-col">
        <header className="p-6 shadow bg-white">
          <h1 className="text-3xl font-bold text-center">Audio Player</h1>
        </header>

        <div className="flex-grow p-6 flex flex-col">
          <UploadDropzone />

          <div className="my-6 flex justify-end">
            <button
              onClick={toggleView}
              className="px-5 py-2 rounded-full font-medium transition-all duration-200 shadow-sm bg-white border border-gray-300 hover:bg-gray-100 flex items-center gap-2"
            >
              {viewMode === 'table' ? (
                <>
                  <FaThLarge className="text-green-600" />
                  <span className="hidden sm:inline">Grid View</span>
                </>
              ) : (
                <>
                  <FaList className="text-blue-600" />
                  <span className="hidden sm:inline">Table View</span>
                </>
              )}
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
