'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { v4 as uuidv4 } from 'uuid';

export interface AudioFile {
  id: string;
  file: File;
  name: string;
  url: string;
  duration?: number;
  thumbnailUrl?: string; 
}

interface AudioContextType {
  audioFiles: AudioFile[];
  currentAudio: AudioFile | null;
  currentAudioIndex: number;
  addAudioFiles: (files: File[]) => void;
  renameAudioFile: (id: string, newName: string) => void;
  playAudio: (index: number) => void;
  playNext: () => void;
  playPrevious: () => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider = ({ children }: { children: ReactNode }) => {
  const [audioFiles, setAudioFiles] = useState<AudioFile[]>([]);
  const [currentAudioIndex, setCurrentAudioIndex] = useState<number>(-1);

  const currentAudio = audioFiles[currentAudioIndex] || null;

const addAudioFiles = (files: File[]) => {
  const readFileDurations = async () => {
    const newFiles: AudioFile[] = await Promise.all(
      files.map(
        (file) =>
          new Promise<AudioFile>((resolve) => {
            const audio = document.createElement('audio');
            const url = URL.createObjectURL(file);
            audio.src = url;
            audio.addEventListener('loadedmetadata', () => {
              resolve({
                id: uuidv4(),
                file,
                name: file.name,
                url,
                duration: audio.duration,
                thumbnailUrl: '',
              });
            });
          })
      )
    );
    setAudioFiles((prev) => [...prev, ...newFiles]);
  };

  readFileDurations();
};


  const renameAudioFile = (id: string, newName: string) => {
    setAudioFiles((prev) =>
      prev.map((audio) => (audio.id === id ? { ...audio, name: newName } : audio))
    );
  };

  const playAudio = (index: number) => {
    if (index >= 0 && index < audioFiles.length) {
      setCurrentAudioIndex(index);
    }
  };

  const playNext = () => {
    if (currentAudioIndex < audioFiles.length - 1) {
      setCurrentAudioIndex(currentAudioIndex + 1);
    }
  };

  const playPrevious = () => {
    if (currentAudioIndex > 0) {
      setCurrentAudioIndex(currentAudioIndex - 1);
    }
  };

  return (
    <AudioContext.Provider
      value={{
        audioFiles,
        currentAudio,
        currentAudioIndex,
        addAudioFiles,
        renameAudioFile,
        playAudio,
        playNext,
        playPrevious,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
};
