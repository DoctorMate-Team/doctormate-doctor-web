import * as React from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  Button,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Stack,
  FormLabel,
} from "@mui/material";
import NavBar from "../../components/navBar";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import { useState } from "react";
export default function Reports() {
  const [day, setDay] = useState(0);
  const events = [
    {
      time: "08:00 am",
      name: "John Smith",
      type: "Routine Checkup",
      color: "#4db6ac",
      bg: "#53AFAA47",
    },
    {
      time: "09:45 am",
      name: "Maria Garcia",
      type: "Follow-up",
      color: "#ff8a65",
      bg: "#FFEFE7",
    },
    {
      time: "10:50 am",
      name: "David Wilson",
      type: "",
      color: "#e57373",
      bg: "#E234243B",
    },
    {
      time: "02:40 pm",
      name: "Sarah Johnson",
      type: "Follow-up",
      color: "#ba68c8",
      bg: "#8E008B21",
    },
    {
      time: "04:00 pm",
      name: "Michael Chen",
      type: "Routine Checkup",
      color: "#64b5f6",
      bg: "#0073CC38",
    },
    {
      time: "06:00 pm",
      name: "Emily Rodriguez",
      type: "",
      color: "#b0bec5",
      bg: "#eceff1",
    },
  ];
  return (
    <Stack direction={"row"} sx={{ width: "100%" }}>
      <NavBar />
      <Box
        sx={{
          marginLeft: "212px",
          width: "calc(100% - 212px)",
          minHeight: "100vh",
          padding: 4,
          backgroundColor: "#f5f7fa",
        }}
      >
        <Box sx={{ p: 1, minHeight: "100vh" }}>
          <Typography variant="h5" fontWeight={600} gutterBottom>
            Report Entry & Schedule Management
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={3}>
            Create structured reports and manage appointments
          </Typography>

          <Grid container spacing={3}>
            {/* Left: Report Entry */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Paper sx={{ p: 3, borderRadius: 3 }}>
                <Box display="flex" justifyContent="space-between" mb={2}>
                  <Typography variant="h6">Report Entry</Typography>
                  <Button
                    variant="contained"
                    size="small"
                    sx={{
                      borderRadius: 1,
                      color: "white",
                      fontSize: "16px",
                      textTransform: "none",
                      fontWeight: "400",
                    }}
                  >
                    <SaveOutlinedIcon sx={{ mr: 1 }} />
                    Save Report
                  </Button>
                </Box>
                <FormLabel
                  sx={{
                    color: "#555555",
                    fontSize: "16px",
                    fontWeight: "400",
                  }}
                >
                  Patient
                </FormLabel>
                <FormControl fullWidth margin="normal">
                  <InputLabel>Select patient</InputLabel>
                  <Select label="Patient" defaultValue="">
                    <MenuItem value="">Select patient</MenuItem>
                    <MenuItem value="john">John Smith</MenuItem>
                    <MenuItem value="maria">Maria Garcia</MenuItem>
                  </Select>
                </FormControl>

                <FormLabel
                  sx={{
                    mt: 1,
                    color: "#555555",
                    fontSize: "16px",
                    fontWeight: "400",
                  }}
                >
                  Report Type
                </FormLabel>
                <FormControl fullWidth margin="normal">
                  <InputLabel>Report Type</InputLabel>
                  <Select label="Report Type" defaultValue="">
                    <MenuItem value="">Report Type</MenuItem>
                    <MenuItem value="john">John Smith</MenuItem>
                    <MenuItem value="maria">Maria Garcia</MenuItem>
                  </Select>
                </FormControl>

                <TextField
                  fullWidth
                  label="Chief Complaint"
                  placeholder="Enter chief complaint"
                  margin="normal"
                  multiline
                  rows={2}
                />

                <TextField
                  fullWidth
                  label="History of Present Illness"
                  placeholder="Describe the Present Illness"
                  margin="normal"
                  multiline
                  rows={3}
                />

                <TextField
                  fullWidth
                  label="Assessment"
                  placeholder="Clinical assessment"
                  margin="normal"
                  multiline
                  rows={2}
                />

                <TextField
                  fullWidth
                  label="Treatment Plan"
                  placeholder="Treatment plan and recommendations"
                  margin="normal"
                  multiline
                  rows={2}
                />

                <Paper
                  variant="outlined"
                  sx={{ p: 2, mt: 2, backgroundColor: "#fafafa" }}
                >
                  <Typography
                    variant="subtitle2"
                    gutterBottom
                    sx={{ fontSize: "16px", fontWeight: "400", mb: 2 }}
                  >
                    AI Suggestions
                  </Typography>
                  <Typography
                    variant="caption"
                    display="block"
                    color="#828282"
                    sx={{ fontSize: "16px", fontWeight: "400", mb: 2 }}
                  >
                    "Patient presents with acute onset of..."
                  </Typography>
                  <Typography
                    variant="caption"
                    display="block"
                    color="#828282"
                    sx={{ fontSize: "16px", fontWeight: "400", mb: 2 }}
                  >
                    "Physical examination reveals..."
                  </Typography>
                  <Typography
                    variant="caption"
                    display="block"
                    color="#828282"
                    sx={{ fontSize: "16px", fontWeight: "400" }}
                  >
                    "Recommend follow-up in 2 weeks..."
                  </Typography>
                </Paper>
              </Paper>
            </Grid>
            {/* Right: Schedule Management */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Paper sx={{ p: 3, borderRadius: 3 }}>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  mb={2}
                >
                  <Typography variant="h6">Schedule Management</Typography>
                  <Box display="flex" alignItems="center" gap={1}>
                    <Button
                      variant="contained"
                      size="small"
                      sx={{
                        borderRadius: 1,
                        color: "white",
                        fontSize: "16px",
                        textTransform: "none",
                        fontWeight: "400",
                      }}
                    >
                      <SaveOutlinedIcon sx={{ mr: 1 }} />
                      Save Report
                    </Button>
                  </Box>
                </Box>
                <Stack
                  direction={"row"}
                  justifyContent="space-between"
                  alignItems={"center"}
                  mb={3}
                >
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Today
                    </Typography>
                    <Typography variant="subtitle1" fontWeight={600}>
                      Thursday, 26 April 2025
                    </Typography>
                  </Box>
                  <Box sx={{ position: "relative" }}>
                    <NotificationsIcon
                      sx={{
                        color: "primary.main",
                        width: "42.79438781738281px",
                        height: "42.79438781738281px",
                      }}
                    />
                    <Box
                      sx={{
                        position: "absolute",
                        backgroundColor: "#E6D949",
                        width: "11.26168155670166px",
                        height: "11.26168155670166px",
                        borderRadius: "50%",
                        bottom: "13px",
                        right: "0px",
                      }}
                    ></Box>
                  </Box>
                </Stack>
                <Stack direction={"row"} justifyContent={"space-evenly"} mb={3}>
                  {[
                    {
                      day: "Thu",
                      date: " 26",
                    },
                    {
                      day: "Fri",
                      date: " 27",
                    },
                    {
                      day: "Sat",
                      date: " 28",
                    },
                    {
                      day: "Sun",
                      date: " 29",
                    },
                    {
                      day: "Mon",
                      date: " 30",
                    },
                    {
                      day: "Tue",
                      date: " 31",
                    },
                    {
                      day: "Wed",
                      date: " 01",
                    },
                  ].map((d, i) => (
                    <Stack
                      key={i}
                      sx={{
                        backgroundColor: day === i ? "#2A9D8F" : "#75B4B2",
                        color: "white",
                        borderRadius: "20.27px",
                        p: 1,
                        height: "81.0841064453125px",
                        cursor: "pointer",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "45.04672622680664px",
                        fontSize: "15.77px",
                        fontWeight: "400",
                      }}
                      onClick={() => setDay(i)}
                    >
                      <Typography>{d.day}</Typography>
                      <Typography>{d.date}</Typography>
                    </Stack>
                  ))}
                </Stack>
                <Box sx={{ width: 420, p: 2 }}>
                  {events.map((e, i) => (
                    <Box
                      key={i}
                      sx={{
                        display: "flex",
                        alignItems: "flex-start",
                        mb: 0.5,
                      }}
                    >
                      {/* time above the line */}
                      <Box sx={{ width: 70, textAlign: "center", mr: 2 }}>
                        <Typography
                          fontSize={15.77}
                          color="#454545"
                          fontWeight={400}
                        >
                          {e.time}
                        </Typography>
                        <Box
                          sx={{
                            width: 3.378504753112793,
                            height: 80,
                            bgcolor: e.color,
                            mx: "auto",
                            mt: 0.5,
                            opacity: 0.6,
                          }}
                        />
                      </Box>

                      {/* card */}
                      <Paper
                        elevation={0}
                        sx={{
                          flex: 1,
                          p: 1.5,
                          bgcolor: e.bg,
                          borderLeft: `4px solid ${e.color}`,
                        }}
                      >
                        <Typography fontWeight={600}>{e.name}</Typography>
                        {e.type && (
                          <Typography fontSize={13} color="text.secondary">
                            {e.type}
                          </Typography>
                        )}
                      </Paper>
                    </Box>
                  ))}
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Stack>
  );
}
