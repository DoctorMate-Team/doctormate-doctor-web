import { Box, Divider, Stack, Typography } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { Link, useLocation } from "react-router-dom";
import GroupIcon from "@mui/icons-material/Group";
export default function NavBar() {
  const { pathname } = useLocation();
  return (
    <Box
      sx={{
        width: "235px",
        height: "100%",
        backgroundColor: "primary.main",
        position: "fixed",
        left: 0,
        top: 0,
      }}
    >
      <Stack
        direction={"row"}
        spacing={1}
        sx={{
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "primary.main",
          height: "80px",
        }}
      >
        <Box
          sx={{
            width: "80px",
            height: "70px",
            position: "absolute",
            left: "-4px",
            backgroundImage: "url(/assets/navBar/L-Logo.png)",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        ></Box>
        <Typography
          sx={{ color: "#FFFFFF", fontSize: "20px", fontWeight: "500" }}
        >
          Doctor Mate
        </Typography>
      </Stack>
      <Divider sx={{ backgroundColor: "white", height: "2px" }} />
      <Stack
        direction={"column"}
        sx={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: "20px",
        }}
      >
        <Link to="/" style={{ textDecoration: "none" }}>
          <Stack
            direction={"row"}
            sx={{
              justifyContent: "center",
              alignItems: "center",
              margin: "10px 0",
              position: "relative",
            }}
          >
            <Box
              sx={{
                display: pathname === "/" ? "block" : "none",
                position: "absolute",
                left: "-57px",
                width: "50px",
                background: "white",
                borderRadius: "20px",
                height: "67px}",
              }}
            ></Box>
            <Stack
              direction={"row"}
              spacing={1}
              sx={{
                backgroundColor: pathname === "/" ? "white" : "transparent",
                padding: "10px 15px",
                borderRadius: "20px",
                width: "193px",
                alignItems: "center",
              }}
            >
              <img
                src={
                  pathname === "/"
                    ? "/assets/navBar/Vector (14).png"
                    : "/assets/navBar/Vector (15).png"
                }
                alt=""
                style={{ width: "24px", height: "24px" }}
              />

              <Typography
                sx={{
                  color: pathname === "/" ? "primary.main" : "white",
                  fontSize: "22.27px",
                  fontWeight: "400",
                }}
              >
                Dashboard
              </Typography>
            </Stack>
          </Stack>
        </Link>
        <Link to="/patients/patientlist" style={{ textDecoration: "none" }}>
          <Stack
            direction={"row"}
            sx={{
              justifyContent: "center",
              alignItems: "center",
              marginBottom: "5px",
              position: "relative",
            }}
          >
            <Box
              sx={{
                display:
                  pathname === "/patients/patientlist" ? "block" : "none",
                position: "absolute",
                left: "-57px",
                width: "50px",
                background: "white",
                borderRadius: "20px",
                height: "67px",
              }}
            />

            <Stack
              direction={"row"}
              spacing={1}
              sx={{
                backgroundColor:
                  pathname === "/patients/patientlist"
                    ? "white"
                    : "transparent",
                padding: "10px 15px",
                borderRadius: "20px",
                width: "183px",
                alignItems: "center",
              }}
            >
              <img
                src={
                  pathname === "/patients/patientlist"
                    ? "/assets/navBar/Group (4).png"
                    : "/assets/navBar/Group (3).png"
                }
                alt=""
                style={{ width: "24px", height: "24px" }}
              />
              <Typography
                sx={{
                  color:
                    pathname === "/patients/patientlist"
                      ? "primary.main"
                      : "white",
                  fontSize: "22.27px",
                  fontWeight: "400",
                }}
              >
                Patients
              </Typography>
            </Stack>
          </Stack>
        </Link>
        <Link to="/schedule" style={{ textDecoration: "none" }}>
          <Stack
            direction={"row"}
            sx={{
              justifyContent: "center",
              alignItems: "center",
              margin: "10px 0",
              position: "relative",
            }}
          >
            <Box
              sx={{
                display: pathname.includes("/schedule") ? "block" : "none",
                position: "absolute",
                left: "-57px",
                width: "50px",
                background: "white",
                borderRadius: "20px",
                height: "67px",
              }}
            />

            <Stack
              direction={"row"}
              spacing={1}
              sx={{
                backgroundColor: pathname.includes("/schedule")
                  ? "white"
                  : "transparent",
                padding: "10px 15px",
                borderRadius: "20px",
                width: "183px",
                alignItems: "center",
              }}
            >
              <img
                src={
                  pathname.includes("/schedule")
                    ? "/assets/navBar/carbon_event-schedule (2).png"
                    : "/assets/navBar/carbon_event-schedule (1).png"
                }
                alt=""
                style={{ width: "24px", height: "24px" }}
              />
              <Typography
                sx={{
                  color: pathname.includes("/schedule")
                    ? "primary.main"
                    : "white",
                  fontSize: "19.27px",
                  fontWeight: "400",
                }}
              >
                Appointments
              </Typography>
            </Stack>
          </Stack>
        </Link>
        {/* <Link to="/dicom" style={{ textDecoration: "none" }}>
          <Stack
            direction={"row"}
            sx={{
              justifyContent: "center",
              alignItems: "center",
              marginBottom: "5px",
              position: "relative",
            }}
          >
            <Box
              sx={{
                display: pathname === "/dicom" ? "block" : "none",
                position: "absolute",
                left: "-57px",
                width: "50px",
                background: "white",
                borderRadius: "20px",
                height: "67px",
              }}
            />

            <Stack
              direction={"row"}
              spacing={1}
              sx={{
                backgroundColor:
                  pathname === "/dicom" ? "white" : "transparent",
                padding: "10px 15px",
                borderRadius: "20px",
                width: "183px",
                alignItems: "center",
              }}
            >
              <img
                src={
                  pathname === "/dicom"
                    ? "/assets/navBar/Vector (17).png"
                    : "/assets/navBar/Vector (16).png"
                }
                alt=""
                style={{ width: "24px", height: "24px" }}
              />
              <Typography
                sx={{
                  color: pathname === "/dicom" ? "primary.main" : "white",
                  fontSize: "19.27px",
                  fontWeight: "400",
                }}
              >
                DICOM
              </Typography>
            </Stack>
          </Stack>
        </Link>
        <Link to="/message" style={{ textDecoration: "none" }}>
          <Stack
            direction={"row"}
            sx={{
              justifyContent: "center",
              alignItems: "center",
              marginBottom: "5px",
              position: "relative",
            }}
          >
            <Box
              sx={{
                display: pathname === "/message" ? "block" : "none",
                position: "absolute",
                left: "-57px",
                width: "50px",
                background: "white",
                borderRadius: "20px",
                height: "67px",
              }}
            />

            <Stack
              direction={"row"}
              spacing={1}
              sx={{
                backgroundColor:
                  pathname === "/message" ? "white" : "transparent",
                padding: "10px 15px",
                borderRadius: "20px",
                width: "183px",
                alignItems: "center",
              }}
            >
              <img
                src={
                  pathname === "/message"
                    ? "/assets/navBar/Vector (19).png"
                    : "/assets/navBar/Vector (18).png"
                }
                alt=""
                style={{ width: "24px", height: "24px" }}
              />
              <Typography
                sx={{
                  color: pathname === "/message" ? "primary.main" : "white",
                  fontSize: "19.27px",
                  fontWeight: "400",
                }}
              >
                Messages
              </Typography>
            </Stack>
          </Stack>
        </Link> */}
        <Link to="/reports" style={{ textDecoration: "none" }}>
          <Stack
            direction={"row"}
            sx={{
              justifyContent: "center",
              alignItems: "center",
              margin: "10px 0",
              position: "relative",
            }}
          >
            <Box
              sx={{
                display: pathname === "/reports" ? "block" : "none",
                position: "absolute",
                left: "-57px",
                width: "50px",
                background: "white",
                borderRadius: "20px",
                height: "67px",
              }}
            />

            <Stack
              direction={"row"}
              spacing={1}
              sx={{
                backgroundColor:
                  pathname === "/reports" ? "white" : "transparent",
                padding: "10px 15px",
                borderRadius: "20px",
                width: "183px",
                alignItems: "center",
              }}
            >
              <img
                src={
                  pathname === "/reports"
                    ? "/assets/navBar/Vector (21).png"
                    : "/assets/navBar/Vector (20).png"
                }
                alt=""
                style={{ width: "32px", height: "32px" }}
              />
              <Typography
                sx={{
                  color: pathname === "/reports" ? "primary.main" : "white",
                  fontSize: "22.27px",
                  fontWeight: "400",
                }}
              >
                Reports
              </Typography>
            </Stack>
          </Stack>
        </Link>
      </Stack>
      <Box
        sx={{
          position: "absolute",
          bottom: "5px",
          width: "100%",
        }}
      >
        <Divider sx={{ backgroundColor: "white", height: "2px" }} />
        <Stack
          sx={{
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Box>
            <Link to="/doctorprofile" style={{ textDecoration: "none" }}>
              <Stack
                direction={"row"}
                sx={{
                  justifyContent: "center",
                  alignItems: "center",

                  position: "relative",
                  mt: 2,
                }}
              >
                <Box
                  sx={{
                    display: pathname === "/doctorprofile" ? "block" : "none",
                    position: "absolute",
                    left: "-57px",
                    width: "50px",
                    background: "white",
                    borderRadius: "20px",
                    height: "67px",
                  }}
                />

                <Stack
                  direction={"row"}
                  spacing={1}
                  sx={{
                    backgroundColor:
                      pathname === "/doctorprofile" ? "white" : "transparent",
                    padding: "10px 15px",
                    borderRadius: "20px",
                    width: "183px",
                    alignItems: "center",
                  }}
                >
                  <GroupIcon
                    sx={{
                      width: "24px",
                      height: "24px",
                      color:
                        pathname === "/doctorprofile"
                          ? "primary.main"
                          : "white",
                    }}
                  />
                  <Typography
                    sx={{
                      color:
                        pathname === "/doctorprofile"
                          ? "primary.main"
                          : "white",
                      fontSize: "19.27px",
                      fontWeight: "400",
                    }}
                  >
                    Profile
                  </Typography>
                </Stack>
              </Stack>
            </Link>
            <Link to="/settings" style={{ textDecoration: "none" }}>
              <Stack
                direction={"row"}
                sx={{
                  justifyContent: "center",
                  alignItems: "center",

                  position: "relative",
                }}
              >
                <Box
                  sx={{
                    display: pathname === "/settings" ? "block" : "none",
                    position: "absolute",
                    left: "-57px",
                    width: "50px",
                    background: "white",
                    borderRadius: "20px",
                    height: "67px",
                  }}
                />

                <Stack
                  direction={"row"}
                  spacing={1}
                  sx={{
                    backgroundColor:
                      pathname === "/settings" ? "white" : "transparent",
                    padding: "15px",
                    borderRadius: "20px",
                    width: "183px",
                    alignItems: "center",
                  }}
                >
                  <SettingsIcon
                    sx={{
                      width: "23px",
                      height: "23px",
                      color:
                        pathname === "/settings" ? "primary.main" : "#FFFFFF",
                    }}
                  />
                  <Typography
                    sx={{
                      color:
                        pathname === "/settings" ? "primary.main" : "#FFFFFF",
                      fontSize: "16.87px",
                      fontWeight: "400",
                    }}
                  >
                    Settings
                  </Typography>
                </Stack>
              </Stack>
            </Link>
            <Link to="/helpsupport" style={{ textDecoration: "none" }}>
              <Stack
                direction={"row"}
                sx={{
                  justifyContent: "center",
                  alignItems: "center",

                  position: "relative",
                }}
              >
                <Box
                  sx={{
                    display: pathname === "/helpsupport" ? "block" : "none",
                    position: "absolute",
                    left: "-57px",
                    width: "50px",
                    background: "white",
                    borderRadius: "20px",
                    height: "67px",
                  }}
                />

                <Stack
                  direction={"row"}
                  spacing={1}
                  sx={{
                    backgroundColor:
                      pathname === "/helpsupport" ? "white" : "transparent",
                    padding: "15px",
                    borderRadius: "20px",
                    width: "183px",
                    alignItems: "center",
                  }}
                >
                  <HelpOutlineIcon
                    sx={{
                      width: "23px",
                      height: "23px",
                      color:
                        pathname === "/helpsupport"
                          ? "primary.main"
                          : "#FFFFFF",
                    }}
                  />
                  <Typography
                    sx={{
                      color:
                        pathname === "/helpsupport"
                          ? "primary.main"
                          : "#FFFFFF",
                      fontSize: "16.87px",
                      fontWeight: "400",
                    }}
                  >
                    Help & Support
                  </Typography>
                </Stack>
              </Stack>
            </Link>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
}
