import { useState, useEffect } from "react";
import axios from "axios";
import { Document, Page, pdfjs } from "react-pdf";
import { useParams } from "react-router-dom";

// Import styles for react-pdf
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

// Set up pdf worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

function ResumeViewer() {
  const { applicantId } = useParams();

  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [resumeUrl, setResumeUrl] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false); // Dark mode state

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

  function goToPreviousPage() {
    setPageNumber((prevPageNumber) =>
      prevPageNumber > 1 ? prevPageNumber - 1 : 1
    );
  }

  function goToNextPage() {
    setPageNumber((prevPageNumber) =>
      prevPageNumber < (numPages || 0) ? prevPageNumber + 1 : prevPageNumber
    );
  }

  function toggleDarkMode() {
    setIsDarkMode((prevMode) => !prevMode); // Toggle dark mode
  }

  useEffect(() => {
    async function getResume() {
      try {
        const response = await axios.get(
          `http://localhost:8000/users/applicantresume/${applicantId}`,
          {
            responseType: "blob",
          }
        );
        const resumeBlobUrl = URL.createObjectURL(response.data);
        setResumeUrl(resumeBlobUrl);
      } catch (error) {
        console.error("Error fetching resume", error);
      }
    }
    getResume();
  }, [applicantId]);

  // Cleanup the blob URL
  useEffect(() => {
    return () => {
      if (resumeUrl) {
        URL.revokeObjectURL(resumeUrl);
      }
    };
  }, [resumeUrl]);

  return (
    <div
      className={`flex flex-col items-center justify-center py-20 ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      {/* Dark mode toggle button */}
      <button
        onClick={toggleDarkMode}
        style={{
          position: "absolute",
          top: "80px", // Position of the toggle button
          right: "20px",
          padding: "10px 15px",
          borderRadius: "5px",
          backgroundColor: isDarkMode ? "#1E90FF" : "#FFFFA0", // Blue for dark mode, gold for light mode
          color: isDarkMode ? "#333" : "#fff",
          border: "none",
          cursor: "pointer",
          fontSize: "18px",
          transition: "background-color 0.3s, color 0.3s",
        }}
      >
        {isDarkMode ? "🌙" : "☀️"} {/* Moon for dark mode, Sun for light mode */}
      </button>

      {resumeUrl && (
        <div
          className={`border-2 shadow-lg ${
            isDarkMode ? "border-gray-600" : "border-gray-300"
          }`}
        >
          <Document file={resumeUrl} onLoadSuccess={onDocumentLoadSuccess}>
            <Page pageNumber={pageNumber} />
          </Document>
        </div>
      )}

      <div className="flex items-center justify-between mt-4">
        <button
          onClick={goToPreviousPage}
          className={`px-4 py-2 font-bold ${
            isDarkMode ? "bg-red-600" : "bg-red-500"
          } rounded-l hover:bg-red-700`}
          disabled={pageNumber <= 1}
        >
          Previous
        </button>
        <p className="mx-2">
          Page {pageNumber} of {numPages}
        </p>
        <button
          onClick={goToNextPage}
          className={`px-4 py-2 font-bold ${
            isDarkMode ? "bg-red-600" : "bg-red-500"
          } rounded-r hover:bg-red-700`}
          disabled={pageNumber >= (numPages || 0)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default ResumeViewer;
