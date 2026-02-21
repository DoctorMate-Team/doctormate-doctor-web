import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  IconButton,
  Button,
  Grid,
  CardMedia,
  Divider,
  Tooltip,
  Stack,
} from "@mui/material";
import {
  ChevronLeft,
  ChevronRight,
  Fullscreen,
  Person,
  CakeOutlined,
  Male,
  Bloodtype,
  Badge,
  CalendarToday,
  AccountCircle,
  CropRotate,
  PanTool,
  RotateRight,
  InvertColors,
  Refresh,
  Remove,
  Add,
} from "@mui/icons-material";

export default function DicomViewer() {
  const [currentImage, setCurrentImage] = useState(0);
  const [zoom, setZoom] = useState(100);

  const patientInfo = {
    name: "John Doe",
    age: 52,
    gender: "Male",
    bloodType: "O+",
    patientId: "P-245889",
    lastVisit: "12 Oct 2025",
  };

  // Array of medical images
  const images = [
    {
      src: "/assets/imageView/image 1.png",
      thumbnail: "/assets/imageView/image 2.png",
    },
    {
      src: "/assets/imageView/image 3.png",
      thumbnail: "/assets/imageView/image 3.png",
    },
  ];

  const handlePrevious = () => {
    setCurrentImage((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  };

  const handleNext = () => {
    setCurrentImage((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  };

  const handleThumbnailClick = (index) => {
    setCurrentImage(index);
  };

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 10, 200));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 10, 50));
  };

  return (
    <Box sx={{ bgcolor: "#f5f7fa", minHeight: "100vh", p: 2 }}>
      {/* Header */}
      <Paper
        elevation={0}
        sx={{
          mb: 1,
          borderRadius: 2,
          overflow: "hidden",
          border: "1px solid #e0e0e0",
        }}
      >
        {/* Title Bar */}
        <Box
          sx={{
            p: 2,
            bgcolor: "#fff",
            borderBottom: "1px solid #e0e0e0",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              color: "primary.main",
              fontWeight: 600,
              fontSize: "32px",
            }}
          >
            Dicom viewer
          </Typography>
        </Box>
      </Paper>
      {/* Menu Bar */}
      <Paper
        elevation={0}
        sx={{
          mb: 2,
          borderRadius: 2,
          overflow: "hidden",
          border: "1px solid #e0e0e0",
        }}
      >
        <Box
          sx={{
            display: "flex",
            borderBottom: "1px solid #e0e0e0",
            px: 2,
          }}
        >
          {["File", "Edit", "Image", "View"].map((menu) => (
            <Button
              key={menu}
              sx={{
                color: "#616161",
                textTransform: "none",
                fontSize: "32px",
                fontWeight: 400,
                px: 3,
                py: 1.5,
                borderRadius: 0,
                "&:hover": {
                  bgcolor: "#f0f0f0",
                },
              }}
            >
              {menu}
            </Button>
          ))}
        </Box>
      </Paper>
      {/* Main Content */}
      <Paper
        elevation={0}
        sx={{
          borderRadius: 2,
          overflow: "hidden",
          border: "1px solid #e0e0e0",
        }}
      >
        <Grid container spacing={2}>
          {/* Left Sidebar - Thumbnails */}
          <Grid size={{ xs: "12", md: "8" }} sx={{ p: 2 }}>
            <Stack direction={"row"} sx={{ width: "100%" }}>
              <Box>
                {/* Navigation */}
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  mb={2}
                >
                  <IconButton
                    onClick={handlePrevious}
                    size="small"
                    sx={{
                      bgcolor: "#f0f0f0",
                      "&:hover": { bgcolor: "#e0e0e0" },
                    }}
                  >
                    <ChevronLeft fontSize="small" />
                  </IconButton>
                  <Typography variant="body2" color="text.secondary">
                    {currentImage + 1} of {images.length}
                  </Typography>
                  <IconButton
                    onClick={handleNext}
                    size="small"
                    sx={{
                      bgcolor: "#f0f0f0",
                      "&:hover": { bgcolor: "#e0e0e0" },
                    }}
                  >
                    <ChevronRight fontSize="small" />
                  </IconButton>
                </Box>
                {/* Thumbnails */}
                <Box display="flex" flexDirection="column" gap={2}>
                  {images.map((image, index) => (
                    <Box
                      key={index}
                      onClick={() => handleThumbnailClick(index)}
                      sx={{
                        cursor: "pointer",
                        border:
                          currentImage === index
                            ? "2px solid #5cb998"
                            : "2px solid transparent",
                        borderRadius: 1,
                        overflow: "hidden",
                        transition: "all 0.2s",
                        "&:hover": {
                          border: "2px solid #5cb998",
                          transform: "scale(1.02)",
                        },
                      }}
                    >
                      <CardMedia
                        component="img"
                        image={image.thumbnail}
                        alt=""
                        sx={{
                          width: "100%",
                          height: 80,
                          objectFit: "cover",
                          filter: "grayscale(100%)",
                        }}
                      />
                    </Box>
                  ))}
                </Box>
              </Box>
              {/* Center - Main Image */}
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  height: "100%",
                  minHeight: "560px",
                  borderRadius: 1,
                  overflow: "hidden",
                }}
              >
                <CardMedia
                  component="img"
                  image={images[currentImage].src}
                  alt=""
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    bgcolor: "#000",
                  }}
                />
                {/* Fullscreen Button */}
                <IconButton
                  sx={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    bgcolor: "rgba(0, 0, 0, 0.6)",
                    color: "#fff",
                    "&:hover": {
                      bgcolor: "rgba(0, 0, 0, 0.8)",
                    },
                  }}
                  size="small"
                >
                  <Fullscreen fontSize="small" />
                </IconButton>
              </Box>
            </Stack>
          </Grid>
          {/* <Grid
            item
            xs={2}
            sx={{
              borderRight: "1px solid #e0e0e0",
              p: 2,
              bgcolor: "#fafafa",
            }}
          ></Grid> */}

          {/* <Grid
            item
            xs={7}
            sx={{
              bgcolor: "#000",
              position: "relative",
            }}
          ></Grid> */}
          {/* Right Sidebar - Patient Info */}
          <Grid size={{ xs: "12", md: "4" }} sx={{ p: 2 }}>
            <Box display="flex" flexDirection="column" gap={2}>
              {/* Name */}
              <Box display="flex" alignItems="center" gap={1.5}>
                <Person sx={{ color: "#9e9e9e", fontSize: 20 }} />
                <Typography variant="body2" color="text.secondary">
                  Name:{" "}
                  <Box component="span" sx={{ color: "#424242" }}>
                    {patientInfo.name}
                  </Box>
                </Typography>
              </Box>

              {/* Age */}
              <Box display="flex" alignItems="center" gap={1.5}>
                <CakeOutlined sx={{ color: "#8bc34a", fontSize: 20 }} />
                <Typography variant="body2" color="text.secondary">
                  Age:{" "}
                  <Box component="span" sx={{ color: "#424242" }}>
                    {patientInfo.age} years
                  </Box>
                </Typography>
              </Box>

              {/* Gender */}
              <Box display="flex" alignItems="center" gap={1.5}>
                <Male sx={{ color: "#2196f3", fontSize: 20 }} />
                <Typography variant="body2" color="text.secondary">
                  Gender:{" "}
                  <Box component="span" sx={{ color: "#424242" }}>
                    {patientInfo.gender}
                  </Box>
                </Typography>
              </Box>

              {/* Blood Type */}
              <Box display="flex" alignItems="center" gap={1.5}>
                <Bloodtype sx={{ color: "#f44336", fontSize: 20 }} />
                <Typography variant="body2" color="text.secondary">
                  Blood Type:{" "}
                  <Box component="span" sx={{ color: "#424242" }}>
                    {patientInfo.bloodType}
                  </Box>
                </Typography>
              </Box>

              {/* Patient ID */}
              <Box display="flex" alignItems="center" gap={1.5}>
                <Badge sx={{ color: "#9c27b0", fontSize: 20 }} />
                <Typography variant="body2" color="text.secondary">
                  Patient ID:{" "}
                  <Box component="span" sx={{ color: "#424242" }}>
                    {patientInfo.patientId}
                  </Box>
                </Typography>
              </Box>

              {/* Last Visit */}
              <Box display="flex" alignItems="center" gap={1.5}>
                <CalendarToday sx={{ color: "#ff9800", fontSize: 20 }} />
                <Typography variant="body2" color="text.secondary">
                  Last Visit:{" "}
                  <Box component="span" sx={{ color: "#424242" }}>
                    {patientInfo.lastVisit}
                  </Box>
                </Typography>
              </Box>

              <Divider sx={{ my: 1 }} />

              {/* View Profile Button */}
              <Button
                fullWidth
                variant="contained"
                startIcon={<AccountCircle />}
                sx={{
                  bgcolor: "#5cb998",
                  textTransform: "none",
                  borderRadius: 1,
                  py: 1.5,
                  mt: 1,
                  "&:hover": {
                    bgcolor: "#4caf8a",
                  },
                }}
              >
                View patient profile
              </Button>
            </Box>
          </Grid>
        </Grid>
        {/* Bottom Toolbar */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            p: 2,
            bgcolor: "#fff",
            borderTop: "1px solid #e0e0e0",
          }}
        >
          {/* Level */}
          <Tooltip title="Level">
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 0.5,
                cursor: "pointer",
                color: "#5cb998",
                "&:hover": { color: "#4caf8a" },
              }}
            >
              <CropRotate sx={{ fontSize: 28 }} />
              <Typography
                variant="caption"
                color="text.secondary"
                fontSize="11px"
              >
                Level
              </Typography>
            </Box>
          </Tooltip>

          {/* Pan */}
          <Tooltip title="Pan">
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 0.5,
                cursor: "pointer",
                color: "#5cb998",
                "&:hover": { color: "#4caf8a" },
              }}
            >
              <PanTool sx={{ fontSize: 28 }} />
              <Typography
                variant="caption"
                color="text.secondary"
                fontSize="11px"
              >
                Pan
              </Typography>
            </Box>
          </Tooltip>

          {/* Rotate */}
          <Tooltip title="Rotate">
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 0.5,
                cursor: "pointer",
                color: "#5cb998",
                "&:hover": { color: "#4caf8a" },
              }}
            >
              <RotateRight sx={{ fontSize: 28 }} />
              <Typography
                variant="caption"
                color="text.secondary"
                fontSize="11px"
              >
                Rotate
              </Typography>
            </Box>
          </Tooltip>

          {/* Invert */}
          <Tooltip title="Invert">
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 0.5,
                cursor: "pointer",
                color: "#5cb998",
                "&:hover": { color: "#4caf8a" },
              }}
            >
              <InvertColors sx={{ fontSize: 28 }} />
              <Typography
                variant="caption"
                color="text.secondary"
                fontSize="11px"
              >
                Invert
              </Typography>
            </Box>
          </Tooltip>

          {/* Reset */}
          <Tooltip title="Reset">
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 0.5,
                cursor: "pointer",
                color: "#5cb998",
                "&:hover": { color: "#4caf8a" },
              }}
            >
              <Refresh sx={{ fontSize: 28 }} />
              <Typography
                variant="caption"
                color="text.secondary"
                fontSize="11px"
              >
                Reset
              </Typography>
            </Box>
          </Tooltip>

          {/* Zoom Controls */}
          <Box display="flex" alignItems="center" gap={1}>
            <Tooltip title="Zoom Out">
              <IconButton
                onClick={handleZoomOut}
                size="small"
                sx={{ color: "#5cb998" }}
              >
                <Remove />
              </IconButton>
            </Tooltip>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                minWidth: 50,
              }}
            >
              <Box
                sx={{
                  width: 32,
                  height: 32,
                  bgcolor: "#f0f0f0",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mb: 0.5,
                }}
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/512/755/755270.png"
                  alt="zoom"
                  style={{ width: 20, height: 20 }}
                />
              </Box>
              <Typography
                variant="caption"
                fontSize="10px"
                color="text.secondary"
              >
                {zoom}%
              </Typography>
            </Box>
            <Tooltip title="Zoom In">
              <IconButton
                onClick={handleZoomIn}
                size="small"
                sx={{ color: "#5cb998" }}
              >
                <Add />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}
