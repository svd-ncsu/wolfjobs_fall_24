import React, { useCallback } from 'react';
import { useDropzone, DropzoneOptions, FileRejection } from 'react-dropzone';

interface ResumeDropzoneProps {
  onFileUpload: (files: File[]) => void;
  isDarkMode: boolean;
}

const ResumeDropzone: React.FC<ResumeDropzoneProps> = ({ onFileUpload, isDarkMode }) => {
  const onDrop = useCallback((acceptedFiles: File[], fileRejections: FileRejection[]) => {
    // Pass the accepted files to the parent component
    onFileUpload(acceptedFiles);

    // Handle any file rejections
    fileRejections.forEach((file) => {
      console.error(`File rejected: ${file.file.name}`);
      // Here you can handle displaying an error message to the user
    });
  }, [onFileUpload]); // Don't forget to include onFileUpload in the dependencies array

  const dropzoneOptions: DropzoneOptions = {
    onDrop,
    accept: { "application/pdf": [".pdf"] },
    maxSize: 15 * 1024 * 1024, // limit the size to 15mb max to agree with the backend
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone(dropzoneOptions);

  return (
    <div
      {...getRootProps()}
      className={`flex items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer 
        ${isDarkMode ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-700'}`}
      style={{
        padding: "20px",
        transition: "background-color 0.3s, border-color 0.3s, color 0.3s",
      }}
    >
      <input {...getInputProps()} />
      {
        isDragActive ? 
          <p className="text-lg">{isDarkMode ? "Drop the files here ..." : "Drop the files here ..."}</p> : 
          <p className="text-lg">{isDarkMode ? "Drop a file here or click to select one" : "Drag 'n' drop some files here, or click to select files"}</p>
      }
    </div>
  );
};

export default ResumeDropzone;
