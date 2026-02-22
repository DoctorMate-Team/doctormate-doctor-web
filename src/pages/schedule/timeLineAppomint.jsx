// components/AppointmentScheduleTable.jsx
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Typography,
  Box,
  Stack,
  Avatar,
  CircularProgress,
  Alert,
  IconButton,
  Card,
  CardContent,
  Divider,
  Fade,
} from "@mui/material";
import { format } from "date-fns";
import { enUS } from "date-fns/locale";
import EventIcon from "@mui/icons-material/Event";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import PersonIcon from "@mui/icons-material/Person";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PhoneIcon from "@mui/icons-material/Phone";
import RefreshIcon from "@mui/icons-material/Refresh";

// ==================== Helpers ====================

// Format date and time
const formatAppointmentTime = (dateStr, timeStr) => {
  try {
    const date = new Date(dateStr);
    const [hours, minutes] = timeStr.split(":");
    date.setHours(parseInt(hours), parseInt(minutes));

    return {
      date: format(date, "EEEE, MMMM dd, yyyy", { locale: enUS }),
      time: format(date, "hh:mm a", { locale: enUS }),
      shortDate: format(date, "MM/dd/yyyy"),
    };
  } catch (error) {
    return { date: dateStr, time: timeStr, shortDate: dateStr };
  }
};

// Status Chip configuration with primary colors
const getStatusConfig = (status) => {
  const configs = {
    completed: {
      label: "Completed",
      icon: <CheckCircleIcon fontSize="small" />,
      bg: "linear-gradient(135deg, #E5E7EB 0%, #D1D5DB 100%)",
      text: "#6B7280",
      border: "#6B7280",
    },
    inprogress: {
      label: "In Progress",
      icon: <HourglassEmptyIcon fontSize="small" />,
      bg: "linear-gradient(135deg, #D1FAE5 0%, #A7F3D0 100%)",
      text: "#10B981",
      border: "#10B981",
    },
    cancelled: {
      label: "Cancelled",
      icon: <CancelIcon fontSize="small" />,
      bg: "linear-gradient(135deg, #FEE2E2 0%, #FECACA 100%)",
      text: "#EF4444",
      border: "#EF4444",
    },
    scheduled: {
      label: "Scheduled",
      icon: <EventIcon fontSize="small" />,
      bg: "linear-gradient(135deg, #DBEAFE 0%, #BFDBFE 100%)",
      text: "#3B82F6",
      border: "#3B82F6",
    },
    confirmed: {
      label: "Confirmed",
      icon: <CheckCircleIcon fontSize="small" />,
      bg: "linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)",
      text: "#F59E0B",
      border: "#F59E0B",
    },
  };
  return configs[status?.toLowerCase()] || configs.scheduled;
};

// Appointment type configuration with primary colors
const getAppointmentTypeConfig = (type) => {
  return type === "video"
    ? {
        icon: <VideoCallIcon fontSize="small" />,
        label: "Video Call",
        color: "#52AC8C",
        bg: "rgba(82, 172, 140, 0.1)",
      }
    : {
        icon: <PhoneIcon fontSize="small" />,
        label: "Voice Call",
        color: "#3B82F6",
        bg: "rgba(59, 130, 246, 0.1)",
      };
};

// Patient Avatar with fallback
const PatientAvatar = ({ patient }) => {
  const hasValidImage =
    patient?.image &&
    !patient.image.includes("Default") &&
    !patient.image.startsWith("//");

  return (
    <Avatar
      src={hasValidImage ? patient.image.trim() : undefined}
      sx={{
        width: 56,
        height: 56,
        bgcolor: hasValidImage ? "transparent" : "primary.main",
        border: "3px solid",
        borderColor: "primary.main",
        boxShadow: "0 4px 12px rgba(82, 172, 140, 0.3)",
      }}
    >
      {!hasValidImage && patient?.name?.charAt(0).toUpperCase()}
    </Avatar>
  );
};

