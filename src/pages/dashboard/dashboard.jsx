import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import NavBar from "../../components/navBar";
export default function Dashboard() {
  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }

  const rows = [
    createData("Alice Johnson", 33, "Hypertension", " Apr 12,2025", "View"),
    createData("Michael Brown", 45, "Diabetes", "Apr 8,2025", "View"),
  ];
  return (
    <Stack direction={"row"} sx={{ width: "100%" }}>
      <NavBar />
      <Box
        sx={{
          backgroundColor: "#F0F2F6",
          marginLeft: "212px",
          paddingBottom: "20px",
        }}
      >
        <Stack
          direction={"row"}
          sx={{
            justifyContent: "space-between",
            alignItems: "center",
            background: "white",
            height: "81.5px",
            padding: "0 10px",
            marginBottom: "20px",
            marginLeft: "10px",
          }}
        >
          <Box>
            <Typography sx={{ fontSize: "20px", fontWeight: "500" }}>
              Dashboard OverView
            </Typography>
            <Typography
              sx={{ fontSize: "20px", fontWeight: "400", color: "#828282" }}
            >
              {/* Welcome back , Dr {JSON.parse(localStorage.getItem("user")).fullName?JSON.parse(localStorage.getItem("user")).fullName:""} */}
            </Typography>
          </Box>
          <Stack
            direction={"row"}
            spacing={2}
            sx={{
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <img src="/assets/dashboard/Group.png" alt="" />
            <FormControl
              sx={{ m: 1, minWidth: 120, borderColor: "#828282" }}
              size="small"
            >
              <InputLabel id="demo-select-small-label">April 2025</InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                label="April  2025"
              >
                <MenuItem value="">
                  <em>none</em>
                </MenuItem>
                <MenuItem value={10}>April 2025</MenuItem>
                <MenuItem value={20}>April 2025</MenuItem>
                <MenuItem value={30}>April 2025</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </Stack>
        <Box sx={{ margin: "0 10px" }}>
          <Box sx={{ flexGrow: 1, marginBottom: "20px" }}>
            <Grid container spacing={3}>
              <Grid
                size={{ xs: 12, sm: 6, md: 3 }}
                sx={{ borderRadius: "10px" }}
              >
                <Paper
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    height: "143px",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "14px",
                      fontWeight: "600",
                      color: "#828282",
                      marginBottom: "10px",
                    }}
                  >
                    Today’s Appointment
                  </Typography>
                  <img src="/assets/dashboard/Icon.png" alt="" />
                  <Typography
                    sx={{
                      fontSize: "22px",
                      fontWeight: "600",
                      marginTop: "10px",
                    }}
                  >
                    12
                  </Typography>
                </Paper>
              </Grid>
              <Grid
                size={{ xs: 12, sm: 6, md: 3 }}
                sx={{ borderRadius: "10px" }}
              >
                <Paper
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    height: "143px",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "14px",
                      fontWeight: "600",
                      color: "#828282",
                      marginBottom: "10px",
                    }}
                  >
                    Pending Results
                  </Typography>
                  <img src="/assets/dashboard/Vector (2).png" alt="" />
                  <Typography
                    sx={{
                      fontSize: "22px",
                      fontWeight: "600",
                      marginTop: "10px",
                    }}
                  >
                    4
                  </Typography>
                </Paper>
              </Grid>
              <Grid
                size={{ xs: 12, sm: 6, md: 3 }}
                sx={{ borderRadius: "10px" }}
              >
                <Paper
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    height: "143px",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "14px",
                      fontWeight: "600",
                      color: "#828282",
                      marginBottom: "10px",
                    }}
                  >
                    Active Patients
                  </Typography>
                  <img src="/assets/dashboard/Vector (3).png" alt="" />
                  <Typography
                    sx={{
                      fontSize: "22px",
                      fontWeight: "600",
                      marginTop: "10px",
                    }}
                  >
                    56
                  </Typography>
                </Paper>
              </Grid>
              <Grid
                size={{ xs: 12, sm: 6, md: 3 }}
                sx={{ borderRadius: "10px" }}
              >
                <Paper
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    height: "143px",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "14px",
                      fontWeight: "600",
                      color: "#828282",
                      marginBottom: "10px",
                    }}
                  >
                    Urgent Alerts
                  </Typography>
                  <img src="/assets/dashboard/Vector (4).png" alt="" />
                  <Typography
                    sx={{
                      fontSize: "22px",
                      fontWeight: "600",
                      marginTop: "10px",
                    }}
                  >
                    2
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </Box>
          <Box>
            <Grid container spacing={2}>
              <Grid
                size={{ xs: 12, md: 6 }}
                sx={{ borderRadius: "10px", marginBottom: "20px" }}
              >
                <Paper sx={{ height: "271px",borderRadius:"10px", boxShadow:"0",overflowY:"auto"}}>
                  <Typography
                    sx={{
                      fontSize: "22px",
                      fontWeight: "400",
                      margin: "0 10px",
                    }}
                  >
                    Today’s Appointments
                  </Typography>
                  <Divider
                    sx={{backgroundColor:"#E4E4E4",borderBottomWidth:"2px",margin:"10px 0"}}
                  />
                  <Stack
                    direction={"row"}
                    sx={{
                      justifyContent: "space-between",
                      alignItems: "center",
                      backgroundColor: "primary.main",
                      borderRadius: "10px",
                      margin: "15px 10px 0",
                      padding: "3px 20px",
                      height: "56px",
                    }}
                  >
                    <Box>
                      <Typography
                        sx={{
                          fontSize: "20px",
                          fontWeight: "500",
                          color: "white",
                        }}
                      >
                        John Smith
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "14px",
                          fontWeight: "400",
                          color: "#FFFFFF",
                        }}
                      >
                        Routine Checkup
                      </Typography>
                    </Box>
                    <Box>
                      <Stack
                        direction={"row"}
                        spacing={1}
                        sx={{ alignItems: "center" }}
                      >
                        <Typography
                          sx={{
                            fontSize: "12px",
                            fontWeight: "400",
                            color: "#FFFFFF",
                          }}
                        >
                          09:00 am
                        </Typography>
                        <Button
                          variant="contained"
                          sx={{
                            color: "primary.main",
                            fontSize: "11px",
                            fontWeight: "400",
                            backgroundColor: "white",
                            width: "90px",
                            textTransform: "none",
                            height: "20px",
                          }}
                        >
                          Completed
                        </Button>
                      </Stack>
                    </Box>
                  </Stack>
                  <Stack
                    direction={"row"}
                    sx={{
                      justifyContent: "space-between",
                      alignItems: "center",
                      backgroundColor: "#92B6C5",
                      borderRadius: "10px",
                      margin: "15px 10px 0",
                      padding: "3px 20px",
                      height: "56px",
                    }}
                  >
                    <Box>
                      <Typography
                        sx={{
                          fontSize: "20px",
                          fontWeight: "500",
                          color: "white",
                        }}
                      >
                        Maria Garcia
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "14px",
                          fontWeight: "400",
                          color: "#FFFFFF",
                        }}
                      >
                        Follow-up
                      </Typography>
                    </Box>
                    <Box>
                      <Stack direction={"row"} spacing={2}>
                        <Typography
                          sx={{
                            fontSize: "12px",
                            fontWeight: "400",
                            color: "#FFFFFF",
                          }}
                        >
                          11:00 am
                        </Typography>
                        <Button
                          variant="contained"
                          sx={{
                            color: "primary.main",
                            fontSize: "11px",
                            fontWeight: "400",
                            backgroundColor: "white",
                            width: "90px",
                            textTransform: "none",
                            height: "20px",
                          }}
                        >
                          In Progress
                        </Button>
                      </Stack>
                    </Box>
                  </Stack>
                  <Stack
                    direction={"row"}
                    sx={{
                      justifyContent: "space-between",
                      alignItems: "center",
                      backgroundColor: "#B5B948",
                      borderRadius: "10px",
                      margin: "15px 10px 0",
                      padding: "3px 20px",
                      height: "56px",
                    }}
                  >
                    <Box>
                      <Typography
                        sx={{
                          fontSize: "20px",
                          fontWeight: "500",
                          color: "white",
                        }}
                      >
                        David Wilson
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "14px",
                          fontWeight: "400",
                          color: "#FFFFFF",
                        }}
                      >
                        Consultation
                      </Typography>
                    </Box>
                    <Box>
                      <Stack direction={"row"} spacing={2}>
                        <Typography
                          sx={{
                            fontSize: "12px",
                            fontWeight: "400",
                            color: "#FFFFFF",
                          }}
                        >
                          02:00 pm
                        </Typography>
                        <Button
                          variant="contained"
                          sx={{
                            color: "primary.main",
                            fontSize: "11px",
                            fontWeight: "400",
                            backgroundColor: "white",
                            width: "90px",
                            textTransform: "none",
                            height: "20px",
                          }}
                        >
                          Pending
                        </Button>
                      </Stack>
                    </Box>
                  </Stack>
                </Paper>
              </Grid>
              <Grid
                size={{ xs: 12, md: 6 }}
                sx={{
                  borderRadius: "10px",
                  backgroundColor: "white",
                  height: "271px",
                  overflow: "auto",
                }}
              >
                <TableContainer
                  component={Paper}
                  sx={{
                    width: "100%",
                    overflow: "auto",
                    boxShadow: "none",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "22px",
                      fontWeight: "400",
                      padding: "5px 10px",
                    }}
                  >
                    Recent Patients
                  </Typography>
                  <Divider sx={{backgroundColor:"#E4E4E4",borderBottomWidth:"2px"}}/>
                  <Table sx={{ width: "100%" }} aria-label="simple table">
                    <TableHead>
                      <TableRow sx={{ color: "primary.main" }}>
                        <TableCell
                          align="center"
                          sx={{
                            color: "primary.main",
                            fontSize: "16px",
                            fontWeight: 500,
                            py: 1,
                          }}
                        >
                          Patient
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{
                            color: "primary.main",
                            fontSize: "16px",
                            fontWeight: 500,
                            py: 1,
                          }}
                        >
                          Age
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{
                            color: "primary.main",
                            fontSize: "16px",
                            fontWeight: 500,
                            py: 1,
                          }}
                        >
                          Condition
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{
                            color: "primary.main",
                            fontSize: "16px",
                            fontWeight: 500,
                            py: 1,
                          }}
                        >
                          Last visit
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{
                            color: "primary.main",
                            fontSize: "16px",
                            fontWeight: 500,
                            py: 1,
                          }}
                        >
                          Actions
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows.map((row) => (
                        <TableRow
                          key={row.name}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell
                            align="center"
                            sx={{
                              fontSize: "14px",
                              fontWeight: 400,
                              py: 1,
                            }}
                          >
                            {row.name}
                          </TableCell>
                          <TableCell
                            align="center"
                            sx={{
                              fontSize: "14px",
                              fontWeight: 400,
                              py: 1,
                            }}
                          >
                            {row.calories}
                          </TableCell>
                          <TableCell
                            align="center"
                            sx={{
                              fontSize: "14px",
                              fontWeight: 400,
                              py: 1,
                            }}
                          >
                            {row.fat}
                          </TableCell>
                          <TableCell
                            align="center"
                            sx={{
                              fontSize: "14px",
                              fontWeight: 400,
                              py: 1,
                            }}
                          >
                            {row.carbs}
                          </TableCell>
                          <TableCell
                            align="center"
                            sx={{
                              fontSize: "14px",
                              fontWeight: 400,
                              py: 1,
                            }}
                          >
                            {row.protein}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
              <Grid
                size={{ xs: 12, md: 6 }}
                sx={{
                  borderRadius: "10px",
                  background: "white",
                  height: "343px",
                  overflowY: "auto",
                }}
              >
                <Typography
                   sx={{
                    fontSize: "22px",
                    fontWeight: "400",
                    margin: "0 10px",
                    padding: "10px 0",
                  }}
                >
                  Quick Actions
                </Typography>
                <Divider sx={{backgroundColor:"#E4E4E4",borderBottomWidth:"2px",marginBottom:"10px"}}/>
                <Grid container spacing={1} sx={{ padding: "0 10px" }}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Paper
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                        padding: "20px",
                        border: "1px solid #828282",
                        borderRadius: "10px",
                        height: "127px",
                      }}
                    >
                      <img src="/assets/dashboard/Vector (5).png" alt="" />
                      <Typography
                         sx={{
                          fontSize: "22px",
                          fontWeight: "400",
                          padding: "5px 10px",
                        }}
                      >
                        Add Patient
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Paper
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                        padding: "20px",
                        border: "1px solid #828282",
                        borderRadius: "10px",
                        height: "127px",
                      }}
                    >
                      <img src="/assets/dashboard/Vector (6).png" alt="" />
                      <Typography
                        sx={{
                          fontSize: "18px",
                          fontWeight: "400",
                          color: "#555555",
                        }}
                      >
                        Schedule
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Paper
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                        padding: "20px",
                        border: "1px solid #828282",
                        borderRadius: "10px",
                        height: "127px",
                      }}
                    >
                      <img src="/assets/dashboard/Vector (7).png" alt="" />
                      <Typography
                        sx={{
                          fontSize: "18px",
                          fontWeight: "400",
                          color: "#555555",
                        }}
                      >
                        New Report
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Paper
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                        padding: "20px",
                        border: "1px solid #828282",
                        borderRadius: "10px",
                        height: "127px",
                      }}
                    >
                      <img
                        src="/assets/dashboard/Vector (8).png"
                        alt=""
                        style={{ width: "54px", height: "54px" }}
                      />
                      <Typography
                        sx={{
                          fontSize: "18px",
                          fontWeight: "400",
                          color: "#555555",
                        }}
                      >
                        DICOM View
                      </Typography>
                    </Paper>
                  </Grid>
                </Grid>
              </Grid>
              <Grid
                size={{ xs: 12, md: 6 }}
                sx={{
                  borderRadius: "10px",
                  background: "white",
                  height: "343px",
                  overflowY: "auto",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "22px",
                    fontWeight: "400",
                    margin: "0 10px",
                    padding: "10px 0",
                  }}
                >
                  Urgent Alerts
                </Typography>
                <Divider sx={{backgroundColor:"#E4E4E4",borderBottomWidth:"2px"}}/>
                <Stack
                  direction={"row"}
                  sx={{
                    backgroundColor: "#F2F2F2",
                    borderRadius: "10px",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "5px 10px",
                    margin: "10px",
                  }}
                >
                  <Stack
                    direction={"row"}
                    spacing={1}
                    sx={{ alignItems: "center" }}
                  >
                    <NotificationsIcon sx={{ width: "23px", height: "26px" }} />
                    <Box>
                      <Typography sx={{ fontSize: "20px", fontWeight: "300" }}>
                        New Message
                      </Typography>
                      <Typography sx={{ fontSize: "16px", fontWeight: "200" }}>
                        From: Lisa Anderson
                      </Typography>
                    </Box>
                  </Stack>
                  <Typography sx={{ fontSize: "16px", fontWeight: "400" }}>
                    15 min ago
                  </Typography>
                </Stack>
                <Stack
                  direction={"row"}
                  sx={{
                    backgroundColor: "#F2F2F2",
                    borderRadius: "10px",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "5px 10px",
                    margin: "10px",
                  }}
                >
                  <Stack
                    direction={"row"}
                    spacing={1}
                    sx={{ alignItems: "center" }}
                  >
                    <NotificationsIcon />
                    <Box>
                      <Typography sx={{ fontSize: "20px", fontWeight: "300" }}>
                        Critical Lab Result
                      </Typography>
                      <Typography sx={{ fontSize: "16px", fontWeight: "200" }}>
                        Patient: Emma Thompson
                      </Typography>
                    </Box>
                  </Stack>
                  <Typography sx={{ fontSize: "16px", fontWeight: "400" }}>
                    2 hours ago
                  </Typography>
                </Stack>
                <Stack
                  direction={"row"}
                  sx={{
                    backgroundColor: "#F2F2F2",
                    borderRadius: "10px",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "5px 10px",
                    margin: "10px",
                  }}
                >
                  <Stack
                    direction={"row"}
                    spacing={1}
                    sx={{ alignItems: "center" }}
                  >
                    <NotificationsIcon />
                    <Box>
                      <Typography sx={{ fontSize: "20px", fontWeight: "300" }}>
                        Appointment Reminder
                      </Typography>
                      <Typography sx={{ fontSize: "16px", fontWeight: "200" }}>
                        Next: Robert Chen - 3:30 PM
                      </Typography>
                    </Box>
                  </Stack>
                  <Typography sx={{ fontSize: "16px", fontWeight: "400" }}>
                    1 hour remaining
                  </Typography>
                </Stack>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </Stack>
  );
}
