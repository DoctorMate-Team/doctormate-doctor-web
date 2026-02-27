import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Avatar,
  Chip,
  TextField,
  IconButton,
  Paper,
  Divider,
  Button,
  Grid,
  InputAdornment,
  useTheme,
  alpha,
} from "@mui/material";
import {
  Info as InfoIcon,
  History as HistoryIcon,
  Description as MedicalRecordIcon,
  CallEnd as EndCallIcon,
  Send as SendIcon,
  AttachFile as AttachFileIcon,
  Download as DownloadIcon,
  Print as PrintIcon,
  Lock as LockIcon,
  Notifications as NotificationsIcon,
  AccessTime as AccessTimeIcon,
  NoteAlt as ReasonIcon,
  ArrowBack as ArrowBackIcon,
} from "@mui/icons-material";
import InfoOutlineIcon from "@mui/icons-material/InfoOutline";
// مكون رئيسي يجمع الصفحات التلاتة
const Message = () => {
  const theme = useTheme();

  // الحالة الحالية (عشان نشوف المراحل التلاتة)
  // 'waiting' | 'active' | 'ended'
  const [sessionState, setSessionState] = useState("active");

  // دالة عشان نغير المراحل عشان التجربة
  const handleNextStage = () => {
    if (sessionState === "waiting") setSessionState("active");
    else if (sessionState === "active") setSessionState("ended");
    else setSessionState("waiting");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#F9FAFB",
        fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      }}
    >
      {/* شريط تحكم علوي للتجربة فقط */}
      <Box
        sx={{
          p: 2,
          textAlign: "center",
          bgcolor: "#eee",
          position: "sticky",
          top: 0,
          zIndex: 1000,
        }}
      >
        <Typography variant="caption" color="text.secondary" sx={{ mr: 2 }}>
          Current Stage: <strong>{sessionState.toUpperCase()}</strong>
        </Typography>
        <Button
          variant="contained"
          size="small"
          onClick={handleNextStage}
          sx={{ bgcolor: "primary.main" }}
        >
          Switch Stage (Waiting → Active → Ended)
        </Button>
      </Box>

      {/* Header مشترك */}
      <Box
        sx={{
          bgcolor: "white",
          px: 4,
          py: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid #E5E7EB",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Box
            sx={{
              position: "relative",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 56,
              height: 56,
              borderRadius: "50%",
              // background: "linear-gradient(135deg, #FCD34D 0%, #F59E0B 100%)",
              p: 1,
            }}
          >
            <Avatar
              src="https://i.pravatar.cc/150?img=5"
              sx={{
                width: 58,
                height: 58,
              
              }}
            />
            <Box
              sx={{
                position: "absolute",
                bottom: 2,
                right: 2,
                width: 12,
                height: 12,
                bgcolor: sessionState === "active" ? "#10B981" : sessionState === "waiting" ? "#FBBF24" : "#6B7280",
                borderRadius: "50%",
                border: "2px solid white",
              }}
            />
          </Box>
          <Box>
            <Typography variant="h6" fontWeight="bold">
              Mia Hamm
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                color: "text.secondary",
                fontSize: "0.875rem",
              }}
            >
              {sessionState === "waiting" ? (
                <>
                  <span>General Consultation</span>
                  <span>•</span>
                </>
              ) : (
                ""
              )}
              {sessionState === "active" || sessionState === "waiting" ? (
                <span>10:00 AM - 10:30 AM</span>
              ) : (
                "Follow-up Consultation"
              )}
              {sessionState === "active" && (
                <>
                  <span>•</span>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 0.5,
                      color: "#2474ED",
                      fontWeight: 500,
                    }}
                  >
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        bgcolor: "#2474ED",
                      }}
                    />
                    Session Active
                  </Box>
                </>
              )}
              {sessionState === "ended" && (
                <>
                  <span>•</span>
                  <span>Oct 24, 10:00 AM - 10:30 AM</span>
                </>
              )}
            </Box>
          </Box>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {sessionState === "waiting" && (
            <Chip
              label="Waiting for patient"
              sx={{
                bgcolor: "#FFF7ED",
                color: "#C2410C",
                fontWeight: 500,
                "& .MuiChip-label": { px: 3 },
              }}
            />
          )}

          {sessionState === "ended" && (
            <Chip
              label="Session Ended"
              sx={{
                bgcolor: "#F3F4F6",
                color: "#6B7280",
                fontWeight: 500,

                "& .MuiChip-label": { px: 3 },
              }}
            />
          )}

          {/* <IconButton>
            <InfoIcon sx={{ color: "#9CA3AF" }} />
          </IconButton> */}

          {sessionState === "waiting" && (
            <IconButton>
              <HistoryIcon sx={{ color: "#9CA3AF" }} />
            </IconButton>
          )}

          {sessionState === "active" && (
            <>
              <Button
                startIcon={<MedicalRecordIcon />}
                sx={{
                  color: "#4B5563",
                  textTransform: "none",
                  border: "1px solid #E5E7EB",
                  borderRadius: 1,
                }}
              >
                Medical Record
              </Button>
              <Button
                startIcon={<EndCallIcon />}
                sx={{
                  bgcolor: "#FEF2F2",
                  color: "#DC2626",
                  textTransform: "none",
                  borderRadius: 1,
                  "&:hover": { bgcolor: "#FEE2E2" },
                }}
                onClick={() => setSessionState("ended")}
              >
                End Session
              </Button>
            </>
          )}

          {sessionState === "ended" && (
            <>
              <IconButton >
                <DownloadIcon />
              </IconButton>
              <IconButton>
                <PrintIcon />
              </IconButton>
            </>
          )}
        </Box>
      </Box>

      {/* محتوى الصفحة */}
      <Box sx={{ mx: "auto", py: 4, pb: 0 }}>
        {/* ================= PAGE 1: WAITING ROOM ================= */}
        {sessionState === "waiting" && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              mt: 8,
            }}
          >
            <Paper
              elevation={0}
              sx={{
                p: 5,
                width: "100%",
                maxWidth: 500,
                textAlign: "center",
                border: "1px solid #F3F4F6",
              }}
            >
              <Box
                sx={{
                  width: 64,
                  height: 64,
                  borderRadius: "50%",
                  bgcolor: "#ECFDF5",
                  mx: "auto",
                  mb: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <AccessTimeIcon sx={{ color: "#10B981", fontSize: 32 }} />
              </Box>

              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Patient has not joined yet
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
                You are ready for the session. The secure room is open, and we
                will notify you immediately once Sarah Johnson connects.
              </Typography>

              <Box
                sx={{
                  bgcolor: "#F9FAFB",
                  borderRadius: 2,
                  p: 2,
                  mb: 3,
                  textAlign: "left",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 2,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      color: "#6B7280",
                    }}
                  >
                    <AccessTimeIcon fontSize="small" />
                    <Typography variant="body2">Appointment Time</Typography>
                  </Box>
                  <Typography variant="body2" fontWeight="500">
                    10:00 AM
                  </Typography>
                </Box>
                <Divider sx={{ mb: 2 }} />
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      color: "#6B7280",
                    }}
                  >
                    <ReasonIcon fontSize="small" />
                    <Typography variant="body2">Reason</Typography>
                  </Box>
                  <Typography variant="body2" fontWeight="500">
                    Follow-up
                  </Typography>
                </Box>
              </Box>

              <Button
                startIcon={<NotificationsIcon />}
                sx={{
                  color: "#059669",
                  textTransform: "none",
                  mb: 4,
                }}
              >
                Send reminder to patient
              </Button>

              <Typography
                variant="caption"
                color="text.secondary"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 0.5,
                }}
              >
                <LockIcon fontSize="small" /> End-to-end encrypted session
              </Typography>
            </Paper>
          </Box>
        )}

        {/* ================= PAGE 2 & 3: CHAT AREA ================= */}
        {(sessionState === "active" || sessionState === "ended") && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              height: "calc(100vh - 180px)",
            }}
          >
            {/* منطقة الشات */}
            <Box
              sx={{
                flex: 1,
                overflowY: "auto",
                px: 4,
                py: 2,
                pb: 0,
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              {/* رسالة النظام */}
              <Box sx={{ textAlign: "center", my: 2 }}>
                <Chip
                  label={
                    sessionState === "active"
                      ? "Secure connection established at 10:00 AM"
                      : "Session started Oct 24, 10:00 AM"
                  }
                  size="small"
                  sx={{ bgcolor: "#F3F4F6", color: "#6B7280", height: 24 }}
                />
              </Box>

              {/* رسالة المريض 1 */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  flexDirection: "column",
                }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    p: 2,
                    bgcolor: "white",
                    border: "1px solid #E5E7EB",
                    maxWidth: "60%",
                    borderRadius: "12px 12px 12px 0",
                    boxShadow: "none",
                  }}
                >
                  <Typography variant="body2">
                    Hi Dr. Smith, thank you for taking the time. I've been
                    having this persistent headache for about 3 days now and
                    over-the-counter meds aren't helping much.
                  </Typography>
                </Paper>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ display: "block", mt: 1 }}
                >
                  10:01 AM
                </Typography>
              </Box>

              {/* رسالة الدكتور 1 */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    p: 2,
                    bgcolor: "primary.main",
                    color: "white",
                    borderRadius: "12px 12px 0 12px",
                    maxWidth: "60%",
                    boxShadow: "none",
                  }}
                >
                  <Typography variant="body2">
                    Hi Dr. Smith, thank you for taking the time. I've been
                    having this persistent headache for about 3 days now and
                    over-the-counter meds aren't helping much.
                  </Typography>
                </Paper>
                <Typography
                  variant="caption"
                  sx={{
                    display: "block",
                    mt: 1,
                  }}
                >
                  10:02 AM
                </Typography>
              </Box>

              {/* رسالة المريض 2 */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  flexDirection: "column",
                }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    p: 2,
                    bgcolor: "white",
                    border: "1px solid #E5E7EB",
                    maxWidth: "60%",
                    borderRadius: "12px 12px 12px 0",
                    boxShadow: "none",
                  }}
                >
                  <Typography variant="body2">
                    Hi Dr. Smith, thank you for taking the time. I've been
                    having this persistent headache for about 3 days now and
                    over-the-counter meds aren't helping much.
                  </Typography>
                </Paper>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ display: "block", mt: 1 }}
                >
                  10:01 AM
                </Typography>
              </Box>

              {/* رسالة الدكتور 2 */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    p: 2,
                    bgcolor: "primary.main",
                    color: "white",
                    borderRadius: "12px 12px 0 12px",
                    maxWidth: "60%",
                    boxShadow: "none",
                  }}
                >
                  <Typography variant="body2">
                    I see. Have you noticed any sensitivity to light or nausea
                    accompanying these episodes?
                  </Typography>
                </Paper>
                <Typography
                  variant="caption"
                  sx={{
                    display: "block",
                    mt: 1,
                  }}
                >
                  10:02 AM
                </Typography>
              </Box>

              {sessionState === "ended" && (
                <Box sx={{ textAlign: "center", my: 2 }}>
                  <Typography variant="caption" color="text.secondary">
                    Session ended by Dr. Smith • 10:15 AM
                  </Typography>
                </Box>
              )}
            </Box>

            {/* منطقة الكتابة (Input Area) */}
            <Box
              sx={{
                px: 4,
                py: 3,
                bgcolor: "white",
                borderTop: "1px solid #E5E7EB",
              }}
            >
              {sessionState === "active" ? (
                <TextField
                  fullWidth
                  placeholder="Type your message..."
                  variant="outlined"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 3,
                      bgcolor: "#F9FAFB",
                      "& fieldset": { border: "none" },
                    },
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <IconButton>
                          <AttachFileIcon sx={{ color: "#9CA3AF" }} />
                        </IconButton>
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton sx={{ color: "#10B981" }}>
                          <SendIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              ) : (
                // حالة الجلسة المنتهية (Read Only)
                <Paper
                  elevation={0}
                  sx={{
                    p: 2,
                    bgcolor: "#F9FAFB",
                    borderRadius: 3,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    border: "1px solid #E5E7EB",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: "50%",
                        bgcolor: "white",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        border: "1px solid #E5E7EB",
                      }}
                    >
                      <LockIcon sx={{ color: "#9CA3AF" }} />
                    </Box>
                    <Box>
                      <Typography variant="subtitle2" fontWeight="bold">
                        Chat is Read-Only
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        This consultation session has officially ended. You can
                        review the history above.
                      </Typography>
                    </Box>
                  </Box>

                  <Button
                    variant="outlined"
                    startIcon={<ArrowBackIcon />}
                    sx={{
                      borderRadius: 2,
                      textTransform: "none",
                      color: "#059669",
                      borderColor: "#D1FAE5",
                    }}
                    onClick={() => setSessionState("waiting")}
                  >
                    Back to Dashboard
                  </Button>
                </Paper>
              )}
            </Box>
          </Box>
        )}

        {/* رسالة أسفل صفحة الانتظار */}
        {sessionState === "waiting" && (
          <>
            <Box
              sx={{
                // position: "fixed",
                // bottom: 0,
                // left: 0,
                // right: 0,
                bgcolor: "white",
                p: 3,
                mt: 2,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
              }}
            >
              <TextField
                fullWidth
                disabled
                placeholder="Chat will be enabled once the patient joins the session..."
                variant="outlined"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 3,
                    bgcolor: "#F9FAFB",
                    "& fieldset": { border: "none" },
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <IconButton>
                        <AttachFileIcon sx={{ color: "#9CA3AF" }} />
                      </IconButton>
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton sx={{ color: "#10B981" }}>
                        <SendIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              {sessionState === "waiting" && (
                <Chip
                  icon={
                    <InfoOutlineIcon sx={{ color: "#F59E0B", fontSize: 18 ,mr:2}} />
                  }
                  label="Waiting for Sarah Johnson to join the room to enable chat."
                  sx={{
                    mt: 2,
                    bgcolor: "#FFF7ED",
                    color: "#C2410C",
                    fontWeight: 500,
                    fontSize: "14px",
                    px: 2,
                    py: 1.5,
                    borderRadius: "50px",
                    border: "1px solid rgba(245, 158, 11, 0.2)",
                    "& .MuiChip-icon": {
                      color: "#F59E0B",
                      ml: 0.5,
                    },
                    "& .MuiChip-label": {
                      px: 1,
                      py: 0.5,
                    },
                    boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
                  }}
                />
              )}
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
};

export default Message;
