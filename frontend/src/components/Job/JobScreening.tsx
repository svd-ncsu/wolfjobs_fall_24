import { useEffect, useState } from "react";
import { useApplicationStore } from "../../store/ApplicationStore";
import { Button } from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import { useSearchParams } from "react-router-dom";
import { sendEmailNotification } from "../../utils/emailUtils";

const JobScreening = (props: any) => {
  const { jobData, isDarkMode }: { jobData: Job; isDarkMode: boolean } = props;
  const [searchParams] = useSearchParams();
  const [displayList, setDisplayList] = useState<Application[]>([]);
  const applicationList = useApplicationStore((state) => state.applicationList);

  useEffect(() => {
    setDisplayList(
      applicationList.filter(
        (item) => item.jobid === jobData._id && item.status === "applied"
      )
    );
  }, [searchParams, applicationList, jobData._id]);

  const handleAccept = async (applicationId: string, email: string, name: string) => {
    const url = "http://localhost:8000/api/v1/users/modifyApplication";

    const body = {
      applicationId: applicationId,
      status: "screening",
    };

    try {
      const res = await axios.post(url, body);
      if (res.status === 200) {
        toast.success("Accepted candidate");
        const emailSent = await sendEmailNotification(email, name, `Accepted in ${body.status}`, `Your Application has successfully passed the ${body.status} stage!`);
        if (emailSent) {
          toast.success("Email notification sent.");
        } else {
          toast.error("Failed to send email notification.");
        }
        setDisplayList(prevList => prevList.filter(item => item._id !== applicationId));
      } else {
        toast.error("Failed to accept candidate");
      }
    } catch (error) {
      console.error("Error accepting candidate:", error);
      toast.error("An error occurred while accepting the candidate.");
    }
  };

  const handleReject = async (applicationId: string, email: string, name: string) => {
    const url = "http://localhost:8000/api/v1/users/modifyApplication";

    const body = {
      applicationId: applicationId,
      status: "rejected",
    };

    try {
      const res = await axios.post(url, body);
      if (res.status === 200) {
        toast.success("Rejected candidate");
        const emailSent = await sendEmailNotification(email, name, `Rejected in Screening Stage`, `We regret to inform you that your application did not pass the Screening stage.`);
        if (emailSent) {
          toast.success("Email notification sent.");
        } else {
          toast.error("Failed to send email notification.");
        }
        setDisplayList(prevList => prevList.filter(item => item._id !== applicationId));
      } else {
        toast.error("Failed to reject candidate");
      }
    } catch (error) {
      console.error("Error rejecting candidate:", error);
      toast.error("An error occurred while rejecting the candidate.");
    }
  };

  return (
    <>
      <div
        className={`text-2xl font-semibold ${isDarkMode ? 'text-yellow-300' : 'text-gray-700'} mb-4`}
      >
        Screening
      </div>
      {displayList.length === 0 && (
        <div className={`text-base ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>List empty</div>
      )}
      {displayList?.map((item: Application) => (
        <div className="p-2" key={item._id}>
          <div
            className={`p-4 mx-1 my-2 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200`}
          >
            <div className="flex flex-row justify-between items-center">
              <div className={`flex flex-col ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                <div className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-600'}`}>Name: {item.applicantname}</div>
                {!!item?.phonenumber && <div>Phone: {item.phonenumber}</div>}
                <div>Email: {item.applicantemail}</div>
                {!!item?.applicantSkills && <div>Skills: {item.applicantSkills}</div>}
                <div className="flex justify-center px-2 py-1 mt-2 border border-gray-300 rounded-md">
                  <a
                    href={`/resumeviewer/${item.applicantid}`}
                    className="text-blue-600 underline hover:text-blue-700 transition-colors duration-150"
                  >
                    View Resume
                  </a>
                </div>
              </div>
              <div className="flex flex-row gap-2">
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    handleAccept(item._id, item.applicantemail, item.applicantname);
                  }}
                  variant="contained"
                  sx={{
                    backgroundColor: "#4CAF50",
                    color: "#ffffff",
                    "&:hover": { backgroundColor: "#388E3C" },
                  }}
                >
                  Accept
                </Button>
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    handleReject(item._id, item.applicantemail, item.applicantname);
                  }}
                  variant="contained"
                  sx={{
                    backgroundColor: "#FF5353",
                    color: "#ffffff",
                    "&:hover": { backgroundColor: "#D32F2F" },
                  }}
                >
                  Reject
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default JobScreening;
