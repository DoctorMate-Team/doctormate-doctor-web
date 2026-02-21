import { useState, useEffect, use } from "react";
import { CircularProgress } from "@mui/material";
import {
  Box,
  Typography,
  Avatar,
  Button,
  TextField,
  Grid,
  Stack,
  MenuItem,
  Divider,
  FormLabel,
  Checkbox,
} from "@mui/material";
import { Snackbar, Alert } from "@mui/material";
import NavBar from "../../components/navBar";
import { Link, useNavigate } from "react-router-dom";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useDispatch, useSelector } from "react-redux";
import { profileManagement } from "../../redux/doctor/profileMangment";
const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
import dayjs from "dayjs";

export default function Settings() {
  const dispatch = useDispatch();
  const { loading, error, data } = useSelector((state) => state.profile);
  const [date, setdate] = useState({ startTime: null, endTime: null });
  const [selectedDays, setSelectedDays] = useState([]);
  const [disabled, setDisabled] = useState(true);
  const navigate = useNavigate();
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "error",
  });
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    speciality: "",
    address: "",
    workingTime: "",
    consultationFee: "",
    profilePhoto: null,
  });
  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      workingTime: [
        selectedDays.join(", "),
        `from ${date.startTime ? dayjs(date.startTime).format("h A") : ""} to ${
          date.endTime ? dayjs(date.endTime).format("h A") : ""
        }`,
      ],
    }));
  }, [selectedDays, date]);
  const toggleDay = (day) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setForm((prev) => ({
      ...prev,
      profilePhoto: file,
    }));
  };
  useEffect(() => {
    if (error) {
      setSnackbar({
        open: true,
        message: error || "Something went wrong",
        severity: "error",
      });
    }
    if (data) {
      setSnackbar({
        open: true,
        message: data.message,
        severity: "success",
      });
    }
  }, [error, data]);
  function handleSave() {
    const workingTimeString = `${selectedDays.join(", ")} from ${
      date.startTime ? dayjs(date.startTime).format("h A") : ""
    } to ${date.endTime ? dayjs(date.endTime).format("h A") : ""}`;
    const formToSend = {
      ...form,
      workingTime: workingTimeString,
    };
    dispatch(profileManagement(formToSend))
      .unwrap()
      .then(() => {
        navigate("/doctorprofile");
      });
  }

  useEffect(() => {
    const allEmpty =
      form.fullName.trim() === "" &&
      form.phone.trim() === "" &&
      form.speciality.trim() === "" &&
      form.address.trim() === "" &&
      form.consultationFee.trim() === "" &&
      form.profilePhoto === null &&
      selectedDays.length === 0 &&
      date.startTime === null &&
      date.endTime === null;
    setDisabled(allEmpty);
  }, [form, selectedDays, date]);
  return (
    <Stack direction={"row"} sx={{ width: "100%" }}>
      <NavBar />
      <Box
        sx={{
          backgroundColor: "#F0F2F6",
          marginLeft: "212px",
          width: "calc(100% - 212px)",
          minHeight: "100vh",
          padding: " 0 10px ",
        }}
      >
        <Snackbar
          open={snackbar.open}
          autoHideDuration={2500}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        >
          <Alert
            onClose={() => setSnackbar({ ...snackbar, open: false })}
            severity={snackbar.severity}
            sx={{ width: "100%" }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>

        {/* Header */}
        <Box
          sx={{
            borderRadius: "10px",
            backgroundColor: "white",
            mb: 2,
            padding: "5px 15px",
          }}
        >
          <Typography sx={{ fontSize: "23.27px", fontWeight: "600" }}>
            Edit Profile
          </Typography>

          <Typography
            sx={{ fontSize: "23.27px", fontWeight: "300", color: "#616161" }}
          >
            Update your professional information and settings
          </Typography>
        </Box>
        {/* Profile Photo */}
        <Box sx={{ p: 4, borderRadius: 3, backgroundColor: "white", mb: 3 }}>
          <Stack direction="row" spacing={3} alignItems="center" mb={4}>
            <Box position="relative">
              <Avatar
                src={
                  form.profilePhoto
                    ? URL.createObjectURL(form.profilePhoto)
                    : ""
                }
                sx={{ width: "155px", height: "155px" }}
              />
              <Box
                sx={{
                  position: "absolute",
                  bottom: 10,
                  right: 10,
                  bgcolor: "white",
                  borderRadius: "50%",
                  width: 24,
                  height: 24,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <CameraAltIcon sx={{ color: "primary.main", fontSize: 16 }} />
              </Box>
            </Box>
            <Box>
              <Typography
                sx={{ fontSize: "26px", fontWeight: "500", color: "#555555" }}
              >
                Profile photo
              </Typography>
              <Typography
                sx={{ fontSize: "21px", fontWeight: "400", color: "#555555" }}
                mb={1}
              >
                Upload a professional photo
              </Typography>
              <input
                accept="image/*"
                id="upload-photo"
                type="file"
                hidden
                onChange={handlePhotoChange}
              />

              <Button
                variant="contained"
                component="label"
                htmlFor="upload-photo"
                sx={{
                  backgroundColor: "primary.main",
                  fontSize: "20.69px",
                  fontWeight: "400",
                  color: "white",
                  textTransform: "none",
                }}
              >
                Change Photo
              </Button>
            </Box>
          </Stack>

          {/* Form */}
          <Grid container spacing={3}>
            <Grid size={{ xs: 12 }}>
              <FormLabel
                sx={{ fontWeight: "400", fontSize: "20px", color: "#555555" }}
              >
                Full Name
              </FormLabel>
              <TextField
                fullWidth
                value={form.fullName}
                onChange={(e) => setForm({ ...form, fullName: e.target.value })}
              />
            </Grid>
            {/* <Grid size={{ xs: 12, md: 6 }}>
              <FormLabel
                sx={{ fontWeight: "400", fontSize: "20px", color: "#555555" }}
              >
                Email
              </FormLabel>
              <TextField
                fullWidth
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </Grid> */}
            <Grid size={{ xs: 12, md: 6 }}>
              <FormLabel
                sx={{ fontWeight: "400", fontSize: "20px", color: "#555555" }}
              >
                Phone
              </FormLabel>
              <TextField
                type="number"
                fullWidth
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormLabel
                sx={{ fontWeight: "400", fontSize: "20px", color: "#555555" }}
              >
                Speciality
              </FormLabel>
              <TextField
                select
                fullWidth
                value={form.speciality}
                onChange={(e) =>
                  setForm({ ...form, speciality: e.target.value })
                }
              >
                <MenuItem value="Cardiology">Cardiology</MenuItem>
                <MenuItem value="Dermatology">Dermatology</MenuItem>
                <MenuItem value="Neurology">Neurology</MenuItem>
              </TextField>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <FormLabel
                sx={{ fontWeight: "400", fontSize: "20px", color: "#555555" }}
              >
                Address
              </FormLabel>
              <TextField
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                value={form.address}
                fullWidth
                multiline
                rows={2}
                placeholder="Flat No. 402, Golden Heights, Opp. Infinity Mall, Link Road, Andheri West"
              />
            </Grid>
          </Grid>

          {/* Working Schedule */}
          <Box mt={4}>
            <Typography
              sx={{ fontWeight: "400", fontSize: "24px", color: "#555555" }}
              mb={2}
            >
              Working Schedule
            </Typography>

            <Typography
              sx={{ fontWeight: "400", fontSize: "20px", color: "#616161" }}
              mb={1}
            >
              Working Days
            </Typography>
            <Stack
              direction={"row"}
              sx={{ flexWrap: "wrap", justifyContent: "space-between" }}
            >
              {days.map((day) => {
                const checked = selectedDays.includes(day);
                return (
                  <Box
                    key={day}
                    onClick={() => toggleDay(day)}
                    sx={{
                      width: "133px",
                      height: "96px",
                      margin: "5px",
                      borderRadius: 2,
                      border: "1.5px solid",
                      borderColor: checked ? "#3fa37b" : "#7fc6a4",
                      backgroundColor: checked ? "#E2E5E0" : "#fff",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "0.2s",
                      flexDirection: "column",
                    }}
                  >
                    <Checkbox sx={{ fontSize: "10px" }} checked={checked} />
                    {/* Day Label */}
                    <Typography
                      fontWeight={500}
                      color={checked ? "primary.main" : "#555"}
                    >
                      {day}
                    </Typography>
                  </Box>
                );
              })}
            </Stack>

            <Stack
              sx={{
                flexDirection: { xs: "column", md: "row" },
                justifyContent: { xs: "flex-start", md: "space-between" },
                alignItems: "center",
              }}
              mt={3}
              mb={2}
            >
              <Box sx={{ width: { xs: "100%", md: "48%" }, margin: "10px 0" }}>
                <FormLabel
                  sx={{ fontWeight: "400", fontSize: "20px", color: "#555555" }}
                >
                  Start Time
                </FormLabel>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <TimePicker
                    ampm
                    placeholder="09:00 AM"
                    value={date.startTime}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                      },
                    }}
                    onChange={(newValue) =>
                      setdate({ ...date, startTime: newValue })
                    }
                  />
                </LocalizationProvider>
              </Box>
              <Box sx={{ width: { xs: "100%", md: "48%" } }}>
                <FormLabel
                  sx={{ fontWeight: "400", fontSize: "20px", color: "#555555" }}
                >
                  End Time
                </FormLabel>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <TimePicker
                    value={date.endTime}
                    onChange={(newValue) =>
                      setdate({ ...date, endTime: newValue })
                    }
                    ampm
                    placeholder="09:00 AM"
                    slotProps={{
                      textField: {
                        fullWidth: true,
                      },
                    }}
                  />
                </LocalizationProvider>
              </Box>
            </Stack>
            <Box>
              <FormLabel
                sx={{ fontWeight: "400", fontSize: "20px", color: "#555555" }}
              >
                Consultation Fee (EGP)
              </FormLabel>
              <TextField
                fullWidth
                value={form.consultationFee}
                onChange={(e) =>
                  setForm({ ...form, consultationFee: e.target.value })
                }
              />
            </Box>
          </Box>

          <Divider sx={{ my: 4 }} />

          {/* Actions */}
          <Stack direction="row" justifyContent="flex-end" spacing={2}>
            <Button
              variant="outlined"
              color="success"
              onClick={() => navigate("/doctorprofile")}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              backgroundColor="primary.main"
              sx={{
                color: "white",
                textTransform: "none",
                position: "relative",
              }}
              onClick={handleSave}
              disabled={disabled}
            >
              {loading ? (
                <CircularProgress
                  size={24}
                  sx={{
                    color: "white",
                  }}
                />
              ) : (
                "Save Changes"
              )}
            </Button>
          </Stack>
        </Box>
      </Box>
    </Stack>
  );
}
