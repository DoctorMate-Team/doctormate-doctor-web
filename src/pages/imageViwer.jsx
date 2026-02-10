import { Circle, HPlusMobiledataRounded } from "@mui/icons-material";
import NavBar from "./navBar";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";

export default function ImageViewer() {
  return (
    <Stack direction="row" sx={{ width: "100%" }}>
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
        {/* Header */}
        <Typography variant="h6" mb={2}>
          DICOM Viewer
        </Typography>

        {/* Menu */}
        <Stack direction="row" spacing={1} mb={2}>
          <Button size="small">File</Button>
          <Button size="small">Edit</Button>
          <Button size="small">Image</Button>
          <Button size="small">View</Button>
        </Stack>

        <Grid container spacing={2}>
          {/* Viewer Area */}
          <Grid xs={12} md={8}>
            <Box
              sx={{
                height: "600px",
                backgroundColor: "#000",
                borderRadius: 2,
                overflow: "hidden",
              }}
            >
              <iframe
                src="https://viewer.ohif.org/viewer?StudyInstanceUID=1.2.840.113619.2.55.3.604688.109"
                title="OHIF Viewer"
                style={{
                  width: "100%",
                  height: "100%",
                  border: "none",
                }}
              />
            </Box>
          </Grid>

          {/* Patient Info */}
          <Grid xs={12} md={4}>
            <Stack spacing={2}>
              <Box>
                {["Name", "Age", "Gender", "Study", "Date"].map((item, i) => (
                  <Stack direction="row" spacing={1} key={i} alignItems="center">
                    <HPlusMobiledataRounded fontSize="small" />
                    <Typography>{item}: John Doe</Typography>
                  </Stack>
                ))}
              </Box>

              <Button variant="contained">
                View patient profile
              </Button>
            </Stack>
          </Grid>
        </Grid>

        {/* Tools Bar (UI فقط) */}
        <Stack direction="row" spacing={3} mt={3}>
          {["Level", "Zoom", "Measure", "Pan", "Reset"].map((tool, i) => (
            <Stack key={i} alignItems="center">
              <Circle fontSize="small" />
              <Typography variant="caption">{tool}</Typography>
            </Stack>
          ))}
        </Stack>
      </Box>
    </Stack>
  );
}
