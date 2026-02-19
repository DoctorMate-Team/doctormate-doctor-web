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
  CardContent,
  Avatar,
  Grid,
} from "@mui/material";
import {
  AccessTime,
  VideoCall,
  ChatBubbleOutline,
  Description,
  CalendarToday,
} from "@mui/icons-material";
import { Paper } from "@mui/material";
//import TableRow from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import NavBar from "../../components/navBar";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { appointmentsPatient } from "../../redux/schedule/schedule";
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
  const sessionsData = [
    {
      id: "APT-2401",
      name: "Sarah Johnson",
      avatar: "https://i.pravatar.cc/150?img=1",
      date: "Today, Feb 7, 2026",
      time: "3:15 PM",
      type: "Therapy session for anxiety management",
      status: "upcoming",
      statusLabel: "Upcoming",
    },
    {
      id: "APT-2403",
      name: "Michael Chen",
      avatar: "https://i.pravatar.cc/150?img=3",
      date: "Today, Feb 7, 2026",
      time: "3:15 PM",
      type: "Annual checkup and blood pressure monitoring",
      status: "now",
      statusLabel: "NOW",
    },
    {
      id: "APT-2402",
      name: "Emily Rodriguez",
      avatar: "https://i.pravatar.cc/150?img=5",
      date: "Today, Feb 7, 2026",
      time: "3:15 PM",
      type: "Annual checkup and blood pressure monitoring",
      status: "in-progress",
      statusLabel: "In Progress",
      sessionInfo: "Session started 25 minutes ago",
    },
    {
      id: "APT-2404",
      name: "David Tompson",
      avatar: "https://i.pravatar.cc/150?img=8",
      date: "Today, Feb 7, 2026",
      time: "8:00 PM",
      type: "Physical therapy session for knee rehabilitation",
      status: "finished",
      statusLabel: "Finished",
      completedInfo: "Completed 3 hours ago",
    },
    {
      id: "APT-2401",
      name: "Jessica Martinez",
      avatar: "https://i.pravatar.cc/150?img=9",
      date: "Today, Feb 7, 2026",
      time: "3:15 PM",
      type: "Therapy session for anxiety management",
      status: "upcoming",
      statusLabel: "Upcoming",
    },
    {
      id: "APT-2408",
      name: "Robert Anderson",
      avatar: "https://i.pravatar.cc/150?img=11",
      date: "Today, Feb 7, 2026",
      time: "8:00 PM",
      type: "Physical therapy session for knee rehabilitation",
      status: "finished",
      statusLabel: "Finished",
      completedInfo: "Completed 3 hours ago",
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

          <Grid container spacing={2}>
            {sessionsData.map((session) => (
              <Grid size={{ xs: 12, md: 6 }} key={session.id}>
                <Card
                  sx={{
                    mx: "auto",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                    width: "90%",
                    borderRadius: "20px",
                    border: "1px solid #828282",
                    position: "relative",
                    overflow: "visible",
                    p: "15px 20px 10px",
                  }}
                >
                  <Box
                    sx={{
                      width: "101px",
                      height: "19px",
                      backgroundColor: "primary.main",
                      color: "white",
                      fontSize: "12px",
                      fontWeight: "500",
                      textAlign: "center",
                      borderRadius: "8px",
                      position: "absolute",
                      opacity: "80%",
                      left: "20px",
                      top: "-10px",
                      zIndex: "20",
                    }}
                  >
                    Ready To Start
                  </Box>

                  <Stack
                    direction={"row"}
                    sx={{
                      alignItems: "center",
                      justifyContent: "space-between",
                      mb: 2,
                    }}
                  >
                    <Stack
                      direction={"row"}
                      sx={{
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Avatar
                        src={session.avatar}
                        sx={{ width: 70, height: 70 }}
                      />
                      <Box sx={{ ml: 2 }}>
                        <Typography
                          sx={{
                            fontSize: "18px",
                            fontWeight: "500",
                            color: "primary.main",
                          }}
                        >
                          {session.name}
                        </Typography>
                        <Typography
                          sx={{
                            color: "#00000099",
                            fontSize: "13px",
                            fontWeight: "500",
                          }}
                        >
                          {session.id}
                        </Typography>
                      </Box>
                    </Stack>
                    <Box
                      sx={{
                        width: "91px",
                        height: "23px",
                        backgroundColor: "#DBEAFE",
                        color: "#2F5FD9",
                        fontSize: "12px",
                        fontWeight: "500",
                        textAlign: "center",
                        borderRadius: "8px",
                      }}
                    >
                      {session.status}
                    </Box>
                  </Stack>
                  <Stack direction={"row"} spacing={2} sx={{ mb: 1 }}>
                    <CalendarToday />
                    <Typography
                      sx={{
                        color: "#616161",
                        fontSize: "12px",
                        fontWeight: "500",
                      }}
                    >
                      {session.date}
                    </Typography>
                  </Stack>
                  <Stack direction={"row"} spacing={2} sx={{ mb: 1 }}>
                    <AccessTime />
                    <Typography
                      sx={{
                        color: "#616161",
                        fontSize: "12px",
                        fontWeight: "500",
                      }}
                    >
                      {session.time}
                    </Typography>
                  </Stack>
                  <Stack direction={"row"} spacing={2} sx={{ mb: 2 }}>
                    <ChatBubbleOutline />
                    <Typography
                      sx={{
                        color: "#616161",
                        fontSize: "12px",
                        fontWeight: "500",
                      }}
                    >
                      {session.type}
                    </Typography>
                  </Stack>
                  <Stack
                    sx={{
                      backgroundColor: "#D1FAE580",
                      fontSize: "13px",
                      fontWeight: "500",
                      color: "primary.main",
                      border: "1px solid#52AC8C",
                      borderRadius: "10px",
                      height: "23px",
                      padding: "10px",
                      mb: 1,
                      justifyContent: "center",
                    }}
                  >
                    Sessionstarted 25 minetes ago
                  </Stack>
                  <Button
                    sx={{
                      width: "100%",
                      backgroundColor: "#2563EB",
                      color: "white",
                      fontSize: "18px",
                      fontWeight: "500",
                      boxShadow: "0 1px 3px #00000040",
                      textTransform: "none",
                    }}
                  >
                    View Details
                  </Button>
                  <Stack
                    direction={"row"}
                    sx={{
                      justifyContent: "space-between",
                      alignItems: "center",
                      mt: 2,
                    }}
                  >
                    <Button
                      sx={{
                        backgroundColor: "primary.main",
                        color: "white",
                        p: "10px 50px",
                        fontSize: "18px",
                        fontWeight: "500",
                        boxShadow: "0 1px 3px #00000040",
                        textTransform: "none",
                      }}
                    >
                      <Description sx={{ mr: 1 }} />
                      Open Chat
                    </Button>
                    <Button
                      sx={{
                        backgroundColor: "#2563EB",
                        color: "white",
                        p: "10px 50px",
                        fontSize: "18px",
                        fontWeight: "500",
                        boxShadow: "0 1px 3px #00000040",
                        textTransform: "none",
                      }}
                    >
                      <VideoCall sx={{ mr: 1 }} />
                      Join Chat
                    </Button>
                  </Stack>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Stack>
  );
}
