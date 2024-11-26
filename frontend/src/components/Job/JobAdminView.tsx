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

const JobAdminView = (props: any) => {
  const { jobData }: { jobData: Job } = props;
  const role = useUserStore((state) => state.role);
  //const userId = useUserStore((state) => state.id);

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
          toast.error("Failed to apply");
          return;
        }
        toast.success("Job closed");
        location.reload();
      });
  };

  const handleDeleteJob = (e: any) => {
    e.preventDefault();
    console.log("Delete job");

    const body = {
      jobid: jobData._id,
    };

    axios
      .post("http://localhost:8000/api/v1/users/deletejob", body)
      .then((res) => {
        if (res.status !== 200) {
          toast.error("Failed to delete");
          return;
        }
        toast.success("Job deleted");
        location.reload();
      });
  };

  return (
    <>
      {role === "Admin" && (
        <div className="m-4" >
          <div className="m-4" style={{ display: "flex", gap: "10px" }}>
          {jobData.status === "open" && (
            <div className="mx-2">
              <Button
                onClick={handleCloseJob}
                type="button"
                variant="outlined"
                style={{
                  color: "#1E90FF",
                  borderColor: "#1E90FF",
                  textTransform: "none",
                  fontSize: "16px",
                  minWidth: "200px",
                  margin: "10px",
                }}
              >
                Close job
              </Button>
            </div>
          )}
          <div className="mx-2">
            <Button
              onClick={handleDeleteJob}
              type="button"
              variant="outlined"
              style={{
                color: "#1E90FF",
                borderColor: "#1E90FF",
                textTransform: "none",
                fontSize: "16px",
                minWidth: "200px",
                margin: "10px",
              }}
            >
              Delete job
            </Button>
          
          </div>
          </div>
          {jobData.status === "open" && (
            <div className="text-2xl my-4 text-blue-800">Candidates Review</div>
          )}
          {jobData.status === "open" && (
            <div className="flex flex-row justify-around">
              <Button
                onClick={() => {
                  const jobId = searchParams.get("jobId")!;
                  setSearchParams({ jobId: jobId, view: "job-screening" });
                }}
                type="button"
                variant={viewManager === "job-screening" ? "contained" : "text"}
                fullWidth={true}
                style={{
                  borderColor: viewManager === "job-screening" ? "" : "#FF5353",
                  color:
                    viewManager === "job-screening" ? "#FFFFFF" : "#1E90FF",
                  backgroundColor:
                    viewManager === "job-screening" ? "#1E90FF" : "",
                }}
              >
                Screening
              </Button>
              <Button
                onClick={() => {
                  const jobId = searchParams.get("jobId")!;
                  setSearchParams({ jobId: jobId, view: "job-grading" });
                }}
                type="button"
                variant={viewManager === "job-grading" ? "contained" : "text"}
                fullWidth={true}
                style={{
                  borderColor: viewManager === "job-grading" ? "" : "#FF5353",
                  color: viewManager === "job-grading" ? "#FFFFFF" : "#1E90FF",
                  backgroundColor:
                    viewManager === "job-grading" ? "#1E90FF" : "",
                }}
              >
                Grading
              </Button>
              <Button
                onClick={() => {
                  const jobId = searchParams.get("jobId")!;
                  setSearchParams({ jobId: jobId, view: "job-rating" });
                }}
                type="button"
                variant={viewManager === "job-rating" ? "contained" : "text"}
                fullWidth={true}
                style={{
                  color: viewManager === "job-rating" ? "#FFFFFF" : "#1E90FF",
                  backgroundColor:
                    viewManager === "job-rating" ? "#1E90FF" : "",
                }}
              >
                Rating
              </Button>
              <Button
                onClick={() => {
                  const jobId = searchParams.get("jobId")!;
                  setSearchParams({
                    jobId: jobId,
                    view: "job-final-review",
                  });
                }}
                type="button"
                variant={
                  viewManager === "job-final-review" ? "contained" : "text"
                }
                fullWidth={true}
                style={{
                  borderColor:
                    viewManager === "job-final-review" ? "" : "#FF5353",
                  color:
                    viewManager === "job-final-review" ? "#FFFFFF" : "#1E90FF",
                  backgroundColor:
                    viewManager === "job-final-review" ? "#1E90FF" : "",
                }}
              >
                Review
              </Button>
            </div>
          )}
        </div>
      )}
  
      <div className="m-4">
        {viewManager === "job-screening" && <JobScreening jobData={jobData} />}
        {viewManager === "job-grading" && <JobGrading jobData={jobData} />}
        {viewManager === "job-rating" && <JobRating jobData={jobData} />}
        {viewManager === "job-final-review" && (
          <JobFinalReview jobData={jobData} />
        )}
      </div>
    </>
  );
  
};

export default JobAdminView;


