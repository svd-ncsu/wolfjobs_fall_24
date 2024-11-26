import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

interface Application {
  _id: string;
  applicantid: string;
  applicantname: string;
  applicantemail: string;
  jobname: string;
  jobid: string;
  managerid: string;
  status: string;
}

const AdminApplicationsPage = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false); // Dark mode state

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/v1/users/fetchapplicationsAdmin");
        if (response.data.success) {
          setApplications(response.data.application);
        } else {
          setError("Failed to fetch applications");
        }
      } catch (err) {
        setError("Error fetching data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [applications]);

  const deleteApplication = async (applicationId: string) => {
    try {
      const response = await axios.post("http://localhost:8000/api/v1/users/deleteapplication", {
        applicationId,
      });

      if (response.data.success) {
        setApplications(applications.filter((application) => application._id !== applicationId));
        toast.success("Successfully Deleted Application");
      } else {
        toast.error("Failed to delete");
      }
    } catch (err) {
      console.error("Error deleting application:", err);
    }
  };

  return (
    <div style={{
      backgroundColor: isDarkMode ? "#1E2A3A" : "#B0C4DE", // Background color
    }}
    >
    <div
      className="container mx-auto p-4"
      style={{
        backgroundColor: isDarkMode ? "#1E2A3A" : "#B0C4DE", // Background color
        color: isDarkMode ? "#ffffff" : "#000000", // Text color
        minHeight: "100vh",
        transition: "background-color 0.3s, color 0.3s",
      }}
    >
      {/* Dark Mode Toggle */}
      <button
        onClick={toggleDarkMode}
        style={{
          position: "absolute",
          top: "80px",
          right: "20px",
          padding: "10px 15px",
          borderRadius: "5px",
          backgroundColor: isDarkMode ? "#1E90FF" : "#FFFFA0",
          color: isDarkMode ? "#333" : "#fff",
          border: "none",
          cursor: "pointer",
          fontSize: "18px",
          transition: "background-color 0.3s, color 0.3s",
        }}
      >
        {isDarkMode ? "🌙" : "☀️"}
      </button>

      <h1 className="text-2xl font-bold mb-4" style={{ color: isDarkMode ? "#FFA726" : "#333" }}>
        Applications
      </h1>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <div className="overflow-x-auto mx-4 lg:mx-8">
          <table
            className="min-w-full border"
            style={{
              backgroundColor: isDarkMode ? "#1e1e1e" : "#ffffff",
              color: isDarkMode ? "#ffffff" : "#000000",
            }}
          >
            <thead>
              <tr>
                <th className="border px-4 py-2">S.No</th>
                <th className="border px-4 py-2">Applicant Name</th>
                <th className="border px-4 py-2">Applicant Email</th>
                <th className="border px-4 py-2">Job Id</th>
                <th className="border px-4 py-2">Job Name</th>
                <th className="border px-4 py-2">Manager Id</th>
                <th className="border px-4 py-2">Status</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((application, index) => (
                <tr key={application._id}>
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2">{application.applicantname}</td>
                  <td className="border px-4 py-2">{application.applicantemail}</td>
                  <td className="border px-4 py-2">{application.jobid}</td>
                  <td className="border px-4 py-2">{application.jobname}</td>
                  <td className="border px-4 py-2">{application.managerid}</td>
                  <td className="border px-4 py-2">{application.status}</td>
                  <td className="border px-4 py-2">
                    <button
                      onClick={() => deleteApplication(application._id)}
                      style={{
                        backgroundColor: isDarkMode ? "#B71C1C" : "#FF5252",
                        color: "#fff",
                        padding: "10px",
                        borderRadius: "5px",
                        border: "none",
                        cursor: "pointer",
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
    </div>
  );
};

export default AdminApplicationsPage;
