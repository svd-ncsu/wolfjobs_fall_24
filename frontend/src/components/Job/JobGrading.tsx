import { useEffect, useState } from "react";
import { useApplicationStore } from "../../store/ApplicationStore";
import { Button } from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import { useSearchParams } from "react-router-dom";
import { sendEmailNotification } from "../../utils/emailUtils";

const JobGrading = (props: any) => {
  const { jobData }: { jobData: Job } = props;

  const [displayList, setDisplayList] = useState<Application[]>([]);
  const [searchParams] = useSearchParams();

  const applicationList = useApplicationStore((state) => state.applicationList);

  useEffect(() => {
    setDisplayList(
      applicationList.filter(
        (item) => item.jobid === jobData._id && item.status === "grading"
      )
    );
  }, [searchParams]);

  const handleScoring = async (applicationId: string, grade: string) => {
    const url = "http://localhost:8000/api/v1/users/modifyApplication";
  
    const body = {
      applicationId: applicationId,
      status: "rating", // Proceeding to the next stage
      rating: grade, // Include the grade
    };
  
    try {
      const res = await axios.post(url, body);
  
      if (res.status === 200) {
        toast.success(`Successfully graded the application`);
        
        // Optional: Notify the applicant
        const applicant = displayList.find((item) => item._id === applicationId);
        if (applicant) {
          await sendEmailNotification(
            applicant.applicantemail,
            applicant.applicantname,
            "Graded",
            `Your application has been graded with a score of ${grade}. It is now under review.`
          );
        }
  
        // Refresh the list to reflect updates
        setDisplayList((prevList) =>
          prevList.filter((item) => item._id !== applicationId)
        );
  
        return;
      }
      toast.error("Failed to grade the application. Please try again.");
    } catch (error) {
      console.error("Error grading the application:", error);
      toast.error("An error occurred while grading the application.");
    }
  };

  return (
    <>
      <div className="text-2xl font-semibold text-gray-700 dark:text-black mb-4">Grading</div>
      {displayList.length === 0 && (
        <div className="text-base text-gray-500 font-lato">List empty</div>
      )}
      {displayList?.map((item: Application) => (
        <div className="p-1">
          <div className="bg-white my-2 mx-1 p-2 rounded-lg shadow-md">
            <div className="flex flex-col font-lato">
              <div className="flex flex-col text-gray-800">
                <div> Name: {item.applicantname} </div>
                {!!item?.phonenumber && <div>Phone: {item.phonenumber} </div>}
                <div>Email: {item.applicantemail}</div>
                {!!item?.applicantSkills && (
                  <div>Skills: {item.applicantSkills}</div>
                )}
              </div>
              <div className="text-xl mt-4 font-lato">Grade the questions</div>
              <div className="text-base font-lato">{jobData.question1}</div>
              <div className="text-base text-[#1E90FF] font-lato">
                {item.answer1 || "empty"}
              </div>
              <div className="text-base font-lato">{jobData.question2}</div>
              <div className="text-base text-[#1E90FF] font-lato">
                {item.answer2 || "empty"}
              </div>
              <div className="text-base font-lato">{jobData.question3}</div>
              <div className="text-base text-[#1E90FF] font-lato">
                {item.answer3 || "empty"}
              </div>
              <div className="text-base font-lato">{jobData.question4}</div>
              <div className="text-base text-[#1E90FF] font-lato">
                {item.answer4 || "empty"}
              </div>
              <div className="text-xl mt-4 font-lato">Grade</div>
              <div className="flex flex-row items-center">
                <input
                  className="border border-gray-700 rounded-lg w-20 text-right px-1 font-lato"
                  type="number"
                  id={`${item._id}-grade`}
                  max={10}
                  min={0}
                />
                <div className="w-4" />
                <Button
                  type="button"
                  variant="outlined"
                  onClick={() => {
                    const x: any = document.getElementById(`${item._id}-grade`);
                    const grade: string = x.value || "";
                    handleScoring(item._id, grade.toString());
                  }}
                  className="font-lato"
                  style={{
                    borderColor: "#1E90FF",
                    color: "#1E90FF",
                  }}
                >
                  Grade
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default JobGrading;

