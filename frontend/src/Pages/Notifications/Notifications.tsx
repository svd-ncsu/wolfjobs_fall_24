import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useJobStore } from "../../store/JobStore";
import { useApplicationStore } from "../../store/ApplicationStore";
import JobListTile from "../../components/Job/JobListTile";

const Notifications = () => {
  const updateJobList = useJobStore((state) => state.updateJobList);
  const jobList = useJobStore((state) => state.jobList);

  const updateApplicationList = useApplicationStore(
    (state) => state.updateApplicationList
  );
  const applicationList = useApplicationStore((state) => state.applicationList);

  const [acceptedJobs, setAcceptedJobs] = useState([]);
  const [rejectedJobs, setRejectedJobs] = useState([]);
  const [isAcceptedVisible, setIsAcceptedVisible] = useState(true);
  const [isRejectedVisible, setIsRejectedVisible] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/v1/users/fetchapplications")
      .then((res) => {
        if (res.status !== 200) {
          toast.error("Error fetching applications");
          return;
        }
        updateApplicationList(res.data.application);
      });

    axios
      .get("http://localhost:8000/api/v1/users", { params: { page: 1, limit: 25 } })
      .then((res) => {
        if (res.status !== 200) {
          toast.error("Error fetching jobs");
          return;
        }
        updateJobList(res.data.jobs);
      });
  }, []);

  useEffect(() => {
    const acceptedApplications = applicationList.filter(
      (app) => app.status === "accepted"
    );
    const acceptedJobIds = acceptedApplications.map((app) => app.jobid);
    const acceptedJobList = jobList.filter((job) =>
      acceptedJobIds.includes(job._id)
    );
    setAcceptedJobs(acceptedJobList);

    const rejectedApplications = applicationList.filter(
      (app) => app.status === "rejected"
    );
    const rejectedJobIds = rejectedApplications.map((app) => app.jobid);
    const rejectedJobList = jobList.filter((job) =>
      rejectedJobIds.includes(job._id)
    );
    setRejectedJobs(rejectedJobList);
  }, [applicationList, jobList]);

  const handleJobClick = (jobId) => {
    navigate("/dashboard", { state: { selectedJobId: jobId } });
  };

  const toggleAcceptedVisibility = () => {
    setIsAcceptedVisible(!isAcceptedVisible);
  };

  const toggleRejectedVisibility = () => {
    setIsRejectedVisible(!isRejectedVisible);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div
      data-testid="notifications-content"
      className={`min-h-screen flex items-center justify-center ${
        isDarkMode ? "bg-gray-800 text-white" : "bg-gray-100 text-black"
      }`}
      style={{
        backgroundSize: "cover",
        backgroundColor: isDarkMode ? "#1E2A3A" : "#B0C4DE",
        backgroundPosition: "center",
      }}
    >
      <div
        className={`${
          isDarkMode ? "bg-gray-900" : "bg-white"
        } bg-opacity-80 backdrop-blur-lg p-8 rounded-lg shadow-md w-full max-w-3xl`}
      >
        {/* Dark Mode Toggle */}
      <button 
        onClick={toggleDarkMode} 
        style={{ 
          position: "absolute",
          top: "-120px", // Lowered position
          right: "-300px", 
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


        {/* Accepted Jobs Section */}
        <div className="mb-8">
          <h1
            className={`flex items-center justify-between text-2xl font-semibold ${
              isDarkMode ? "text-blue-300" : "text-blue-600"
            } mb-4`}
          >
            Accepted Jobs ({acceptedJobs.length})
            <span
              onClick={toggleAcceptedVisibility}
              className="cursor-pointer text-lg transition-transform duration-200"
            >
              {isAcceptedVisible ? "▼" : "▲"}
            </span>
          </h1>
          {isAcceptedVisible && (
            <div className="space-y-4">
              {acceptedJobs.length > 0 ? (
                acceptedJobs.map((job) => (
                  <div
                    key={job._id}
                    onClick={() => handleJobClick(job._id)}
                    className={`p-4 rounded-lg shadow-md cursor-pointer transition duration-200 ${
                      isDarkMode
                        ? "bg-blue-950 hover:bg-blue-500"
                        : "bg-blue-300 hover:bg-blue-400"
                    }`}
                  >
                    <JobListTile data={job} action="view-details" />
                  </div>
                ))
              ) : (
                <p className="text-gray-600">
                  No accepted job notifications.
                </p>
              )}
            </div>
          )}
        </div>

        {/* Rejected Jobs Section */}
        <div className="mb-8">
          <h1
            className={`flex items-center justify-between text-2xl font-semibold ${
              isDarkMode ? "text-blue-300" : "text-blue-600"
            } mb-4`}
          >
            Rejected Jobs ({rejectedJobs.length})
            <span
              onClick={toggleRejectedVisibility}
              className="cursor-pointer text-lg transition-transform duration-200"
            >
              {isRejectedVisible ? "▼" : "▲"}
            </span>
          </h1>
          {isRejectedVisible && (
            <div className="space-y-4">
              {rejectedJobs.length > 0 ? (
                rejectedJobs.map((job) => (
                  <div
                    key={job._id}
                    onClick={() => handleJobClick(job._id)}
                    className={`p-4 rounded-lg shadow-md cursor-pointer transition duration-200 ${
                      isDarkMode
                        ? "bg-gray-700 hover:bg-gray-600"
                        : "bg-gray-200 hover:bg-gray-300"
                    }`}
                  >
                    <JobListTile data={job} action="view-details" />
                  </div>
                ))
              ) : (
                <p className="text-gray-600">
                  No rejected job notifications.
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notifications;
