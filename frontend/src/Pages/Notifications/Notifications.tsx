import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../../store/UserStore';
import { useJobStore } from '../../store/JobStore';
import { useApplicationStore } from '../../store/ApplicationStore';
import JobListTile from '../../components/Job/JobListTile';

const Notifications = () => {
  const updateJobList = useJobStore((state) => state.updateJobList);
  const jobList = useJobStore((state) => state.jobList);

  const updateApplicationList = useApplicationStore((state) => state.updateApplicationList);
  const applicationList = useApplicationStore((state) => state.applicationList);

  const [acceptedJobs, setAcceptedJobs] = useState([]);
  const [rejectedJobs, setRejectedJobs] = useState([]);
  const [isAcceptedVisible, setIsAcceptedVisible] = useState(true);
  const [isRejectedVisible, setIsRejectedVisible] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8000/api/v1/users/fetchapplications')
      .then((res) => {
        if (res.status !== 200) {
          toast.error('Error fetching applications');
          return;
        }
        updateApplicationList(res.data.application);
      });

    axios.get('http://localhost:8000/api/v1/users', { params: { page: 1, limit: 25 } })
      .then((res) => {
        if (res.status !== 200) {
          toast.error('Error fetching jobs');
          return;
        }
        updateJobList(res.data.jobs);
      });
  }, []);

  useEffect(() => {
    const acceptedApplications = applicationList.filter(app => app.status === 'accepted');
    const acceptedJobIds = acceptedApplications.map(app => app.jobid);
    const acceptedJobList = jobList.filter(job => acceptedJobIds.includes(job._id));
    setAcceptedJobs(acceptedJobList);

    const rejectedApplications = applicationList.filter(app => app.status === 'rejected');
    const rejectedJobIds = rejectedApplications.map(app => app.jobid);
    const rejectedJobList = jobList.filter(job => rejectedJobIds.includes(job._id));
    setRejectedJobs(rejectedJobList);
  }, [applicationList, jobList]);

  const handleJobClick = (jobId) => {
    navigate('/dashboard', { state: { selectedJobId: jobId } });
  };

  const toggleAcceptedVisibility = () => {
    setIsAcceptedVisible(!isAcceptedVisible);
  };

  const toggleRejectedVisibility = () => {
    setIsRejectedVisible(!isRejectedVisible);
  };

  return (
    <div
      data-testid="notifications-content" 
      className="min-h-screen bg-cover bg-center flex items-center justify-center" 
      style={{
        backgroundImage: "url('/images/profile.svg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="bg-white bg-opacity-80 backdrop-blur-lg p-8 rounded-lg shadow-md w-full max-w-3xl">
        {/* Accepted Jobs Section */}
        <div className="mb-8">
          <h1 className="flex items-center justify-between text-2xl font-semibold text-[#1e90ff] mb-4">
            Accepted Jobs ({acceptedJobs.length})
            <span 
              onClick={toggleAcceptedVisibility} 
              className="cursor-pointer text-lg transition-transform duration-200"
            >
              {isAcceptedVisible ? '▼' : '▲'}
            </span>
          </h1>
          {isAcceptedVisible && (
            <div className="space-y-4">
              {acceptedJobs.length > 0 ? (
                acceptedJobs.map(job => (
                  <div 
                    key={job._id} 
                    onClick={() => handleJobClick(job._id)} 
                    className="p-4 bg-[#1e90ff] rounded-lg shadow-md text-white cursor-pointer hover:bg-blue-600 transition duration-200"
                  >
                    <JobListTile data={job} action="view-details" />
                  </div>
                ))
              ) : (
                <p className="text-gray-600">No accepted job notifications.</p>
              )}
            </div>
          )}
        </div>

        {/* Rejected Jobs Section */}
        <div className="mb-8">
          <h1 className="flex items-center justify-between text-2xl font-semibold text-[#1e90ff] mb-4">
            Rejected Jobs ({rejectedJobs.length})
            <span 
              onClick={toggleRejectedVisibility} 
              className="cursor-pointer text-lg transition-transform duration-200"
            >
              {isRejectedVisible ? '▼' : '▲'}
            </span>
          </h1>
          {isRejectedVisible && (
            <div className="space-y-4">
              {rejectedJobs.length > 0 ? (
                rejectedJobs.map(job => (
                  <div 
                    key={job._id} 
                    onClick={() => handleJobClick(job._id)} 
                    className="p-4 bg-gray-200 rounded-lg shadow-md cursor-pointer hover:bg-gray-300 transition duration-200"
                  >
                    <JobListTile data={job} action="view-details" />
                  </div>
                ))
              ) : (
                <p className="text-gray-600">No rejected job notifications.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notifications;
