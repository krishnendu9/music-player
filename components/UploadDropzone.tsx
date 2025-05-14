'use client';

import { useDropzone } from 'react-dropzone';
import { useAudio } from '../context/AudioContext';

export default function UploadDropzone() {
  const { addAudioFiles } = useAudio();

  const onDrop = (acceptedFiles: File[]) => {
    const audioFiles = acceptedFiles.filter((file) => file.type.startsWith('audio/'));
    addAudioFiles(audioFiles);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'audio/*': [] },
  });

  return (
    <div
      {...getRootProps()}
      className="border-2 border-dashed border-gray-400 p-6 rounded-md text-center cursor-pointer"
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the audio files here...</p>
      ) : (
        <p>Drag & drop audio files here, or click to select files</p>
      )}
    </div>
  );
}
