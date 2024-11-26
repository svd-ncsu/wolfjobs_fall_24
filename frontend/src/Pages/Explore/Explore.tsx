import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../store/UserStore";
import { toast } from "react-toastify";

import JobsListView from "../../components/Job/JobListView";
import JobDetailView from "../../components/Job/JobDetailView";
import { useJobStore } from "../../store/JobStore";
import { useApplicationStore } from "../../store/ApplicationStore";

const Explore = () => {
  const navigate = useNavigate();

  // User Store Update Functions
  const updateName = useUserStore((state) => state.updateName);
  const updateAddress = useUserStore((state) => state.updateAddress);
  const updateRole = useUserStore((state) => state.updateRole);
  const updateDob = useUserStore((state) => state.updateDob);
  const updateSkills = useUserStore((state) => state.updateSkills);
  const updatePhonenumber = useUserStore((state) => state.updatePhonenumber);
  const updateId = useUserStore((state) => state.updateId);
  const updateAvailability = useUserStore((state) => state.updateAvailability);
  const updateGender = useUserStore((state) => state.updateGender);
  const updateHours = useUserStore((state) => state.updateHours);
  const updateIsLoggedIn = useUserStore((state) => state.updateIsLoggedIn);
  const updateResume = useUserStore((state) => state.updateResume);
  const updateResumeId = useUserStore((state) => state.updateResumeId);
  
  const updateApplicationList = useApplicationStore((state) => state.updateApplicationList);
  
  const updateEmail = useUserStore((state) => state.updateEmail);
  
  const updateJobList = useJobStore((state) => state.updateJobList);
  const jobList: Job[] = useJobStore((state) => state.jobList);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredJobList, setFilteredJobList] = useState<Job[]>([]);
  const [sortHighestPay, setSortHighestPay] = useState(false);
  const [sortAlphabeticallyByCity, setSortAlphabeticallyByCity] = useState(false);
  const [employmentType, setEmploymentType] = useState<"full-time" | "part-time" | "both">("both");
  const [showOpenJobs, setShowOpenJobs] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false); // State to manage dark mode
  
  const handleSearchChange = (event: any) => {
    setSearchTerm(event.target.value);
  };
  
  const handleSortChange = () => {
    setSortHighestPay(!sortHighestPay);
  };
  
  const handleSortCityChange = () => {
    setSortAlphabeticallyByCity(!sortAlphabeticallyByCity);
  };
  
  const handleEmploymentTypeChange = (type: "full-time" | "part-time") => {
    setEmploymentType(type);
  };
  
  const toggleJobStatus = () => {
    setShowOpenJobs(!showOpenJobs);
  };
  
  useEffect(() => {
    const token: string = localStorage.getItem("token")!;
    if (!!!token) {
      navigate("/login");
    }
    if (!!token) {
      const tokenInfo = token.split(".");
      const userInfo = JSON.parse(atob(tokenInfo[1]));
  
      updateName(userInfo.name);
      updateEmail(userInfo.email);
      updateAddress(userInfo.address);
      updateRole(userInfo.role);
      updateDob(userInfo.dob);
      updateSkills(userInfo.skills);
      updatePhonenumber(userInfo.phonenumber);
      updateId(userInfo._id);
      updateAvailability(userInfo.availability);
      updateGender(userInfo.gender);
      updateHours(userInfo.hours);
      updateIsLoggedIn(true);
      updateResume(userInfo.resume);
      updateResumeId(userInfo.resumeId);
    }
  }, []);
  
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/v1/users/fetchapplications")
      .then((res) => {
        if (res.status !== 200) {
          toast.error("Error fetching applications");
          return;
        }
        updateApplicationList(res.data.application as Application[]);
      });
  
    axios
      .get("http://localhost:8000/api/v1/users", {
        params: { page: 1, limit: 25 },
      })
      .then((res) => {
        if (res.status !== 200) {
          toast.error("Error fetching jobs");
          return;
        }
        updateJobList(res.data.jobs as Job[]);
      }); 
  }, []);
  
  useEffect(() => {
    let updatedList = jobList;
  
    if (searchTerm !== "") {
      updatedList = updatedList.filter((job) =>
        job.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  
    if (sortHighestPay) {
      updatedList = [...updatedList].sort(
        (a, b) => parseFloat(b.pay) - parseFloat(a.pay)
      );
    }
  
    if (sortAlphabeticallyByCity) {
      updatedList = [...updatedList].sort((a, b) => {
        return a.location.localeCompare(b.location);
      });
    }
  
    if (employmentType !== "both") {
      updatedList = updatedList.filter((job) => job.type === employmentType);
    }
  
    updatedList = updatedList.filter((job) =>
      showOpenJobs ? job.status === "open" : job.status === "closed"
    );
  
    setFilteredJobList(updatedList);
  }, [
    searchTerm,
    jobList,
    sortHighestPay,
    sortAlphabeticallyByCity,
    employmentType,
    showOpenJobs,
  ]);

  // Add the useEffect here for changing text color
  useEffect(() => {
    const inputElement = document.querySelector<HTMLInputElement>("input[type='text']");
    if (inputElement) {
      inputElement.style.setProperty("color", "#000000"); // Change text color to black
      inputElement.style.setProperty("--placeholder-color", "#000000"); // Change placeholder color to black
    }
  }, []);
  
  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <div
      data-testid="explore-content" 
      className="content bg-slate-50 bg-cover bg-center"
      style={{ backgroundImage: isDarkMode? "url('./images/dashboard_d.png')" : "url('./images/dashboard.svg')", 
        backgroundColor: isDarkMode ? "#000" : "",
      }} // Set the background image
    >
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

      <div className="flex flex-col items-center">
        <div className="p-4 search-bar-container flex justify-center">
          <input
            type="text"
            placeholder="Search Jobs"
            value={searchTerm}
            onChange={handleSearchChange}
            className="p-3 w-full rounded-lg border-2 border-blue-500 bg-white shadow-md outline-none transition duration-200 ease-in-out transform hover:scale-105 focus:scale-105 focus:border-blue-700 focus:ring-2 focus:ring-blue-300"
            style={{
              backgroundColor: isDarkMode ? "#1E3A5F" : "#d3ebfb", // Light blue background
              textAlign: "center", // Center align the text
              borderColor: isDarkMode ? "#2563EB" : "#3B82F6",
            }}
          />
        </div>
        <div className="flex justify-center space-x-2 mt-4">
          <button
            onClick={handleSortChange}
            className="p-2 border rounded-md bg-blue-500 text-white transition duration-200 hover:bg-blue-700"
            style = {{backgroundColor: isDarkMode ? "#1E3A5F" : "#3B82F6"}}
          >
            {sortHighestPay ? "Sort by High Pay : On" : "Sort by Highest Pay : Off"}
          </button>
          <button
            onClick={handleSortCityChange}
            className="p-2 border rounded-md bg-blue-500 text-white transition duration-200 hover:bg-blue-700"
            style = {{backgroundColor: isDarkMode ? "#1E3A5F" : "#3B82F6"}}

          >
            {sortAlphabeticallyByCity ? "Sort by Location : On" : "Sort by Location : Off"}
          </button>
          <button
            name="show-full-time-jobs"
            onClick={() => handleEmploymentTypeChange("full-time")}
            className="p-2 border rounded-md bg-blue-500 text-white transition duration-200 hover:bg-blue-700"
            style = {{backgroundColor: isDarkMode ? "#1E3A5F" : "#3B82F6"}}

          >
            {employmentType === "full-time" ? "Show Full-Time Jobs : On" : "Show Full-Time Jobs : Off"}
          </button>
          <button
            name="show-part-time-jobs"
            onClick={() => handleEmploymentTypeChange("part-time")}
            className="p-2 border rounded-md bg-blue-500 text-white transition duration-200 hover:bg-blue-700"
            style = {{backgroundColor: isDarkMode ? "#1E3A5F" : "#3B82F6"}}

          >
            {employmentType === "part-time" ? "Show Part-Time Jobs : On" : "Show Part-Time Jobs : Off"}
          </button>
          <button
            onClick={toggleJobStatus}
            className="p-2 border rounded-md bg-blue-500 text-white transition duration-200 hover:bg-blue-700"
            style = {{backgroundColor: isDarkMode ? "#1E3A5F" : "#3B82F6"}}

          >
            {showOpenJobs ? "Show Closed Jobs" : "Show Open Jobs"}
          </button>
        </div>
      </div>
      <div className="flex flex-row" style={{ height: "calc(100vh - 72px)" }}>
        <JobsListView jobsList={filteredJobList} />
        <JobDetailView isDarkMode={isDarkMode}/>
      </div>
    </div>
  );
};

export default Explore;

