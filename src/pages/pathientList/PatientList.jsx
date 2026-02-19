import NavBar from "../../components/navBar";
import {
  Box,
  Typography,
  Button,
  Avatar,
  TextField,
  Chip,
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Stack,
  TableFooter,
  MenuItem,
  IconButton,
} from "@mui/material";
import { useEffect, useState } from "react";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSelector, useDispatch } from "react-redux";
import { patientsList } from "../../redux/patientList/patientList";
// const patients = [
//   {
//     name: "Amir Atef",
//     id: "ID:PT001",
//     age: 25,
//     condition: "Hypertension",
//     date: "Mar 19, 2025",
//     status: "Active",
//     img: "https://i.pravatar.cc/150?img=1",
//   },
//   {
//     name: "Ahmed wael",
//     id: "ID:PT002",
//     age: 35,
//     condition: "Diabetes Type 2",
//     date: "Mar 15, 2025",
//     status: "Active",
//     img: "https://i.pravatar.cc/150?img=2",
//   },
//   {
//     name: "Aser Hazem",
//     id: "ID:PT003",
//     age: 45,
//     condition: "Asthma",
//     date: "Aug 20, 2025",
//     status: "Offline",
//     img: "https://i.pravatar.cc/150?img=3",
//   },
//   {
//     name: "Hazem Wagih",
//     id: "ID:PT004",
//     age: 29,
//     condition: "Hypertension",
//     date: "Aug 26, 2025",
//     status: "Follow-up",
//     img: "https://i.pravatar.cc/150?img=4",
//   },
// ];
export default function PatientList() {
  const dispatch = useDispatch();
  let { patients, loading, error } = useSelector((state) => state.patients);
  useEffect(() => {
    dispatch(patientsList());
  }, [dispatch]);

  return (
    <Stack direction={"row"} sx={{ width: "100%" }}>
      <NavBar />
      <Box
        sx={{
          backgroundColor: "#F0F2F6",
          marginLeft: "212px",
          width: "calc(100% - 212px)",
          minHeight: "100vh",
          padding: 2,
        }}
      >
        <Box sx={{ p: 4, bgcolor: "#E8F7F3" }}>
          {/* HEADER */}
          <Card sx={{ p: 4, mb: 3, borderRadius: "12px", height: "131px" }}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box>
                <Typography fontWeight={600}>patient List</Typography>
                <Typography fontSize="13px" color="gray">
                  Manage and view patient records
                </Typography>
              </Box>

              <Stack direction="row" spacing={2} alignItems="center">
                {/* <Button
                  variant="contained"
                  sx={{
                    bgcolor: "#4CAF8F",
                    textTransform: "none",
                    color: "white",
                  }}
                >
                  + Add Patient
                </Button> */}
                <Avatar src="https://i.pravatar.cc/150?img=10" />
              </Stack>
            </Box>
          </Card>

          {/* FILTER BAR */}
          <Stack
            sx={{
              flexDirection: { xs: "column", md: "row" },
              alignItems: "center",
              gap: 1.5,
              mb: 3,
              padding: "20px 24px",
              backgroundColor: "white",
              borderRadius: "14px",
              justifyContent: { xs: "center", md: "space-between" },
            }}
          >
            {/* Search */}
            <TextField
              placeholder="Search Patients..."
              size="small"
              sx={{
                backgroundColor: "#fff",
                borderRadius: "10px",
                minWidth: 260,
              }}
            />
            <Box>
              {/* All Conditions */}
              <TextField
                select
                size="small"
                defaultValue="all"
                sx={{
                  mr: 1,
                  backgroundColor: "#4CAF8F",
                  borderRadius: "10px",
                  minWidth: 140,
                  "& fieldset": { border: "none" },
                  "& .MuiSelect-select": {
                    color: "#fff",
                    fontWeight: 500,
                  },
                  "& svg": {
                    color: "#fff",
                  },
                }}
              >
                <MenuItem value="all">All Conditions</MenuItem>
                <MenuItem value="diabetes">Diabetes</MenuItem>
                <MenuItem value="heart">Heart</MenuItem>
              </TextField>

              {/* Sort by Name */}
              <TextField
                select
                size="small"
                defaultValue="name"
                sx={{
                  mr: 1,
                  backgroundColor: "#4CAF8F",
                  borderRadius: "10px",
                  minWidth: 140,
                  "& fieldset": { border: "none" },
                  "& .MuiSelect-select": {
                    color: "#fff",
                    fontWeight: 500,
                  },
                  "& svg": {
                    color: "#fff",
                  },
                }}
              >
                <MenuItem value="name">Sort by Name</MenuItem>
                <MenuItem value="date">Sort by Date</MenuItem>
              </TextField>

              {/* Filter Icon */}
              <IconButton
                sx={{
                  mr: 1,
                  backgroundColor: "#4CAF8F",
                  color: "#fff",
                  borderRadius: "10px",
                  width: 40,
                  height: 40,
                  "&:hover": {
                    backgroundColor: "#43a684",
                  },
                }}
              >
                <FilterAltOutlinedIcon />
              </IconButton>

              {/* Download Icon */}
              <IconButton
                sx={{
                  mr: 1,
                  backgroundColor: "#4CAF8F",
                  color: "#fff",
                  borderRadius: "10px",
                  width: 40,
                  height: 40,
                  "&:hover": {
                    backgroundColor: "#43a684",
                  },
                }}
              >
                <DownloadOutlinedIcon />
              </IconButton>
            </Box>
          </Stack>
          {/* TABLE */}
          <TableContainer component={Card} sx={{ borderRadius: "12px" }}>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: "#4CAF8F" }}>
                  {[
                    "PATIENT",
                    "AGE",
                    "CONDITION",
                    "LAST VISIT",
                    "STATUS",
                    "ACTIONS",
                  ].map((h) => (
                    <TableCell key={h} sx={{ color: "white", fontWeight: 600 }}>
                      {h}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {patients?.data?.patients?.slice(0, 4).map((p, i) => (
                  <TableRow key={i}>
                    <TableCell>
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Avatar src={p.imageUrl} />
                        <Box>
                          <Typography fontWeight={600}>
                            {p.fullName ?? "_"}
                          </Typography>
                          <Typography fontSize="12px" color="gray">
                            {p.id}
                          </Typography>
                        </Box>
                      </Stack>
                    </TableCell>
                    <TableCell>{p.age ?? "_"}</TableCell>
                    <TableCell>{p.lastConditionTitle ?? "_"}</TableCell>
                    <TableCell>
                      {p.lastVisitDate
                        ? new Date(p.lastVisitDate).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              day: "2-digit",
                              year: "numeric",
                            }
                          )
                        : "_"}
                    </TableCell>

                    <TableCell>
                      <Chip
                        label={p.status}
                        color={
                          p.status === "Active"
                            ? "success"
                            : p.status === "Offline"
                            ? "error"
                            : "info"
                        }
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <IconButton>
                        <VisibilityIcon />
                      </IconButton>
                      <IconButton>
                        <EditIcon />
                      </IconButton>
                      <IconButton>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={6}>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Typography fontSize="14px" color="black">
                        Showing 1 to{" "}
                        {Math.round(patients?.data?.pagination?.totalItems / 4)}{" "}
                        of {patients?.data?.pagination?.totalItems} patients
                      </Typography>
                      <Box>
                        <Button
                          size="small"
                          variant="outlined"
                          color="#000000"
                          fontSize="18px"
                          fontWeight="400"
                          sx={{ textTransform: "none", height: "35px" }}
                        >
                          Previous
                        </Button>
                        <button
                          style={{
                            margin: "0 10px",
                            width: "35px",
                            height: "35px",
                            borderRadius: "5px",
                            border: "2px solid #52AC8C",
                            background: "transparent",
                          }}
                        >
                          1
                        </button>
                        <button
                          style={{
                            margin: "0 10px",
                            width: "35px",
                            height: "35px",
                            borderRadius: "5px",
                            border: "2px solid #52AC8C",
                            background: "transparent",
                          }}
                          disabled={
                            patients?.data?.pagination?.totalItems > 4
                              ? false
                              : true
                          }
                        >
                          2
                        </button>
                        <button
                          style={{
                            margin: "0 10px",
                            width: "35px",
                            height: "35px",
                            borderRadius: "5px",
                            border: "2px solid #52AC8C",
                            background: "transparent",
                          }}
                          disabled={
                            patients?.data?.pagination?.totalItems > 8
                              ? false
                              : true
                          }
                        >
                          3
                        </button>
                        <Button
                          variant="contained"
                          disabled={
                            patients?.data?.pagination?.totalItems > 4
                              ? false
                              : true
                          }
                          sx={{ color: "white" }}
                        >
                          Next
                        </Button>
                      </Box>
                    </Stack>
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </Stack>
  );
}
