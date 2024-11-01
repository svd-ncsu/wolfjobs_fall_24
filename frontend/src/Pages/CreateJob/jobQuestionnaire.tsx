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
    <div className="bg-cover bg-center min-h-screen" style={{ backgroundImage: "url('/images/tiles_bg.png')" }}>
      <div className="flex flex-col">
        <div className="w-full bg-[#1E90FF] p-4 shadow-lg">
          <div className="text-2xl text-white text-center">Create New Job Listing</div>
          <div className="flex justify-between mt-4">
            <div className="inline-flex items-center flex-row">
              <AiFillCheckCircle color="#CBCBCB" size="20px" />
              <span className="ml-2 text-lg text-white">Add details</span>
            </div>
            <div className="inline-flex items-center flex-row">
              <AiFillCheckCircle color="#FFD700" size="20px" /> {/* Gold color for the icon */}
              <span className="ml-2 text-lg text-white font-bold bg-green-500 px-2 py-1 rounded">Fill Questionnaire</span> {/* Bold, white text with green background */}
            </div>
            <div className="inline-flex items-center flex-row">
              <AiFillCheckCircle color="#ffffff" size="20px" />
              <span className="ml-2 text-lg text-[#CBCBCB]">Preview</span>
            </div>
            <div className="inline-flex items-center flex-row">
              <AiFillCheckCircle color="#ffffff" size="20px" />
              <span className="ml-2 text-lg text-[#CBCBCB]">Confirm</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full pt-10 pl-10">
          <div className="text-2xl text-blue-600 text-center">Add Questions</div> {/* Centered title */}
          <div className="flex flex-col items-center mt-5">
            <form onSubmit={handleSubmit(onSubmit)} noValidate className="m-4 mx-10 bg-white rounded-lg p-6 shadow-md">
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
                    backgroundColor: "#f0f8ff", // Light blue background for text fields
                    "& label": { paddingLeft: (theme) => theme.spacing(1) },
                    "& input": { paddingLeft: (theme) => theme.spacing(2.5) },
                    "& fieldset": {
                      paddingLeft: (theme) => theme.spacing(1.5),
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
                    backgroundColor: "#f0f8ff", // Light blue background for text fields
                    "& label": { paddingLeft: (theme) => theme.spacing(1) },
                    "& input": { paddingLeft: (theme) => theme.spacing(2.5) },
                    "& fieldset": {
                      paddingLeft: (theme) => theme.spacing(1.5),
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
                    backgroundColor: "#f0f8ff", // Light blue background for text fields
                    "& label": { paddingLeft: (theme) => theme.spacing(1) },
                    "& input": { paddingLeft: (theme) => theme.spacing(2.5) },
                    "& fieldset": {
                      paddingLeft: (theme) => theme.spacing(1.5),
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
                    backgroundColor: "#f0f8ff", // Light blue background for text fields
                    "& label": { paddingLeft: (theme) => theme.spacing(1) },
                    "& input": { paddingLeft: (theme) => theme.spacing(2.5) },
                    "& fieldset": {
                      paddingLeft: (theme) => theme.spacing(1.5),
                      borderRadius: "10px",
                    },
                  }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  style={{
                    backgroundColor: "#1E90FF", // Button background color
                    color: "white", // Button text color
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

