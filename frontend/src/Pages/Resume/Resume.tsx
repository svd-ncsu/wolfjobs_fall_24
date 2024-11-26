import React, { useState } from "react";
import axios from "axios";
import ResumeDropzone from "../../components/Resume/ResumeDropzone";
import { useUserStore } from "../../store/UserStore";
import { toast } from "react-toastify";

const Resume: React.FC = () => {
  // State to store the uploaded file and dark mode status
  const [file, setFile] = useState<File | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false); // Dark mode state

  // The current resume data
  const resumeName = useUserStore((state) => state.resume);
  const userId = useUserStore((state) => state.id);
  const updateResume = useUserStore((state) => state.updateResume);
  const updateResumeId = useUserStore((state) => state.updateResumeId);

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode); // Toggle dark mode
  };

  const handleSubmit = async () => {
    if (file) {
      const formData = new FormData();
      formData.append("resume", file);
      formData.append("id", userId);

      try {
        const response = await axios.post(
          "http://localhost:8000/users/uploadresume",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.status === 201) {
          console.log("Resume uploaded successfully");
          toast.success("Resume Uploaded Successfully. Sign out and sign back in to see changes!");
        }
      } catch (error) {
        console.error("Error uploading the resume", error);
        toast.error("Resume could not be uploaded");
      }
    }
  };

  return (
    <div
      data-testid="resume-background"
      className={`flex flex-col items-center justify-center min-h-screen ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-white text-black"
      }`} // Apply dark mode styles here
      style={{
        backgroundImage: isDarkMode ? "" : "url('/images/profile.svg')", // Update the path accordingly
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div
        className={`w-4/5 md:w-1/3 p-8 rounded-2xl shadow-lg border ${
          isDarkMode ? "bg-gray-800 border-gray-600" : "bg-white border-gray-300"
        }`}
      >
        <h2
          className={`text-2xl font-semibold text-center ${
            isDarkMode ? "text-blue-300" : "text-blue-200"
          } mb-4`}
        >
          Upload Your Resume
        </h2>
        <p
          className={`text-center ${
            isDarkMode ? "text-blue-400" : "text-blue-500"
          } mb-6`}
        >
          Please upload your resume below to get started on your journey with us!
          We are excited to see your skills and experience.
        </p>

        {/* Pass isDarkMode to ResumeDropzone */}
        <ResumeDropzone
          onFileUpload={(acceptedFiles) => setFile(acceptedFiles[0])}
          isDarkMode={isDarkMode} // Pass dark mode state to child
        />

        {file && (
          <div className={`mt-4 text-center ${isDarkMode ? "text-white" : "text-black"}`}>
            <p>Your uploaded file: <span className="font-semibold">{file.name}</span></p>
          </div>
        )}


        <div className="flex justify-center mt-6">
          <button
            onClick={handleSubmit}
            className={`px-6 py-3 font-bold text-white ${
              isDarkMode
                ? "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                : "bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
            } rounded-lg shadow-md hover:shadow-lg transition duration-200`}
          >
            Submit Resume
          </button>
        </div>
      
  {resumeName && (
    <div className="mt-6 text-center">
      <p
        className={`${
          isDarkMode ? "text-white" : "text-black"
        }`}
      >
        Your current resume is: <span className="font-semibold">{resumeName}</span>
      </p>
      <a
        href={`/resumeviewer/${userId}`}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-block mt-2 px-4 py-2 font-bold ${
          isDarkMode ? "text-white bg-red-600 hover:bg-red-700" : "text-black bg-red-500 hover:bg-red-600"
        } rounded-lg transition duration-200`}
      >
        View Resume
      </a>
    </div>
  )}

        
        {/* Dark Mode Toggle */}
      <button 
        onClick={toggleDarkMode} 
        style={{ 
          position: "absolute",
          top: "80px", // Lowered position
          right: "20px", 
          padding: "10px 15px", 
          borderRadius: "5px", 
          backgroundColor: isDarkMode ? "#1E90FF" : "#FFFFA0", // Gold for light mode, blue for dark mode
          color: isDarkMode ? "#333" : "#fff", 
          border: "none", 
          cursor: "pointer",
          fontSize: "18px",
          transition: "background-color 0.3s, color 0.3s"
        }}
      >
        {isDarkMode ? "🌙" : "☀️"} {/* Sun for light mode, moon for dark mode */}
      </button>
      </div>
    </div>
  );
};

export default Resume;
