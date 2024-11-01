import { useEffect, useState } from "react";
import { useApplicationStore } from "../../store/ApplicationStore";
import axios from "axios";
import { toast } from "react-toastify";
import { useSearchParams } from "react-router-dom";

const JobRating = (props: any) => {
  const { jobData }: { jobData: Job } = props;
  const [displayList, setDisplayList] = useState<Application[]>([]);
  const [searchParams] = useSearchParams();

  const applicationList = useApplicationStore((state) => state.applicationList);

  useEffect(() => {
    setDisplayList(
      applicationList.filter(
        (item) => item.jobid === jobData._id && item.status === "rating"
      )
    );
  }, [searchParams, applicationList, jobData._id]);

  const handleAccept = (applicantid: string) => {
    const url = "http://localhost:8000/api/v1/users/modifyApplication";

    const body = {
      applicationId: applicantid,
      status: "accepted",
    };

    axios.post(url, body).then((res) => {
      if (res.status === 200) {
        toast.success("Accepted candidate");
        setDisplayList((prevList) => prevList.filter((item) => item._id !== applicantid));
      } else {
        toast.error("Failed to accept candidate");
      }
    });
  };

  const handleReject = (applicantid: string) => {
    const url = "http://localhost:8000/api/v1/users/modifyApplication";

    const body = {
      applicationId: applicantid,
      status: "rejected",
    };

    axios.post(url, body).then((res) => {
      if (res.status === 200) {
        toast.success("Rejected candidate");
        setDisplayList((prevList) => prevList.filter((item) => item._id !== applicantid));
      } else {
        toast.error("Failed to reject candidate");
      }
    });
  };

  return (
    <>
      <div className="text-2xl font-semibold text-gray-700 dark:text-black mb-4">
        Rating
      </div>
      {displayList.length === 0 && (
        <div className="text-base text-gray-500">No candidates available for rating</div>
      )}
      {displayList.map((item: Application) => {
        return (
          <div key={item._id} className="p-2">
            <div className="bg-white dark:bg-gray-800 my-2 mx-1 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
              <div className="flex justify-between items-center">
                <div className="flex flex-col text-gray-700 dark:text-gray-200 space-y-1">
                  <div>
                    <span className="font-bold">Name:</span> {item.applicantname}
                  </div>
                  {!!item?.phonenumber && <div>Phone: {item.phonenumber}</div>}
                  <div>
                    <span className="font-bold">Email:</span> {item.applicantemail}
                  </div>
                  {!!item?.applicantSkills && (
                    <div>
                      <span className="font-bold">Skills:</span> {item.applicantSkills}
                    </div>
                  )}
                  <div>
                    <span className="font-bold">Rating:</span> {item.rating || "0"}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleAccept(item._id);
                    }}
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors duration-200"
                  >
                    Accept
                  </button>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleReject(item._id);
                    }}
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors duration-200"
                  >
                    Reject
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default JobRating;


