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
  Tooltip,
} from "@mui/material";
import { format } from "date-fns";
import { enUS } from "date-fns/locale";
import EventIcon from "@mui/icons-material/Event";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import PersonIcon from "@mui/icons-material/Person";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";

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

// Status Chip configuration
const getStatusConfig = (status) => {
  const configs = {
    completed: {
      label: "Completed",
      color: "success",
      icon: <CheckCircleIcon fontSize="small" />,
      bg: "#E8F5E9",
      text: "#2E7D32",
    },
    inProgress: {
      label: "In Progress",
      color: "warning",
      icon: <HourglassEmptyIcon fontSize="small" />,
      bg: "#FFF3E0",
      text: "#EF6C00",
    },
    Cancelled: {
      label: "Cancelled",
      color: "error",
      icon: <CancelIcon fontSize="small" />,
      bg: "#FFEBEE",
      text: "#C62828",
    },
    scheduled: {
      label: "Scheduled",
      color: "info",
      icon: <EventIcon fontSize="small" />,
      bg: "#E3F2FD",
      text: "#1565C0",
    },
    confirmed: {
      label: "Confirmed",
      color: "primary",
      icon: <CheckCircleIcon fontSize="small" />,
      bg: "#E3F2FD",
      text: "#1565C0",
    },
    pending: {
      label: "Pending",
      color: "default",
      icon: null,
      bg: "#F5F5F5",
      text: "#616161",
    },
  };
  return configs[status] || configs.pending;
};

// Appointment type configuration
const getAppointmentTypeConfig = (type) => {
  return type === "online"
    ? {
        icon: <VideoCallIcon fontSize="small" />,
        label: "Online",
        color: "#1976D2",
      }
    : {
        icon: <PersonIcon fontSize="small" />,
        label: "In-Person",
        color: "#388E3C",
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
        width: 40,
        height: 40,
        bgcolor: hasValidImage ? "transparent" : "primary.light",
        border: "2px solid white",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      }}
    >
      {!hasValidImage && patient?.name?.charAt(0).toUpperCase()}
    </Avatar>
  );
};

// ==================== Patient Row Component ====================
const AppointmentRow = ({ appointment }) => {
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

  return (
    <TableRow
      sx={{
        "&:hover": { backgroundColor: "#FAFAFA" },
        transition: "all 0.2s",
      }}
    >
      {/* Time Column */}
      <TableCell sx={{ minWidth: 100, fontWeight: 600, color: "primary.main" }}>
        <Stack alignItems="center">
          <Typography variant="h6">{time}</Typography>
          <Typography variant="caption" color="text.secondary">
            {shortDate}
          </Typography>
        </Stack>
      </TableCell>

      {/* Patient Column */}
      <TableCell sx={{ minWidth: 200 }}>
        <Stack direction="row" spacing={2} alignItems="center">
          <PatientAvatar patient={patient} />
          <Box>
            <Typography fontWeight="600" noWrap maxWidth={150}>
              {patient?.name || "Unknown Patient"}
            </Typography>
            <Stack direction="row" spacing={1} alignItems="center">
              {patient?.age && (
                <Typography variant="caption" color="text.secondary">
                  {patient.age} years
                </Typography>
              )}
              {patient?.gender && (
                <>
                  {patient?.age && <Typography variant="caption">•</Typography>}
                  <Typography variant="caption" color="text.secondary">
                    {patient.gender === "male" ? "Male" : "Female"}
                  </Typography>
                </>
              )}
            </Stack>
          </Box>
        </Stack>
      </TableCell>

      {/* Details Column (Reason + Type) */}
      <TableCell sx={{ minWidth: 180 }}>
        <Stack spacing={1}>
          <Typography variant="body2" color="text.primary">
            {reason || "No reason specified"}
          </Typography>
          <Chip
            icon={typeConfig.icon}
            label={typeConfig.label}
            size="small"
            sx={{
              width: "fit-content",
              bgcolor: `${typeConfig.color}15`,
              color: typeConfig.color,
              fontWeight: 500,
              "& .MuiChip-icon": { color: typeConfig.color },
            }}
          />
        </Stack>
      </TableCell>

      {/* Status Column */}
      <TableCell sx={{ minWidth: 120 }}>
        <Chip
          icon={statusConfig.icon}
          label={statusConfig.label}
          sx={{
            bgcolor: statusConfig.bg,
            color: statusConfig.text,
            fontWeight: 600,
            "& .MuiChip-icon": { color: statusConfig.text },
          }}
        />
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
      <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  // Error state
  if (error) {
    return (
      <Alert
        severity="error"
        sx={{ m: 2 }}
        action={
          <IconButton color="inherit" size="small" onClick={onRefresh}>
            Retry
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
      <Box sx={{ textAlign: "center", p: 4 }}>
        <Typography color="text.secondary" variant="h6">
          No appointments scheduled
        </Typography>
        <Typography variant="body2" color="text.disabled">
          Patient appointments will appear here once they are added
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: { xs: 1, md: 3 } }}>
      <Typography variant="h5" fontWeight="600" mb={3} color="primary">
        📅 Patient Appointments Schedule
      </Typography>

      {/* Display appointments grouped by date */}
      <Stack spacing={4}>
        {sortedDates.map((dateKey) => {
          const { date: formattedDate } = formatAppointmentTime(
            dateKey,
            "00:00:00"
          );
          const dayAppointments = groupedAppointments[dateKey];

          return (
            <Box key={dateKey}>
              {/* Date Header */}
              <Stack
                direction="row"
                alignItems="center"
                spacing={2}
                sx={{
                  pb: 2,
                  mb: 2,
                  borderBottom: "2px solid",
                  borderColor: "primary.light",
                }}
              >
                <EventIcon color="primary" />
                <Typography variant="h6" fontWeight="600">
                  {formattedDate}
                </Typography>
                <Chip
                  label={`${dayAppointments.length} appointment${dayAppointments.length !== 1 ? 's' : ''}`}
                  size="small"
                  sx={{
                    bgcolor: "primary.light",
                    color: "white",
                    fontWeight: 600,
                  }}
                />
              </Stack>

              {/* Daily Schedule Table */}
              <TableContainer
                component={Paper}
                elevation={0}
                sx={{ border: "1px solid #E0E0E0", borderRadius: 2 }}
              >
                <Table>
                  <TableHead sx={{ backgroundColor: "#F5F5F5" }}>
                    <TableRow>
                      <TableCell
                        sx={{
                          fontWeight: 700,
                          borderBottom: "2px solid #E0E0E0",
                        }}
                      >
                        Time
                      </TableCell>
                      <TableCell
                        sx={{
                          fontWeight: 700,
                          borderBottom: "2px solid #E0E0E0",
                        }}
                      >
                        Patient
                      </TableCell>
                      <TableCell
                        sx={{
                          fontWeight: 700,
                          borderBottom: "2px solid #E0E0E0",
                        }}
                      >
                        Details
                      </TableCell>
                      <TableCell
                        sx={{
                          fontWeight: 700,
                          borderBottom: "2px solid #E0E0E0",
                        }}
                      >
                        Status
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {dayAppointments
                      .sort((a, b) =>
                        a.appointmentTime.localeCompare(b.appointmentTime)
                      )
                      .map((appointment) => (
                        <AppointmentRow
                          key={appointment.id}
                          appointment={appointment}
                        />
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          );
        })}
      </Stack>
    </Box>
  );
};

export default AppointmentScheduleTable;