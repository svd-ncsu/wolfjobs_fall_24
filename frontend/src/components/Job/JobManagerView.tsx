import { Button } from "@mui/material";
import { useUserStore } from "../../store/UserStore";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import JobScreening from "./JobScreening";
import JobGrading from "./JobGrading";
import JobRating from "./JobRating";
import JobFinalReview from "./JobFinalReview";
import { toast } from "react-toastify";

const JobManagerView = (props: { jobData: Job; isDarkMode: boolean }) => {
  const { jobData, isDarkMode } = props;
  const role = useUserStore((state) => state.role);
  const userId = useUserStore((state) => state.id);

  const [searchParams, setSearchParams] = useSearchParams();
  const [viewManager, setViewManager] = useState("job-screening");

  useEffect(() => {
    const jobManager: string = searchParams.get("view") || "job-screening";
    setViewManager(jobManager);
  }, [searchParams, jobData]);

  const handleCloseJob = (e: any) => {
    e.preventDefault();
    console.log("Close job");

    const body = {
      jobid: jobData._id,
    };

    axios
      .post("http://localhost:8000/api/v1/users/closejob", body)
      .then((res) => {
        if (res.status !== 200) {
          toast.error("Failed to close the job");
          return;
        }
        toast.success("Job closed");
        location.reload();
      });
  };

  return (
    <>
      {role === "Manager" &&
        userId === jobData.managerid &&
        jobData.status === "open" && (
          <div className="m-4">
            <div className="mx-2">
              <Button
                onClick={handleCloseJob}
                type="button"
                variant="outlined"
                style={{
                  color: isDarkMode ? "#FFD700" : "#1E90FF",
                  borderColor: isDarkMode ? "#FFD700" : "#1E90FF",
                  textTransform: "none",
                  fontSize: "16px",
                  minWidth: "200px",
                  margin: "10px",
                }}
              >
                Close job
              </Button>
            </div>
            <div
              className={`text-2xl my-4 ${
                isDarkMode ? "text-yellow-300" : "text-blue-800"
              }`}
              style={{color: isDarkMode ? "#E2B127" : "#1D4ED8"}}
            >
              Candidates Review
            </div>
            <div className="flex flex-row justify-around">
              <Button
                onClick={() => {
                  const jobId: string = searchParams.get("jobId")!;
                  setSearchParams({ jobId: jobId, view: "job-screening" });
                }}
                type="button"
                variant={viewManager === "job-screening" ? "contained" : "text"}
                fullWidth={true}
                style={{
                  color: viewManager === "job-screening" ? "#FFFFFF" : isDarkMode ? "#FFD700" : "#1E90FF",
                  backgroundColor:
                    viewManager === "job-screening"
                      ? isDarkMode
                        ? "#555555"
                        : "#1E90FF"
                      : "",
                }}
              >
                Screening
              </Button>
              <Button
                onClick={() => {
                  const jobId: string = searchParams.get("jobId")!;
                  setSearchParams({ jobId: jobId, view: "job-grading" });
                }}
                type="button"
                variant={viewManager === "job-grading" ? "contained" : "text"}
                fullWidth={true}
                style={{
                  color: viewManager === "job-grading" ? "#FFFFFF" : isDarkMode ? "#FFD700" : "#1E90FF",
                  backgroundColor:
                    viewManager === "job-grading"
                      ? isDarkMode
                        ? "#555555"
                        : "#1E90FF"
                      : "",
                }}
              >
                Grading
              </Button>
              <Button
                onClick={() => {
                  const jobId: string = searchParams.get("jobId")!;
                  setSearchParams({ jobId: jobId, view: "job-rating" });
                }}
                type="button"
                variant={viewManager === "job-rating" ? "contained" : "text"}
                fullWidth={true}
                style={{
                  color: viewManager === "job-rating" ? "#FFFFFF" : isDarkMode ? "#FFD700" : "#1E90FF",
                  backgroundColor:
                    viewManager === "job-rating"
                      ? isDarkMode
                        ? "#555555"
                        : "#1E90FF"
                      : "",
                }}
              >
                Rating
              </Button>
              <Button
                onClick={() => {
                  const jobId: string = searchParams.get("jobId")!;
                  setSearchParams({ jobId: jobId, view: "job-final-review" });
                }}
                type="button"
                variant={
                  viewManager === "job-final-review" ? "contained" : "text"
                }
                fullWidth={true}
                style={{
                  color: viewManager === "job-final-review" ? "#FFFFFF" : isDarkMode ? "#FFD700" : "#1E90FF",
                  backgroundColor:
                    viewManager === "job-final-review"
                      ? isDarkMode
                        ? "#555555"
                        : "#1E90FF"
                      : "",
                }}
              >
                Review
              </Button>
            </div>
          </div>
        )}
      <div className="m-4">
        {viewManager === "job-screening" && (
          <JobScreening jobData={jobData} isDarkMode={isDarkMode} />
        )}
        {viewManager === "job-grading" && (
          <JobGrading jobData={jobData} isDarkMode={isDarkMode} />
        )}
        {viewManager === "job-rating" && (
          <JobRating jobData={jobData} isDarkMode={isDarkMode} />
        )}
        {viewManager === "job-final-review" && (
          <JobFinalReview jobData={jobData} isDarkMode={isDarkMode} />
        )}
      </div>
    </>
  );
};

export default JobManagerView;
