import { useNavigate } from "react-router-dom";
import { login } from "../../deprecateded/auth";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Stack, TextField, Button } from "@mui/material";
// import { DevTool } from "@hookform/devtools";

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

  return (
    <>
      <div
        data-testid="login-background"
        style={{
          position: "relative",
          height: "100vh",
          overflow: "hidden",
          backgroundImage: "url('/images/WJ4.png')", // Set your background image
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="mx-auto flex flex-col justify-center items-center h-full">
          <div
            className="p-4 border rounded"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.8)", // Semi-transparent white
              backdropFilter: "blur(10px)", // Optional: Adds a blur effect behind the div
              width: "100%",
              maxWidth: "400px", // Limit the width for better responsiveness
            }}
          >
            <div className="text-xl justify-center text-black mb-4">
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
                    "& label": { paddingLeft: (theme) => theme.spacing(1) },
                    "& input": { paddingLeft: (theme) => theme.spacing(2.5) },
                    "& fieldset": {
                      paddingLeft: (theme) => theme.spacing(1.5),
                      borderRadius: "10px",
                      borderColor: "#1E90FF", // Blue border
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
                    },
                    "& input": { paddingLeft: (theme) => theme.spacing(2.5) },
                    "& fieldset": {
                      paddingLeft: (theme) => theme.spacing(1.5),
                      borderRadius: "10px",
                      borderColor: "#1E90FF", // Blue border
                    },
                  }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  style={{
                    background: "#1E90FF", // Blue background
                    borderRadius: "10px",
                    textTransform: "none",
                    fontSize: "16px",
                  }}
                >
                  Login
                </Button>
              </Stack>
            </form>
            <div className="mx-auto"></div>
            <br />
            <div className="mv-1 border-t mx-16" />
            <div className="flex justify-center">
              <p className="-mt-3 bg-white px-3 text-[#1E90FF]">OR</p> {/* Blue text */}
            </div>
            <br />
            <p
              className="text-[#1E90FF] text-center cursor-pointer" // Blue text and pointer cursor
              onClick={() => {
                navigate("/register");
              }}
            >
              Create a new account
            </p>
          </div>
        </div>
      </div>
      {/* <DevTool control={control}></DevTool> */}
    </>
  );
};

export default LoginPage;


