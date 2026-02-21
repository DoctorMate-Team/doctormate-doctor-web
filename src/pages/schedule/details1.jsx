import React from "react";
import { useState } from "react";
import {
  Box,
  Typography,
  Avatar,
  Button,
  Chip,
  Card,
  Stack,
  CardContent,
  IconButton,
  Grid,
  Paper,
  Breadcrumbs,
  Link,
  Divider,
} from "@mui/material";
import {
  Videocam,
  CheckCircle,
  Add,
  MoreVert,
  Description,
  MedicalServices,
  Vaccines,
  Medication,
  History,
} from "@mui/icons-material";
import NavBar from "../../components/navBar";
import BasicModal from "./Modal/MedicalModal";
export default function Details1() {
  const [openMedicalModal, SetopenMedicalModal] = useState(false);
  return (
    <>
      <BasicModal
        openMedicalModal={openMedicalModal}
        SetopenMedicalModal={SetopenMedicalModal}
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
          {/* Breadcrumb */}
          <Breadcrumbs sx={{ mb: 2 }}>
            <Link color="inherit" href="#" underline="hover">
              Appointments
            </Link>
            <Typography color="text.primary">Appointments Details</Typography>
          </Breadcrumbs>

          {/* Patient Header Card */}
          <Paper
            elevation={0}
            sx={{
              p: 2,
              mb: 3,
              borderRadius: 2,
              border: "1px solid #e9ecef",
            }}
          >
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Box display="flex" alignItems="center" gap={2}>
                <Avatar
                  src="https://i.pravatar.cc/150?img=5"
                  sx={{ width: 56, height: 56 }}
                />
                <Box>
                  <Box display="flex" alignItems="center" gap={1} mb={0.5}>
                    <Typography variant="h6" fontWeight={600}>
                      Emily Rodriguez
                    </Typography>
                    <Chip
                      label="Ongoing"
                      size="small"
                      sx={{
                        bgcolor: "#d1fae5",
                        color: "#059669",
                        fontSize: "12px",
                        fontWeight: 500,
                        height: 20,
                      }}
                    />
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    ID : #APT-2402 • 28 Years • Female
                  </Typography>
                </Box>
              </Box>
              <Box display="flex" gap={1}>
                <Button
                  variant="outlined"
                  startIcon={<Videocam sx={{ fontSize: 18 }} />}
                  sx={{
                    textTransform: "none",
                    borderRadius: 2,
                    borderColor: "#F3F3F3",
                    color: "#495057",
                    // "&:hover": {
                    //   borderColor: "#F3F3F3",
                    //   bgcolor: "#f8f9fa",
                    // },
                  }}
                >
                  Join session
                </Button>
                <Button
                  variant="contained"
                  startIcon={<CheckCircle sx={{ fontSize: 18 }} />}
                  sx={{
                    textTransform: "none",
                    borderRadius: 2,
                    bgcolor: "#4caf8a",
                    color: "white",
                    px: 3,
                    "&:hover": {
                      bgcolor: "#3f9f7e",
                    },
                  }}
                >
                  Complete Appointment
                </Button>
              </Box>
            </Box>
          </Paper>

          {/* Medical Records Section */}
          <Box mb={4}>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              mb={2}
            >
              <Box display="flex" alignItems="center" gap={1}>
                <Box
                  sx={{
                    bgcolor: "#4caf8a",
                    borderRadius: 1,
                    p: 0.5,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Description sx={{ color: "white", fontSize: 20 }} />
                </Box>
                <Typography variant="h6" fontWeight={600}>
                  Medical Records
                </Typography>
              </Box>
              <Button
                onClick={() => {
                  SetopenMedicalModal(true);
                }}
                variant="contained"
                startIcon={<Add />}
                sx={{
                  bgcolor: "#4caf8a",
                  textTransform: "none",
                  borderRadius: 2,
                  "&:hover": {
                    bgcolor: "#3f9f7e",
                  },
                  color: "white",
                }}
              >
                Add Medical Record
              </Button>
            </Box>

            {/* Record Cards */}
            <Paper
              elevation={0}
              sx={{
                p: 2,
                mb: 2,
                borderRadius: 2,
                border: "1px solid #e9ecef",
                bgcolor: "white",
              }}
            >
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="start"
              >
                <Box display="flex" gap={2} flex={1}>
                  <Box
                    sx={{
                      bgcolor: "#f8f9fa",
                      borderRadius: 1,
                      p: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      minWidth: 40,
                      height: 40,
                    }}
                  >
                    <Description sx={{ color: "#6c757d" }} />
                  </Box>
                  <Box flex={1}>
                    <Box display="flex" alignItems="center" gap={1} mb={1}>
                      <Typography variant="h6" fontWeight={600}>
                        General Consultation Note
                      </Typography>
                      <Chip
                        label="Update"
                        size="small"
                        sx={{
                          bgcolor: "#f8f9fa",
                          color: "#6c757d",
                          fontSize: "11px",
                          height: 22,
                        }}
                      />
                    </Box>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      mb={1}
                      lineHeight={1.5}
                    >
                      Patient reports recurring headaches and fatigue for the
                      last 2 weeks. Recommended blood tests and Vitamin D
                      screen.
                    </Typography>
                    <Box display="flex" alignItems="center" gap={2}>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        display="flex"
                        alignItems="center"
                        gap={0.5}
                      >
                        📅 Today, Feb 7, 2026
                      </Typography>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        display="flex"
                        alignItems="center"
                        gap={0.5}
                      >
                        👤 Dr. Sarah Johnson
                      </Typography>
                      <Chip
                        label="Primary Medicine"
                        size="small"
                        sx={{
                          bgcolor: "#e7f3ff",
                          color: "#0066cc",
                          fontSize: "11px",
                          height: 22,
                        }}
                      />
                    </Box>
                  </Box>
                </Box>
                <IconButton size="small" sx={{ color: "#6c757d" }}>
                  <MoreVert />
                </IconButton>
              </Box>
            </Paper>

            <Paper
              elevation={0}
              sx={{
                p: 2,
                mb: 2,
                borderRadius: 2,
                border: "1px solid #e9ecef",
                bgcolor: "white",
              }}
            >
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="start"
              >
                <Box display="flex" gap={2} flex={1}>
                  <Box
                    sx={{
                      bgcolor: "#f8f9fa",
                      borderRadius: 1,
                      p: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      minWidth: 40,
                      height: 40,
                    }}
                  >
                    <MedicalServices sx={{ color: "#6c757d" }} />
                  </Box>
                  <Box flex={1}>
                    <Box display="flex" alignItems="center" gap={1} mb={1}>
                      <Typography variant="h6" fontWeight={600}>
                        X-Ray Results - Chest
                      </Typography>
                      <Chip
                        label="Radiology"
                        size="small"
                        sx={{
                          bgcolor: "#f8f9fa",
                          color: "#6c757d",
                          fontSize: "11px",
                          height: 22,
                        }}
                      />
                    </Box>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      mb={1}
                      lineHeight={1.5}
                    >
                      Clear lungs, no signs of inflammation or congestion. Heart
                      size within normal limits.
                    </Typography>
                    <Box display="flex" alignItems="center" gap={2}>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        display="flex"
                        alignItems="center"
                        gap={0.5}
                      >
                        📅 Feb 12, 2026
                      </Typography>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        display="flex"
                        alignItems="center"
                        gap={0.5}
                      >
                        👤 Dr. Sarah Johnson
                      </Typography>
                      <Chip
                        label="Diagnostics"
                        size="small"
                        sx={{
                          bgcolor: "#fff4e5",
                          color: "#fd7e14",
                          fontSize: "11px",
                          height: 22,
                        }}
                      />
                    </Box>
                  </Box>
                </Box>
                <IconButton size="small" sx={{ color: "#6c757d" }}>
                  <MoreVert />
                </IconButton>
              </Box>
            </Paper>

            <Paper
              elevation={0}
              sx={{
                p: 2,
                mb: 2,
                borderRadius: 2,
                border: "1px solid #e9ecef",
                bgcolor: "white",
              }}
            >
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="start"
              >
                <Box display="flex" gap={2} flex={1}>
                  <Box
                    sx={{
                      bgcolor: "#f8f9fa",
                      borderRadius: 1,
                      p: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      minWidth: 40,
                      height: 40,
                    }}
                  >
                    <Vaccines sx={{ color: "#6c757d" }} />
                  </Box>
                  <Box flex={1}>
                    <Box display="flex" alignItems="center" gap={1} mb={1}>
                      <Typography variant="h6" fontWeight={600}>
                        Immunization Record
                      </Typography>
                      <Chip
                        label="History"
                        size="small"
                        sx={{
                          bgcolor: "#f8f9fa",
                          color: "#6c757d",
                          fontSize: "11px",
                          height: 22,
                        }}
                      />
                    </Box>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      mb={1}
                      lineHeight={1.5}
                    >
                      Annual flu shot administered. No adverse reactions
                      observed during 15-minute wait period.
                    </Typography>
                    <Box display="flex" alignItems="center" gap={2}>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        display="flex"
                        alignItems="center"
                        gap={0.5}
                      >
                        📅 Nov 03, 2026
                      </Typography>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        display="flex"
                        alignItems="center"
                        gap={0.5}
                      >
                        👤 Dr. Sarah Johnson
                      </Typography>
                      <Chip
                        label="Preventive"
                        size="small"
                        sx={{
                          bgcolor: "#f3e5f5",
                          color: "#9c27b0",
                          fontSize: "11px",
                          height: 22,
                        }}
                      />
                    </Box>
                  </Box>
                </Box>
                <IconButton size="small" sx={{ color: "#6c757d" }}>
                  <MoreVert />
                </IconButton>
              </Box>
            </Paper>
          </Box>

          {/* Bottom Section */}
          <Grid container spacing={3}>
            {/* Active Prescriptions */}
            <Grid item xs={12} md={6}>
              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  borderRadius: 2,
                  border: "1px solid #e9ecef",
                  bgcolor: "white",
                  height: "100%",
                }}
              >
                <Box display="flex" alignItems="center" gap={1} mb={2}>
                  <Medication sx={{ color: "#4caf8a" }} />
                  <Typography variant="h6" fontWeight={600}>
                    Active Prescriptions
                  </Typography>
                </Box>
                <Box>
                  <Box mb={2}>
                    <Typography variant="body1" fontWeight={500}>
                      Amoxicillin 500mg
                    </Typography>
                    <Typography variant="body2" color="text.secondary" mb={1}>
                      Twice daily for 7 days
                    </Typography>
                    <Chip
                      label="In progress"
                      size="small"
                      sx={{
                        bgcolor: "#e7f3ff",
                        color: "#0066cc",
                        fontSize: "12px",
                        height: 24,
                      }}
                    />
                  </Box>
                  <Divider sx={{ my: 2 }} />
                  <Box>
                    <Typography variant="body1" fontWeight={500}>
                      Paracetamol 500mg
                    </Typography>
                    <Typography variant="body2" color="text.secondary" mb={1}>
                      As needed for pain
                    </Typography>
                    <Chip
                      label="Active"
                      size="small"
                      sx={{
                        bgcolor: "#d1fae5",
                        color: "#059669",
                        fontSize: "12px",
                        height: 24,
                      }}
                    />
                  </Box>
                </Box>
              </Paper>
            </Grid>

            {/* Recent Activities */}
            <Grid item xs={12} md={6}>
              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  borderRadius: 2,
                  border: "1px solid #e9ecef",
                  bgcolor: "white",
                  height: "100%",
                }}
              >
                <Box display="flex" alignItems="center" gap={1} mb={2}>
                  <History sx={{ color: "#4caf8a" }} />
                  <Typography variant="h6" fontWeight={600}>
                    Recent Activities
                  </Typography>
                </Box>
                <Box>
                  <Box display="flex" gap={2} mb={3}>
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        bgcolor: "#4caf8a",
                        mt: 1,
                        flexShrink: 0,
                      }}
                    />
                    <Box flex={1}>
                      <Typography variant="body2" fontWeight={500}>
                        Today, 10:15 AM
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Appointment started by Dr. Sarah Johnson
                      </Typography>
                    </Box>
                  </Box>
                  <Box display="flex" gap={2}>
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        bgcolor: "#adb5bd",
                        mt: 1,
                        flexShrink: 0,
                      }}
                    />
                    <Box flex={1}>
                      <Typography variant="body2" fontWeight={500}>
                        Yesterday, 4:30 PM
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Lab results uploaded: Blood CBC
                      </Typography>
                      <Chip
                        label="Active"
                        size="small"
                        sx={{
                          bgcolor: "#d1fae5",
                          color: "#059669",
                          fontSize: "12px",
                          height: 24,
                          mt: 1,
                        }}
                      />
                    </Box>
                  </Box>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Stack>
    </>
  );
}
