import { useEffect, useState } from "react";
import { useApplicationStore } from "../../store/ApplicationStore";
import { Button } from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import { useSearchParams } from "react-router-dom";

const JobGrading = (props: any) => {
  const { jobData, isDarkMode }: { jobData: Job; isDarkMode: boolean } = props;

  const [displayList, setDisplayList] = useState<Application[]>([]);
  const [searchParams] = useSearchParams();

  const applicationList = useApplicationStore((state) => state.applicationList);

  useEffect(() => {
    setDisplayList(
      applicationList.filter(
        (item) => item.jobid === jobData._id && item.status === "grading"
      )
    );
  }, [searchParams, applicationList, jobData._id]);

  const handleScoring = (applicationId: string, grade: string) => {
    const url = "http://localhost:8000/api/v1/users/modifyApplication";

    const body = {
      applicationId: applicationId,
      status: "rating",
      rating: grade,
    };

    axios.post(url, body).then((res) => {
      if (res.status === 200) {
        toast.success("Successfully graded the candidate");
        location.reload();
        return;
      }
      toast.error("Failed to grade the candidate");
    });
  };

  return (
    <>
      <div
        className={`text-2xl font-semibold mb-4 ${
          isDarkMode ? "text-yellow-300" : "text-gray-700"
        }`}
      >
        Grading
      </div>
      {displayList.length === 0 && (
        <div
          className={`text-base font-lato ${
            isDarkMode ? "text-gray-400" : "text-gray-500"
          }`}
        >
          List empty
        </div>
      )}
      {displayList?.map((item: Application) => (
        <div className="p-1" key={item._id}>
          <div
            className={`my-2 mx-1 p-2 rounded-lg shadow-md ${
              isDarkMode ? "bg-gray-800 text-gray-200" : "bg-white text-gray-800"
            }`}
          >
            <div className="flex flex-col font-lato">
              <div className="flex flex-col">
                <div> Name: {item.applicantname} </div>
                {!!item?.phonenumber && <div>Phone: {item.phonenumber} </div>}
                <div>Email: {item.applicantemail}</div>
                {!!item?.applicantSkills && (
                  <div>Skills: {item.applicantSkills}</div>
                )}
              </div>
              <div className="text-xl mt-4 font-lato">Grade the questions</div>
              <div className="text-base font-lato">{jobData.question1}</div>
              <div
                className={`text-base font-lato ${
                  isDarkMode ? "text-yellow-300" : "text-[#1E90FF]"
                }`}
              >
                {item.answer1 || "empty"}
              </div>
              <div className="text-base font-lato">{jobData.question2}</div>
              <div
                className={`text-base font-lato ${
                  isDarkMode ? "text-yellow-300" : "text-[#1E90FF]"
                }`}
              >
                {item.answer2 || "empty"}
              </div>
              <div className="text-base font-lato">{jobData.question3}</div>
              <div
                className={`text-base font-lato ${
                  isDarkMode ? "text-yellow-300" : "text-[#1E90FF]"
                }`}
              >
                {item.answer3 || "empty"}
              </div>
              <div className="text-base font-lato">{jobData.question4}</div>
              <div
                className={`text-base font-lato ${
                  isDarkMode ? "text-yellow-300" : "text-[#1E90FF]"
                }`}
              >
                {item.answer4 || "empty"}
              </div>
              <div className="text-xl mt-4 font-lato">Grade</div>
              <div className="flex flex-row items-center">
                <input
                  className={`border rounded-lg w-20 text-right px-1 font-lato ${
                    isDarkMode
                      ? "border-gray-500 bg-gray-700 text-gray-100"
                      : "border-gray-700"
                  }`}
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
                    borderColor: isDarkMode ? "#FFD700" : "#1E90FF",
                    color: isDarkMode ? "#FFD700" : "#1E90FF",
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
