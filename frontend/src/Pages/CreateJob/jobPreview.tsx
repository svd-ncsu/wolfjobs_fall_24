import { useNavigate, useLocation } from "react-router-dom";
import { useUserStore } from "../../store/UserStore";
import { Button } from "@mui/material";
import { AiFillCheckCircle } from "react-icons/ai";
import { useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

type FormValuesQuestions = {
  question1: string;
  question2: string;
  question3: string;
  question4: string;
};

type FormValuesDetails = {
  role: string;
  jobtype: string;
  location: string;
  pay: string;
  description: string;
  requiredSkills: string;
};

const JobPreview = () => {
  const location = useLocation();
  const { state } = location;
  const {
    details,
    questions,
  }: { details: FormValuesDetails; questions: FormValuesQuestions } = state;

  const navigate = useNavigate();
  const userId = useUserStore((state) => state.id);

  const onSubmit = (e: any) => {
    e.preventDefault();

    const url = `http://localhost:8000/api/v1/users/createjob`;
    const body = {
      id: userId,
      name: details.role,
      type: details.jobtype,
      location: details.location,
      description: details.description,
      pay: details.pay,
      question1: questions.question1,
      question2: questions.question2,
      question3: questions.question3,
      question4: questions.question4,
      requiredSkills: details.requiredSkills,
    };

    axios.post(url, body).then((res) => {
      if (res.status !== 200) {
        toast.error("Job posting failed");
        return;
      }
      toast.success("Job created");
      console.log(details);
      navigate('/job-preview', { state: { details, questions } });
      navigate("/dashboard");
    });
  };

  useEffect(() => {
    console.log(state);
  }, []);

  return (
    <>
      <div className="bg-cover bg-center min-h-screen" style={{ backgroundImage: "url('/images/M.png')" }}>
        <div className="flex flex-col">
          <div className="w-full bg-[#1E90FF] p-4 shadow-lg">
            <div className="text-2xl text-white text-center">Create New Job Listing</div>
            <div className="flex justify-between mt-4">
              <div className="inline-flex items-center flex-row">
                <AiFillCheckCircle color="#CBCBCB" size="20px" />
                <span className="ml-2 text-lg text-white">Add details</span>
              </div>
              <div className="inline-flex items-center flex-row">
                <AiFillCheckCircle color="#CBCBCB" size="20px" />
                <span className="ml-2 text-lg text-[#CBCBCB]">Fill Questionnaire</span>
              </div>
              <div className="inline-flex items-center flex-row bg-[#1E90FF] p-1 rounded">
                <AiFillCheckCircle color="#FFD700" size="20px" />
                <span className="ml-2 text-lg text-white font-bold bg-green-500 px-2 py-1 rounded">Preview</span>
              </div>
              <div className="inline-flex items-center flex-row">
                <AiFillCheckCircle color="#ffffff" size="20px" />
                <span className="ml-2 text-lg text-[#CBCBCB]">Confirm</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col w-full bg-white bg-opacity-80 h-auto p-6 rounded-lg shadow-lg mx-auto my-4">
            <div className="text-xl font-bold mb-4">Job Details</div>
            <div className="flex flex-row justify-between">
              {/* Left Column */}
              <div className="flex flex-col w-1/2 p-2">
                <div className="bg-white bg-opacity-90 p-2 mb-4 rounded shadow">
                  <span className="font-semibold text-lg">Role:</span>
                  <div>{details["role"]}</div>
                </div>

                <div className="bg-white bg-opacity-90 p-2 mb-4 rounded shadow">
                  <span className="font-semibold text-lg">Job Status:</span>
                  <div className={`capitalize text-green-500`}>open</div>
                </div>

                <div className="bg-white bg-opacity-90 p-2 mb-4 rounded shadow">
                  <span className="font-semibold text-lg capitalize">Type:</span>
                  <div className="capitalize">{details["jobtype"].split("-").join(" ")}</div>
                </div>
              </div>

              {/* Right Column */}
              <div className="flex flex-col w-1/2 p-2">
                <div className="bg-white bg-opacity-90 p-2 mb-4 rounded shadow">
                  <span className="font-semibold text-lg">Location:</span>
                  <div>{details["location"]}</div>
                </div>

                <div className="bg-white bg-opacity-90 p-2 mb-4 rounded shadow">
                  <span className="font-semibold text-lg">Pay:</span>
                  <div>{details["pay"]}$/hr</div>
                </div>
              </div>
            </div>

            {/* Description Section */}
            <div className="text-lg border-b border-gray-300 mb-2 font-bold">Description</div>
            <div className="bg-white bg-opacity-90 p-3 mb-4 rounded shadow text-[#686868] mx-2">
              {details["description"]}
            </div>

            {/* Required Skills Section */}
            <div className="text-lg border-b border-gray-300 mb-2 font-bold">Required Skills</div>
            <div className="bg-white bg-opacity-90 p-3 mb-4 rounded shadow text-[#686868] mx-2">
              {details.requiredSkills}
            </div>

            {/* Questions Section */}
            <div className="text-lg border-b border-gray-300 mb-2 font-bold">Questions</div>
            <div className="bg-white bg-opacity-90 p-3 mb-4 rounded shadow text-[#686868] mx-2">
              <div>1: {questions["question1"]}</div>
              <div>2: {questions["question2"]}</div>
              <div>3: {questions["question3"]}</div>
              <div>4: {questions["question4"]}</div>
            </div>

            <div className="mt-4">
              <Button
                onClick={onSubmit}
                type="submit"
                variant="contained"
                color="primary"
                style={{
                  background: "#1E90FF",
                  borderRadius: "10px",
                  textTransform: "none",
                  fontSize: "16px",
                  color: "white",
                }}
              >
                Add Listing
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobPreview;

