import {
  Box,
  Card,
  Typography,
  Button,
  Stack,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Paper } from "@mui/material";
//import TableRow from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import NavBar from "./navBar";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { appointmentsPatient } from "../redux/schedule";
export default function Schedule() {
  const [time, setTime] = useState("Daily");
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.schedule);
  console.log("data = ", data);
  let schedule = [
    {
      time: "09:00",
      sarah: { name: "John Smith", type: "Follow-up", color: "green" },
      michael: null,
      emily: { name: "Maria Garcia", type: "New Patient", color: "blue" },
    },
    {
      time: "10:00",
      sarah: null,
      michael: { name: "David Wilson", type: "Consultation", color: "green" },
      emily: null,
    },
    {
      time: "11:00",
      sarah: { name: "Lisa Brown", type: "Cancelled", color: "gray" },
      michael: null,
      emily: { name: "Robert Taylor", type: "Follow-up", color: "green" },
    },
  ];
  useEffect(() => {
    dispatch(appointmentsPatient());
    // for (let i = 0; i < data.data.length; i++) {
    //   schedule.push({
    //     id: i.id,
    //     time: "09:00",
    //     sarah: { name: "John Smith", type: "Follow-up", color: "green" },
    //     michael: null,
    //     emily: { name: "Maria Garcia", type: "New Patient", color: "blue" },
    //   });
    // }
  }, [dispatch]);

  const getColors = (color) => {
    switch (color) {
      case "green":
        return { bg: "#E6FCEF", text: "#1B7F4B" };
      case "blue":
        return { bg: "#E7F0FF", text: "#2F5EFF" };
      case "gray":
        return { bg: "#F2F2F2", text: "#9E9E9E" };
      default:
        return {};
    }
  };

  return (
    <Stack direction={"row"} sx={{ width: "100%" }}>
      <NavBar />
      <Box
        sx={{
          backgroundColor: "#F0F2F6",
          marginLeft: "212px",
          padding: "20px",
          width: "calc(100% - 212px)",
        }}
      >
        <Box width={"100%"}>
          {/* Header */}
          <Card sx={{ p: 3, mb: 3, borderRadius: 3 }}>
            <Stack
              spacing={2}
              sx={{
                flexDirection: { xs: "column", md: "row" },
                justifyContent: { xs: "center", md: "space-between" },
                alignItems: "center",
              }}
            >
              <Typography
                fontWeight="bold"
                sx={{ fontSize: "20px", fontWeight: "400" }}
              >
                Schedule Overview
              </Typography>
              <Stack
                direction="row"
                spacing={2}
                sx={{
                  background: "#F3F4F6",
                  borderRadius: "8px",
                  p: 1,
                  fontSize: "16px",
                  fontWeight: "500",
                  color: "black",
                }}
              >
                <Button
                  onClick={() => setTime("Daily")}
                  sx={{
                    color: time === "Daily" ? "white" : "black",
                    backgroundColor:
                      time === "Daily" ? "primary.main" : "transparent",
                  }}
                >
                  Daily
                </Button>
                <Button
                  onClick={() => setTime("Weekly")}
                  sx={{
                    color: time === "Weekly" ? "white" : "black",
                    backgroundColor:
                      time === "Weekly" ? "primary.main" : "transparent",
                  }}
                >
                  Weakly
                </Button>
                <Button
                  onClick={() => setTime("Monthly")}
                  sx={{
                    color: time === "Monthly" ? "white" : "black",
                    backgroundColor:
                      time === "Monthly" ? "primary.main" : "transparent",
                  }}
                >
                  Monthly
                </Button>
              </Stack>
              <Button
                variant="contained"
                color="success"
                startIcon={<AddIcon />}
                sx={{
                  mt: "20px",
                  fontSize: "16px",
                  fontWeight: "500",
                  backgroundColor: "primary.main",
                  borderRadius: "20px",
                  padding: "12px 24px",
                  textTransform: "none",
                }}
              >
                Book New Appointment
              </Button>
            </Stack>
          </Card>
          {/* Timeline */}

          <TableContainer
            component={Paper}
            sx={{ borderRadius: "16px", marginBottom: "20px" }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Time</TableCell>
                  <TableCell>Dr. Sarah Johnson</TableCell>
                  <TableCell>Dr. Michael Chen</TableCell>
                  <TableCell>Dr. Emily Davis</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {schedule.map((row, i) => (
                  <TableRow key={i}>
                    <TableCell>{row.time}</TableCell>
                    {["sarah", "michael", "emily"].map((doc) => {
                      const data = row[doc];
                      if (!data) return <TableCell key={doc} />;

                      const colors = getColors(data.color);

                      return (
                        <TableCell key={doc}>
                          <Box
                            sx={{
                              backgroundColor: colors.bg,
                              color: colors.text,
                              borderRadius: "10px",
                              padding: "10px 14px",
                              minHeight: "60px",
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "center",
                            }}
                          >
                            <Typography fontWeight="600">
                              {data.type === "Cancelled" ? (
                                <del>{data.name}</del>
                              ) : (
                                data.name
                              )}
                            </Typography>
                            <Typography fontSize="12px">{data.type}</Typography>
                          </Box>
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Today Appointments Table */}
          <Box sx={{ borderRadius: 3, backgroundColor: "transparent" }}>
            <Typography p={2} fontWeight="bold">
              Today’s Appointments
            </Typography>
            <TableContainer
              sx={{ backgroundColor: "white", borderRadius: "20px" }}
            >
              <Table>
                <TableHead>
                  <TableRow sx={{ bgcolor: "#4caf84" }}>
                    {[
                      "Time",
                      "Patient",
                      "Doctor",
                      "Type",
                      "Status",
                      "Actions",
                    ].map((head) => (
                      <TableCell
                        key={head}
                        sx={{ color: "#fff", fontWeight: "bold" }}
                      >
                        {head}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data?.data?.appointments?.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell>{row.appointmentTime} AM</TableCell>
                      <TableCell sx={{ color: "primary.main" }}>
                        John Smith
                      </TableCell>
                      <TableCell>Dr.{row.doctor.doctorName}</TableCell>
                      <TableCell>{row.status}</TableCell>
                      <TableCell>
                        <Chip
                          label={row.status}
                          color="success"
                          size="small"
                          sx={{ backgroundColor: "primary.main" }}
                        />
                      </TableCell>
                      <TableCell>•••</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      </Box>
    </Stack>
  );
}
