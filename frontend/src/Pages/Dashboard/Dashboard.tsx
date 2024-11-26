import { useEffect, useState } from "react";
import JobDetailView from "../../components/Job/JobDetailView";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../store/UserStore";
import { useJobStore } from "../../store/JobStore";
import { useApplicationStore } from "../../store/ApplicationStore";
import JobListTile from "../../components/Job/JobListTile";
import { Button } from "@mui/material";

const Dashboard = () => {
  const navigate = useNavigate();

  // User store actions
  const updateName = useUserStore((state) => state.updateName);
  const updateEmail = useUserStore((state) => state.updateEmail);
  const updatePassword = useUserStore((state) => state.updatePassword);
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
  const [isDarkMode, setIsDarkMode] = useState(false); // State to manage dark mode

  const role = useUserStore((state) => state.role);
  const managerId = useUserStore((state) => state.id);

  // Job store actions
  const updateJobList = useJobStore((state) => state.updateJobList);
  const jobList: Job[] = useJobStore((state) => state.jobList);

  // Application store actions
  const updateApplicationList = useApplicationStore((state) => state.updateApplicationList);
  const applicationList: Application[] = useApplicationStore((state) => state.applicationList);

  const [displayList, setDisplayList] = useState<Job[]>([]);

  useEffect(() => {
    const token: string = localStorage.getItem("token")!;
    if (!token) {
      navigate("/login");
    }
    if (token) {
      const tokenInfo = token.split(".");
      const userInfo = JSON.parse(atob(tokenInfo[1]));

      // Update user state
      updateName(userInfo.name);
      updateEmail(userInfo.email);
      updatePassword(userInfo.password);
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
    // Fetch applications
    axios.get("http://localhost:8000/api/v1/users/fetchapplications").then((res) => {
      if (res.status !== 200) {
        toast.error("Error fetching applications");
        return;
      }
      updateApplicationList(res.data.application as Application[]);
    });

    // Fetch jobs
    axios.get("http://localhost:8000/api/v1/users", { params: { page: 1, limit: 25 } }).then((res) => {
      if (res.status !== 200) {
        toast.error("Error fetching jobs");
        return;
      }
      updateJobList(res.data.jobs as Job[]);
    });
  }, []);

  useEffect(() => {
    // Filter jobs based on role
    if (role === "Manager") {
      const temp = jobList.filter((item) => item.managerid === managerId);
      setDisplayList(temp);
    } else if (role === "Applicant") {
      const applicantsJobs: Application[] = applicationList.filter((item) => item.applicantid);
      const ids: string[] = applicantsJobs.map((job) => job.jobid || "");
      const temp = jobList.filter((item) => ids.includes(item._id));
      setDisplayList(temp);
    }
  }, [role, jobList, applicationList]);

  // Function to handle admin-only page access
  // const handleAdminAccess = () => {
  //   if (role !== "Admin") {
  //     toast.error("Access Denied. Admins only!");
  //   } else {
  //     navigate("/admin");
  //   }
  // };

  // Toggle Dark Mode
  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <>
      <div
        data-testid="dashboard-content"
        className="content bg-white min-h-screen relative font-lato"
        style={{
          backgroundImage: isDarkMode ? "url('./images/dashboard_d.png')" : "url('./images/dashboard.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundColor: isDarkMode ? "#000" : "#FFF",
        }}
      >
        {/* Dark Mode Toggle */}
        <button 
        onClick={toggleDarkMode} 
        style={{ 
          position: "absolute",
          top: "10px", // Lowered position
          right: "270px", 
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

        <div className="flex flex-row h-[calc(100vh-72px)]">
          <div data-testid="job-list-container" className="w-4/12 pt-2 overflow-x-hidden overflow-y-scroll bg-transparent px-9">
            <div className="py-4 text-2xl font-semibold text-black-900 flex justify-between items-center" 
              style={{color: isDarkMode ? "#FFF" : "#000"}}
            >
              <span>{role === "Manager" ? "My Listings" : "My Applications"}</span>
              {(role === "Manager" || role=="Admin") && (
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/createjob");
                  }}
                  type="button"
                  className="p-2 border rounded-md bg-blue-500 text-white transition duration-200 hover:bg-blue-700"
                  // variant="contained"
                  style={{color: "#FFF", backgroundColor: isDarkMode ? "#1E3A5F" : "#1E90FF", border: "1px solid", borderColor: isDarkMode ? "#FFF" : "#1E90FF"}}
                >
                  Create Job +
                </Button>
              )}
            </div>
            {displayList?.map((job: Job) => {
              let action;

              if (role === "Manager") {
                action = "view-application";
              } else {
                const application = applicationList?.find((item) => item.jobid === job._id && item.status === "screening");
                action = application ? "view-questionnaire" : "view-application";
              }

              return <JobListTile data={job} key={job._id} action={action} />;
            })}
          </div>
          <JobDetailView data-testid="job-detail-view" isDarkMode={isDarkMode}/>
        </div>
        <div className="absolute top-4 right-4 z-10 flex space-x-3">
          <Button
            onClick={(e) => {
              e.preventDefault();
              navigate("/information");
            }}
            // type="button"
            className="p-2 border rounded-md bg-blue-500 text-white transition duration-200 hover:bg-blue-700"
            // variant="contained"
            style={{color: "#FFF", backgroundColor: isDarkMode ? "#1E3A5F" : "#1E90FF", border: "1px solid", borderColor: isDarkMode ? "#FFF" : "#1E90FF"}}

          >
            Information
          </Button>

          {/* <Button
            onClick={handleAdminAccess}
            // type="button"
            className="p-2 border rounded-md bg-blue-500 text-white transition duration-200 hover:bg-blue-700"
            // variant="contained"
            style={{color: "#FFF", backgroundColor: isDarkMode ? "#1E3A5F" : "#1E90FF", border: "1px solid", borderColor: isDarkMode ? "#FFF" : "#1E90FF"}}
          >
            Admin Only
          </Button> */}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
