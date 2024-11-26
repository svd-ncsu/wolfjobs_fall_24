import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../deprecateded/auth";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Stack, TextField, Button } from "@mui/material";

type FormValues = {
  email: string;
  password: string;
};

const schema = yup.object({
  email: yup
    .string()
    .email("Email format is not valid")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});

const LoginPage = () => {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(false); // State to manage dark mode

  const form = useForm<FormValues>({
    defaultValues: { email: "", password: "" },
    resolver: yupResolver(schema),
  });
  const { register, handleSubmit, formState } = form;
  const { errors } = formState;

  const onSubmit = (data: FormValues) => {
    console.log("form submitted");
    console.log(data);
    login(data.email, data.password, navigate);
  };

  // Toggle Dark Mode
  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <>
      <div
        data-testid="login-background"
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
          top: "80px", // Lowered position
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

        <div className="mx-auto flex flex-col justify-center items-center h-full">
          <div
            className="p-4 border rounded"
            style={{
              backgroundColor: isDarkMode
                ? "rgba(50, 50, 50, 0.9)" // Semi-transparent dark
                : "rgba(255, 255, 255, 0.8)", // Semi-transparent white
              backdropFilter: "blur(2px)",
              width: "100%",
              maxWidth: "400px",
              color: isDarkMode ? "#fff" : "#333", // Text color
            }}
          >
            <div className="text-xl justify-center mb-4" style = {{color: isDarkMode ? "#FFD700" : "#1E90FF"}}>
              Sign In to your Account
            </div>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <Stack spacing={2} width="100%">
                <TextField
                  label="Email Id"
                  type="email"
                  {...register("email")}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  sx={{
                    "& label": {
                      paddingLeft: (theme) => theme.spacing(1),
                      color: isDarkMode ? "#FFD700" : "#1E90FF",
                    },
                    "& input": {
                      paddingLeft: (theme) => theme.spacing(2.5),
                      color: isDarkMode ? "#fff" : "#333", // Input text color
                    },
                    "& fieldset": {
                      paddingLeft: (theme) => theme.spacing(1.5),
                      borderRadius: "10px",
                      borderColor: isDarkMode ? "#FFD700" : "#1E90FF",
                    },
                  }}
                />
                <TextField
                  label="Password"
                  type="password"
                  {...register("password")}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  sx={{
                    "& label": {
                      paddingLeft: (theme) => theme.spacing(1),
                      color: isDarkMode ? "#FFD700" : "#1E90FF",
                    },
                    "& input": {
                      paddingLeft: (theme) => theme.spacing(2.5),
                      color: isDarkMode ? "#fff" : "#333", // Input text color
                    },
                    "& fieldset": {
                      paddingLeft: (theme) => theme.spacing(1.5),
                      borderRadius: "10px",
                      borderColor: isDarkMode ? "#FFD700" : "#1E90FF",
                    },
                  }}
                />
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
                  Login
                </Button>
              </Stack>
            </form>
            <div className="mv-1 border-t mx-16" />
            <div className="flex justify-center">
              <p
                className="mt-3"
                style={{
                  color: isDarkMode ? "#FFD700" : "#1E90FF", // Toggle based on mode
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
                navigate("/register");
              }}
            >
              Create a new account
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
