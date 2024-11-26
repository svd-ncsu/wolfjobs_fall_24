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
  const [isDarkMode, setIsDarkMode] = useState(false); // Dark mode state

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

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <div
      className={`min-h-screen ${
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
              <AiFillCheckCircle color={isDarkMode ? "#FFD700" : "#FFD700"} size="20px" />
              <span className={`ml-2 text-lg ${isDarkMode ? "text-white" : "text-white"}font-bold bg-green-500 px-2 py-1 rounded`}>
                Add details</span>
            </div>
            <div className="inline-flex items-center flex-row">
              <AiFillCheckCircle color={isDarkMode ? "#CBCBCB" : "#FFFFFF"} size="20px" />
              <span className={`ml-2 text-lg ${isDarkMode ? "text-gray-400" : "text-white"} `}>
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
  <div
    className={`flex flex-col justify-center items-center w-full pt-5 ${isDarkMode ? "text-white" : "text-black"}`}
    style={{ height: "calc(100vh - 72px)" }}
  >
    <div
      className={`text-xl ${isDarkMode ? "text-white" : "text-black"}`}
    >
      Add Details
    </div>
    <div className="flex flex-col w-full max-w-md px-2">
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="m-4">
        <Stack spacing={1}>
        <TextField
            label="Job Role"
            type="text"
            {...register("role", {
              required: "Job role is required",
            })}
            error={!!errors.role}
            helperText={errors.role?.message}
            sx={{
              backgroundColor: isDarkMode ? "#444444" : "#ffffff", // Darker bg in dark mode
              "& label": { 
                color: isDarkMode ? "#2196F3" : "#2196F3" 
              },
              "& input": { 
                color: isDarkMode ? "#ffffff" : "#000000", // Text color
                paddingLeft: (theme) => theme.spacing(1.5),
              },
              "& fieldset": {
                borderColor: isDarkMode ? "#2196F3" : "#2196F3", // Border color for normal state
                borderRadius: "8px",
              },
              "& .Mui-focused": {
                borderColor: isDarkMode ? "#FFD700" : "#2196F3", // Highlight border color on focus
              },
              "& .MuiInputBase-root": {
                "& input:focus": {
                  backgroundColor: isDarkMode ? "#333333" : "#f1f1f1", // Change bg color on focus
                },
              },
            }}
          />

          <FormControl>
            <InputLabel
              id="role-id"
              className={isDarkMode ? "text-white" : "text-black"}
            >
              Job Type
            </InputLabel>
            <Select
              value={jobType}
              labelId="role-id"
              label="Job Type"
              id="role"
              onChange={(e: SelectChangeEvent) => {
                setJobType(e.target.value);
              }}
              sx={{
                backgroundColor: isDarkMode ? "#444444" : "#ffffff", // Darker bg in dark mode
              "& label": { 
                color: isDarkMode ? "#2196F3" : "#2196F3" 
              },
              "& input": { 
                color: isDarkMode ? "#ffffff" : "#000000", // Text color
                paddingLeft: (theme) => theme.spacing(1.5),
              },
              "& fieldset": {
                borderColor: isDarkMode ? "#2196F3" : "#2196F3", // Border color for normal state
                borderRadius: "8px",
              },
              "& .Mui-focused": {
                borderColor: isDarkMode ? "#FFD700" : "#2196F3", // Highlight border color on focus
              },
              "& .MuiInputBase-root": {
                "& input:focus": {
                  backgroundColor: isDarkMode ? "#333333" : "#f1f1f1", // Change bg color on focus
                },
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
              backgroundColor: isDarkMode ? "#444444" : "#ffffff", // Darker bg in dark mode
              "& label": { 
                color: isDarkMode ? "#2196F3" : "#2196F3" 
              },
              "& input": { 
                color: isDarkMode ? "#ffffff" : "#000000", // Text color
                paddingLeft: (theme) => theme.spacing(1.5),
              },
              "& fieldset": {
                borderColor: isDarkMode ? "#2196F3" : "#2196F3", // Border color for normal state
                borderRadius: "8px",
              },
              "& .Mui-focused": {
                borderColor: isDarkMode ? "#FFD700" : "#2196F3", // Highlight border color on focus
              },
              "& .MuiInputBase-root": {
                "& input:focus": {
                  backgroundColor: isDarkMode ? "#333333" : "#f1f1f1", // Change bg color on focus
                },
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
              backgroundColor: isDarkMode ? "#444444" : "#ffffff", // Darker bg in dark mode
              "& label": { 
                color: isDarkMode ? "#2196F3" : "#2196F3" 
              },
              "& input": { 
                color: isDarkMode ? "#ffffff" : "#000000", // Text color
                paddingLeft: (theme) => theme.spacing(1.5),
              },
              "& fieldset": {
                borderColor: isDarkMode ? "#2196F3" : "#2196F3", // Border color for normal state
                borderRadius: "8px",
              },
              "& .Mui-focused": {
                borderColor: isDarkMode ? "#FFD700" : "#2196F3", // Highlight border color on focus
              },
              "& .MuiInputBase-root": {
                "& input:focus": {
                  backgroundColor: isDarkMode ? "#333333" : "#f1f1f1", // Change bg color on focus
                },
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
              backgroundColor: isDarkMode ? "#444444" : "#ffffff", // Darker bg in dark mode
              "& label": { 
                color: isDarkMode ? "#2196F3" : "#2196F3" 
              },
              "& input": { 
                color: isDarkMode ? "#ffffff" : "#000000", // Text color
                paddingLeft: (theme) => theme.spacing(1.5),
              },
              "& fieldset": {
                borderColor: isDarkMode ? "#2196F3" : "#2196F3", // Border color for normal state
                borderRadius: "8px",
              },
              "& .Mui-focused": {
                borderColor: isDarkMode ? "#FFD700" : "#2196F3", // Highlight border color on focus
              },
              "& .MuiInputBase-root": {
                "& input:focus": {
                  backgroundColor: isDarkMode ? "#333333" : "#f1f1f1", // Change bg color on focus
                },
              },
            }}
            minRows={3}
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
              backgroundColor: isDarkMode ? "#444444" : "#ffffff", // Darker bg in dark mode
              "& label": { 
                color: isDarkMode ? "#2196F3" : "#2196F3" 
              },
              "& input": { 
                color: isDarkMode ? "#ffffff" : "#000000", // Text color
                paddingLeft: (theme) => theme.spacing(1.5),
              },
              "& fieldset": {
                borderColor: isDarkMode ? "#2196F3" : "#2196F3", // Border color for normal state
                borderRadius: "8px",
              },
              "& .Mui-focused": {
                borderColor: isDarkMode ? "#FFD700" : "#2196F3", // Highlight border color on focus
              },
              "& .MuiInputBase-root": {
                "& input:focus": {
                  backgroundColor: isDarkMode ? "#333333" : "#f1f1f1", // Change bg color on focus
                },
              },
            }}
          />
          <Button
            type="submit"
            variant="contained"
            style={{
              backgroundColor: isDarkMode ? "#2196F3" : "#2196F3",
              color: "#ffffff",
              textTransform: "none",
              fontSize: "14px",
              borderRadius: "8px",
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
