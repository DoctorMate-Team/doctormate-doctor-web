import React, { useState, useRef } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Chip,
  LinearProgress,
  IconButton,
  Breadcrumbs,
  Link,
  Paper,
  Avatar,
  Snackbar,
  Alert,
  Stack,
} from "@mui/material";
import {
  CloudUpload as CloudUploadIcon,
  Add,
  Description,
  Close,
  ExpandMore,
  Delete,
  CheckCircle,
  Error as ErrorIcon,
} from "@mui/icons-material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import ImageIcon from "@mui/icons-material/Image";
import DashboardIcon from "@mui/icons-material/Dashboard";
export default function MedicalImaging() {
  const fileInputRef = useRef(null);
  const [uploadingFiles, setUploadingFiles] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([
    {
      id: 1,
      name: "Chest_Xray_Pa.jpg",
      uploadedAt: "2 hours ago",
      src: "public/assets/schudle/image 217.png",
    },
    {
      id: 2,
      name: "Brain_MRI_Sequenc...",
      uploadedAt: "2 hours ago",
      isDicom: true,
      src: "public/assets/schudle/image 1.png",
    },
    {
      id: 3,
      name: "Dental_Pano.png",
      uploadedAt: "4 hours ago",
      src: "public/assets/schudle/image 218.png",
    },
    {
      id: 4,
      name: "Biopsy_slide_04.jpg",
      uploadedAt: "9 hours ago",
      src: "public/assets/schudle/image 219.png",
    },
  ]);
  const [isDragging, setIsDragging] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/jpg",
    "application/dicom",
  ];
  const maxSize = 50 * 1024 * 1024; // 50MB

  const showSnackbar = (message, severity = "success") => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const validateFile = (file) => {
    if (!allowedTypes.includes(file.type)) {
      return {
        valid: false,
        error: `Invalid file type: ${file.name}. Only JPEG, PNG, and DICOM files are allowed.`,
      };
    }
    if (file.size > maxSize) {
      return {
        valid: false,
        error: `File too large: ${file.name}. Maximum size is 50MB.`,
      };
    }
    return { valid: true };
  };

  const simulateUpload = (file) => {
    return new Promise((resolve) => {
      const uploadId = Date.now() + Math.random();
      const newFile = {
        id: uploadId,
        file,
        name: file.name,
        progress: 0,
        status: "uploading",
      };

      setUploadingFiles((prev) => [...prev, newFile]);

      // Simulate upload progress
      const interval = setInterval(() => {
        setUploadingFiles((prev) =>
          prev.map((f) => {
            if (f.id === uploadId) {
              const newProgress = Math.min(
                f.progress + Math.random() * 15,
                100
              );
              if (newProgress >= 100) {
                clearInterval(interval);
                return { ...f, progress: 100, status: "completed" };
              }
              return { ...f, progress: newProgress };
            }
            return f;
          })
        );
      }, 300);

      // Complete upload after 2-3 seconds
      setTimeout(() => {
        clearInterval(interval);
        setUploadingFiles((prev) => {
          const completedFile = prev.find((f) => f.id === uploadId);
          if (completedFile) {
            // Create preview URL for images
            const previewUrl = file.type.startsWith("image/")
              ? URL.createObjectURL(file)
              : null;

            setUploadedImages((images) => [
              ...images,
              {
                id: uploadId,
                name: file.name,
                uploadedAt: "Just now",
                isDicom: file.type === "application/dicom",
                src:
                  previewUrl ||
                  "https://via.placeholder.com/400x300?text=DICOM+File",
              },
            ]);
            showSnackbar(`${file.name} uploaded successfully!`);
          }
          return prev.filter((f) => f.id !== uploadId);
        });
      }, 2000 + Math.random() * 1000);
    });
  };

  const handleFiles = async (files) => {
    const fileArray = Array.from(files);

    for (const file of fileArray) {
      const validation = validateFile(file);
      if (!validation.valid) {
        showSnackbar(validation.error, "error");
        continue;
      }

      try {
        await simulateUpload(file);
      } catch (error) {
        showSnackbar(`Failed to upload ${file.name}`, "error");
      }
    }
  };

  const handleInputChange = (event) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      handleFiles(files);
    }
    // Reset input so same file can be selected again
    event.target.value = "";
  };

  const handleClickUpload = () => {
    fileInputRef.current?.click();
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      handleFiles(files);
    }
  };

  const handleRemoveUploading = (id) => {
    setUploadingFiles((prev) => prev.filter((f) => f.id !== id));
  };

  //   const handleDeleteImage = (id) => {
  //     setUploadedImages((prev) => {
  //       const image = prev.find((img) => img.id === id);
  //       if (image?.src?.startsWith('blob:')) {
  //         URL.revokeObjectURL(image.src);
  //       }
  //       return prev.filter((img) => img.id !== id);
  //     });
  //     showSnackbar('Image deleted successfully');
  //   };

  const handleViewImage = (image) => {
    window.open(image.src, "_blank");
  };

  return (
    <Box sx={{ p: 3, bgcolor: "#f5f7fa", minHeight: "100vh" }}>
      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept=".jpg,.jpeg,.png,.dicom,application/dicom"
        style={{ display: "none" }}
        onChange={handleInputChange}
      />

      {/* Breadcrumb */}
      <Breadcrumbs sx={{ mb: 2, fontSize: "14px" }}>
        <Link
          color="inherit"
          href="#"
          underline="hover"
          sx={{ fontSize: "14px" }}
        >
          Appointments
        </Link>
        <Typography color="text.primary" sx={{ fontSize: "14px" }}>
          Patient Details
        </Typography>
      </Breadcrumbs>

      {/* Header Section */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="start"
        mb={3}
      >
        <Box>
          <Typography variant="h4" fontWeight={600} mb={0.5}>
            Medical Imaging
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage patient scans, X-rays, and DICOM files for Appt #48291
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={handleClickUpload}
          sx={{
            bgcolor: "#5cb998",
            textTransform: "none",
            borderRadius: 1,
            px: 2,
            py: 1,
            color: "white",
            fontSize: "14px",
            fontWeight: 500,
            "&:hover": {
              bgcolor: "#4caf8a",
            },
          }}
        >
          Upload Image
        </Button>
      </Box>

      {/* Main Container */}
      <Paper
        elevation={0}
        sx={{
          p: 3,
          borderRadius: 2,
          border: "1px solid #e9ecef",
          bgcolor: "white",
        }}
      >
        {/* Upload Area */}
        <Box
          onClick={handleClickUpload}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          sx={{
            border: `2px dashed ${isDragging ? "#5cb998" : "#d1e7dd"}`,
            borderRadius: 2,
            p: 6,
            textAlign: "center",
            mb: 3,
            cursor: "pointer",
            transition: "all 0.2s ease",
            bgcolor: isDragging ? "#f0f9f4" : "transparent",
            "&:hover": {
              border: "2px dashed #5cb998",
              bgcolor: "#f8f9fa",
            },
          }}
        >
          <Avatar
            sx={{
              width: 56,
              height: 56,
              bgcolor: "#d1fae5",
              color: "#5cb998",
              mx: "auto",
              mb: 2,
            }}
          >
            <CloudUploadIcon sx={{ fontSize: 28 }} />
          </Avatar>
          <Typography variant="h6" fontWeight={600} mb={1}>
            Click or drag file to this area to upload
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={0.5}>
            Support for a single or bulk upload. Strictly prohibited from
            uploading company data or other banned files.
          </Typography>
          <Typography variant="caption" color="text.secondary">
            JPEG, PNG, DICOM (max 50MB)
          </Typography>
        </Box>

        {/* Uploading Section */}
        {uploadingFiles.length > 0 && (
          <Box mb={4}>
            <Box display="flex" alignItems="center" gap={1} mb={1.5}>
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  bgcolor: "#5cb998",
                  animation: "pulse 1.5s ease-in-out infinite",
                  "@keyframes pulse": {
                    "0%": { opacity: 1 },
                    "50%": { opacity: 0.5 },
                    "100%": { opacity: 1 },
                  },
                }}
              />
              <Typography variant="body2" fontWeight={500} fontSize="13px">
                Uploading ({uploadingFiles.length})
              </Typography>
            </Box>
            {uploadingFiles.map((uploadingFile) => (
              <Box
                key={uploadingFile.id}
                sx={{
                  p: 1.5,
                  borderRadius: 1,
                  bgcolor: "#f8f9fa",
                  border: "1px solid #e9ecef",
                  mb: 1,
                }}
              >
                <Box display="flex" alignItems="center" gap={2}>
                  <Description sx={{ color: "#6c757d", fontSize: 20 }} />
                  <Box flex={1}>
                    <Typography
                      variant="body2"
                      fontWeight={400}
                      mb={0.5}
                      fontSize="13px"
                    >
                      {uploadingFile.name}
                    </Typography>
                    <Box sx={{ position: "relative", width: "100%" }}>
                      <LinearProgress
                        variant="determinate"
                        value={uploadingFile.progress}
                        sx={{
                          height: 6,
                          borderRadius: 3,
                          bgcolor: "#e9ecef",
                          "& .MuiLinearProgress-bar": {
                            bgcolor:
                              uploadingFile.progress === 100
                                ? "#5cb998"
                                : "#5cb998",
                            borderRadius: 3,
                            transition: "width 0.3s ease",
                          },
                        }}
                      />
                    </Box>
                  </Box>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    mr={2}
                    fontSize="13px"
                    minWidth={40}
                    textAlign="right"
                  >
                    {Math.round(uploadingFile.progress)}%
                  </Typography>
                  <IconButton
                    size="small"
                    onClick={() => handleRemoveUploading(uploadingFile.id)}
                    sx={{ color: "#adb5bd" }}
                  >
                    <Close fontSize="small" />
                  </IconButton>
                </Box>
              </Box>
            ))}
          </Box>
        )}

        {/* Gallery Section */}
        <Box>
          <Typography variant="h6" fontWeight={600} mb={2.5} fontSize="16px">
            Gallery
          </Typography>
          {uploadedImages.length === 0 ? (
            <Box
              sx={{
                p: 6,
                textAlign: "center",
                border: "2px dashed #e9ecef",
                borderRadius: 2,
              }}
            >
              <ImageIcon sx={{ fontSize: 48, color: "#dee2e6", mb: 2 }} />
              <Typography variant="body1" color="text.secondary">
                No images uploaded yet
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Upload medical images to get started
              </Typography>
            </Box>
          ) : (
            <>
              <Grid container spacing={5}>
                {uploadedImages.map((image) => (
                  <Grid item xs={12} sm={6} md={3} key={image.id}>
                    <Card
                      sx={{
                        borderRadius: 1,
                        border: "1px solid #e9ecef",
                        overflow: "hidden",
                        transition: "all 0.2s ease",
                        "&:hover": {
                          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                        },
                      }}
                    >
                      <Box sx={{ position: "relative" }}>
                        <CardMedia
                          component="img"
                          height="180"
                          image={image.src}
                          alt={image.name}
                          sx={{
                            objectFit: "cover",
                          }}
                        />
                        {image.isDicom && (
                          <>
                            {/* <Chip
                              label="Dicom"
                              size="small"
                              sx={{
                                position: "absolute",
                                top: 8,
                                left: 8,
                                bgcolor: "#5cb998",
                                color: "white",
                                fontSize: "11px",
                                fontWeight: 500,
                                height: 22,
                              }}
                            /> */}
                            <Stack
                              direction={"row"}
                              sx={{
                                position: "absolute",
                                top: 8,
                                left: 8,
                                bgcolor: "#5cb998",
                                color: "white",
                                fontSize: "11px",
                                fontWeight: 500,
                                borderRadius: "5px",
                                width: "76px",
                                height: "24px",
                                justifyContent: "center",
                                alignItems: "center",
                                p: 0.2,
                              }}
                            >
                              <DashboardIcon size="small" />
                              <Typography>Dicom</Typography>
                            </Stack>
                          </>
                        )}
                        {/* <Box
                          sx={{
                            position: 'absolute',
                            top: 8,
                            right: 8,
                            display: 'flex',
                            gap: 0.5,
                          }}
                        >
                          <IconButton
                            size="small"
                            onClick={() => handleViewImage(image)}
                            sx={{
                              bgcolor: 'rgba(255, 255, 255, 0.9)',
                              color: '#5cb998',
                              width: 28,
                              height: 28,
                              '&:hover': {
                                bgcolor: 'white',
                              },
                            }}
                          >
                            <Visibility fontSize="small" />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() => handleDeleteImage(image.id)}
                            sx={{
                              bgcolor: 'rgba(255, 255, 255, 0.9)',
                              color: '#dc3545',
                              width: 28,
                              height: 28,
                              '&:hover': {
                                bgcolor: 'white',
                              },
                            }}
                          >
                            <Delete fontSize="small" />
                          </IconButton>
                        </Box> */}
                      </Box>
                      <CardContent sx={{ p: 1.5 }}>
                        <Stack
                          direction={"row"}
                          sx={{
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <Box>
                            <Typography
                              variant="body2"
                              fontWeight={500}
                              mb={0.5}
                              fontSize="13px"
                              noWrap
                            >
                              {image.name}
                            </Typography>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                              fontSize="12px"
                            >
                              Uploaded {image.uploadedAt}
                            </Typography>
                          </Box>
                          {image.isDicom ? (
                            <IconButton
                              size="small"
                              onClick={() => handleViewImage(image)}
                              sx={{
                                bgcolor: "rgba(255, 255, 255, 0.9)",
                                color: "#5cb998",
                                width: 28,
                                height: 28,
                                "&:hover": {
                                  bgcolor: "white",
                                },
                              }}
                            >
                              <VisibilityOutlinedIcon fontSize="small" />
                            </IconButton>
                          ) : (
                            ""
                          )}
                        </Stack>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>

              {/* Load More Button */}
              <Box display="flex" justifyContent="center" mt={3}>
                <Button
                  endIcon={<ExpandMore />}
                  sx={{
                    color: "#5cb998",
                    textTransform: "none",
                    fontWeight: 500,
                    fontSize: "14px",
                    "&:hover": {
                      bgcolor: "transparent",
                      color: "#4caf8a",
                    },
                  }}
                >
                  Load More Images
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Paper>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
          icon={
            snackbar.severity === "success" ? <CheckCircle /> : <ErrorIcon />
          }
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
