import { useState } from "react";
import { useNavigate } from "react-router";
import { AiFillCheckCircle } from "react-icons/ai";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
} from "@mui/material";
import { useForm } from "react-hook-form";

type FormValues = {
  role: string;
  jobtype: string;
  location: string;
  pay: string;
  requiredSkills: string;
  description: string;
};

const CreateJob = () => {
  const navigate = useNavigate();
  const [requiredSkills, setRequiredSkills] = useState("");

  const form = useForm<FormValues>({
    defaultValues: {
      role: "",
      jobtype: "",
      location: "",
      pay: "",
      description: "",
    },
  });

  const { register, handleSubmit, formState } = form;
  const { errors } = formState;

  const [jobType, setJobType] = useState("full-time");

  const onSubmit = (data: FormValues) => {
    const body = {
      role: data.role,
      jobtype: jobType,
      location: data.location,
      pay: data.pay,
      description: data.description,
      requiredSkills: requiredSkills,
    };
    navigate("/job_questionnaire", {
      state: body,
    });
  };

  return (
    <div className="bg-cover bg-center min-h-screen" style={{ backgroundImage: "url('/images/M.png')" }}>
      <div className="flex flex-col">
        <div className="w-full bg-[#1E90FF] p-2 shadow-lg">
          <div className="text-xl text-white text-center">Create New Job Listing</div>
          <div className="flex justify-between mt-2">
            <div className="inline-flex items-center flex-row">
              <AiFillCheckCircle color="#000000" size="18px" />
              <span className="ml-1 text-md text-white font-bold bg-green-500 px-1 py-1 rounded">Add details</span>
            </div>
            <div className="inline-flex items-center flex-row">
              <AiFillCheckCircle color="#CBCBCB" size="18px" />
              <span className="ml-1 text-md text-[#CBCBCB]">Fill Questionnaire</span>
            </div>
            <div className="inline-flex items-center flex-row">
              <AiFillCheckCircle color="#CBCBCB" size="18px" />
              <span className="ml-1 text-md text-[#CBCBCB]">Preview</span>
            </div>
            <div className="inline-flex items-center flex-row">
              <AiFillCheckCircle color="#CBCBCB" size="18px" />
              <span className="ml-1 text-md text-[#CBCBCB]">Confirm</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center w-full pt-5" style={{ height: "calc(100vh - 72px)" }}>
          <div className="text-xl text-white">Add Details</div>
          <div className="flex flex-col w-full max-w-md px-2"> {/* Adjusted padding */}
            <form onSubmit={handleSubmit(onSubmit)} noValidate className="m-4">
              <Stack spacing={1}> {/* Reduced spacing */}
                <TextField
                  label="Job Role"
                  type="text"
                  {...register("role", {
                    required: "Job role is required",
                  })}
                  error={!!errors.role}
                  helperText={errors.role?.message}
                  sx={{
                    backgroundColor: "#ffffff",
                    "& label": { color: "#2196F3" },
                    "& input": { paddingLeft: (theme) => theme.spacing(1.5) }, // Reduced padding
                    "& fieldset": {
                      borderColor: "#2196F3",
                      borderRadius: "8px", // Reduced border radius
                    },
                  }}
                />
                <FormControl>
                  <InputLabel id="role-id" className="text-white">Job Type</InputLabel>
                  <Select
                    value={jobType}
                    labelId="role-id"
                    label="Job Type"
                    id="role"
                    onChange={(e: SelectChangeEvent) => {
                      setJobType(e.target.value);
                    }}
                    sx={{
                      backgroundColor: "#ffffff",
                      "& label": { color: "#2196F3" },
                      "& fieldset": {
                        borderColor: "#2196F3",
                        borderRadius: "8px", // Reduced border radius
                      },
                    }}
                  >
                    <MenuItem value={"full-time"}>Full Time</MenuItem>
                    <MenuItem value={"part-time"}>Part Time</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  label="Location"
                  type="text"
                  {...register("location")}
                  error={!!errors.location}
                  helperText={errors.location?.message}
                  sx={{
                    backgroundColor: "#ffffff",
                    "& label": { color: "#2196F3" },
                    "& input": { paddingLeft: (theme) => theme.spacing(1.5) }, // Reduced padding
                    "& fieldset": {
                      borderColor: "#2196F3",
                      borderRadius: "8px", // Reduced border radius
                    },
                  }}
                />
                <TextField
                  label="Pay"
                  type="number"
                  {...register("pay", {
                    required: "Job pay is required",
                  })}
                  error={!!errors.pay}
                  helperText={errors.pay?.message}
                  sx={{
                    backgroundColor: "#ffffff",
                    "& label": { color: "#2196F3" },
                    "& input": { paddingLeft: (theme) => theme.spacing(1.5) }, // Reduced padding
                    "& fieldset": {
                      borderColor: "#2196F3",
                      borderRadius: "8px", // Reduced border radius
                    },
                  }}
                />
                <TextField
                  label="Job Description"
                  type="text"
                  {...register("description")}
                  error={!!errors.description}
                  helperText={errors.description?.message}
                  sx={{
                    backgroundColor: "#ffffff",
                    "& label": { color: "#2196F3" },
                    "& input": { paddingLeft: (theme) => theme.spacing(1.5) }, // Reduced padding
                    "& fieldset": {
                      borderColor: "#2196F3",
                      borderRadius: "8px", // Reduced border radius
                    },
                  }}
                  minRows={3} // Reduced min rows
                  multiline
                />
                <TextField
                  label="Required Skills"
                  type="text"
                  {...register("requiredSkills", {
                    required: "Skills are required",
                  })}
                  value={requiredSkills}
                  onChange={(e) => setRequiredSkills(e.target.value)}
                  error={!!errors.requiredSkills}
                  helperText={errors.requiredSkills?.message}
                  sx={{
                    backgroundColor: "#ffffff",
                    "& label": { color: "#2196F3" },
                    "& input": { paddingLeft: (theme) => theme.spacing(1.5) }, // Reduced padding
                    "& fieldset": {
                      borderColor: "#2196F3",
                      borderRadius: "8px", // Reduced border radius
                    },
                  }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  style={{
                    backgroundColor: "#2196F3",
                    color: "#ffffff",
                    textTransform: "none",
                    fontSize: "14px", // Reduced font size
                    borderRadius: "8px", // Reduced border radius
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
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

export default CreateJob;

