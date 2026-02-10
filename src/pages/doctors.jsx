import {
  Box,
  Card,
  Avatar,
  Typography,
  Button,
  Stack,
  CircularProgress,
  Chip,
} from "@mui/material";
import WestIcon from "@mui/icons-material/West";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import StarIcon from "@mui/icons-material/Star";
import NavBar from "./navBar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getDataDoctor } from "../redux/doctor";
import { getPatient } from "../redux/doctor";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
const patients = [
  { id: 1, name: "Medo Gaber", img: "https://i.pravatar.cc/150?img=11" },
  { id: 2, name: "Ahmed Fathy", img: "https://i.pravatar.cc/150?img=12" },
  { id: 3, name: "Mohamed Hany", img: "https://i.pravatar.cc/150?img=13" },
  { id: 4, name: "Emam Ashour", img: "https://i.pravatar.cc/150?img=14" },
  { id: 5, name: "Ali Maloul", img: "https://i.pravatar.cc/150?img=15" },
  { id: 6, name: "Magdy Afsha", img: "https://i.pravatar.cc/150?img=16" },
];
export default function DoctorProfile() {
  const dispatch = useDispatch();
  const { user, data, loading, error } = useSelector((state) => state.doctor);
  useEffect(() => {
    dispatch(getDataDoctor());
    dispatch(getPatient());
  }, [dispatch]);
  const value = 85;
  return (
    <Stack direction={"row"} sx={{ width: "100%" }}>
      <NavBar />
      <Box
        sx={{
          marginLeft: "212px",
          width: "calc(100% - 212px)",
          minHeight: "100vh",
          padding: "40px 58px",
        }}
      >
        {/* Header */}
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          mb={3}
        >
          <Stack direction={"row"} sx={{ alignItems: "center" }}>
            <Box
              sx={{
                cursor: "pointer",
                width: "fit-content",
                height: "fit-content",
                padding: "5px 5px 0",
                color: "white",
                backgroundColor: "#9CE3CA",
                borderRadius: "10px",
                mr: "20px",
              }}
            >
              <WestIcon sx={{ margin: "0" }} />
            </Box>
            <Typography variant="h6" fontWeight="bold">
              Doctor Profile
            </Typography>
          </Stack>
          <Button
            variant="contained"
            sx={{ borderRadius: 3, textTransform: "none", color: "white" }}
          >
            Edit Profile
          </Button>
        </Stack>

        {/* Main Card */}
        <Card sx={{ borderRadius: 4, p: 3, border: "20px solid #9CE3CA" }}>
          <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
            {/* Left Section */}
            <Box flex={2}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Avatar
                  src={user?.data?.imageUrl}
                  sx={{ width: "100px", height: "100px" }}
                />
                <Box>
                  <Typography fontWeight="bold">
                    Dr. {user?.data?.fullName}
                  </Typography>
                  <Typography color="text.secondary">
                    {user?.data?.specialty}
                  </Typography>

                  <Stack direction="row" spacing={1} alignItems="center" mt={1}>
                    <LocationOnIcon
                      fontSize="small"
                      sx={{ color: "primary.main" }}
                    />
                    <Typography variant="body2">
                      {user?.data?.address}
                    </Typography>
                  </Stack>
                  <Stack direction="row" spacing={1} alignItems="center" mt={1}>
                    <EmailIcon
                      fontSize="small"
                      sx={{ color: "primary.main" }}
                    />
                    <Typography variant="body2">{user?.data?.email}</Typography>
                  </Stack>
                  <Stack direction="row" spacing={1} alignItems="center" mt={1}>
                    <PhoneIcon
                      fontSize="small"
                      sx={{ color: "primary.main" }}
                    />
                    <Typography variant="body2">{user?.data?.phone}</Typography>
                  </Stack>

                  <Stack
                    direction="row"
                    spacing={0.5}
                    alignItems="center"
                    mt={1}
                  >
                    <StarIcon fontSize="small" color="warning" />
                    <Typography variant="body2">4.8 (1150 Reviews)</Typography>
                  </Stack>
                </Box>
              </Stack>
              <Stack direction={"row"}>
                <Box sx={{ width: "70%" }}>
                  <Typography fontWeight="bold" mb={1}>
                    Biography
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    width={"70%"}
                  >
                    Dr. Gabriel Christe is the top most Immunologists specialist
                    in Christ Hospital at London. He achieved several awards for
                    her wonderful contribution in medical field. He is available
                    for private consultation.
                  </Typography>
                  <Card
                    sx={{
                      p: 3,
                      borderRadius: "24px",
                      width: 405,
                      border: "2px solid #00000080",
                      marginTop: "25px",
                    }}
                  >
                    <Stack direction="row" alignItems="center" spacing={3}>
                      {/* Left side */}
                      <Box>
                        <Typography fontSize={14} mb={1}>
                          Satisfaction
                        </Typography>

                        <Box position="relative" display="inline-flex">
                          {/* Background */}
                          <CircularProgress
                            variant="determinate"
                            value={100}
                            size={120}
                            thickness={6}
                            sx={{ color: "white" }}
                          />

                          {/* Progress */}
                          <CircularProgress
                            variant="determinate"
                            value={value}
                            size={120}
                            thickness={6}
                            sx={{
                              transform: "rotate(-45deg)",
                              color: "#4CAF8E",
                              position: "absolute",
                              left: 0,
                              "& .MuiCircularProgress-circle": {
                                strokeLinecap: "round",
                              },
                            }}
                          />

                          {/* Center text */}
                          <Box
                            position="absolute"
                            top="50%"
                            left="50%"
                            sx={{
                              transform: "translate(-50%, -50%)",
                              textAlign: "center",
                            }}
                          >
                            <Typography fontSize={12} color="text.secondary">
                              Impression
                            </Typography>
                            <Typography fontSize={16} fontWeight={600}>
                              Good
                            </Typography>
                          </Box>

                          {/* Percentage */}
                          <Box
                            position="absolute"
                            top={1}
                            left={21}
                            bgcolor="white"
                            px={0.5}
                            py={0.2}
                            borderRadius={10}
                            boxShadow={1}
                            sx={{ transform: "rotate(-29deg)" }}
                          >
                            <Typography fontSize={10}>{value}%</Typography>
                          </Box>
                        </Box>
                      </Box>

                      {/* Right side */}
                      <Box>
                        <Typography fontSize={22} fontWeight={600}>
                          6.000
                        </Typography>
                        <Typography fontSize={14} color="text.secondary">
                          People are happy with
                          <br />
                          it’s performance
                        </Typography>
                      </Box>
                    </Stack>
                  </Card>
                </Box>
                {/* Right Section */}
                <Card
                  sx={{
                    width: 320,
                    p: 2,
                    borderRadius: "16px",
                    boxShadow: "0px 8px 20px rgba(0,0,0,0.15)",
                  }}
                >
                  {/* Header */}
                  <Box
                    sx={{
                      mb: 2,
                    }}
                  >
                    <Typography fontWeight="600" fontSize="18px">
                      Patient lists
                    </Typography>
                  </Box>
                  <Stack sx={{ alignItems: "end" }}>
                    <Chip
                      label={
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 0.5,
                          }}
                        >
                          Today
                          <KeyboardArrowDownIcon fontSize="small" />
                        </Box>
                      }
                      sx={{
                        bgcolor: "#4CAF8F",
                        color: "white",
                        fontWeight: 500,
                        borderRadius: "20px",
                        px: 1,
                        textAlign: "end",
                        width: "fit-content",
                      }}
                    />
                  </Stack>

                  {/* Patient List */}
                  <Stack spacing={2} sx={{height:"451px",overflowY:"auto"}}>
                    {data?.data?.patients?.map((p, i) => (
                      <Box
                        key={p.patientId}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 2,
                        }}
                      >
                        <Avatar
                          src={p.imageUrl}
                          sx={{ width: 40, height: 40 }}
                        />

                        <Box sx={{ flex: 1 }}>
                          <Typography fontSize="14px" fontWeight={500}>
                            {p.fullName}
                          </Typography>
                          <Typography fontSize="13px" color="gray">
                            {i + 1}
                          </Typography>
                        </Box>
                      </Box>
                    ))}        
                  </Stack>
                </Card>
              </Stack>
            </Box>
          </Stack>
        </Card>
      </Box>
    </Stack>
  );
}
