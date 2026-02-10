import { useState } from "react";
import {
  Stack,
  Box,
  Typography,
  TextField,
  Button,
  Avatar,
  IconButton,
  MenuItem,
  FormControl,
  Select,
  OutlinedInput,
  Alert,
  Collapse,
  InputAdornment,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import EditIcon from "@mui/icons-material/Edit";
import ErrorIcon from "@mui/icons-material/Error";
import { useDispatch } from "react-redux";
import { completeProfile } from "../redux/authSlice";
import { TimeField } from "@mui/x-date-pickers/TimeField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useNavigate } from "react-router";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const workingDaysList = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export default function ComPro() {
  const dispatch = useDispatch();
  // const [startTime, setStartTime] = useState(null);
  // const [endTime, setEndTime] = useState(null);
  const [image, setImage] = useState(null);
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");

  const [formData, setFormData] = useState({
    address: "",
    specialtyId: storedUser?.id || "",
    qualifications: "",
    licenseNumber: "",
    consultationFee: "",
    startWorkingTime: null,
    endWorkingTime: null,
    workingDays: [],
  });

  const validateForm = () => {
    const newErrors = {};

    if (!formData.address?.trim()) {
      newErrors.address = "Address is required";
    }

    if (!formData.consultationFee) {
      newErrors.consultationFee = "Consultation fee is required";
    } else if (
      isNaN(formData.consultationFee) ||
      Number(formData.consultationFee) <= 0
    ) {
      newErrors.consultationFee = "Please enter a valid fee amount";
    }

    if (!formData.qualifications?.trim()) {
      newErrors.qualifications = "Qualifications are required";
    }

    if (!formData.licenseNumber?.trim()) {
      newErrors.licenseNumber = "License number is required";
    }

    if (!formData.startWorkingTime) {
      newErrors.startWorkingTime = "Start time is required";
    }

    if (!formData.endWorkingTime) {
      newErrors.endWorkingTime = "End time is required";
    }

    if (formData.workingDays.length === 0) {
      newErrors.workingDays = "Please select at least one working day";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleTimeChange = (field, value) => {
    const key = field === "start" ? "startWorkingTime" : "endWorkingTime";

    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));

    if (errors[key]) {
      setErrors((prev) => ({ ...prev, [key]: "" }));
    }
  };

  const handleWorkingDaysChange = (e) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      workingDays: value,
    }));
    if (errors.workingDays) {
      setErrors((prev) => ({ ...prev, workingDays: "" }));
    }
  };

  const handleSubmit = () => {
    setFormError("");

    if (!validateForm()) {
      setFormError("Please fix the errors below");
      return;
    }
    setLoading(true);
    console.log("formData.specialtyId = ", formData.specialtyId);
    dispatch(
      completeProfile({
        ...formData,
        startWorkingTime: formData.startWorkingTime.format("HH:mm:ss"),
        endWorkingTime: formData.endWorkingTime.format("HH:mm:ss"),
        consultationFee: Number(formData.consultationFee),
      })
    )
      .unwrap()
      .then(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user) {
          user.isCompletedProfile = true;
          localStorage.setItem("user", JSON.stringify(user));
        }
        navigate("/");
      })
      .catch((error) => {
        setFormError(
          error.message || "Failed to complete profile. Please try again."
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const getFieldErrorProps = (fieldName) => ({
    error: !!errors[fieldName],
    helperText: errors[fieldName],
    FormHelperTextProps: {
      sx: {
        color: "error.main",
        display: "flex",
        alignItems: "center",
        gap: 0.5,
        mt: 0.5,
      },
    },
    InputProps: errors[fieldName]
      ? {
          endAdornment: (
            <InputAdornment position="end">
              <ErrorIcon color="error" fontSize="small" />
            </InputAdornment>
          ),
        }
      : {},
  });

  return (
    <Stack
      spacing={4}
      sx={{
        height: "100vh",
        overflow: "hidden",
        flexDirection: { xs: "column", md: "row" },
        justifyContent: { xs: "center", md: "space-between" },
        alignItems: "center",
      }}
    >
      {/* LEFT SIDE */}
      <Box
        sx={{
          height: "100%",
          width: "40%",
          display: { xs: "none", md: "block" },
          position: "relative",
        }}
      >
        <img
          src="/assets/auth/Group 1.png"
          alt=""
          style={{
            position: "absolute",
            zIndex: "1",
            right: "0",
            top: "96px",
            width: "85%",
            height: "70%",
          }}
        />
        <Box
          sx={{
            height: "100%",
            width: "80%",
            padding: "0 20px 20px",
            backgroundColor: "primary.main",
            display: "flex",
            alignItems: "end",
            justifyContent: "center",
          }}
        >
          <Typography
            sx={{
              fontWeight: "400",
              fontSize: "20px",
              textAlign: "center",
              color: "white",
            }}
          >
            Please take a few minutes to fill out your profile with as much
            detail as possible
          </Typography>
        </Box>
      </Box>

      {/* RIGHT SIDE */}
      <Box
        sx={{
          width: { xs: "100%", md: "60%" },
          height: { xs: "auto", md: "100vh" },
          overflow: "auto",
          py: 2,
        }}
      >
        <Stack
          sx={{
            width: { xs: "100%", md: "70%" },
            margin: "0 auto",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              fontWeight: "500",
              fontSize: { xs: "24px", md: "34.4px" },
              color: "primary.main",
              mb: 1,
            }}
          >
            Complete profile
          </Typography>

          <Typography
            sx={{
              fontWeight: "400",
              fontSize: { xs: "12px", md: "15px" },
              color: "#929292",
              textAlign: "center",
              mb: 3,
            }}
          >
            Please take a few minutes to fill out your profile with as much
            detail as possible
          </Typography>

          {/* Global Form Error */}
          <Collapse in={!!formError}>
            <Alert
              severity="error"
              sx={{
                width: "90%",
                mb: 2,
                "& .MuiAlert-icon": {
                  alignItems: "center",
                },
              }}
              onClose={() => setFormError("")}
            >
              {formError}
            </Alert>
          </Collapse>

          {/* IMAGE */}
          <Box
            sx={{
              width: "153px",
              height: "153px",
              borderRadius: "50%",
              backgroundColor: "#f3f5f8",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              margin: "10px 0",
            }}
          >
            <Avatar
              src={image}
              sx={{
                width: image ? "100%" : "76px",
                height: image ? "100%" : "76px",
                backgroundColor: "transparent",
              }}
            />
            <IconButton
              component="label"
              sx={{
                position: "absolute",
                bottom: 10,
                right: 2,
                background: "white",
                border: "1px solid #ccc",
                width: 32,
                height: 32,
                "&:hover": {
                  background: "#f5f5f5",
                },
              }}
            >
              <EditIcon fontSize="small" />
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleImage}
              />
            </IconButton>
          </Box>

          <TextField
            label="Consultation fee"
            name="consultationFee"
            type="number"
            value={formData.consultationFee}
            onChange={handleChange}
            sx={{ width: "90%", marginTop: "20px" }}
            {...getFieldErrorProps("consultationFee")}
          />

          <TextField
            label="Qualification"
            name="qualifications"
            value={formData.qualifications}
            onChange={handleChange}
            sx={{ width: "90%", marginTop: "20px" }}
            {...getFieldErrorProps("qualifications")}
          />

          <TextField
            label="License"
            name="licenseNumber"
            value={formData.licenseNumber}
            onChange={handleChange}
            sx={{ width: "90%", marginTop: "20px" }}
            {...getFieldErrorProps("licenseNumber")}
          />

          <TextField
            label="Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            multiline
            rows={2}
            sx={{ width: "90%", marginTop: "20px" }}
            {...getFieldErrorProps("address")}
          />

          {/* WORKING TIME */}
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Stack
              direction="row"
              spacing={2}
              sx={{ width: "90%", marginTop: "20px" }}
            >
              <Box sx={{ width: "50%" }}>
                <TimeField
                  label="Start time"
                  value={formData.startWorkingTime}
                  onChange={(newValue) => handleTimeChange("start", newValue)}
                  format="HH:mm:ss"
                  sx={{ width: "100%" }}
                  slotProps={{
                    textField: {
                      error: !!errors.startWorkingTime,
                      helperText: errors.startWorkingTime,
                    },
                  }}
                />
              </Box>

              <Box sx={{ width: "50%" }}>
                <TimeField
                  label="End time"
                  value={formData.endWorkingTime}
                  onChange={(newValue) => handleTimeChange("end", newValue)}
                  format="HH:mm:ss"
                  sx={{ width: "100%" }}
                  slotProps={{
                    textField: {
                      error: !!errors.endWorkingTime,
                      helperText: errors.endWorkingTime,
                    },
                  }}
                />
              </Box>
            </Stack>
          </LocalizationProvider>

          {/* WORKING DAYS */}
          <FormControl
            sx={{
              width: "90%",
              marginTop: "20px",
              ...(errors.workingDays && {
                "& .MuiOutlinedInput-root": {
                  "&.Mui-error fieldset": {
                    borderColor: "error.main",
                  },
                },
              }),
            }}
            error={!!errors.workingDays}
          >
            <Select
              multiple
              displayEmpty
              name="workingDays"
              value={formData.workingDays}
              onChange={handleWorkingDaysChange}
              input={<OutlinedInput />}
              renderValue={(selected) => {
                if (selected.length === 0) {
                  return <span style={{ color: "#9e9e9e" }}>Working days</span>;
                }
                return selected.join(", ");
              }}
              MenuProps={MenuProps}
            >
              <MenuItem disabled value="">
                <em>Working days</em>
              </MenuItem>

              {workingDaysList.map((day) => (
                <MenuItem key={day} value={day}>
                  {day}
                </MenuItem>
              ))}
            </Select>
            {errors.workingDays && (
              <Typography
                variant="caption"
                color="error"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                  mt: 0.5,
                  ml: 2,
                }}
              >
                <ErrorIcon fontSize="small" />
                {errors.workingDays}
              </Typography>
            )}
          </FormControl>

          <Button
            variant="contained"
            sx={{
              backgroundColor: "primary.main",
              fontSize: "19px",
              width: "90%",
              margin: "20px 0",
              textTransform: "none",
              color: "white",
              "&:hover": {
                backgroundColor: "primary.dark",
              },
              "&:disabled": {
                backgroundColor: "action.disabled",
              },
            }}
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={24} sx={{ color: "white" }} />
            ) : (
              "Complete Profile"
            )}
          </Button>
        </Stack>
      </Box>
    </Stack>
  );
}
