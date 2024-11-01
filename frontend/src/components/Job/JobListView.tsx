import { useEffect } from "react";
import JobListTile from "./JobListTile";

const JobsListView = (props: any) => {
  const { jobsList, title } = props;

  useEffect(() => {
    console.log(jobsList);
  }, [jobsList]);

  return (
    <>
      <div className="h-screen w-4/12 overflow-y-auto overflow-x-hidden pt-2 px-9" style={{ backgroundColor: "transparent" }}>
        <div className="text-2xl text-[#000000] py-4">{title || "All jobs"}</div>
        <div className="grid gap-4">
          {jobsList?.map((job: Job) => {
            return (
              <div
                key={job._id}
                className="transform transition-transform duration-200 ease-in-out hover:translate-y-[-10px] hover:shadow-lg p-3 rounded-xl shadow-sm bg-cover bg-center"
                style={{
                  backgroundImage: "url('/images/tiles_bg.png')",
                  backgroundColor: "#333333",
                }}
              >
                <JobListTile data={job} />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default JobsListView;


