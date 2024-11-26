import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";


interface Application {
  _id: string;
  applicantid:string,
  applicantname:string,
  applicantemail:string,
  jobname:string,
  jobid:string,
  managerid:string,
  status:string,
  
}

const AdminApplicationsPage = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch applications from the backend
    const fetchApplications = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/v1/users/fetchapplicationsAdmin"); // Replace with your backend URL

        if (response.data.success) {
          setApplications(response.data.application);
        } else {
          console.log("failure")

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
        applicationId, // Send the manager ID in the request body
      });

      if (response.data.success) {
        // Update the state to remove the deleted manager
        setApplications(applications.filter((application) => application._id !== applicationId));
        toast.success("Succesfully Deleted Application");
      } else {
        console.error("Failed to delete application");
        toast.error("Failed to delete");
      }
    } catch (err) {
      console.error("Error deleting application:", err);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Applications</h1>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="overflow-x-auto mx-4 lg:mx-8">

        <table className="min-w-full bg-white border">
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
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
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

export default AdminApplicationsPage;
