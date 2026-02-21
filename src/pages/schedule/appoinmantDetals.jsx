import NavBar from "../../components/navBar";
import {
  Box,
  Grid,
  Paper,
  Typography,
  Avatar,
  Button,
  Chip,
  Divider,
  TextField,
  Stack,
} from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
//import WarningAmberIcon from "@mui/icons-material/WarningAmber";
//import ChatIcon from "@mui/icons-material/Chat";
import UploadIcon from "@mui/icons-material/Upload";
import AddIcon from "@mui/icons-material/Add";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import ImageIcon from "@mui/icons-material/Image";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
//import MedicationIcon from "@mui/icons-material/Medication";
import LinkIcon from "@mui/icons-material/Link";
import VideocamIcon from "@mui/icons-material/Videocam";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import StickyNote2Icon from "@mui/icons-material/StickyNote2";
import MedicalRecord from "./medicalRecord";
import AddPrescription from "./Modal/prescriptionModal";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getPatientDetals } from "../../redux/schedule/appoinmantDetals";
import { useSelector, useDispatch } from "react-redux";
import { getAppDetById } from "../../redux/schedule/appoinmantDetals";
//import { setSelectedPatient } from "../../redux/schedule/schedule";
const cardStyle = {
  p: 3,
  borderRadius: "14px",
  backgroundColor: "#F9FAFB",
};
const prescriptions = [
  {
    name: "Amoxicillin",
    dosage: "500mg",
    frequency: "3x daily for 7 days",
    status: "Active",
  },
  {
    name: "Vitamin D3",
    dosage: "1000 IU",
    frequency: "2x daily for 4 days",
    status: "Active",
  },
  {
    name: "Vitamin D1",
    dosage: "1000 IU",
    frequency: "4x daily for 2 days",
    status: "Active",
  },
  {
    name: "Vitamin C3",
    dosage: "1000 IU",
    frequency: "3x daily for 7 days",
    status: "Active",
  },
  {
    name: "Vitamin A3",
    dosage: "1000 IU",
    frequency: "6x daily for 7 days",
    status: "Ended",
  },
];
export default function AppointmentsDetails() {
  const [openAddPrescription, setopenAddPrescription] = useState(false);
  const navigate = useNavigate();
  const [uiMiddle, setuiMiddle] = useState({
    Medical: false,
    overView: true,
  });
  const selectedPatient = useSelector(
    (state) => state.schedule.selectedPatient
  );
  const patientDetails = useSelector((state) => state.patientdet.datapatient);
  console.log("patientDetails: ", patientDetails);
  const appoinDetails = useSelector((state) => state.patientdet.dataApp);
  console.log("appoinDetails: ", appoinDetails?.data);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPatientDetals({ id: selectedPatient?.patient?.id }));
    dispatch(getAppDetById({ id: selectedPatient?.id }));
  }, [selectedPatient]);
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const isToday = date.toDateString() === today.toDateString();
    const formatted = date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
    return isToday ? `Today, ${formatted}` : formatted;
  };
  console.log(
    "appoinDetails?.data?.medicalImages ",
    appoinDetails?.data?.medicalImages
  );
  console.log("appoinDetails?.data? ", appoinDetails?.data);
  return (
    <>
      <AddPrescription
        openAddPrescription={openAddPrescription}
        setopenAddPrescription={setopenAddPrescription}
      />
      <Stack direction="row" sx={{ width: "100%" }}>
        <NavBar />
        <Box
          sx={{
            ml: "235px",
            width: "calc(100% - 212px)",
            backgroundColor: "#F0F2F6",
            minHeight: "100vh",
            p: 2,
          }}
        >
          <Grid container spacing={2}>
            {/* LEFT COLUMN */}
            <Grid size={{ xs: 12, md: 4 }}>
              <Paper
                sx={{
                  p: 3,
                  borderRadius: "14px",
                  backgroundColor: "white",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <Box
                  sx={{
                    backgroundColor: "primary.main",
                    width: "100%",
                    height: "100px",
                    position: "absolute",
                    top: 0,
                    left: 0,
                  }}
                ></Box>
                <Box sx={{ textAlign: "center" }}>
                  <Box
                    sx={{
                      width: "fit-content",
                      position: "relative",
                      mx: "auto",
                    }}
                  >
                    <Avatar
                      src={selectedPatient?.patient?.image}
                      sx={{
                        width: 110,
                        height: 110,
                        border: "1px solid white",
                      }}
                    />
                    <CheckCircleIcon
                      color="primary.main"
                      fontSize="medium"
                      sx={{
                        color: "primary.main",
                        position: "absolute",
                        bottom: "2px",
                        right: "10px",
                        backgroundColor: "white",
                        borderRadius: "50%",
                      }}
                    />
                  </Box>
                  <Typography
                    mt={2}
                    sx={{ fontSize: "32px", fontWeight: "600" }}
                  >
                    {selectedPatient?.patient?.name}
                  </Typography>
                  <Typography
                    sx={{
                      color: "#898989",
                      fontSize: "13px",
                      fontWeight: "500",
                    }}
                  >
                    ID : #{selectedPatient?.patient?.id.slice(-6)}
                  </Typography>

                  <Box mt={1} sx={{ fontSize: "10px", fontWeight: "400" }}>
                    <Chip
                      label={selectedPatient?.patient?.age}
                      size="small"
                      sx={{
                        mr: 1,
                        borderRadius: "4px",
                        border: "1px solid #3382F9",
                        backgroundColor: "#aec5e824",
                        color: "#3382F9",
                      }}
                    />
                    <Chip
                      label={selectedPatient?.patient?.gender}
                      size="small"
                      sx={{
                        mr: 1,
                        borderRadius: "4px",
                        border: "1px solid #CD129C",
                        backgroundColor: "#aec5e824",
                        color: "#CD129C",
                      }}
                    />
                    <Chip
                      label={patientDetails?.data?.basicInfo?.bloodType}
                      size="small"
                      sx={{
                        mr: 1,
                        borderRadius: "4px",
                        border: "1px solid #7716FD",
                        backgroundColor: "#aec5e824",
                        color: "#7716FD",
                      }}
                    />
                  </Box>
                </Box>
                <Stack
                  direction="row"
                  spacing={1}
                  mb={1}
                  mt={3}
                  sx={{
                    backgroundColor: "#ededed",
                    alignItems: "center",
                    borderRadius: "5px",
                    p: 2,
                    fontSize: "10px",
                    fontWeight: "500",
                    color: "#898989",
                  }}
                >
                  <PhoneIcon fontSize="large" />
                  <Stack>
                    <Typography variant="body2">Phone</Typography>
                    <Typography variant="body2">
                      {patientDetails?.data?.basicInfo?.phone}
                    </Typography>
                  </Stack>
                </Stack>
                <Stack
                  direction="row"
                  spacing={1}
                  mb={1}
                  mt={3}
                  sx={{
                    backgroundColor: "#ededed",
                    alignItems: "center",
                    borderRadius: "5px",
                    p: 2,
                    fontSize: "10px",
                    fontWeight: "500",
                    color: "#898989",
                  }}
                >
                  <EmailIcon fontSize="large" />
                  <Stack>
                    <Typography variant="body2">Email</Typography>
                    <Typography variant="body2">
                      {patientDetails?.data?.basicInfo?.email}
                    </Typography>
                  </Stack>
                </Stack>
                <Stack
                  direction="row"
                  spacing={1}
                  mb={1}
                  mt={3}
                  sx={{
                    backgroundColor: "#ededed",
                    alignItems: "center",
                    borderRadius: "5px",
                    p: 2,
                    fontSize: "10px",
                    fontWeight: "500",
                    color: "#898989",
                  }}
                >
                  <LocationOnIcon fontSize="large" />
                  <Stack>
                    <Typography variant="body2">City</Typography>
                    <Typography variant="body2">New York,NY</Typography>
                  </Stack>
                </Stack>
              </Paper>

              <Paper
                sx={{
                  p: 3,
                  borderRadius: "16px",
                  backgroundColor: "white",
                  mt: 3,
                }}
              >
                {/* Header */}
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  mb={3}
                >
                  <Typography variant="h5" fontWeight={600} color="#4B5563">
                    Appointment
                  </Typography>

                  <Chip
                    label={appoinDetails?.data?.status}
                    sx={{
                      backgroundColor: "#DCFCE7",
                      color: "#166534",
                      fontWeight: 500,
                      borderRadius: "8px",
                    }}
                  />
                </Box>

                <Stack spacing={3}>
                  {/* Date & Time */}
                  <Box display="flex" gap={2}>
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        borderRadius: "12px",
                        backgroundColor: "#DBEAFE",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <CalendarTodayIcon sx={{ color: "#2563EB" }} />
                    </Box>

                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Date & Time
                      </Typography>
                      <Typography fontWeight={600}>
                        {formatDate(appoinDetails?.data?.updatedAt)}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        10:00 AM - 10:45 AM
                      </Typography>
                    </Box>
                  </Box>

                  {/* Provider */}
                  <Box display="flex" gap={2}>
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        borderRadius: "12px",
                        backgroundColor: "#FCE7F3",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <LocalHospitalIcon sx={{ color: "#DB2777" }} />
                    </Box>

                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Provider
                      </Typography>
                      <Typography fontWeight={600}>
                        Dr. {appoinDetails?.data?.doctorName}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        General Practice
                      </Typography>
                    </Box>
                  </Box>

                  {/* Visit Type */}
                  <Box display="flex" gap={2}>
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        borderRadius: "12px",
                        backgroundColor: "#EDE9FE",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <MedicalServicesIcon sx={{ color: "#7C3AED" }} />
                    </Box>

                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Visit Type
                      </Typography>
                      <Typography fontWeight={600}>
                        {appoinDetails?.data?.reason}
                      </Typography>
                    </Box>
                  </Box>
                </Stack>
              </Paper>
            </Grid>

            {/* MIDDLE COLUMN */}
            <Grid size={{ xs: 12, md: 4 }}>
              <Stack
                direction={"row"}
                sx={{
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <Button
                  sx={{
                    fontSize: { xs: "8px", md: "11px" },
                    fontWeight: "400",
                    padding: "5px 20px",
                    border: uiMiddle.overView ? "1px solid #52AC8C" : "0",
                    color: uiMiddle.overView ? "#52AC8C" : "black",
                    textTransform: "none",
                  }}
                  onClick={() => {
                    setuiMiddle({
                      Medical: false,
                      overView: true,
                    });
                  }}
                >
                  OverView
                </Button>
                <Button
                  sx={{
                    fontSize: { xs: "8px", md: "11px" },
                    fontWeight: "400",
                    padding: "5px 20px",
                    border: uiMiddle.Medical ? "1px solid #52AC8C" : "0",
                    color: uiMiddle.Medical ? "#52AC8C" : "black",
                    textTransform: "none",
                  }}
                  onClick={() => {
                    setuiMiddle({
                      Medical: true,
                      overView: false,
                    });
                  }}
                >
                  Medical Records
                </Button>
                <Button
                  onClick={() => {
                    navigate("/schedule/appointmentsdetails/details");
                  }}
                  sx={{
                    fontSize: { xs: "8px", md: "11px" },
                    fontWeight: "400",
                    padding: "5px 20px",
                    color: "black",
                    textTransform: "none",
                  }}
                >
                  Details
                </Button>
                <Button
                  sx={{
                    fontSize: { xs: "8px", md: "11px" },
                    fontWeight: "400",
                    padding: "5px 30px",
                    color: "black",
                    textTransform: "none",
                  }}
                >
                  Timeline
                </Button>
              </Stack>
              <Divider sx={{ mb: 2 }} />
              {uiMiddle.Medical ? (
                <MedicalRecord
                  appoinDetails={appoinDetails}
                  formatDate={formatDate}
                />
              ) : (
                <Box>
                  {/* Diagnoses */}
                  <Paper sx={cardStyle}>
                    <Stack
                      direction={"row"}
                      spacing={1}
                      mb={2}
                      sx={{ alignItems: "center" }}
                    >
                      <img src="/assets/schudle/Vector.png" alt="" />
                      <Typography fontWeight={600} mb={2}>
                        Current Diagnoses
                      </Typography>
                    </Stack>
                    {patientDetails?.data?.diagnoses?.map((item) => (
                      <Paper
                        key={item?.id}
                        sx={{
                          p: 2,
                          mb: 2,
                          backgroundColor: "#EEEEEE",
                          borderRadius: 2,
                          // border: "1px solid #993C41",
                        }}
                      >
                        <Stack
                          direction={"row"}
                          sx={{
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <Box>
                            <Typography
                              sx={{
                                fontSize: "10",
                                fontWeight: "400",
                                color: "#464646",
                              }}
                            >
                              Acute Bronchitis
                            </Typography>
                            <Typography
                              sx={{
                                fontSize: "8",
                                fontWeight: "300",
                                color: "#616161",
                              }}
                            >
                              Diagnosed : {formatDate(item.createdAt)}
                            </Typography>
                          </Box>
                          <Typography
                            sx={{ fontSize: "20px", fontWeight: "300" }}
                          >
                            !
                          </Typography>
                        </Stack>
                      </Paper>
                    ))}
                    <Stack width={"100%"} alignItems={"end"} mt={2}>
                      <Button
                        sx={{
                          textTransform: "none",
                          fontSize: "11px",
                          fontWeight: "500",
                        }}
                      >
                        View History
                      </Button>
                    </Stack>
                  </Paper>

                  {/* Medical Images */}
                  <Paper sx={{ ...cardStyle, mt: 3 }}>
                    <Box display="flex" justifyContent="space-between" mb={2}>
                      <Stack direction={"row"} spacing={1.5}>
                        <ImageIcon sx={{ color: "primary.main" }} />
                        <Typography fontWeight={600}>Medical Images</Typography>
                      </Stack>
                      <Button
                        size="small"
                        startIcon={<UploadIcon />}
                        variant="contained"
                        sx={{ textTransform: "none", color: "white" }}
                        onClick={() => {
                          navigate("/medicalimaging");
                        }}
                      >
                        Upload
                      </Button>
                    </Box>

                    <Stack
                      direction={"row"}
                      sx={{
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexWrap: "wrap",
                      }}
                    >
                      {appoinDetails?.data?.medicalImages?.map((item) => (
                        <Box
                          key={item.id}
                          sx={{
                            width: "106px",
                            height: "107px",
                            overflow: "hidden",
                            borderRadius: "10px",
                            mt: 1,
                          }}
                        >
                          <img
                            src={item.viewerUrl}
                            alt=""
                            style={{ width: "100%", height: "100%" }}
                          />
                        </Box>
                      ))}
                      <Box
                        onClick={() => {
                          navigate("/medicalimaging");
                        }}
                        sx={{
                          width: 106,
                          height: 107,
                          borderRadius: "20px",
                          border: "2px solid #E5E7EB",
                          backgroundColor: "#F3F4F6",
                          display: "flex",
                          mt: 1,
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: 1,
                          cursor: "pointer",
                          transition: "all 0.2s ease",
                          "&:hover": {
                            backgroundColor: "#E5E7EB",
                            borderColor: "#D1D5DB",
                          },
                        }}
                      >
                        <AddAPhotoIcon
                          sx={{ fontSize: 40, color: "#9CA3AF" }}
                        />
                        <Typography
                          variant="body1"
                          sx={{ color: "#6B7280", fontWeight: 500 }}
                        >
                          Add Image
                        </Typography>
                      </Box>
                    </Stack>
                  </Paper>

                  {/* Prescriptions */}
                  <Paper
                    sx={{
                      p: 3,
                      mt: 3,
                      borderRadius: "16px",
                      backgroundColor: "#F9FAFB",
                      overflowX: "auto",
                    }}
                  >
                    {/* Header */}
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                      mb={3}
                    >
                      <Box display="flex" alignItems="center" gap={1}>
                        <LinkIcon sx={{ color: "#10B981" }} />
                        <Typography variant="h5" fontWeight={600}>
                          Prescriptions
                        </Typography>
                      </Box>

                      <Button
                        onClick={() => {
                          setopenAddPrescription(true);
                        }}
                        startIcon={<AddIcon />}
                        sx={{
                          textTransform: "none",
                          color: "#10B981",
                          fontWeight: 500,
                        }}
                      >
                        Add New
                      </Button>
                    </Box>

                    {/* Table Header */}
                    <Box
                      display="grid"
                      gridTemplateColumns="2fr 1fr 2fr 1fr"
                      pb={1}
                      sx={{ overflowX: "auto" }}
                    >
                      <Typography
                        fontWeight={600}
                        fontSize={"11px"}
                        color="#6B7280"
                      >
                        MEDICATION
                      </Typography>
                      <Typography
                        fontWeight={600}
                        fontSize={"11px"}
                        color="#6B7280"
                      >
                        DOSAGE
                      </Typography>
                      <Typography
                        fontWeight={600}
                        fontSize={"11px"}
                        color="#6B7280"
                      >
                        FREQUENCY
                      </Typography>
                      <Typography
                        fontWeight={600}
                        fontSize={"11px"}
                        color="#6B7280"
                      >
                        STATUS
                      </Typography>
                    </Box>

                    <Divider sx={{ mb: 2 }} />

                    {/* Rows */}
                    {appoinDetails?.data?.prescriptions[0]?.medications?.map(
                      (item, index) => (
                        <Box key={item.id} sx={{ overflowX: "auto" }}>
                          <Box
                            display="grid"
                            gridTemplateColumns="2fr 1fr 2fr 1fr"
                            alignItems="center"
                            py={1}
                          >
                            <Typography fontWeight={500} fontSize={"11px"}>
                              {item.drugName}
                            </Typography>
                            <Typography
                              fontWeight={500}
                              fontSize={"11px"}
                              color="text.secondary"
                            >
                              {item.dosage}
                            </Typography>
                            <Typography
                              fontWeight={500}
                              fontSize={"11px"}
                              color="text.secondary"
                            >
                              {item.frequency}
                            </Typography>

                            <Chip
                              label="active"
                              size="small"
                              sx={{
                                width: "fit-content",
                                backgroundColor: "#DBEAFE",
                                //   item.status === "Active"
                                //     ? "#DBEAFE"
                                //     : "#E5E7EB",
                                color: "#1D4ED8",
                                //   item.status === "Active"
                                //     ? "#1D4ED8"
                                //     : "#6B7280",
                                fontWeight: 500,
                              }}
                            />
                          </Box>

                          {index !== prescriptions.length - 1 && <Divider />}
                        </Box>
                      )
                    )}
                    {appoinDetails?.data?.prescriptions[1]?.medications?.map(
                      (item, index) => (
                        <Box key={item.id} sx={{ overflowX: "auto" }}>
                          <Box
                            display="grid"
                            gridTemplateColumns="2fr 1fr 2fr 1fr"
                            alignItems="center"
                            py={1}
                          >
                            <Typography fontWeight={500} fontSize={"11px"}>
                              {item.drugName}
                            </Typography>
                            <Typography
                              fontWeight={500}
                              fontSize={"11px"}
                              color="text.secondary"
                            >
                              {item.dosage}
                            </Typography>
                            <Typography
                              fontWeight={500}
                              fontSize={"11px"}
                              color="text.secondary"
                            >
                              {item.frequency}
                            </Typography>

                            <Chip
                              label="active"
                              size="small"
                              sx={{
                                width: "fit-content",
                                backgroundColor: "#DBEAFE",
                                //   item.status === "Active"
                                //     ? "#DBEAFE"
                                //     : "#E5E7EB",
                                color: "#1D4ED8",
                                //   item.status === "Active"
                                //     ? "#1D4ED8"
                                //     : "#6B7280",
                                fontWeight: 500,
                              }}
                            />
                          </Box>

                          {index !== prescriptions.length - 1 && <Divider />}
                        </Box>
                      )
                    )}

                    {/* Footer */}
                    <Box textAlign="right" mt={3}>
                      <Typography
                        sx={{
                          color: "#10B981",
                          cursor: "pointer",
                          fontWeight: 500,
                        }}
                      >
                        View History
                      </Typography>
                    </Box>
                  </Paper>
                </Box>
              )}
            </Grid>

            {/* RIGHT COLUMN */}
            <Grid size={{ xs: 12, md: 4 }}>
              {/**Session */}
              <Paper
                sx={{
                  p: 3,
                  borderRadius: "16px",
                  backgroundColor: "#F9FAFB",
                }}
              >
                {/* Header */}
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  mb={4}
                >
                  <Typography variant="h5" fontWeight={600} color="#4B5563">
                    Session
                  </Typography>

                  {/* Online Dot */}
                  <Box
                    sx={{
                      width: 12,
                      height: 12,
                      borderRadius: "50%",
                      backgroundColor: "#22C55E",
                    }}
                  />
                </Box>

                {/* Timer */}
                <Box textAlign="center" mb={4}>
                  <Typography
                    sx={{
                      fontSize: "64px",
                      fontWeight: 600,
                      color: "#374151",
                      lineHeight: 1,
                    }}
                  >
                    10:01
                  </Typography>

                  <Typography
                    sx={{
                      color: "#6B7280",
                      mt: 1,
                    }}
                  >
                    Elapsed Time
                  </Typography>
                </Box>

                {/* Buttons */}
                <Button
                  fullWidth
                  startIcon={<VideocamIcon size="large" />}
                  sx={{
                    mb: 2,
                    py: 1.8,
                    borderRadius: "10px",
                    textTransform: "none",
                    fontSize: "16px",
                    fontWeight: 500,
                    backgroundColor: "#5BA889",
                    color: "#fff",
                    "&:hover": {
                      backgroundColor: "#4E9579",
                    },
                  }}
                >
                  Start Video Call
                </Button>

                <Button
                  fullWidth
                  startIcon={<ChatBubbleOutlineIcon size="large" />}
                  sx={{
                    py: 1.8,
                    borderRadius: "10px",
                    textTransform: "none",
                    fontSize: "16px",
                    fontWeight: 500,
                    backgroundColor: "#5BA889",
                    color: "#fff",
                    "&:hover": {
                      backgroundColor: "#4E9579",
                    },
                  }}
                >
                  Join Chat
                </Button>
              </Paper>
              {/**Quick Notes */}
              <Paper
                sx={{
                  p: 3,
                  mt: 3,
                  borderRadius: "16px",
                  backgroundColor: "#F9FAFB",
                }}
              >
                {/* Header */}
                <Box display="flex" alignItems="center" gap={1} mb={3}>
                  <StickyNote2Icon sx={{ color: "#5BA889" }} />
                  <Typography variant="h5" fontWeight={600} color="#4B5563">
                    Quick Notes
                  </Typography>
                </Box>

                {/* Text Area */}
                <TextField
                  multiline
                  fullWidth
                  rows={10}
                  placeholder="Write quick observations here ..."
                  variant="outlined"
                  sx={{
                    mb: 3,
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: "#E6DDAE",
                      borderRadius: "14px",
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      border: "none",
                    },
                    "& textarea::placeholder": {
                      color: "#6B7280",
                      opacity: 1,
                    },
                  }}
                />

                {/* Save Button */}
                <Box textAlign="right">
                  <Button
                    sx={{
                      px: 3,
                      py: 1,
                      borderRadius: "8px",
                      textTransform: "none",
                      fontWeight: 500,
                      backgroundColor: "#5BA889",
                      color: "#fff",
                      "&:hover": {
                        backgroundColor: "#4E9579",
                      },
                    }}
                  >
                    Save Note
                  </Button>
                </Box>
              </Paper>
              {/**NEXT PATIENT */}
              <Paper
                sx={{
                  p: 3,
                  mt: 3,
                  borderRadius: "16px",
                  backgroundColor: "#F9FAFB",
                }}
              >
                <Typography
                  sx={{
                    color: "#464646",
                    fontSize: "13px",
                    fontWeight: "600",
                    mb: 2,
                  }}
                >
                  NEXT PATIENT
                </Typography>
                <Stack
                  direction={"row"}
                  spacing={2}
                  sx={{ alignItems: "center" }}
                >
                  <Avatar
                    src="https://i.pravatar.cc/150?img=5"
                    sx={{
                      width: 51,
                      height: 51,
                    }}
                  />
                  <Box>
                    <Typography sx={{ fontSize: "13px", fontWeight: "600" }}>
                      John Doe
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "13px",
                        fontWeight: "400",
                        color: "#616161",
                      }}
                    >
                      11:00 AM . Follow-up
                    </Typography>
                  </Box>
                </Stack>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Stack>
    </>
  );
}
