import { useState } from "react";
import { Button, Stack, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { AiFillCheckCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

type FormValues = {
  question1: string;
  question2: string;
  question3: string;
  question4: string;
};

const JobQuestionnaire = () => {
  const location = useLocation();
  const { state } = location;
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(false); // State to manage dark mode
  
  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  const form = useForm<FormValues>({
    defaultValues: {
      question1: "",
      question2: "",
      question3: "",
      question4: "",
    },
  });

  const { register, handleSubmit, formState } = form;
  const { errors } = formState;

  const onSubmit = (data: FormValues) => {
    const body = {
      state: {
        details: state,
        questions: {
          question1: data.question1,
          question2: data.question2,
          question3: data.question3,
          question4: data.question4,
        },
      },
    };
    navigate("/job_preview", body);
  };

  return (
    <div
      className={`bg-cover bg-center min-h-screen ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
      style={{ backgroundImage: isDarkMode ? "url('/images/M1.avif')" : "url('/images/M.png')", minHeight: "100vh", backgroundSize: "cover",}}
    >
      {/* Dark Mode Toggle */}
      <button 
        onClick={toggleDarkMode} 
        style={{ 
          position: "absolute",
          top: "200px", // Lowered position
          right: "20px", 
          padding: "10px 15px", 
          borderRadius: "5px", 
          backgroundColor: isDarkMode ? "#1E90FF" : "#FFFFA0", // Gold for light mode, blue for dark mode
          color: isDarkMode ? "#333" : "#fff", 
          border: "none", 
          cursor: "pointer",
          fontSize: "18px",
          transition: "background-color 0.3s, color 0.3s"
        }}
      >
        {isDarkMode ? "🌙" : "☀️"} {/* Sun for light mode, moon for dark mode */}
      </button>

      <div className="flex flex-col">
        <div className="w-full p-4 shadow-lg" style={{ backgroundColor: isDarkMode ? "#333333" : "#1E90FF" }}>
          <div className="text-2xl text-white text-center">Create New Job Listing</div>
          <div className="flex justify-between mt-4">
            <div className="inline-flex items-center flex-row">
              <AiFillCheckCircle color={isDarkMode ? "#CBCBCB" : "#FFD700"} size="20px" />
              <span className={`ml-2 text-lg ${isDarkMode ? "text-gray-400" : "text-white"}`}>Add details</span>
            </div>
            <div className="inline-flex items-center flex-row">
              <AiFillCheckCircle color={isDarkMode ? "#FFD700" : "#FFD700"} size="20px" />
              <span className={`ml-2 text-lg ${isDarkMode ? "text-white" : "text-white"} font-bold bg-green-500 px-2 py-1 rounded`}>
                Fill Questionnaire
              </span>
            </div>
            <div className="inline-flex items-center flex-row">
              <AiFillCheckCircle color={isDarkMode ? "#CBCBCB" : "#ffffff"} size="20px" />
              <span className={`ml-2 text-lg ${isDarkMode ? "text-gray-400" : "text-[#CBCBCB]"}`}>Preview</span>
            </div>
            <div className="inline-flex items-center flex-row">
              <AiFillCheckCircle color={isDarkMode ? "#CBCBCB" : "#ffffff"} size="20px" />
              <span className={`ml-2 text-lg ${isDarkMode ? "text-gray-400" : "text-[#CBCBCB]"}`}>Confirm</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full pt-10 pl-10">
          <div className={`text-2xl ${isDarkMode ? "text-white" : "text-blue-600"} text-center`}>Add Questions</div>
          <div className="flex flex-col items-center mt-5">
            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              className={`m-4 mx-10 rounded-lg p-6 shadow-md ${
                isDarkMode ? "bg-gray-800" : "bg-white"
              }`}
            >
              <Stack spacing={2} width={600}>
                <TextField
                  label="Question 1"
                  type="text"
                  {...register("question1", {
                    required: "Question is required",
                  })}
                  error={!!errors.question1}
                  helperText={errors.question1?.message}
                  sx={{
                    backgroundColor: isDarkMode ? "#444444" : "#f0f8ff",
                    "& label": { color: isDarkMode ? "#ffffff" : "#1E90FF" },
                    "& input": { color: isDarkMode ? "#ffffff" : "#000000", paddingLeft: (theme) => theme.spacing(2.5) },
                    "& fieldset": {
                      borderColor: isDarkMode ? "#2196F3" : "#2196F3",
                      borderRadius: "10px",
                    },
                  }}
                />
                <TextField
                  label="Question 2"
                  type="text"
                  {...register("question2", {
                    required: "Question is required",
                  })}
                  error={!!errors.question2}
                  helperText={errors.question2?.message}
                  sx={{
                    backgroundColor: isDarkMode ? "#444444" : "#f0f8ff",
                    "& label": { color: isDarkMode ? "#ffffff" : "#1E90FF" },
                    "& input": { color: isDarkMode ? "#ffffff" : "#000000", paddingLeft: (theme) => theme.spacing(2.5) },
                    "& fieldset": {
                      borderColor: isDarkMode ? "#2196F3" : "#2196F3",
                      borderRadius: "10px",
                    },
                  }}
                />
                <TextField
                  label="Question 3"
                  type="text"
                  {...register("question3", {
                    required: "Question is required",
                  })}
                  error={!!errors.question3}
                  helperText={errors.question3?.message}
                  sx={{
                    backgroundColor: isDarkMode ? "#444444" : "#f0f8ff",
                    "& label": { color: isDarkMode ? "#ffffff" : "#1E90FF" },
                    "& input": { color: isDarkMode ? "#ffffff" : "#000000", paddingLeft: (theme) => theme.spacing(2.5) },
                    "& fieldset": {
                      borderColor: isDarkMode ? "#2196F3" : "#2196F3",
                      borderRadius: "10px",
                    },
                  }}
                />
                <TextField
                  label="Question 4"
                  type="text"
                  {...register("question4", {
                    required: "Question is required",
                  })}
                  error={!!errors.question4}
                  helperText={errors.question4?.message}
                  sx={{
                    backgroundColor: isDarkMode ? "#444444" : "#f0f8ff",
                    "& label": { color: isDarkMode ? "#ffffff" : "#1E90FF" },
                    "& input": { color: isDarkMode ? "#ffffff" : "#000000", paddingLeft: (theme) => theme.spacing(2.5) },
                    "& fieldset": {
                      borderColor: isDarkMode ? "#2196F3" : "#2196F3",
                      borderRadius: "10px",
                    },
                  }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  style={{
                    backgroundColor: isDarkMode ? "#2196F3" : "#1E90FF",
                    color: "white",
                    textTransform: "none",
                    fontSize: "16px",
                    minWidth: "200px",
                  }}
                >
                  Proceed
                </Button>
              </Stack>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobQuestionnaire;

