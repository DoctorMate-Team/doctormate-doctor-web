import {
  Box,
  Card,
  Typography,
  Button,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
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
import { setSelectedPatient } from "../../redux/schedule/schedule";
import NavBar from "../../components/navBar";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { appointmentsPatient } from "../../redux/schedule/schedule";
import { useNavigate } from "react-router";
import { appointmentsStatus } from "../../redux/schedule/schedule";
export default function Schedule() {
  // const [time, setTime] = useState("Daily");
  const [timeReady, settimeReady] = useState(false);
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.schedule);

  const [btnHeader, setbtnHeader] = useState({
    Upcoming: true,
    InProgress: false,
    Completed: false,
    Cancel: false,
  });
  const navigate = useNavigate();
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
  function compareTime() {
    const dateOnly = data?.data?.appointments?.appointmentDate?.split("T")[0];
    const fullDateTime = new Date(
      `${dateOnly}T${data?.data?.appointments?.appointmentTime}`
    );
    const now = new Date();
    if (now.getTime() === fullDateTime.getTime()) {
      settimeReady(true);
    } else {
      settimeReady(false);
    }
  }
  const getTimeStatus = (appointmentDate, appointmentTime) => {
    if (!appointmentDate || !appointmentTime) return null;
    const now = new Date();
    const target = combineDateTime(appointmentDate, appointmentTime);
    const diffInMs = target - now;
    const totalHours = Math.floor(Math.abs(diffInMs) / (1000 * 60 * 60));
    if (totalHours >= 24) return null; // لو الفرق أكتر من يوم → نخفيه
    const hours = totalHours;
    const minutes = Math.floor((Math.abs(diffInMs) / (1000 * 60)) % 60);
    let parts = [];
    if (hours > 0) parts.push(`${hours} hour${hours > 1 ? "s" : ""}`);
    if (minutes > 0) parts.push(`${minutes} minute${minutes !== 1 ? "s" : ""}`);
    if (parts.length === 0) parts.push("less than a minute");
    const result = parts.join(" ");
    return diffInMs > 0 ? `In ${result}` : `${result} ago`;
  };
  const timeStatus = getTimeStatus(
    data?.data?.appointments?.appointmentDate,
    data?.data?.appointments?.appointmentTime
  );
  useEffect(() => {
    setTimeout(() => {
      compareTime();
    }, 2000);
    setTimeout(() => {}, 1000);
  }, []);
  const combineDateTime = (date, time) => {
    const datePart = date.split("T")[0]; // ناخد YYYY-MM-DD بس
    return new Date(`${datePart}T${time}`);
  };
  useEffect(() => {
    dispatch(appointmentsPatient());
  }, [dispatch]);
  function updateStatus(id, status) {
    let newStatus;

    if (status === "Scheduled") {
      newStatus = "confirmed";
    } else if (status === "confirmed") {
      newStatus = "inProgress";
    } else if (status === "inProgress") {
      newStatus = "completed";
    } else {
      return;
    }
    dispatch(
      appointmentsStatus({
        status: newStatus,
        id,
      })
    ).then(() => {
      dispatch(appointmentsPatient());
    });
  }
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
  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(":");

    const date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes);

    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };
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
  const statusStyles = {
    scheduled: { bg: "#DBEAFE", text: "#2F5FD9", border: "#2F5FD9" },
    confirmed: { bg: "#FEF3C7", text: "#D97706", border: "#D97706" },
    inProgress: { bg: "#DCFCE7", text: "#16A34A", border: "#16A34A" },
    completed: { bg: "#E5E7EB", text: "#6B7280", border: "#6B7280" },
    cancelled: { bg: "#FEE2E2", text: "#DC2626", border: "#DC2626" },
  };

  const statusStyle = statusStyles[data?.data?.appointments.status] || {
    bg: "#F3F4F6",
    text: "#374151",
    border: "#D1D5DB",
  };
  return (
    <Stack direction={"row"} sx={{ width: "100%" }}>
      <NavBar />
      <Box
        sx={{
          marginLeft: "235px",
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
              <Box>
                <Typography sx={{ fontSize: "23px", fontWeight: "500" }}>
                  Appointments
                </Typography>
                <Typography
                  sx={{
                    fontSize: "12px",
                    fontWeight: "500",
                    color: "#00000099",
                  }}
                >
                  Mange your patient appointments and sessions
                </Typography>
              </Box>
              <Stack
                direction={"row"}
                sx={{
                  justifyContent: "space-between",
                  alignItems: "center",
                  p: 2,
                  border: "1px solid #00000066",
                  borderRadius: "10px",
                }}
              >
                <Button
                  onClick={() => {
                    setbtnHeader({
                      Upcoming: true,
                      InProgress: false,
                      Completed: false,
                      Cancel: false,
                    });
                  }}
                  sx={{
                    textTransform: "none",
                    backgroundColor: btnHeader.Upcoming
                      ? "primary.main"
                      : "transparent",
                    color: btnHeader.Upcoming ? "white" : "black",
                  }}
                >
                  Upcoming
                </Button>
                <Button
                  onClick={() => {
                    setbtnHeader({
                      Upcoming: false,
                      InProgress: true,
                      Completed: false,
                      Cancel: false,
                    });
                  }}
                  sx={{
                    textTransform: "none",
                    backgroundColor: btnHeader.InProgress
                      ? "primary.main"
                      : "transparent",
                    color: btnHeader.InProgress ? "white" : "black",
                  }}
                >
                  In Progress
                </Button>
                <Button
                  onClick={() => {
                    setbtnHeader({
                      Upcoming: false,
                      InProgress: false,
                      Completed: true,
                      Cancel: false,
                    });
                  }}
                  sx={{
                    textTransform: "none",
                    backgroundColor: btnHeader.Completed
                      ? "primary.main"
                      : "transparent",
                    color: btnHeader.Completed ? "white" : "black",
                  }}
                >
                  Completed
                </Button>
                <Button
                  onClick={() => {
                    setbtnHeader({
                      Upcoming: false,
                      InProgress: false,
                      Completed: false,
                      Cancel: true,
                    });
                  }}
                  sx={{
                    textTransform: "none",
                    backgroundColor: btnHeader.Cancel
                      ? "primary.main"
                      : "transparent",
                    color: btnHeader.Cancel ? "white" : "black",
                  }}
                >
                  Cancel
                </Button>
              </Stack>
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
            {data?.data?.appointments?.map((session) => (
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
                    display={timeReady ? "" : "none"}
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
                        src={session?.patient?.image}
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
                          {session?.patient?.name}
                        </Typography>
                        <Typography
                          sx={{
                            color: "#00000099",
                            fontSize: "13px",
                            fontWeight: "500",
                          }}
                        >
                          ID:#{session?.patient?.id?.slice(-6)}
                        </Typography>
                      </Box>
                    </Stack>
                    {session.status && (
                      <Box
                        onClick={() => updateStatus(session.id, session.status)}
                        sx={{
                          width: "91px",
                          height: "23px",
                          backgroundColor:
                            statusStyles[session.status]?.bg || "#F3F4F6",
                          color:
                            statusStyles[session.status]?.text || "#374151",
                          border: `1px solid ${
                            statusStyles[session.status]?.border || "#D1D5DB"
                          }`,
                          fontSize: "12px",
                          fontWeight: "500",
                          textAlign: "center",
                          borderRadius: "8px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          cursor: "pointer",
                        }}
                      >
                        {session.status}
                      </Box>
                    )}
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
                      {formatDate(session?.appointmentDate)}
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
                      {formatTime(session.appointmentTime)}
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
                      {session.reason}
                    </Typography>
                  </Stack>
                  {timeStatus && (
                    <Stack
                      sx={{
                        backgroundColor: "#D1FAE580",
                        fontSize: "13px",
                        fontWeight: "500",
                        color: "primary.main",
                        border: "1px solid #52AC8C",
                        borderRadius: "10px",
                        height: "23px",
                        padding: "10px",
                        mb: 1,
                        justifyContent: "center",
                      }}
                    >
                      {timeStatus}
                    </Stack>
                  )}
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
                    onClick={() => {
                      navigate("/appointmentsdetails");
                      dispatch(setSelectedPatient(session));
                    }}
                  >
                    View Details
                  </Button>
                  {/* <Stack
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
                  </Stack> */}
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Stack>
  );
}
