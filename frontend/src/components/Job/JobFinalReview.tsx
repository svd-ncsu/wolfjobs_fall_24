import { useEffect, useState } from "react";
import { useApplicationStore } from "../../store/ApplicationStore";
import { useSearchParams } from "react-router-dom";

const JobFinalReview = (props: any) => {
  const { jobData, isDarkMode }: { jobData: Job; isDarkMode: boolean } = props;
  const [acceptedList, setAcceptedList] = useState<Application[]>([]);
  const [rejectedList, setRejectedList] = useState<Application[]>([]);
  const [searchParams] = useSearchParams();

  const applicationList = useApplicationStore((state) => state.applicationList);

  useEffect(() => {
    setAcceptedList(
      applicationList.filter(
        (item) => item.jobid === jobData._id && item.status === "accepted"
      )
    );
    setRejectedList(
      applicationList.filter(
        (item) => item.jobid === jobData._id && item.status === "rejected"
      )
    );
  }, [searchParams, applicationList, jobData._id]);

  return (
    <>
      <div
        className={`text-2xl font-semibold mb-4 ${
          isDarkMode ? "text-yellow-300" : "text-gray-700"
        }`}
      >
        Final Review
      </div>
      
      {/* Accepted Candidates Section */}
      <div
        className={`text-xl font-semibold mb-2 ${
          isDarkMode ? "text-green-400" : "text-green-600"
        }`}
      >
        Accepted Candidates
      </div>
      {acceptedList.length === 0 && (
        <div
          className={`text-base ${
            isDarkMode ? "text-gray-400" : "text-gray-500"
          }`}
        >
          No accepted candidates
        </div>
      )}
      {acceptedList.map((item: Application) => (
        <div className="p-2" key={item._id}>
          <div
            className={`p-4 mx-1 my-2 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 ${
              isDarkMode ? "bg-gray-800 text-gray-200" : "bg-white text-gray-700"
            }`}
          >
            <div className="flex flex-col">
              <div className="font-medium">Name: {item.applicantname}</div>
              {!!item?.phonenumber && <div>Phone: {item.phonenumber}</div>}
              <div>Email: {item.applicantemail}</div>
              {!!item?.applicantSkills && (
                <div>Skills: {item.applicantSkills}</div>
              )}
              <div
                className={`flex justify-center px-2 py-1 mt-2 border rounded-md ${
                  isDarkMode
                    ? "border-gray-600 text-green-300"
                    : "border-gray-300 text-green-600"
                }`}
              >
                <a
                  href={`/resumeviewer/${item.applicantid}`}
                  className={`underline transition-colors duration-150 ${
                    isDarkMode
                      ? "hover:text-green-400"
                      : "hover:text-green-700"
                  }`}
                >
                  View Resume
                </a>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Rejected Candidates Section */}
      <div
        className={`text-xl font-semibold mb-2 ${
          isDarkMode ? "text-red-400" : "text-red-600"
        }`}
      >
        Rejected Candidates
      </div>
      {rejectedList.length === 0 && (
        <div
          className={`text-base ${
            isDarkMode ? "text-gray-400" : "text-gray-500"
          }`}
        >
          No rejected candidates
        </div>
      )}
      {rejectedList.map((item: Application) => (
        <div className="p-2" key={item._id}>
          <div
            className={`p-4 mx-1 my-2 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 ${
              isDarkMode ? "bg-gray-800 text-gray-200" : "bg-white text-gray-700"
            }`}
          >
            <div className="flex flex-col">
              <div className="font-medium">
                <span
                  className={`${
                    isDarkMode ? "text-red-300" : "text-red-600"
                  }`}
                >
                  Name:
                </span>{" "}
                {item.applicantname}
              </div>
              {!!item?.phonenumber && <div>Phone: {item.phonenumber}</div>}
              <div>
                <span
                  className={`${
                    isDarkMode ? "text-red-300" : "text-red-600"
                  }`}
                >
                  Email:
                </span>{" "}
                {item.applicantemail}
              </div>
              {!!item?.applicantSkills && (
                <div>
                  <span
                    className={`${
                      isDarkMode ? "text-red-300" : "text-red-600"
                    }`}
                  >
                    Skills:
                  </span>{" "}
                  {item.applicantSkills}
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default JobFinalReview;
