import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

interface Manager {
  _id: string;
  name: string;
  email: string;
  password: string;
  affiliation?: string; // Optional field
}

const AdminManagerPage = () => {
  const [managers, setManagers] = useState<Manager[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false); // State for dark mode

  useEffect(() => {
    // Fetch managers from the backend
    const fetchManagers = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/v1/users/getmanagers"); // Replace with your backend URL
        if (response.data.success) {
          setManagers(response.data.data.managers);
        } else {
          setError("Failed to fetch managers");
        }
      } catch (err) {
        setError("Error fetching data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchManagers();
  }, [managers]);

  const deleteManager = async (managerId: string) => {
    try {
      const response = await axios.post("http://localhost:8000/api/v1/users/deletemanager", {
        managerId,
      });

      if (response.data.success) {
        setManagers(managers.filter((manager) => manager._id !== managerId));
        toast.success("Successfully Deleted Manager");
      } else {
        console.error("Failed to delete manager");
        toast.error("Failed to delete");
      }
    } catch (err) {
      console.error("Error deleting manager:", err);
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <div
      style={{
        backgroundColor: isDarkMode ? "#1E2A3A" : "#B0C4DE",
        color: isDarkMode ? "#FFFFFF" : "#000000",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <button
        onClick={toggleDarkMode}
        style={{
          position: "absolute",
          top: "80px",
          right: "20px",
          padding: "10px 15px",
          borderRadius: "5px",
          backgroundColor: isDarkMode ? "#4CAF50" : "#FFEB3B",
          color: isDarkMode ? "#FFFFFF" : "#000000",
          border: "none",
          cursor: "pointer",
        }}
      >
        {isDarkMode ? "🌙" : "☀️"}
      </button>

      <h1 className="text-2xl font-bold mb-4" style={{ textAlign: "center" }}>
        Managers
      </h1>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <div style={{ overflowX: "auto", margin: "20px auto" }}>
          <table
            style={{
              width: "100%",
              backgroundColor: isDarkMode ? "#2A2A2A" : "#FFFFFF",
              color: isDarkMode ? "#FFFFFF" : "#000000",
              borderCollapse: "collapse",
            }}
          >
            <thead>
              <tr>
                <th style={{ border: "1px solid", padding: "8px" }}>S.No</th>
                <th style={{ border: "1px solid", padding: "8px" }}>Name</th>
                <th style={{ border: "1px solid", padding: "8px" }}>Email</th>
                <th style={{ border: "1px solid", padding: "8px" }}>Password</th>
                <th style={{ border: "1px solid", padding: "8px" }}>Affiliation</th>
                <th style={{ border: "1px solid", padding: "8px" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {managers.map((manager, index) => (
                <tr key={manager._id}>
                  <td style={{ border: "1px solid", padding: "8px" }}>{index + 1}</td>
                  <td style={{ border: "1px solid", padding: "8px" }}>{manager.name}</td>
                  <td style={{ border: "1px solid", padding: "8px" }}>{manager.email}</td>
                  <td style={{ border: "1px solid", padding: "8px" }}>{manager.password}</td>
                  <td style={{ border: "1px solid", padding: "8px" }}>{manager.affiliation || "N/A"}</td>
                  <td style={{ border: "1px solid", padding: "8px" }}>
                    <button
                      onClick={() => deleteManager(manager._id)}
                      style={{
                        backgroundColor: isDarkMode ? "#E74C3C" : "#F44336",
                        color: "#FFFFFF",
                        padding: "8px 12px",
                        borderRadius: "4px",
                        cursor: "pointer",
                        border: "none",
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
  );
};

export default AdminManagerPage;
