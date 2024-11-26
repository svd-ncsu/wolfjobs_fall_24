import axios from "axios";
import { useUserStore } from "../../store/UserStore";
import { useForm } from "react-hook-form";
import { Button, Stack, TextField } from "@mui/material";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useApplicationStore } from "../../store/ApplicationStore";
import JobManagerView from "./JobManagerView";

type FormValues = {
  answer1: string;
  answer2: string;
  answer3: string;
  answer4: string;
};

const JobDetail = (props: any) => {
  const { jobData, isDarkMode }: { jobData: Job; isDarkMode: boolean } = props;
  console.log("isDarkMode:", isDarkMode);

  const jobType = jobData.type === "part-time" ? "Part Time" : "Full Time";
  const applicationList: Application[] = useApplicationStore(
    (state) => state.applicationList
  );

  const applicantemail = useUserStore((state) => state.email);
  const userId = useUserStore((state) => state.id);
  const applicantname = useUserStore((state) => state.name);
  const applicantSkills = useUserStore((state) => state.skills);
  const applicantNumber = useUserStore((state) => state.phonenumber);
  const role = useUserStore((state) => state.role);

  const [application, setApplication] = useState<Application | null>(null);
  const [showApply, setShowApply] = useState(false);
  const [showQuestionnaire, setShowQuestionnaire] = useState(false);

  const userRole = useUserStore((state) => state.role);

  useEffect(() => {
    const temp: Application | undefined = applicationList.find(
      (item: Application) => {
        return item.jobid === jobData._id && item.applicantid === userId;
      }
    );
    setApplication(temp || null);
  }, [jobData]);

  useEffect(() => {
    if (role === "Manager") {
      setShowQuestionnaire(false);
    } else {
      const temp: Application | undefined = applicationList.find(
        (item) =>
          item.jobid === jobData._id &&
          item.status === "screening" &&
          item.applicantid === userId
      );
      setShowQuestionnaire(!!temp || false);
    }
  }, [jobData, applicationList, userId]);

  useEffect(() => {
    if (role === "Manager") {
      setShowApply(false);
    } else {
      const temp: Application | undefined = applicationList.find(
        (item) => jobData._id === item.jobid
      );
      setShowApply(!temp || false);
    }
  }, [jobData]);

  const form = useForm<FormValues>({
    defaultValues: {
      answer1: "",
      answer2: "",
      answer3: "",
      answer4: "",
    },
  });
  const { register, handleSubmit } = form;

  const handleApplyJob = (e: any) => {
    e.preventDefault();
    const body = {
      applicantname,
      applicantid: userId,
      applicantemail,
      applicantSkills,
      phonenumber: applicantNumber,
      managerid: jobData.managerid,
      jobname: jobData.name,
      jobid: jobData._id,
    };

    axios
      .post("http://localhost:8000/api/v1/users/createapplication", body)
      .then((res) => {
        if (res.status !== 200) {
          toast.error("Failed to apply");
          return;
        }
        location.reload();
        toast.success("Applied successfully");
      });
  };

  const handleAnswerQuestionnaire = (data: FormValues) => {
    const url = "http://localhost:8000/api/v1/users/modifyApplication";

    const body = {
      applicationId: application?._id,
      status: "grading",
      answer1: data.answer1,
      answer2: data.answer2,
      answer3: data.answer3,
      answer4: data.answer4,
    };

    axios.post(url, body).then((res) => {
      if (res.status == 200) {
        toast.success("Accepted candidate");
        location.reload();
        return;
      }
      toast.error("Failed to accept candidate");
    });
  };

  return (
    <div
      className="w-full max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg"
      style={{
        marginTop: "80px",
        fontFamily: "'Poppins', sans-serif",
        backgroundImage: isDarkMode ? "url('/images/dashboardd.png')" : 'url("/images/jd.svg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: isDarkMode ? "#000" : "#FFF",
      }}
    >
      {/* Job Details Section */}
      <div className="mb-8">
        <h2 className="text-3xl font-extrabold text-blue-700 mb-4"
          style={{color: isDarkMode ? "#E2B127" : "#1D4ED8"}}
        >
          Job Details
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-xl font-semibold" style={{color: isDarkMode ? "#FFF" : "#000"}}>
              Role: <span className="font-normal" >{jobData.name}</span>
            </div>
            <div className="text-xl font-semibold" style={{color: isDarkMode ? "#FFF" : "#000"}}>
              Job Status:{" "}
              <span
                className={`font-normal ${
                  jobData.status === "open"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {jobData.status}
              </span>
            </div>
            <div className="text-xl font-semibold" style={{color: isDarkMode ? "#FFF" : "#000"}}>
              Type: <span className="font-normal">{jobType}</span>
            </div>
            <div className="text-xl font-semibold" style={{color: isDarkMode ? "#FFF" : "#000"}}>
              Location: <span className="font-normal">{jobData.location}</span>
            </div>
            <div className="text-xl font-semibold" style={{color: isDarkMode ? "#FFF" : "#000"}}>
              Required Skills:{" "}
              <span className="font-normal">{jobData.requiredSkills}</span>
            </div>
            {userRole === "Applicant" && (
              <div className="text-xl font-semibold mt-4" style={{color: isDarkMode ? "#FFF" : "#000"}}>
                Application Status:{" "}
                <span className="font-normal">
                  {application?.status
                    ? application.status.charAt(0).toUpperCase() +
                      application.status.slice(1)
                    : "In Review"}
                </span>
              </div>
            )}
          </div>
          <div className="text-right text-4xl font-extrabold text-blue-700"
          style={{color: isDarkMode ? "#E2B127" : "#1D4ED8"}}
          >
            {jobData.pay}$/hr
          </div>
        </div>
      </div>

      {/* Description Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-extrabold text-blue-700 mb-4"
          style={{color: isDarkMode ? "#E2B127" : "#1D4ED8"}}
          >
          Description
        </h2>
        <p className="text-gray-700 text-lg" style={{color: isDarkMode ? "#C8BEAE" : "#374151"}}
        >{jobData.description}</p>
      </div>

      {/* Application and Questionnaire Section */}
      {role === "Applicant" && jobData.status === "open" && (
        <div>
          {showQuestionnaire && (
            <div className="mb-8">
              <h2 className="text-2xl font-extrabold text-blue-700 mb-4"
              style={{color: isDarkMode ? "#E2B127" : "#1D4ED8"}}
              >
                Fill Questionnaire
              </h2>
              <form onSubmit={handleSubmit(handleAnswerQuestionnaire)} noValidate>
                <Stack spacing={3}>
                  <TextField
                    label={jobData.question1}
                    variant="outlined"
                    {...register("answer1")}
                    fullWidth
                  />
                  <TextField
                    label={jobData.question2}
                    variant="outlined"
                    {...register("answer2")}
                    fullWidth
                  />
                  <TextField
                    label={jobData.question3}
                    variant="outlined"
                    {...register("answer3")}
                    fullWidth
                  />
                  <TextField
                    label={jobData.question4}
                    variant="outlined"
                    {...register("answer4")}
                    fullWidth
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    style={{
                      backgroundColor: isDarkMode ? "#E16F00" : "#1E90FF",
                      color: isDarkMode ? "#000" : "#FFF",
                      borderRadius: "8px",
                      textTransform: "none",
                    }}
                  >
                    Submit
                  </Button>
                </Stack>
              </form>
            </div>
          )}

          {showApply && (
            <Button
              onClick={handleApplyJob}
              variant="contained"
              style={{
                backgroundColor: isDarkMode ? "#E16F00" : "#1E90FF",
                color: isDarkMode ? "#000" : "#FFF",
                borderRadius: "8px",
                textTransform: "none",
                fontSize: "16px",
                padding: "10px 20px",
              }}
            >
              Apply Now
            </Button>
          )}
        </div>
      )}

      {/* Manager View */}
      {role === "Manager" && userId === jobData.managerid && jobData.status === "open" && (
        <div>
          <JobManagerView isDarkMode={isDarkMode} jobData={jobData} />
        </div>
      )}
    </div>
  );
};

export default JobDetail;
