import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../../deprecateded/auth";
import { useForm } from "react-hook-form";
import {
  TextField,
  Select,
  MenuItem,
  Button,
  InputLabel,
  FormControl,
  Stack,
} from "@mui/material";

type FormValues = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  skills: string;
};

const RegistrationPage = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState("Applicant");
  const [affiliation, setAffiliation] = useState("nc-state-dining");
  const [isDarkMode, setIsDarkMode] = useState(false); // State to manage dark mode

  const form = useForm<FormValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      skills: "",
    },
  });

  const { register, handleSubmit, formState, watch } = form;
  const { errors } = formState;

  const onSubmit = (data: FormValues) => {
    console.log("form submitted");
    console.log(data);
    signup(
      data.email,
      data.password,
      data.confirmPassword,
      data.name,
      role,
      role === "Manager" ? affiliation : "",
      data.skills,
      navigate
    );
  };

  // Toggle Dark Mode
  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <div
      data-testid="registration-background"
      style={{
        padding: "180px",
        minHeight: "100vh",
        overflow: "hidden",
        backgroundImage: isDarkMode
          ? "url('/images/WJ10.jpg')" // Replace with a suitable dark image
          : "url('/images/WJ4.png')", // Light mode background
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        color: isDarkMode ? "#fff" : "#333", // Text color
      }}
    >
      {/* Dark Mode Toggle */}
      <button
        onClick={toggleDarkMode}
        style={{
          position: "absolute",
          top: "80px",
          right: "20px",
          padding: "10px 15px",
          borderRadius: "5px",
          backgroundColor: isDarkMode ? "#1E90FF" : "#FFFFA0", // Gold for light mode, blue for dark mode
          color: isDarkMode ? "#333" : "#fff",
          border: "none",
          cursor: "pointer",
          fontSize: "18px",
          transition: "background-color 0.3s, color 0.3s",
        }}
      >
        {isDarkMode ? "🌙" : "☀️"} {/* Sun for light mode, moon for dark mode */}
      </button>

      <div className="mx-auto flex flex-col justify-center items-center h-full">
        <div
          className="p-4 border rounded"
          style={{
            marginTop: "-160px",
            marginBottom: "-130px",
            backgroundColor: isDarkMode
              ? "rgba(50, 50, 50, 0.9)" // Semi-transparent dark
              : "rgba(255, 255, 255, 0.8)", // Semi-transparent white
            backdropFilter: "blur(10px)",
            width: "100%",
            maxWidth: "400px",
            color: isDarkMode ? "#fff" : "#333", // Text color
          }}
        >
          <div
            className="text-xl justify-center mb-4"
            style={{
              color: isDarkMode ? "#FFD700" : "#1E90FF",
            }}
          >
            Create New Account
          </div>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Stack spacing={2} width="100%">
              {[
                { label: "Name", name: "name", type: "text" },
                { label: "Email Id", name: "email", type: "email" },
                { label: "Password", name: "password", type: "password" },
                {
                  label: "Confirm Password",
                  name: "confirmPassword",
                  type: "password",
                },
                { label: "Skills", name: "skills", type: "text" },
              ].map((field) => (
                <TextField
                  key={field.name}
                  label={field.label}
                  type={field.type}
                  {...register(field.name as keyof FormValues, {
                    required: `${field.label} is required`,
                  })}
                  error={!!errors[field.name as keyof FormValues]}
                  helperText={errors[field.name as keyof FormValues]?.message}
                  sx={{
                    "& label": {
                      color: isDarkMode ? "#FFD700" : "#1E90FF", // Field label color
                    },
                    "& input": {
                      color: isDarkMode ? "#fff" : "#333", // Input text color
                    },
                    "& fieldset": {
                      borderColor: isDarkMode ? "#FFD700" : "#1E90FF", // Border color
                    },
                  }}
                />
              ))}
              <FormControl fullWidth>
                <InputLabel
                  id="role-id"
                  sx={{
                    color: isDarkMode ? "#FFD700" : "#1E90FF", // Adjust color of the label
                  }}
                >
                  Role
                </InputLabel>
                <Select
                  value={role}
                  labelId="role-id"
                  label="Role"
                  id="role"
                  onChange={(e) => setRole(e.target.value)}
                  sx={{
                    color: isDarkMode ? "#FFD700" : "#1E90FF", // Color of selected value
                    backgroundColor: isDarkMode ? "rgba(50, 50, 50, 0.8)" : "rgba(255, 255, 255, 0.8)", // Background color of select area
                    "& .MuiSelect-select": {
                      color: isDarkMode ? "#FFD700" : "#1E90FF", // Color of the displayed selected value
                      backgroundColor: "transparent", // Make sure the background doesn't get overwritten
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: isDarkMode ? "#FFD700" : "#1E90FF", // Border color for normal state
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: isDarkMode ? "#FFD700" : "#1E90FF", // Border color on hover
                    },
                  }}
                  MenuProps={{
                    PaperProps: {
                      style: {
                        backgroundColor: isDarkMode ? "rgba(50, 50, 50, 0.9)" : "rgba(255, 255, 255, 0.9)", // Background color of dropdown menu
                        color: isDarkMode ? "#FFD700" : "#1E90FF", // Text color of the menu items
                      },
                    },
                  }}
                >
                  <MenuItem
                    value="Manager"
                    sx={{
                      backgroundColor: isDarkMode ? "rgba(50, 50, 50, 0.9)" : "#fff", // Background of menu item
                      color: isDarkMode ? "#FFD700" : "#1E90FF", // Text color of menu item
                      "&:hover": {
                        backgroundColor: isDarkMode ? "#333" : "#e0e0e0", // Hover effect for menu items
                      },
                    }}
                  >
                    Manager
                  </MenuItem>
                  <MenuItem
                    value="Applicant"
                    sx={{
                      backgroundColor: isDarkMode ? "rgba(50, 50, 50, 0.9)" : "#fff", // Background of menu item
                      color: isDarkMode ? "#FFD700" : "#1E90FF", // Text color of menu item
                      "&:hover": {
                        backgroundColor: isDarkMode ? "#333" : "#e0e0e0", // Hover effect for menu items
                      },
                    }}
                  >
                    Applicant
                  </MenuItem>
                  <MenuItem
                    value="Admin"
                    sx={{
                      backgroundColor: isDarkMode ? "rgba(50, 50, 50, 0.9)" : "#fff", // Background of menu item
                      color: isDarkMode ? "#FFD700" : "#1E90FF", // Text color of menu item
                      "&:hover": {
                        backgroundColor: isDarkMode ? "#333" : "#e0e0e0", // Hover effect for menu items
                      },
                    }}
                  >
                    Admin
                  </MenuItem>
                </Select>
              </FormControl>

              {role === "Manager" && (
                <FormControl fullWidth>
                <InputLabel
                  id="affiliation-id"
                  sx={{
                    color: isDarkMode ? "#FFD700" : "#1E90FF",
                  }}
                >
                  Affiliation
                </InputLabel>
                <Select
                  value={affiliation}
                  labelId="affiliation-id"
                  label="Affiliation"
                  id="affiliation"
                  onChange={(e) => setAffiliation(e.target.value)}
                  sx={{
                    color: isDarkMode ? "#FFD700" : "#1E90FF", // Selected value color
                    backgroundColor: isDarkMode ? "rgba(50, 50, 50, 0.8)" : "rgba(255, 255, 255, 0.8)", // Selected area background
                    "& .MuiSelect-select": {
                      color: isDarkMode ? "#FFD700" : "#1E90FF", // Override displayed value color
                      backgroundColor: "transparent", // Ensure no overlap with other styles
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: isDarkMode ? "#FFD700" : "#1E90FF",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: isDarkMode ? "#FFD700" : "#1E90FF",
                    },
                  }}
                  MenuProps={{
                    PaperProps: {
                      style: {
                        backgroundColor: isDarkMode ? "rgba(50, 50, 50, 0.9)" : "rgba(255, 255, 255, 0.9)",
                        color: isDarkMode ? "#FFD700" : "#1E90FF",
                      },
                    },
                  }}
                >
                  <MenuItem
                    value="nc-state-dining"
                    sx={{
                      backgroundColor: isDarkMode ? "rgba(50, 50, 50, 0.9)" : "#fff",
                      color: isDarkMode ? "#FFD700" : "#1E90FF",
                      "&:hover": {
                        backgroundColor: isDarkMode ? "#333" : "#e0e0e0",
                      },
                    }}
                  >
                    NC State Dining
                  </MenuItem>
                  <MenuItem
                    value="campus-enterprises"
                    sx={{
                      backgroundColor: isDarkMode ? "rgba(50, 50, 50, 0.9)" : "#fff",
                      color: isDarkMode ? "#FFD700" : "#1E90FF",
                      "&:hover": {
                        backgroundColor: isDarkMode ? "#333" : "#e0e0e0",
                      },
                    }}
                  >
                    Campus Enterprises
                  </MenuItem>
                  <MenuItem
                    value="wolfpack-outfitters"
                    sx={{
                      backgroundColor: isDarkMode ? "rgba(50, 50, 50, 0.9)" : "#fff",
                      color: isDarkMode ? "#FFD700" : "#1E90FF",
                      "&:hover": {
                        backgroundColor: isDarkMode ? "#333" : "#e0e0e0",
                      },
                    }}
                  >
                    Wolfpack Outfitters
                  </MenuItem>
                </Select>
              </FormControl>
              
              )}

              <Button
                type="submit"
                variant="contained"
                style={{
                  background: isDarkMode ? "#FFD700" : "#1E90FF",
                  color: isDarkMode ? "#333" : "#fff",
                  borderRadius: "10px",
                  textTransform: "none",
                  fontSize: "16px",
                }}
              >
                Sign Up
              </Button>
            </Stack>
          </form>
          <div className="flex justify-center">
            <p
              className="mt-3"
              style={{
                color: isDarkMode ? "#FFD700" : "#1E90FF",
              }}
            >
              OR
            </p>
          </div>
          <br />
          <p
            className="text-center cursor-pointer"
            style={{
              color: isDarkMode ? "#FFD700" : "#1E90FF",
            }}
            onClick={() => {
              navigate("/login");
            }}
          >
            Already have an account? Login here
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
