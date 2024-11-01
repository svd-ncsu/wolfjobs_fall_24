import { useNavigate } from "react-router-dom";
import { signup } from "../../deprecateded/auth";
import { useForm } from "react-hook-form";
import { useState } from "react";
import {
  Button,
  Grid,
  Paper,
  TextField,
  Select,
  MenuItem,
  SelectChangeEvent,
  InputLabel,
  FormControl,
  Typography,
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
  const [affilation, setAffiliation] = useState("nc-state-dining");

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
      role === "Manager" ? affilation : "",
      data.skills,
      navigate
    );
  };

  return (
    <Grid
      container
      style={{
        height: "100vh",
        backgroundImage: "url('/images/M.png')", // Set your background image
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Grid item xs={12} sm={6} md={4} component={Paper} elevation={6} square>
        <div
          style={{
            padding: "40px 20px",
            borderRadius: "15px",
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            backdropFilter: "blur(10px)",
          }}
        >
          <Typography variant="h5" align="center" gutterBottom>
            Create New Account
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="role-id">Role</InputLabel>
                <Select
                  value={role}
                  labelId="role-id"
                  label="Role"
                  id="role"
                  onChange={(e: SelectChangeEvent) => {
                    setRole(e.target.value);
                  }}
                >
                  <MenuItem value={"Manager"}>Manager</MenuItem>
                  <MenuItem value={"Applicant"}>Applicant</MenuItem>
                  <MenuItem value={"Admin"}>Admin</MenuItem> {/* Added Admin */}
                </Select>
              </FormControl>
            </Grid>

            {/* Affiliation dropdown, only for Managers */}
            {role === "Manager" && (
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="affiliation-id">Affiliation</InputLabel>
                  <Select
                    value={affilation}
                    labelId="affiliation-id"
                    label="Affiliation"
                    id="affiliation"
                    onChange={(e: SelectChangeEvent) => {
                      setAffiliation(e.target.value);
                    }}
                  >
                    <MenuItem value={"nc-state-dining"}>NC State Dining</MenuItem>
                    <MenuItem value={"campus-enterprises"}>Campus Enterprises</MenuItem>
                    <MenuItem value={"wolfpack-outfitters"}>Wolfpack Outfitters</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            )}

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Name"
                type="text"
                {...register("name", {
                  required: "Name is required",
                })}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email Id"
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                    message: "Enter a valid email",
                  },
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Password"
                type="password"
                {...register("password", {
                  required: "Password is required",
                })}
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Confirm password"
                type="password"
                {...register("confirmPassword", {
                  required: "Password is required",
                  validate: (val: string) => {
                    if (watch("password") !== val) {
                      return "Passwords don't match";
                    }
                  },
                })}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Skills"
                type="text"
                {...register("skills", {
                  required: "Skills are required",
                })}
                error={!!errors.skills}
                helperText={errors.skills?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                style={{
                  background: "#1E90FF",
                  borderRadius: "10px",
                  textTransform: "none",
                  fontSize: "16px",
                }}
                onClick={handleSubmit(onSubmit)} // Submit when button is clicked
              >
                Sign up
              </Button>
            </Grid>
          </Grid>

          <div style={{ textAlign: "center", margin: "20px 0" }}>
            <hr style={{ borderColor: "#CCCCCC" }} />
            <Typography variant="body2" color="#AAAAAA">
              OR
            </Typography>
            <hr style={{ borderColor: "#CCCCCC" }} />
          </div>
          <Typography
            variant="body2"
            color="#656565"
            align="center"
            onClick={() => {
              navigate("/login");
            }}
            style={{
              cursor: "pointer",
              textDecoration: "underline",
            }}
          >
            Already have an Account? Login Here
          </Typography>
        </div>
      </Grid>
    </Grid>
  );
};

export default RegistrationPage;