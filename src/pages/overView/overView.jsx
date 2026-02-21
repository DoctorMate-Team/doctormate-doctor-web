import React, { use, useEffect } from "react";
import {
  Grid,
  Typography,
  Avatar,
  Button,
  Divider,
  TextField,
  Chip,
  Box,
  Stack,
  colors,
} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import PersonIcon from "@mui/icons-material/Person";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CircleIcon from "@mui/icons-material/Circle";
import NavBar from "../../components/navBar";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import PersonSearchOutlinedIcon from "@mui/icons-material/PersonSearchOutlined";
import { useDispatch, useSelector } from "react-redux";
// import { overViewSec2 } from "../redux/overView";
import {overViewSec2} from "../../redux/overViews/overView"
function createData(INFRASTRUCTURE, STATUS, UPTIME) {
  return { INFRASTRUCTURE, STATUS, UPTIME };
}

const rows = [
  createData("Core API Gateway", "ONLINE", "99.98%"),
  createData("PACS Image Server", "STABLE", "99.98%"),
  createData("AI Diagnostic Service", "Ready", "99.98%"),
];

export default function OverView() {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.overView);

  // Metric data
  useEffect(() => {
    dispatch(overViewSec2());
  }, [dispatch]);
  const metrics = [
    {
      icon: <PersonIcon />,
      title: "Total Users",
      value: user?.data?.totalUsers,
      change: "+12%",
      changeColor: "success.main",
    },
    {
      icon: <LocalHospitalIcon />,
      title: "Total Doctors",
      value: user?.data?.totalDoctors,
      change: "+17%",
      changeColor: "success.main",
    },
    {
      icon: <PeopleAltIcon />,
      title: "Total Patients",
      value: user?.data?.totalPatients,
      change: "+8%",
      changeColor: "success.main",
    },
    {
      icon: <CalendarTodayIcon />,
      title: "Appointments",
      value: user?.data?.totalAppointments,
      change: "-12%",
      changeColor: "error.main",
    },
    {
      icon: <AttachMoneyIcon />,
      title: "Total Payments",
      value: "$" + user?.data?.totalPayments,
      change: "+12%",
      changeColor: "success.main",
    },
  ];

  // System health data
  const services = [
    {
      name: "Core API Gateway",
      status: "ONLINE",
      color: "success",
      uptime: "99.98%",
    },
    {
      name: "PACS Image Server",
      status: "STABLE",
      color: "success",
      uptime: "99.98%",
    },
    {
      name: "AI Diagnostic Service",
      status: "Ready",
      color: "primary",
      uptime: "99.98%",
    },
  ];

  return (
    <Stack direction={"row"} sx={{ width: "100%" }}>
      <NavBar />
      <Box
        sx={{
          backgroundColor: "#F0F2F6",
          marginLeft: "235px",
          width: "calc(100% - 212px)",
          minHeight: "100vh",
          padding: "0 15px",
        }}
      >
        {/* Header */}
        <Stack
          alignItems="center"
          justifyContent="space-between"
          sx={{
            flexDirection: { xs: "column", lg: "row" },
            mb: 4,
            backgroundColor: "white",
            borderRadius: "15px",
            padding: "19px",
          }}
        >
          <Typography
            sx={{
              fontSize: "24px",
              fontWeight: "500",
              width: { xs: "100%", md: "50%" },
            }}
          >
            Admin Overview
          </Typography>
          <Stack
            sx={{
              flexDirection: { xs: "column", md: "row" },
              width: { xs: "100%", md: "50%" },
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box>
              <TextField
                fullWidth
                placeholder="Search resources..."
                sx={{
                  width: "290px",
                  "& .MuiInputBase-root": {
                    backgroundColor: "#f5f5f5",
                    borderRadius: "20px",
                  },
                }}
                InputProps={{
                  startAdornment: <SearchIcon />,
                }}
              />
            </Box>
            <Divider orientation="vertical" flexItem />
            <NotificationsIcon />
            <Stack direction={"row"} spacing={1}>
              <Avatar
                sx={{ backgroundColor: "white", border: "1px solid black" }}
              >
                <PersonIcon sx={{ color: "black" }} />
              </Avatar>
              <Stack>
                <Typography sx={{ fontSize: "12px", fontWeight: "400" }}>
                  Admin User
                </Typography>
                <Typography
                  sx={{ fontSize: "8px", fontWeight: "300", color: "#828282" }}
                >
                  Super Admin
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
        {/* Metrics Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {metrics.map((metric, index) => (
            <Grid
              size={{ xs: 6, md: 2.4 }}
              sx={{
                background: "white",
                borderRadius: "15px",
                border: "1px solid #E0E0E0",
                padding: "15px",
              }}
              key={index}
            >
              <Stack direction={"column"}>
                <Stack
                  direction={"row"}
                  sx={{
                    justifyContent: "space-between",
                    mb: 3,
                  }}
                >
                  <Avatar
                    sx={{
                      bgcolor: "primary.main",
                      width: 56,
                      height: 56,
                      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                    }}
                  >
                    {metric.icon}
                  </Avatar>
                  <Box
                    sx={{
                      fontWeight: "bold",
                      backgroundColor: "#254A3D",
                      color: "#52AC8C",
                      borderRadius: "6px",
                      height: "fit-content",
                      padding: "0 5px",
                    }}
                  >
                    <Typography>{metric.change}</Typography>
                  </Box>
                </Stack>
                <Box>
                  <Typography
                    sx={{
                      fontSize: "15px",
                      fontWeight: "400",
                      color: "#828282",
                    }}
                  >
                    {metric.title}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "15px",
                      fontWeight: "400",
                      color: "#616161",
                    }}
                  >
                    {metric.value}
                  </Typography>
                </Box>
              </Stack>
            </Grid>
          ))}
        </Grid>
        {/* System Health and Quick Actions */}
        <Stack
          sx={{
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ width: { xs: "100%", md: "49%" } }}>
            <Stack
              direction={"row"}
              sx={{ justifyContent: "space-between", alignItems: "center" }}
            >
              <Stack direction={"row"} spacing={1}>
                <MenuIcon sx={{ color: "primary.main" }} />
                <Typography>System Health Status</Typography>
              </Stack>
              <Button
                sx={{
                  textTransform: "none",
                  fontSize: "13px",
                  fontWeight: 300,
                }}
              >
                Refresh all
              </Button>
            </Stack>
            <TableContainer component={Paper} sx={{ borderRadius: "20px" }}>
              <Table aria-label="simple table">
                <TableHead sx={{ backgroundColor: "#F4F4F4" }}>
                  <TableRow>
                    <TableCell
                      sx={{
                        padding: "10px",
                        fontSize: "14px",
                        fontWeight: 400,
                        color: "#828282",
                      }}
                    >
                      INFRASTRUCTURE SERVICE
                    </TableCell>
                    <TableCell
                      sx={{
                        padding: "10px",
                        fontSize: "14px",
                        fontWeight: 400,
                        color: "#828282",
                      }}
                    >
                      STATUS BADGE
                    </TableCell>
                    <TableCell
                      sx={{
                        padding: "10px",
                        fontSize: "14px",
                        fontWeight: 500,
                        color: "#828282",
                      }}
                    >
                      UPTIME METRIC
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow
                      key={row.name}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell>
                        <Stack
                          direction={"row"}
                          alignItems={"center"}
                          sx={{
                            fontSize: "14px",
                            fontWeight: 500,
                            color: "#616161",
                          }}
                        >
                          <CircleIcon
                            sx={{
                              color: "primary.main",
                              width: "6px",
                              height: "6px",
                              marginRight: "5px",
                            }}
                          />
                          {row.INFRASTRUCTURE}
                        </Stack>
                      </TableCell>
                      <TableCell>
                        <Button
                          sx={{
                            borderRadius: "8px",
                            fontSize: "10px",
                            fontWeight: "600",
                            width: "71px",
                            height: "21px",
                            color:
                              row.STATUS === "ONLINE" || row.STATUS === "STABLE"
                                ? "#52AC8C"
                                : "#87B0C9",
                            backgroundColor:
                              row.STATUS === "ONLINE" || row.STATUS === "STABLE"
                                ? "#254A3D"
                                : "#054E7C",
                          }}
                        >
                          {row.STATUS}
                        </Button>
                      </TableCell>
                      <TableCell
                        sx={{
                          fontSize: "10px",
                          fontWeight: 500,
                          color: "#616161",
                        }}
                      >
                        {row.UPTIME}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            {/* Bottom Metrics */}
            <Stack
              sx={{
                mt: "20px",
                flexDirection: { xs: "column", md: "row" },
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Stack
                direction={"column"}
                spacing={2}
                sx={{
                  justifyContent: "center",
                  alignItems: "center",
                  width: "48%",
                  padding: "20px",
                  backgroundColor: "white",
                  borderRadius: "20px",
                  mb: { xs: "20px", md: "0" },
                  height: "191px",
                }}
              >
                <img
                  src="/assets/overView/material-symbols_memory.png"
                  alt=""
                />
                <Typography
                  sx={{ fontSize: "20px", color: "#828282", fontWeight: "400" }}
                >
                  DataBase Load
                </Typography>
                <Typography Memory Usage>
                  14.2%
                </Typography>
              </Stack>
              <Stack
                direction={"column"}
                spacing={2}
                sx={{
                  justifyContent: "center",
                  alignItems: "center",
                  width: "48%",
                  padding: "20px",
                  backgroundColor: "white",
                  borderRadius: "20px",
                  height: "191px",
                }}
              >
                <img
                  src="/assets/overView/material-symbols_memory.png"
                  alt=""
                />
                <Typography
                  sx={{ fontSize: "20px", color: "#828282", fontWeight: "400" }}
                >
                  Memory Usage
                </Typography>
                <Typography Memory Usage>
                  68%
                </Typography>
              </Stack>
            </Stack>
          </Box>
          <Box sx={{ width: { xs: "100%", md: "49%" } }}>
            <Typography sx={{ fontSize: "20px", fontWeight: 500, mb: 2 }}>
              Quick Action
            </Typography>
            <Stack
              direction={"row"}
              sx={{
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: "primary.main",
                border: "2px solid white",
                borderRadius: "20px",
                padding: "15px",
                mb: "20px",
              }}
            >
              <Stack direction={"row"} spacing={1}>
                <PersonSearchOutlinedIcon
                  sx={{ width: "44px", height: "44px", color: "white" }}
                />
                <Box>
                  <Typography
                    sx={{ fontSize: "16px", fontWeight: 400, color: "white" }}
                  >
                    Go to Users
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "16px",
                      fontWeight: 400,
                      color: "#c6c4c4de",
                    }}
                  >
                    Mange Portal Access
                  </Typography>
                </Box>
              </Stack>
              <ArrowForwardIosOutlinedIcon sx={{ color: "white" }} />
            </Stack>
            <Stack
              direction={"row"}
              sx={{
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: "white",
                border: "2px solid #52AC8C",
                borderRadius: "20px",
                padding: "15px",
                mb: "20px",
              }}
            >
              <Stack direction={"row"} spacing={1}>
                <PersonSearchOutlinedIcon
                  sx={{ width: "44px", height: "44px", color: "primary.main" }}
                />
                <Box>
                  <Typography
                    sx={{
                      fontSize: "16px",
                      fontWeight: 400,
                      color: "primary.main",
                    }}
                  >
                    Go to Users
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "16px",
                      fontWeight: 400,
                      color: "#459e7e9e",
                    }}
                  >
                    Mange Portal Access
                  </Typography>
                </Box>
              </Stack>
              <ArrowForwardIosOutlinedIcon sx={{ color: "primary.main" }} />
            </Stack>
            <Stack
              direction={"row"}
              sx={{
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: "white",
                border: "2px solid #52AC8C",
                borderRadius: "20px",
                padding: "15px",
                mb: "20px",
              }}
            >
              <Stack direction={"row"} spacing={1}>
                <PersonSearchOutlinedIcon
                  sx={{ width: "44px", height: "44px", color: "primary.main" }}
                />
                <Box>
                  <Typography
                    sx={{
                      fontSize: "16px",
                      fontWeight: 400,
                      color: "primary.main",
                    }}
                  >
                    Go to Users
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "16px",
                      fontWeight: 400,
                      color: "#459e7e9e",
                    }}
                  >
                    Mange Portal Access
                  </Typography>
                </Box>
              </Stack>
              <ArrowForwardIosOutlinedIcon sx={{ color: "primary.main" }} />
            </Stack>
            <Stack
              sx={{
                justifyContent: "center",
                alignItems: "center",
                background: "white",
                borderRadius: "20px",
                padding: "20px",
                textAlign: "center",
              }}
            >
              <Avatar
                sx={{
                  bgcolor: "#616161",
                  width: 40,
                  height: 40,
                }}
              >
                !
              </Avatar>
              <Typography
                sx={{ fontSize: "20px", fontWeight: "400", color: "#616161" }}
              >
                No critical alerts detection in
                <br /> the last 24 hours
              </Typography>
            </Stack>
          </Box>
        </Stack>
        {/* Footer */}
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          sx={{
            mt: 4,
            py: 2,
            borderTop: "1px solid #e0e0e0",
            color: "#666",
          }}
        >
          <Grid item>
            <Typography variant="body2">
              2024 HEALTHCARE ADMIN PORTAL | V 2.4.0
            </Typography>
          </Grid>
          <Grid item>
            <Grid container spacing={2}>
              <Grid item>
                <Typography variant="body2">DOCUMENTATION</Typography>
              </Grid>
              <Grid item>
                <Typography variant="body2">PRIVACY POLICY</Typography>
              </Grid>
              <Grid item>
                <Typography variant="body2">SYSTEM HEALTH STATUS</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Stack>
  );
}
