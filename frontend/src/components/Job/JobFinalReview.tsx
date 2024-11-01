import { useEffect, useState } from "react";
import { useApplicationStore } from "../../store/ApplicationStore";
import { useSearchParams } from "react-router-dom";

const JobFinalReview = (props: any) => {
  const { jobData }: { jobData: Job } = props;
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
      <div className="text-2xl font-semibold text-gray-700 dark:text-black mb-4">
        Final Review
      </div>
      
      {/* Accepted Candidates Section */}
      <div className="text-xl font-semibold text-green-600 mb-2">Accepted Candidates</div>
      {acceptedList.length === 0 && (
        <div className="text-base text-gray-500">No accepted candidates</div>
      )}
      {acceptedList?.map((item: Application) => (
        <div className="p-2" key={item._id}>
          <div className="p-4 mx-1 my-2 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
            <div className="flex flex-col text-gray-700 dark:text-gray-200">
              <div className="font-medium">Name: {item.applicantname}</div>
              {!!item?.phonenumber && <div>Phone: {item.phonenumber}</div>}
              <div>Email: {item.applicantemail}</div>
              {!!item?.applicantSkills && (
                <div>Skills: {item.applicantSkills}</div>
              )}
              <div className="flex justify-center px-2 py-1 mt-2 border border-gray-300 rounded-md">
                <a
                  href={`/resumeviewer/${item.applicantid}`}
                  className="text-green-600 underline hover:text-green-700 transition-colors duration-150"
                >
                  View Resume
                </a>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Rejected Candidates Section */}
      <div className="text-xl font-semibold text-red-600 mb-2">Rejected Candidates</div>
      {rejectedList.length === 0 && (
        <div className="text-base text-gray-500">No rejected candidates</div>
      )}
      {rejectedList?.map((item: Application) => (
        <div className="p-2" key={item._id}>
          <div className="p-4 mx-1 my-2 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
            <div className="flex flex-col text-gray-700 dark:text-gray-200">
              <div className="font-medium">
                <span className="text-red-600">Name:</span> {item.applicantname}
              </div>
              {!!item?.phonenumber && <div>Phone: {item.phonenumber}</div>}
              <div>
                <span className="text-red-600">Email:</span> {item.applicantemail}
              </div>
              {!!item?.applicantSkills && (
                <div>
                  <span className="text-red-600">Skills:</span> {item.applicantSkills}
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

