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

  useEffect(() => {
    // Fetch managers from the backend
    const fetchManagers = async () => {
      try {
        //console.log("before ")
        const response = await axios.get("http://localhost:8000/api/v1/users/getmanagers"); // Replace with your backend URL
        //console.log("before ")
        if (response.data.success) {
          setManagers(response.data.data.managers);
          //console.log("data")
          //console.log(response.data.data.managers);
          //console.log("Managers:")
          //console.log(managers)
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
        managerId, // Send the manager ID in the request body
      });

      if (response.data.success) {
        // Update the state to remove the deleted manager
        setManagers(managers.filter((manager) => manager._id !== managerId));
        toast.success("Succesfully Deleted Manager");
      } else {
        console.error("Failed to delete manager");
        toast.error("Failed to delete");
      }
    } catch (err) {
      console.error("Error deleting manager:", err);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Managers</h1>

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
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Password</th>
              <th className="border px-4 py-2">Affiliation</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {managers.map((manager,index) => (
              // <tr key={manager._id}>
              <tr>
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2">{manager.name}</td>
                <td className="border px-4 py-2">{manager.email}</td>
                <td className="border px-4 py-2">{manager.password}</td>
                <td className="border px-4 py-2">{manager.affiliation}</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => deleteManager(manager._id)}
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

export default AdminManagerPage;
