import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useJobStore } from "../../store/JobStore";
import NoJobSelected from "./NoJobSelected";
import JobDetail from "./JobDetails";

const JobDetailView = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const [searchParams] = useSearchParams();
  const [jobData, setJobData] = useState<Job | null>(null); // Ensure initial state is `null`
  const jobsList = useJobStore((state) => state.jobList);

  useEffect(() => {
    const jobId = searchParams.get("jobId");
    if (jobId) {
      setJobData(jobsList.find((item) => item._id === jobId) || null);
    } else {
      setJobData(null);
    }
  }, [searchParams, jobsList]);

  return (
    <div className="w-8/12" style={{ height: "calc(100vh - 72px)" }}>
      {!jobData && <NoJobSelected isDarkMode={isDarkMode}/>}
      {!!jobData && <JobDetail jobData={jobData} isDarkMode={isDarkMode} />}
    </div>
  );
};

export default JobDetailView;