// ==================== Timeline Row Component ====================
const TimelineAppointmentRow = ({ appointment, isFirst, isLast }) => {
  const {
    patient,
    status,
    reason,
    appointmentType,
    appointmentDate,
    appointmentTime,
  } = appointment;

  const { date, time, shortDate } = formatAppointmentTime(
    appointmentDate,
    appointmentTime
  );
  const statusConfig = getStatusConfig(status);
  const typeConfig = getAppointmentTypeConfig(appointmentType);
  const StatusIcon = statusConfig.icon.type;

  return (
    <TableRow
      sx={{
        position: "relative",
        "&:hover": {
          backgroundColor: "rgba(82, 172, 140, 0.04)",
          "& .timeline-dot": {
            transform: "scale(1.2)",
          },
          "& .appointment-card": {
            transform: "translateX(4px)",
            boxShadow: "0 6px 20px rgba(82, 172, 140, 0.2)",
          },
        },
        transition: "all 0.3s ease",
      }}
    >
      {/* Timeline Column with Time */}
      <TableCell
        sx={{
          width: 180,
          verticalAlign: "top",
          pt: 3,
          pb: 3,
          borderBottom: isLast ? "none" : "1px solid rgba(82, 172, 140, 0.1)",
          position: "relative",
        }}
      >
        <Stack alignItems="flex-end" spacing={0.5} mr={2}>
          <Typography
            variant="h6"
            fontWeight="700"
            color="primary.main"
            sx={{ lineHeight: 1 }}
          >
            {time}
          </Typography>
          <Typography variant="caption" color="text.secondary" fontWeight="500">
            {shortDate}
          </Typography>
        </Stack>

        {/* Timeline Dot */}
        <Box
          className="timeline-dot"
          sx={{
            position: "absolute",
            right: -12,
            top: 24,
            width: 24,
            height: 24,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #52AC8C 0%, #3D8B6F 100%)",
            border: "4px solid white",
            boxShadow: "0 0 0 2px rgba(82, 172, 140, 0.3)",
            zIndex: 2,
            transition: "transform 0.3s ease",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <AccessTimeIcon sx={{ fontSize: 12, color: "white" }} />
        </Box>

        {/* Timeline Line */}
        {!isLast && (
          <Box
            sx={{
              position: "absolute",
              right: -1,
              top: 48,
              bottom: 0,
              width: 2,
              background: "linear-gradient(180deg, rgba(82, 172, 140, 0.3) 0%, rgba(82, 172, 140, 0.1) 100%)",
              zIndex: 1,
            }}
          />
        )}
      </TableCell>

      {/* Appointment Details Column */}
      <TableCell
        sx={{
          verticalAlign: "top",
          pt: 2,
          pb: 3,
          borderBottom: isLast ? "none" : "1px solid rgba(82, 172, 140, 0.1)",
        }}
      >
        <Card
          className="appointment-card"
          sx={{
            borderRadius: "16px",
            border: "1px solid rgba(82, 172, 140, 0.2)",
            boxShadow: "0 2px 12px rgba(82, 172, 140, 0.12)",
            transition: "all 0.3s ease",
            overflow: "visible",
            position: "relative",
          }}
        >
          <CardContent sx={{ p: 2.5, "&:last-child": { pb: 2.5 } }}>
            {/* Patient Info & Status */}
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="flex-start"
              mb={2}
            >
              <Stack direction="row" spacing={2} alignItems="center" flex={1}>
                <PatientAvatar patient={patient} />
                <Box>
                  <Typography variant="h6" fontWeight="700" color="primary.main">
                    {patient?.name || "Unknown Patient"}
                  </Typography>
                  <Stack direction="row" spacing={1} alignItems="center" mt={0.5}>
                    <Chip
                      label={`ID: ${patient?.id?.slice(-6)}`}
                      size="small"
                      sx={{
                        height: 22,
                        fontSize: "11px",
                        fontWeight: 600,
                        bgcolor: "rgba(82, 172, 140, 0.1)",
                        color: "primary.main",
                      }}
                    />
                    {patient?.age && (
                      <Chip
                        label={`${patient.age}y`}
                        size="small"
                        sx={{
                          height: 22,
                          fontSize: "11px",
                          fontWeight: 600,
                        }}
                      />
                    )}
                    {patient?.gender && (
                      <Chip
                        label={patient.gender}
                        size="small"
                        sx={{
                          height: 22,
                          fontSize: "11px",
                          fontWeight: 600,
                          textTransform: "capitalize",
                        }}
                      />
                    )}
                  </Stack>
                </Box>
              </Stack>

              {/* Status Badge */}
              <Chip
                icon={statusConfig.icon}
                label={statusConfig.label}
                sx={{
                  background: statusConfig.bg,
                  color: statusConfig.text,
                  fontWeight: 700,
                  fontSize: "12px",
                  height: "32px",
                  border: `1px solid ${statusConfig.border}`,
                  "& .MuiChip-icon": {
                    color: statusConfig.text,
                  },
                }}
              />
            </Stack>

            <Divider sx={{ my: 1.5 }} />

            {/* Appointment Details */}
            <Stack spacing={1.5}>
              <Stack direction="row" spacing={1.5} alignItems="center">
                <Box
                  sx={{
                    width: 32,
                    height: 32,
                    borderRadius: "8px",
                    bgcolor: typeConfig.bg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {typeConfig.icon}
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary" fontWeight="500">
                    Appointment Type
                  </Typography>
                  <Typography variant="body2" fontWeight="600" color={typeConfig.color}>
                    {typeConfig.label}
                  </Typography>
                </Box>
              </Stack>

              <Stack direction="row" spacing={1.5} alignItems="center">
                <Box
                  sx={{
                    width: 32,
                    height: 32,
                    borderRadius: "8px",
                    bgcolor: "rgba(82, 172, 140, 0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <EventIcon sx={{ fontSize: 18, color: "primary.main" }} />
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary" fontWeight="500">
                    Reason
                  </Typography>
                  <Typography variant="body2" fontWeight="600" color="text.primary">
                    {reason || "No reason specified"}
                  </Typography>
                </Box>
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      </TableCell>
    </TableRow>
  );
};

// ==================== Main Component ====================
const AppointmentScheduleTable = ({
  appointments = [],
  loading = false,
  error = null,
  onRefresh,
}) => {
  // Group appointments by date
  const groupedAppointments =
    appointments?.reduce((acc, apt) => {
      const dateKey = apt.appointmentDate.split("T")[0];
      if (!acc[dateKey]) {
        acc[dateKey] = [];
      }
      acc[dateKey].push(apt);
      return acc;
    }, {}) || {};

  const sortedDates = Object.keys(groupedAppointments).sort(
    (a, b) => new Date(a) - new Date(b)
  );

  // Loading state
  if (loading) {
    return (
      <Card
        sx={{
          borderRadius: "20px",
          boxShadow: "0 4px 20px rgba(82, 172, 140, 0.15)",
          border: "1px solid rgba(82, 172, 140, 0.2)",
          mb: 3,
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", p: 6 }}>
          <CircularProgress sx={{ color: "primary.main" }} />
        </Box>
      </Card>
    );
  }

  // Error state
  if (error) {
    return (
      <Alert
        severity="error"
        sx={{
          mb: 3,
          borderRadius: "16px",
          border: "2px solid #f44336",
          boxShadow: "0 4px 20px rgba(244, 67, 54, 0.2)",
        }}
        action={
          <IconButton color="inherit" size="small" onClick={onRefresh}>
            <RefreshIcon />
          </IconButton>
        }
      >
        {error}
      </Alert>
    );
  }

  // Empty state
  if (!appointments?.length) {
    return (
      <Card
        sx={{
          borderRadius: "20px",
          boxShadow: "0 4px 20px rgba(82, 172, 140, 0.15)",
          border: "1px solid rgba(82, 172, 140, 0.2)",
          mb: 3,
          p: 6,
          textAlign: "center",
        }}
      >
        <Box
          sx={{
            width: 80,
            height: 80,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #52AC8C 0%, #3D8B6F 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 24px",
            opacity: 0.8,
          }}
        >
          <EventIcon sx={{ fontSize: 40, color: "white" }} />
        </Box>
        <Typography variant="h6" fontWeight="700" color="primary.main" mb={1}>
          No Appointments Today
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Patient appointments will appear here once scheduled
        </Typography>
      </Card>
    );
  }

  return (
    <Card
      sx={{
        borderRadius: "20px",
        boxShadow: "0 4px 20px rgba(82, 172, 140, 0.15)",
        border: "1px solid rgba(82, 172, 140, 0.2)",
        mb: 3,
        overflow: "hidden",
      }}
    >
      <CardContent sx={{ p: 4 }}>
        {/* Header */}
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={4}
        >
          <Stack direction="row" alignItems="center" spacing={2}>
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: "12px",
                background: "linear-gradient(135deg, #52AC8C 0%, #3D8B6F 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <EventIcon sx={{ fontSize: 24, color: "white" }} />
            </Box>
            <Box>
              <Typography variant="h5" fontWeight="700" color="primary.main">
                Daily Schedule Timeline
              </Typography>
              <Typography variant="body2" color="text.secondary" fontWeight="500">
                Organized view of today's appointments
              </Typography>
            </Box>
          </Stack>
          {onRefresh && (
            <IconButton
              onClick={onRefresh}
              sx={{
                background: "linear-gradient(135deg, #52AC8C 0%, #3D8B6F 100%)",
                color: "white",
                "&:hover": {
                  background: "linear-gradient(135deg, #3D8B6F 0%, #2E7A5F 100%)",
                },
              }}
            >
              <RefreshIcon />
            </IconButton>
          )}
        </Stack>

        {/* Timeline Display */}
        <Stack spacing={4}>
          {sortedDates.map((dateKey, dateIndex) => {
            const { date: formattedDate } = formatAppointmentTime(
              dateKey,
              "00:00:00"
            );
            const dayAppointments = groupedAppointments[dateKey];

            return (
              <Fade in timeout={300 * (dateIndex + 1)} key={dateKey}>
                <Box>
                  {/* Date Header */}
                  <Stack
                    direction="row"
                    alignItems="center"
                    spacing={2}
                    sx={{
                      mb: 3,
                      pb: 2,
                      borderBottom: "2px solid rgba(82, 172, 140, 0.2)",
                    }}
                  >
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: "10px",
                        background: "linear-gradient(135deg, rgba(82, 172, 140, 0.2) 0%, rgba(82, 172, 140, 0.1) 100%)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <EventIcon sx={{ fontSize: 20, color: "primary.main" }} />
                    </Box>
                    <Typography variant="h6" fontWeight="700" color="primary.main">
                      {formattedDate}
                    </Typography>
                    <Chip
                      label={`${dayAppointments.length} Appointment${
                        dayAppointments.length !== 1 ? "s" : ""
                      }`}
                      size="small"
                      sx={{
                        background: "linear-gradient(135deg, #52AC8C 0%, #3D8B6F 100%)",
                        color: "white",
                        fontWeight: 700,
                        fontSize: "11px",
                        height: 24,
                      }}
                    />
                  </Stack>

                  {/* Timeline Table */}
                  <TableContainer
                    sx={{
                      borderRadius: "16px",
                      border: "1px solid rgba(82, 172, 140, 0.15)",
                      overflow: "hidden",
                    }}
                  >
                    <Table>
                      <TableBody>
                        {dayAppointments
                          .sort((a, b) =>
                            a.appointmentTime.localeCompare(b.appointmentTime)
                          )
                          .map((appointment, index) => (
                            <TimelineAppointmentRow
                              key={appointment.id}
                              appointment={appointment}
                              isFirst={index === 0}
                              isLast={index === dayAppointments.length - 1}
                            />
                          ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              </Fade>
            );
          })}
        </Stack>
      </CardContent>
    </Card>
  );
};

export default AppointmentScheduleTable;