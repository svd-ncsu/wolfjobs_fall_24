import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Define a simple CSS style object for the components
const styles = {
  container: {
    maxWidth: '800px',
    margin: '20px auto',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    backgroundColor: '#f9f9f9',
  },
  title: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  jobList: {
    listStyleType: 'none',
    padding: '0',
  },
  jobItem: {
    padding: '15px',
    marginBottom: '10px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    backgroundColor: '#fff',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    margin: '10px 0',
  },
  button: {
    padding: '8px 12px',
    border: 'none',
    borderRadius: '5px',
    backgroundColor: '#f44336', // Red background for delete button
    color: '#fff',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  buttonHover: {
    backgroundColor: '#d32f2f', // Darker red on hover
  },
};

const Admin: React.FC = () => {
  const [jobs, setJobs] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchJobs = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/v1/users');
      console.log(response.data);

      if (response.data && response.data.jobs) {
        const jobs = response.data.jobs;
        console.log(jobs);
        setJobs(jobs);
      } else {
        console.error('Failed to fetch jobs:', response.data.message);
        setError(response.data.message);
      }
    } catch (error) {
      console.error('Error fetching jobs:', error);
      setError('Failed to fetch jobs');
    }
  };

  const deleteUser = async (jobId: string) => {
    try {
      const response = await axios.delete(`http://localhost:8000/api/v1/users/${jobId}`);
      console.log('Delete response:', response.data);
      setJobs(jobs.filter(job => job._id !== jobId));
    } catch (err) {
      setError('Failed to delete job');
      console.error(err);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Admin Panel</h1>
      {error && <p style={styles.error}>{error}</p>}
      <h2>Job List</h2>
      {jobs.length === 0 ? (
        <p>No jobs found.</p>
      ) : (
        <ul style={styles.jobList}>
          {jobs.map(job => (
            <li key={job._id} style={styles.jobItem}>
              <div>
                <strong>{job.name}</strong> - {job.description}
              </div>
              <button
                style={styles.button}
                onClick={() => deleteUser(job._id)}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor)}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = styles.button.backgroundColor)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Admin;
