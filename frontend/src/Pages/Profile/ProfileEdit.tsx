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
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useUserStore } from "../../store/UserStore";
import { useNavigate } from "react-router-dom";
import { login } from "../../deprecateded/auth";

type FormValues = {
  name: string;
  email: string;
  password: string;
  address: string;
  role: string;
  skills: string;
  phonenumber: string;
  availability: string;
  gender: string;
  hours: string;
};

const ProfileEdit = ({ props }: { props: any }) => {
  const {
    name,
    email,
    address,
    role,
    skills,
    phonenumber,
    availability,
    gender,
    hours,
  } = props;

  const form = useForm<FormValues>({
    defaultValues: {
      name: name,
      email: email,
      address: address,
      role,
      skills: skills,
      phonenumber: phonenumber,
      availability: availability,
      gender: gender,
      hours: hours,
    },
  });

  const [availabilityDrop, setAvailabilityDtop] = useState(availability);

  const userId = useUserStore((state) => state.id);
  const password = useUserStore((state) => state.password);

  const navigate = useNavigate();

  const { register, handleSubmit, formState } = form;
  const { errors } = formState;

  const handleSaveProfile = (data: FormValues) => {
    const url = "http://localhost:8000/api/v1/users/edit";
    const body = {
      id: userId,
      name: data.name,
      role,
      email,
      password,
      address: data.address,
      availability: availabilityDrop,
      hours: data.hours,
      gender: data.gender,
      skills: data.skills,
      phonenumber: data.phonenumber,
    };

    axios.post(url, body).then((res) => {
      if (res.status !== 200) {
        toast.error("Failed to save profile");
        return;
      }
      toast.success("Saved profile");
      login(email, password, navigate);
    });
  };

  return (
    <div className="my-1">
      <form onSubmit={handleSubmit(handleSaveProfile)} noValidate>
        <Stack direction="row" spacing={2} width={"100%"}> {/* Set horizontal direction */}
          <Stack spacing={1} width={"50%"}> {/* Left half of the form */}
            <TextField
              label="Name"
              type="text"
              {...register("name", { required: "Name is required" })}
              error={!!errors.name}
              helperText={errors.name?.message}
              sx={{
                "& label": { paddingLeft: (theme) => theme.spacing(1) },
                "& input": { paddingLeft: (theme) => theme.spacing(2) },
                "& fieldset": {
                  paddingLeft: (theme) => theme.spacing(1),
                  borderRadius: "10px",
                },
                margin: '0',
              }}
            />
            <TextField
              label="Email"
              type="email"
              {...register("email", { required: "Email is required" })}
              error={!!errors.email}
              helperText={errors.email?.message}
              sx={{
                "& label": { paddingLeft: (theme) => theme.spacing(1) },
                "& input": { paddingLeft: (theme) => theme.spacing(2) },
                "& fieldset": {
                  paddingLeft: (theme) => theme.spacing(1),
                  borderRadius: "10px",
                },
                margin: '0',
              }}
              disabled
              value={email}
            />
            <TextField
              label="Role"
              type="text"
              {...register("role", { required: "Role is required" })}
              error={!!errors.role}
              helperText={errors.role?.message}
              sx={{
                "& label": { paddingLeft: (theme) => theme.spacing(1) },
                "& input": { paddingLeft: (theme) => theme.spacing(2) },
                "& fieldset": {
                  paddingLeft: (theme) => theme.spacing(1),
                  borderRadius: "10px",
                },
                margin: '0',
              }}
              disabled
              value={role}
            />
            <TextField
              label="Address"
              type="text"
              {...register("address")}
              error={!!errors.address}
              helperText={errors.address?.message}
              sx={{
                "& label": { paddingLeft: (theme) => theme.spacing(1) },
                "& input": { paddingLeft: (theme) => theme.spacing(2) },
                "& fieldset": {
                  paddingLeft: (theme) => theme.spacing(1),
                  borderRadius: "10px",
                },
                margin: '0',
              }}
            />
            <TextField
              label="Skills"
              type="text"
              {...register("skills")}
              error={!!errors.skills}
              helperText={errors.skills?.message}
              sx={{
                "& label": { paddingLeft: (theme) => theme.spacing(1) },
                "& input": { paddingLeft: (theme) => theme.spacing(2) },
                "& fieldset": {
                  paddingLeft: (theme) => theme.spacing(1),
                  borderRadius: "10px",
                },
                margin: '0',
              }}
            />
          </Stack>

          <Stack spacing={1} width={"50%"}> {/* Right half of the form */}
            <TextField
              label="Phone number"
              type="text"
              {...register("phonenumber")}
              error={!!errors.phonenumber}
              helperText={errors.phonenumber?.message}
              sx={{
                "& label": { paddingLeft: (theme) => theme.spacing(1) },
                "& input": { paddingLeft: (theme) => theme.spacing(2) },
                "& fieldset": {
                  paddingLeft: (theme) => theme.spacing(1),
                  borderRadius: "10px",
                },
                margin: '0',
              }}
            />
            <FormControl>
              <InputLabel id="available-id">Availability</InputLabel>
              <Select
                value={availabilityDrop}
                labelId="available-id"
                label="Availability"
                id="available-id-1"
                sx={{
                  "& label": { paddingLeft: (theme) => theme.spacing(1) },
                  "& fieldset": {
                    paddingLeft: (theme) => theme.spacing(1),
                    borderRadius: "10px",
                  },
                  margin: '0',
                }}
                onChange={(e: SelectChangeEvent) => {
                  setAvailabilityDtop(e.target.value);
                }}
              >
                <MenuItem value={"4 Hours"}>4 Hours</MenuItem>
                <MenuItem value={"8 Hours"}>8 Hours</MenuItem>
                <MenuItem value={"12 Hours"}>12 Hours</MenuItem>
                <MenuItem value={"16 Hours"}>16 Hours</MenuItem>
                <MenuItem value={"20 Hours"}>20 Hours</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Gender"
              type="text"
              {...register("gender")}
              error={!!errors.gender}
              helperText={errors.gender?.message}
              sx={{
                "& label": { paddingLeft: (theme) => theme.spacing(1) },
                "& input": { paddingLeft: (theme) => theme.spacing(2) },
                "& fieldset": {
                  paddingLeft: (theme) => theme.spacing(1),
                  borderRadius: "10px",
                },
                margin: '0',
              }}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{
                background: "#1E90FF",
                borderRadius: "10px",
                textTransform: "none",
                fontSize: "16px",
                marginTop: '8px', // Reduced top margin for button
              }}
            >
              Save Profile
            </Button>
          </Stack>
        </Stack>
      </form>
    </div>
  );
};

export default ProfileEdit;
