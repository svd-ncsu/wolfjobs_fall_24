import { useEffect, useState } from "react";
import { HiOutlineArrowRight } from "react-icons/hi";
import { useSearchParams } from "react-router-dom";
import { useApplicationStore } from "../../store/ApplicationStore";
import { useUserStore } from "../../store/UserStore";

const JobListTile = (props: any) => {
  const { data }: { data: Job } = props;
  let action = "view-more";

  const calculateMatchPercentage = (job: Job) => {
    const skills = useUserStore((state) => state.skills);

    if (!skills || !job.requiredSkills) return 0; // If either is missing, return 0%

    const applicantSkillsArray = skills
      .split(",")
      .map((skill) => skill.trim().toLowerCase());
    const requiredSkillsArray = job.requiredSkills
      .split(",")
      .map((skill) => skill.trim().toLowerCase());

    const matchedSkills = requiredSkillsArray.filter((skill) =>
      applicantSkillsArray.includes(skill)
    );

    const matchPercentage =
      (matchedSkills.length / requiredSkillsArray.length) * 100;

    return Math.round(matchPercentage); // Return rounded percentage
  };

  const getMatchColor = (percentage: number) => {
    if (percentage < 10) return "#FF5353"; // Red for below 10%
    if (percentage < 50) return "#FFA500"; // Orange for below 50%
    if (percentage < 80) return "#FFD700"; // Yellow for below 80%
    return "#00E000"; // Green for 80% and above
  };

  const [active, setActive] = useState<boolean>(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const userId = useUserStore((state) => state.id);
  const userRole = useUserStore((state) => state.role);

  const applicationList: Application[] = useApplicationStore(
    (state) => state.applicationList
  );

  const [application, setApplication] = useState<Application | null>(null);

  useEffect(() => {
    const temp: Application | undefined = applicationList.find(
      (item: Application) =>
        item.jobid === data._id && item.applicantid === userId
    );
    setApplication(temp || null);
  }, [data, applicationList, userId]);

  const affilation = data.managerAffilication;
  const role = data.name;
  const jobType = data?.type?.split("-")?.join(" ");
  const pay = data.pay || "0";

  useEffect(() => {
    const id = searchParams.get("jobId");
    setActive(data._id === id);
  }, [searchParams]);

  const handleClick = (e: any) => {
    e.preventDefault();
    setSearchParams({ jobId: data._id });
  };

  const getAffiliationTag = (tag: string) => {
    return tag.split("-").join(" ");
  };

  const getAffiliationColour = (tag: string) => {
    if (tag === "nc-state-dining") {
      return "bg-[#FF2A2A]/10";
    } else if (tag === "campus-enterprises") {
      return "bg-[#91B0FF]/10";
    } else if (tag === "wolfpack-outfitters") {
      return "bg-[#FBD71E]/10";
    }
    return "bg-[#FF2A2A]/10";
  };

  const handleKnowMore = (e: any) => {
    e.stopPropagation();
  };

  return (
    <div className="my-3" onClick={handleClick}>
      <div
        className={[
          "transform transition-transform duration-200 ease-in-out",
          "hover:translate-y-[-10px] hover:shadow-lg",
          active ? "border-black" : "border-white",
          "p-3 rounded-xl shadow-sm bg-cover bg-center"
        ].join(" ")} // Join array of classes into a single string
        style={{ backgroundImage: "url('/images/tiles_bg.png')" }}
      >
        <div className="flex flex-row">
          <div className="w-4/6">
            <div className="flex items-center space-x-2">
              <div
                className={`w-fit ${getAffiliationColour(
                  affilation
                )} rounded-2xl px-3 py-0 bg-opacity-50`} // Semi-translucent background for affiliation
                style={{
                  backgroundColor: getAffiliationColour(affilation),
                  borderRadius: "8px",
                }}
              >
                <p
                  className="inline text-xs text-white"
                  style={{
                    width: "fit-content",
                    fontFamily: "'Poppins', sans-serif", // Apply font style here
                  }}
                >
                  {getAffiliationTag(affilation).toUpperCase()}
                </p>
              </div>
              {userRole === "Applicant" && (
                <div
                  className="ml-2 rounded-full px-3 py-0 bg-opacity-50"
                  style={{
                    backgroundColor: getMatchColor(calculateMatchPercentage(data)),
                    color: "white",
                    borderRadius: "8px",
                    fontFamily: "'Poppins', sans-serif", // Apply font style here
                  }}
                >
                  <p className="inline text-xs">
                    {calculateMatchPercentage(data)}% Match
                  </p>
                </div>
              )}
            </div>
            <div className="h-1"></div>

            <div className="pl-2">
              <p className="text-base text-white" style={{ fontFamily: "'Poppins', sans-serif" }}>
                <b>Role:</b> {role}
              </p>
              <p className="text-base text-white" style={{ fontFamily: "'Poppins', sans-serif" }}>
                <b>Job Status:</b>
                <span
                  className={`${
                    data.status === "closed" ? "text-[#FF5353]" : "text-[#00E000]"
                  }`} // Apply red for closed and light green for open status
                >
                  &nbsp;<span className="capitalize">{data.status}</span>
                </span>
              </p>

              <p className="text-base text-white" style={{ fontFamily: "'Poppins', sans-serif" }}>
                <b>Type:</b> <span className="capitalize"> {jobType} </span>
              </p>

              <p className="text-base text-white" style={{ fontFamily: "'Poppins', sans-serif" }}>
                <b>Location:</b> {data.location || "Not specified"}
              </p>

              <p className="text-base text-white" style={{ fontFamily: "'Poppins', sans-serif" }}>
                {userRole === "Applicant" &&
                  ((application !== null &&
                    application?.status === "accepted") ||
                  application?.status === "rejected" ? (
                    <span className="capitalize">
                      <b>Application Status:</b>&nbsp;{application?.status}
                    </span>
                  ) : (
                    <>
                      <b>Application Status:</b>&nbsp;"In Review"
                    </>
                  ))}
              </p>
            </div>
          </div>
          <div className="flex flex-col-reverse w-2/6 text-right">
            {action === "view-more" || !action ? (
              <p
                className="inline-flex items-center flex-row-reverse text-xs text-[#656565]"
                onClick={handleKnowMore}
              >
                <HiOutlineArrowRight />
                Know more&nbsp;
              </p>
            ) : (
              <></>
            )}
            <p className="text-3xl text-white" style={{ fontFamily: "'Poppins', sans-serif" }}>
              {pay}$/hr
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobListTile;

