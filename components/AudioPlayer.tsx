'use client';

import { useEffect, useRef, useState } from 'react';
import { useAudio } from '../context/AudioContext';
import {
  FaPlay,
  FaPause,
  FaStepForward,
  FaStepBackward,
  FaMusic,
} from 'react-icons/fa';

export default function AudioPlayer() {
  const {
    audioFiles,
    currentAudio,
    currentAudioIndex,
    playAudio,
    playNext,
    playPrevious,
  } = useAudio();

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onLoadedMetadata = () => setDuration(audio.duration);
    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onEnded = () => playNext();

    audio.addEventListener('loadedmetadata', onLoadedMetadata);
    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('ended', onEnded);

    return () => {
      audio.removeEventListener('loadedmetadata', onLoadedMetadata);
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('ended', onEnded);
    };
  }, [currentAudio, playNext]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.pause();
    setCurrentTime(0);
    setIsPlaying(false);

    if (currentAudio) {
      setTimeout(() => {
        audio.play();
        setIsPlaying(true);
      }, 100);
    }
  }, [currentAudio]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    isPlaying ? audio.pause() : audio.play();
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;

    const newTime = parseFloat(e.target.value);
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  if (!currentAudio) return null;

 
  const formatTime = (sec: number) => {
    const minutes = Math.floor(sec / 60)
      .toString()
      .padStart(2, '0');
    const seconds = Math.floor(sec % 60)
      .toString()
      .padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-md z-50 flex items-center justify-between px-4 py-3 gap-4 flex-wrap sm:flex-nowrap">
      {/* Left: Song Info */}
      <div className="flex items-center gap-3 w-full sm:w-1/4">
        <FaMusic className="text-2xl text-gray-600" />
        <span className="font-semibold truncate text-sm sm:text-base">{currentAudio.name}</span>
      </div>

      {/* Center: Controls */}
      <div className="flex flex-col items-center w-full sm:w-2/4">
        <div className="flex items-center gap-4 mb-2">
          <button
            onClick={playPrevious}
            className="p-2 rounded-full hover:bg-gray-200 transition"
          >
            <FaStepBackward className="text-xl" />
          </button>
          <button
            onClick={togglePlay}
            className="p-3 rounded-full bg-green-500 text-white hover:bg-green-600 transition"
          >
            {isPlaying ? <FaPause className="text-lg" /> : <FaPlay className="text-lg" />}
          </button>
          <button
            onClick={playNext}
            className="p-2 rounded-full hover:bg-gray-200 transition"
          >
            <FaStepForward className="text-xl" />
          </button>
        </div>
        <div className="flex items-center w-full gap-2 text-xs text-gray-600">
          <span className="w-10 text-right">{formatTime(currentTime)}</span>
          <input
            type="range"
            min={0}
            max={duration || 0}
            value={currentTime}
            onChange={handleSeek}
            className="w-full accent-green-600"
          />
          <span className="w-10 text-left">{formatTime(duration)}</span>
        </div>
      </div>

      {/* Right: Audio List (Hidden on small screens) */}
      <div className="w-full sm:w-1/4 max-h-32 overflow-y-auto px-2 hidden sm:block">
        <ul className="text-sm text-gray-700">
          {audioFiles.map((file, index) => (
            <li
              key={file.id}
              onClick={() => playAudio(index)}
              className={`cursor-pointer truncate px-2 py-1 rounded transition ${
                index === currentAudioIndex
                  ? 'bg-green-100 font-semibold'
                  : 'hover:bg-gray-100'
              }`}
            >
              {file.name}
            </li>
          ))}
        </ul>
      </div>

      <audio ref={audioRef} src={currentAudio.url} />
    </div>
  );
}
