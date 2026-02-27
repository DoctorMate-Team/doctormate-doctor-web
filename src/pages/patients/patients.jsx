// import React from "react";
// import {
//   Box,
//   Grid,
//   Paper,
//   Typography,
//   Avatar,
//   Chip,
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableRow,
//   TableContainer,
//   Card,
//   CardContent,
//   Button,
//   List,
//   ListItem,
//   ListItemText,
//   ListItemAvatar,
//   Divider,
//   IconButton,
//   Badge,
//   useTheme,
//   alpha,
// } from "@mui/material";
// import {
//   Phone as PhoneIcon,
//   Email as EmailIcon,
//   PictureAsPdf as PdfIcon,
//   Add as AddIcon,
//   Folder as FolderIcon,
//   CheckCircle as CheckCircleIcon,
//   AccessTime as AccessTimeIcon,
//   Cancel as CancelIcon,
// } from "@mui/icons-material";

// const Patients = () => {
//   const theme = useTheme();
//   // البيانات الوهمية
//   const patientData = {
//     name: "Sara Adam",
//     id: "ID: #PT-2024-8947",
//     age: "34 Years",
//     bloodType: "A+",
//     lastVisit: "Mar 15, 2024",
//     phone: "+1 (555) 123-4567",
//     email: "sarah@email.com",
//   };

//   const medicalRecords = [
//     { title: "Blood Test Results", date: "Mar 12, 2024", size: "2.4 MB" },
//     { title: "Cardiology Report", date: "Feb 28, 2024", size: "1.8 MB" },
//     {
//       title: "Lab Results - Lipid Panel",
//       date: "Feb 15, 2025",
//       size: "1.2 MB",
//     },
//     { title: "Vaccination Record", date: "Jan 20, 2024", size: "856 KB" },
//   ];

//   const diagnoses = [
//     {
//       title: "Hypertension (Stage 1)",
//       date: "Mar 15, 2025",
//       doctor: "Dr. Michael Chen",
//       description:
//         "Diagnosed by Dr. Michael Chen. Requires under medication management.",
//     },
//     {
//       title: "Type 2 Diabetes Mellitus",
//       date: "Feb 28, 2025",
//       doctor: "Dr. Emily Roberts",
//       description:
//         "Diagnosed by Dr. Emily Roberts. HbA1c: 7.2%. Diet and lifestyle modifications recommended.",
//     },
//     {
//       title: "Seasonal Allergic Rhinitis",
//       date: "Jan 22, 2024",
//       doctor: "Dr. Sarah Williams",
//       description:
//         "Diagnosed by Dr. Sarah Williams. Managed with antihistamines during spring season.",
//     },
//   ];

//   const prescriptions = [
//     {
//       name: "Lisinopril",
//       dosage: "10mg - Once daily",
//       status: "Active",
//       prescribed: "Mar 15, 2024",
//       refills: "3 remaining",
//       doctor: "Dr. Chen",
//     },
//     {
//       name: "Metformin",
//       dosage: "500mg - Twice daily",
//       status: "Active",
//       prescribed: "Mar 15, 2025",
//       refills: "5 remaining",
//       doctor: "Dr. Roberts",
//     },
//     {
//       name: "Atorvastatin",
//       dosage: "20mg - Once daily",
//       status: "Active",
//       prescribed: "Mar 24, 2024",
//       refills: "2 remaining",
//       doctor: "Dr. Chen",
//     },
//     {
//       name: "Cetirizine",
//       dosage: "10mg - As needed",
//       status: "Completed",
//       prescribed: "Jan 22, 2024",
//       refills: "0 remaining",
//       doctor: "Dr. Williams",
//     },
//   ];

//   return (
//     <Box sx={{ backgroundColor: "#f5f5f5", minHeight: "100vh", p: 3 }}>
//       <Grid container spacing={3}>
//         {/* Sidebar - Patient Info */}
//         <Grid size={{ xs: 12, md: 4 }}>
//           <Paper sx={{ p: 3, textAlign: "center", width: "100%" }}>
//             <Box sx={{ position: "relative", display: "inline-block", mb: 2 }}>
//               <Badge
//                 overlap="circular"
//                 anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
//                 badgeContent={
//                   <Box
//                     sx={{
//                       width: 20,
//                       height: 20,
//                       bgcolor: "success.main",
//                       borderRadius: "50%",
//                       border: "2px solid white",
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                     }}
//                   >
//                     <CheckCircleIcon sx={{ fontSize: 12, color: "white" }} />
//                   </Box>
//                 }
//               >
//                 <Avatar
//                   src="https://i.pravatar.cc/150?img=5"
//                   sx={{ width: 120, height: 120, mx: "auto" }}
//                 />
//               </Badge>
//             </Box>

//             <Typography variant="h5" fontWeight="bold" gutterBottom>
//               {patientData.name}
//             </Typography>
//             <Typography variant="body2" color="text.secondary" gutterBottom>
//               {patientData.id}
//             </Typography>

//             <Divider sx={{ my: 3 }} />

//             <Box sx={{ textAlign: "left" }}>
//               <Box sx={{ mb: 2 }}>
//                 <Typography variant="caption" color="text.secondary">
//                   Age
//                 </Typography>
//                 <Typography variant="body1" fontWeight="medium" align="right">
//                   {patientData.age}
//                 </Typography>
//               </Box>

//               <Box sx={{ mb: 2 }}>
//                 <Typography variant="caption" color="text.secondary">
//                   Blood Type
//                 </Typography>
//                 <Typography
//                   variant="body1"
//                   fontWeight="medium"
//                   align="right"
//                   color="error.main"
//                 >
//                   {patientData.bloodType}
//                 </Typography>
//               </Box>

//               <Box sx={{ mb: 2 }}>
//                 <Typography variant="caption" color="text.secondary">
//                   Allergies
//                 </Typography>
//                 <Box sx={{ display: "flex", gap: 1, mt: 0.5 }}>
//                   <Box
//                     sx={{
//                       width: "100%",
//                       height: 24,
//                       bgcolor: alpha(theme.palette.error.main, 0.1),
//                       borderRadius: 1,
//                     }}
//                   />
//                   <Box
//                     sx={{
//                       width: "100%",
//                       height: 24,
//                       bgcolor: alpha(theme.palette.error.main, 0.1),
//                       borderRadius: 1,
//                     }}
//                   />
//                 </Box>
//               </Box>

//               <Box sx={{ mb: 3 }}>
//                 <Typography variant="caption" color="text.secondary">
//                   Last visit
//                 </Typography>
//                 <Typography variant="body1" fontWeight="medium" align="right">
//                   {patientData.lastVisit}
//                 </Typography>
//               </Box>
//             </Box>

//             <Divider sx={{ my: 2 }} />

//             <Box sx={{ textAlign: "left" }}>
//               <ListItem sx={{ px: 0 }}>
//                 <ListItemAvatar>
//                   <Box
//                     sx={{
//                       width: 40,
//                       height: 40,
//                       borderRadius: "50%",
//                       bgcolor: alpha(theme.palette.primary.main, 0.1),
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                     }}
//                   >
//                     <PhoneIcon sx={{ color: "primary.main", fontSize: 20 }} />
//                   </Box>
//                 </ListItemAvatar>
//                 <ListItemText primary="Phone" secondary={patientData.phone} />
//               </ListItem>

//               <ListItem sx={{ px: 0 }}>
//                 <ListItemAvatar>
//                   <Box
//                     sx={{
//                       width: 40,
//                       height: 40,
//                       borderRadius: "50%",
//                       bgcolor: alpha(theme.palette.primary.main, 0.1),
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                     }}
//                   >
//                     <EmailIcon sx={{ color: "primary.main", fontSize: 20 }} />
//                   </Box>
//                 </ListItemAvatar>
//                 <ListItemText primary="Email" secondary={patientData.email} />
//               </ListItem>
//             </Box>
//           </Paper>
//         </Grid>
//         <Grid size={{ xs: 12, md: 4 }}>
//           {/* Appointment History */}
//           <Paper sx={{ p: 3, width: "100%" }}>
//             <Box
//               sx={{
//                 display: "flex",
//                 justifyContent: "space-between",
//                 alignItems: "center",
//                 mb: 2,
//               }}
//             >
//               <Typography variant="h6" fontWeight="bold">
//                 Appointment History
//               </Typography>
//               <Button size="small" sx={{ color: "primary.main" }}>
//                 View All
//               </Button>
//             </Box>

//             <TableContainer>
//               <Table size="small">
//                 <TableHead>
//                   <TableRow>
//                     <TableCell
//                       sx={{ fontWeight: "bold", color: "text.secondary" }}
//                     >
//                       DATE
//                     </TableCell>
//                     <TableCell
//                       sx={{ fontWeight: "bold", color: "text.secondary" }}
//                     >
//                       DOCTOR
//                     </TableCell>
//                     <TableCell
//                       sx={{ fontWeight: "bold", color: "text.secondary" }}
//                     >
//                       TYPE
//                     </TableCell>
//                     <TableCell
//                       sx={{ fontWeight: "bold", color: "text.secondary" }}
//                     >
//                       STATUS
//                     </TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {appointments.map((apt, index) => (
//                     <TableRow key={index} hover>
//                       <TableCell>{apt.date}</TableCell>
//                       <TableCell>{apt.doctor}</TableCell>
//                       <TableCell>{apt.type}</TableCell>
//                       <TableCell>
//                         <Chip
//                           label={apt.status}
//                           size="small"
//                           sx={{
//                             bgcolor: getStatusColor(apt.status).bg,
//                             color: getStatusColor(apt.status).color,
//                             fontWeight: 500,
//                           }}
//                         />
//                       </TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//           </Paper>
//           {/* Medical Images */}
//           <Paper sx={{ p: 3, width: "100%" }}>
//             <Box
//               sx={{
//                 display: "flex",
//                 justifyContent: "space-between",
//                 alignItems: "center",
//                 mb: 2,
//               }}
//             >
//               <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//                 <Box
//                   sx={{
//                     width: 28,
//                     height: 28,
//                     borderRadius: 1,
//                     bgcolor: "primary.main",
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                   }}
//                 >
//                   <FolderIcon sx={{ color: "white", fontSize: 16 }} />
//                 </Box>
//                 <Typography variant="h6" fontWeight="bold">
//                   Medical Images
//                 </Typography>
//               </Box>
//               <Button size="small" sx={{ color: "primary.main" }}>
//                 View All
//               </Button>
//             </Box>

//             <Box sx={{ display: "flex", gap: 2 }}>
//               <Box
//                 sx={{
//                   flex: 1,
//                   height: 140,
//                   borderRadius: 2,
//                   bgcolor: "#000",
//                   backgroundImage:
//                     'url("https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=400")',
//                   backgroundSize: "cover",
//                   backgroundPosition: "center",
//                   position: "relative",
//                   overflow: "hidden",
//                 }}
//               >
//                 <Box
//                   sx={{
//                     position: "absolute",
//                     bottom: 0,
//                     left: 0,
//                     right: 0,
//                     p: 1,
//                     bgcolor: alpha("#000", 0.7),
//                     color: "white",
//                     textAlign: "center",
//                     fontSize: "0.75rem",
//                   }}
//                 >
//                   Chest X-Ray
//                 </Box>
//               </Box>

//               <Box
//                 sx={{
//                   flex: 1,
//                   height: 140,
//                   borderRadius: 2,
//                   bgcolor: "#000",
//                   backgroundImage:
//                     'url("https://images.unsplash.com/photo-1559757175-5700dde675bc?w=400")',
//                   backgroundSize: "cover",
//                   backgroundPosition: "center",
//                   position: "relative",
//                   overflow: "hidden",
//                 }}
//               >
//                 <Box
//                   sx={{
//                     position: "absolute",
//                     bottom: 0,
//                     left: 0,
//                     right: 0,
//                     p: 1,
//                     bgcolor: alpha("#000", 0.7),
//                     color: "white",
//                     textAlign: "center",
//                     fontSize: "0.75rem",
//                   }}
//                 >
//                   MRI Brain
//                 </Box>
//               </Box>

//               <Box
//                 sx={{
//                   flex: 1,
//                   height: 140,
//                   borderRadius: 2,
//                   bgcolor: "#000",
//                   backgroundImage:
//                     'url("https://images.unsplash.com/photo-1579154204601-01588f351e67?w=400")',
//                   backgroundSize: "cover",
//                   backgroundPosition: "center",
//                   position: "relative",
//                   overflow: "hidden",
//                 }}
//               >
//                 <Box
//                   sx={{
//                     position: "absolute",
//                     bottom: 0,
//                     left: 0,
//                     right: 0,
//                     p: 1,
//                     bgcolor: alpha("#000", 0.7),
//                     color: "white",
//                     textAlign: "center",
//                     fontSize: "0.75rem",
//                   }}
//                 >
//                   CT Scan
//                 </Box>
//               </Box>
//             </Box>
//           </Paper>
//         </Grid>
//         {/* Main Content */}
//         <Grid size={{ xs: 12, md: 4 }}>
//           {/* Medical Records */}
//           <Paper sx={{ p: 3, width: "100%" }}>
//             <Box
//               sx={{
//                 display: "flex",
//                 justifyContent: "space-between",
//                 alignItems: "center",
//                 mb: 2,
//               }}
//             >
//               <Typography variant="h6" fontWeight="bold">
//                 Medical Records
//               </Typography>
//               <Button
//                 variant="outlined"
//                 size="small"
//                 startIcon={<FolderIcon />}
//                 sx={{ color: "primary.main", borderColor: "primary.main" }}
//               >
//                 Upload file
//               </Button>
//             </Box>

//             <Grid container spacing={2}>
//               {medicalRecords.map((record, index) => (
//                 <Grid item xs={6} key={index}>
//                   <Card
//                     sx={{
//                       bgcolor: alpha(theme.palette.primary.main, 0.03),
//                       border: "1px solid",
//                       borderColor: alpha(theme.palette.primary.main, 0.1),
//                       "&:hover": {
//                         boxShadow: theme.shadows[4],
//                       },
//                     }}
//                   >
//                     <CardContent sx={{ p: 2 }}>
//                       <Box
//                         sx={{
//                           display: "flex",
//                           alignItems: "flex-start",
//                           gap: 1.5,
//                         }}
//                       >
//                         <Box
//                           sx={{
//                             width: 40,
//                             height: 40,
//                             borderRadius: 1,
//                             bgcolor: alpha(theme.palette.error.main, 0.1),
//                             display: "flex",
//                             alignItems: "center",
//                             justifyContent: "center",
//                           }}
//                         >
//                           <PdfIcon sx={{ color: "error.main", fontSize: 24 }} />
//                         </Box>
//                         <Box>
//                           <Typography
//                             variant="body2"
//                             fontWeight="medium"
//                             noWrap
//                           >
//                             {record.title}
//                           </Typography>
//                           <Typography variant="caption" color="text.secondary">
//                             {record.date} • {record.size}
//                           </Typography>
//                         </Box>
//                       </Box>
//                     </CardContent>
//                   </Card>
//                 </Grid>
//               ))}
//             </Grid>
//           </Paper>
//           {/* Diagnoses History */}
//           <Paper sx={{ p: 3, width: "100%" }}>
//             <Typography variant="h6" fontWeight="bold" gutterBottom>
//               Diagnoses History
//             </Typography>

//             <List sx={{ p: 0 }}>
//               {diagnoses.map((diag, index) => (
//                 <React.Fragment key={index}>
//                   <ListItem sx={{ px: 0, py: 2 }}>
//                     <ListItemAvatar>
//                       <Box
//                         sx={{
//                           width: 12,
//                           height: 12,
//                           borderRadius: "50%",
//                           bgcolor: "primary.main",
//                         }}
//                       />
//                     </ListItemAvatar>
//                     <ListItemText
//                       primary={
//                         <Box
//                           sx={{
//                             display: "flex",
//                             justifyContent: "space-between",
//                             alignItems: "center",
//                           }}
//                         >
//                           <Typography variant="body1" fontWeight="medium">
//                             {diag.title}
//                           </Typography>
//                           <Typography variant="caption" color="text.secondary">
//                             {diag.date}
//                           </Typography>
//                         </Box>
//                       }
//                       secondary={
//                         <Typography
//                           variant="body2"
//                           color="text.secondary"
//                           sx={{ mt: 0.5 }}
//                         >
//                           {diag.description}
//                         </Typography>
//                       }
//                     />
//                   </ListItem>
//                   {index < diagnoses.length - 1 && <Divider />}
//                 </React.Fragment>
//               ))}
//             </List>
//           </Paper>
//         </Grid>
//         <Grid size={{ xs: 12}}>
//           {/* Current Prescriptions */}
//           <Paper sx={{ p: 3,width: "100%" }}>
//             <Box
//               sx={{
//                 display: "flex",
//                 justifyContent: "space-between",
//                 alignItems: "center",
//                 mb: 3,
//               }}
//             >
//               <Typography variant="h6" fontWeight="bold">
//                 Current Prescriptions
//               </Typography>
//               <Button
//                 variant="contained"
//                 startIcon={<AddIcon />}
//                 sx={{
//                   bgcolor: "primary.main",
//                   "&:hover": { bgcolor: "primary.dark" },
//                 }}
//               >
//                 New Prescriptions
//               </Button>
//             </Box>

//             <Grid container spacing={3}>
//               {prescriptions.map((pres, index) => (
//                 <Grid item xs={12} sm={6} md={3} key={index}>
//                   <Card
//                     sx={{
//                       height: "100%",
//                       border: "1px solid",
//                       borderColor: alpha(theme.palette.divider, 0.2),
//                       "&:hover": {
//                         boxShadow: theme.shadows[4],
//                       },
//                     }}
//                   >
//                     <CardContent sx={{ p: 2.5 }}>
//                       <Box
//                         sx={{
//                           display: "flex",
//                           justifyContent: "space-between",
//                           alignItems: "flex-start",
//                           mb: 2,
//                         }}
//                       >
//                         <Box>
//                           <Typography
//                             variant="h6"
//                             fontWeight="bold"
//                             gutterBottom
//                           >
//                             {pres.name}
//                           </Typography>
//                           <Typography variant="body2" color="text.secondary">
//                             {pres.dosage}
//                           </Typography>
//                         </Box>
//                         <Chip
//                           label={pres.status}
//                           size="small"
//                           sx={{
//                             bgcolor: getStatusColor(pres.status).bg,
//                             color: getStatusColor(pres.status).color,
//                             fontWeight: 500,
//                           }}
//                         />
//                       </Box>

//                       <Divider sx={{ my: 2 }} />

//                       <Box sx={{ mb: 1.5 }}>
//                         <Typography variant="caption" color="text.secondary">
//                           Prescribed:
//                         </Typography>
//                         <Typography variant="body2" align="right">
//                           {pres.prescribed}
//                         </Typography>
//                       </Box>

//                       <Box sx={{ mb: 1.5 }}>
//                         <Typography variant="caption" color="text.secondary">
//                           Refills:
//                         </Typography>
//                         <Typography variant="body2" align="right">
//                           {pres.refills}
//                         </Typography>
//                       </Box>

//                       <Box>
//                         <Typography variant="caption" color="text.secondary">
//                           Doctor:
//                         </Typography>
//                         <Typography variant="body2" align="right">
//                           {pres.doctor}
//                         </Typography>
//                       </Box>
//                     </CardContent>
//                   </Card>
//                 </Grid>
//               ))}
//             </Grid>
//           </Paper>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };
// export default Patients;
import NavBar from "../../components/navBar";
import {
  Box,
  Grid,
  Paper,
  Typography,
  Avatar,
  Button,
  Chip,
  Divider,
  TextField,
  Stack,
  Card,
  CardContent,
  Fade,
  IconButton,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Skeleton,
  Alert,
  alpha,
  useTheme,
} from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import UploadIcon from "@mui/icons-material/Upload";
import AddIcon from "@mui/icons-material/Add";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import ImageIcon from "@mui/icons-material/Image";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import LinkIcon from "@mui/icons-material/Link";
import VideocamIcon from "@mui/icons-material/Videocam";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import StickyNote2Icon from "@mui/icons-material/StickyNote2";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PersonIcon from "@mui/icons-material/Person";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import MedicalRecord from "../schedule/medicalRecord";
import AddPrescription from "../schedule/Modal/prescriptionModal";
import MedicalModal from "../schedule/Modal/MedicalModal";
import AddDiagnosis from "../schedule/Modal/diagnosis";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getPatientDetals } from "../../redux/schedule/appoinmantDetals";
import { useSelector, useDispatch } from "react-redux";
import { getAppDetById } from "../../redux/schedule/appoinmantDetals";
import { useContext } from "react";

const cardStyle = {
  p: 3,
  borderRadius: "20px",
  backgroundColor: "white",
  boxShadow: "0 4px 20px rgba(82, 172, 140, 0.15)",
  border: "1px solid rgba(82, 172, 140, 0.2)",
};

const statusConfig = {
  completed: {
    label: "Completed",
    bg: "linear-gradient(135deg, #E5E7EB 0%, #D1D5DB 100%)",
    color: "#6B7280",
  },
  inprogress: {
    label: "In Progress",
    bg: "linear-gradient(135deg, #D1FAE5 0%, #A7F3D0 100%)",
    color: "#10B981",
  },
  scheduled: {
    label: "Scheduled",
    bg: "linear-gradient(135deg, #DBEAFE 0%, #BFDBFE 100%)",
    color: "#3B82F6",
  },
  confirmed: {
    label: "Confirmed",
    bg: "linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)",
    color: "#F59E0B",
  },
  cancelled: {
    label: "Cancelled",
    bg: "linear-gradient(135deg, #FEE2E2 0%, #FECACA 100%)",
    color: "#EF4444",
  },
};

// ✅ تم تعديل الدالة لتقبل theme كـ parameter
const getStatusColor = (status, theme) => {
  switch (status) {
    case "Completed":
      return {
        bg: alpha(theme.palette.success.main, 0.1),
        color: theme.palette.success.main,
      };
    case "Scheduled":
      return {
        bg: alpha(theme.palette.info.main, 0.1),
        color: theme.palette.info.main,
      };
    case "No Show":
      return {
        bg: alpha(theme.palette.error.main, 0.1),
        color: theme.palette.error.main,
      };
    case "Active":
      return {
        bg: alpha(theme.palette.success.main, 0.1),
        color: theme.palette.success.main,
      };
    // ✅ تم حذف case "Completed" المكرر
    default:
      return {
        bg: alpha(theme.palette.grey[500], 0.1),
        color: theme.palette.grey[600],
      };
  }
};

export default function Patients() {
  const theme = useTheme(); // ✅ Hook inside component - صحيح
  const navigate = useNavigate();
  const [openAddPrescription, setopenAddPrescription] = useState(false);
  const [openMedicalModal, setOpenMedicalModal] = useState(false);
  const [openDiagnosis, setOpenDiagnosis] = useState(false);

  const selectedPatient = useSelector(
    (state) => state.schedule.selectedPatient
  );

  const appointments = [
    {
      date: "Mar 15, 2025",
      doctor: "Dr. Michael Chen",
      type: "Follow-up",
      status: "Completed",
    },
    {
      date: "Aug 20, 2025",
      doctor: "Dr. Emily Roberts",
      type: "Consultation",
      status: "Scheduled",
    },
    {
      date: "Feb 28, 2025",
      doctor: "Dr. Sarah Williams",
      type: "Check-up",
      status: "No Show",
    },
    {
      date: "Jan 22, 2025",
      doctor: "Dr. Sarah Williams",
      type: "Initial Visit",
      status: "Completed",
    },
    {
      date: "Apr 05, 2025",
      doctor: "Dr. Michael Chen",
      type: "Follow-up",
      status: "Scheduled",
    },
    {
      date: "Jan 22, 2025",
      doctor: "Dr. Sarah Williams",
      type: "Initial Visit",
      status: "Completed",
    },
    {
      date: "Feb 28, 2025",
      doctor: "Dr. Sarah Williams",
      type: "Check-up",
      status: "Completed",
    },
  ];

  const patientDetails = useSelector((state) => state.patientdet.datapatient);
  const appoinDetails = useSelector((state) => state.patientdet.dataApp);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPatientDetals({ id: selectedPatient?.patient?.id }));
    dispatch(getAppDetById({ id: selectedPatient?.id }));
  }, [selectedPatient]);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    const today = new Date();
    const isToday = date.toDateString() === today.toDateString();
    const formatted = date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
    return isToday ? `Today, ${formatted}` : formatted;
  };

  const formatTime = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const getStatusStyle = (status) => {
    return statusConfig[status?.toLowerCase()] || statusConfig.scheduled;
  };

  // Mockup DICOM data
  const mockupDicomImages = [
    {
      id: "dicom-1",
      fileName: "Brain MRI Scan",
      description: "Brain MRI with Contrast",
      viewerUrl: "/assets/dashboard/dicom/Rectangle 48.png",
      uploadDate: "2024-12-15",
      size: "2.4 MB",
      type: "MRI",
    },
    {
      id: "dicom-2",
      fileName: "Chest CT Scan",
      description: "Chest CT with IV Contrast",
      viewerUrl: "/assets/dashboard/dicom/Rectangle 49.png",
      uploadDate: "2024-12-12",
      size: "45.2 MB",
      type: "CT-Scan",
    },
    {
      id: "dicom-3",
      fileName: "Chest X-Ray",
      description: "Chest X-Ray PA View",
      viewerUrl: "/assets/dashboard/dicom/Rectangle 50.png",
      uploadDate: "2024-12-10",
      size: "128.7 MB",
      type: "X-Ray",
    },
    {
      id: "dicom-4",
      fileName: "Abdominal CT",
      description: "Abdominal CT Scan",
      viewerUrl: "/assets/dashboard/dicom/Rectangle 51.png",
      uploadDate: "2024-12-08",
      size: "38.5 MB",
      type: "CT-Scan",
    },
    {
      id: "dicom-5",
      fileName: "Spine MRI",
      description: "Lumbar Spine MRI",
      viewerUrl: "/assets/dashboard/dicom/Rectangle 52.png",
      uploadDate: "2024-12-05",
      size: "52.1 MB",
      type: "MRI",
    },
    {
      id: "dicom-6",
      fileName: "Knee X-Ray",
      description: "Bilateral Knee X-Ray",
      viewerUrl: "/assets/dashboard/dicom/Rectangle 54.png",
      uploadDate: "2024-12-01",
      size: "15.3 MB",
      type: "X-Ray",
    },
  ];

  const displayImages =
    appoinDetails?.data?.medicalImages?.length > 0
      ? appoinDetails.data.medicalImages
      : mockupDicomImages;

  const handleImageClick = (image) => {
    navigate("/dicom/imageViwer", {
      state: { image, allImages: displayImages },
    });
  };

  return (
    <>
      <AddPrescription
        openAddPrescription={openAddPrescription}
        setopenAddPrescription={setopenAddPrescription}
      />
      <MedicalModal
        openMedicalModal={openMedicalModal}
        SetopenMedicalModal={setOpenMedicalModal}
      />
      <AddDiagnosis
        openDiagnosis={openDiagnosis}
        setopenDiagnosis={setOpenDiagnosis}
      />
      <Stack direction="row">
        <NavBar />
        <Box
          sx={{
            backgroundColor: "#F5F7FA",
            padding: "20px",
            height: "100vh",
            overflowY: "auto",
            flex: 1,
          }}
        >
          {/* Header Card */}
          <Fade in timeout={500}>
            <Card
              sx={{
                mb: 3,
                borderRadius: "20px",
                boxShadow: "0 4px 20px rgba(82, 172, 140, 0.25)",
                background: "linear-gradient(135deg, #52AC8C 0%, #3D8B6F 100%)",
                color: "white",
                position: "relative",
                overflow: "hidden",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  right: 0,
                  width: "300px",
                  height: "300px",
                  borderRadius: "50%",
                  background: "rgba(255, 255, 255, 0.08)",
                  transform: "translate(30%, -50%)",
                },
              }}
            >
              <CardContent sx={{ p: 3, position: "relative", zIndex: 1 }}>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <IconButton
                      onClick={() => navigate(-1)}
                      sx={{
                        color: "white",
                        backgroundColor: "rgba(255,255,255,0.2)",
                        "&:hover": { backgroundColor: "rgba(255,255,255,0.3)" },
                      }}
                    >
                      <ArrowBackIcon />
                    </IconButton>
                    <Box>
                      <Typography variant="h5" fontWeight="700">
                        Appointment Details
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ opacity: 0.9, mt: 0.5 }}
                      >
                        Complete information about the appointment
                      </Typography>
                    </Box>
                  </Stack>
                  <Avatar
                    src={appoinDetails?.data?.doctorImage}
                    sx={{
                      width: 48,
                      height: 48,
                      border: "3px solid white",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                    }}
                  >
                    {appoinDetails?.data?.doctorName?.charAt(0) || "D"}
                  </Avatar>
                </Stack>
              </CardContent>
            </Card>
          </Fade>

          <Grid container spacing={1.5}>
            {/* LEFT COLUMN */}
            <Grid size={{ xs: 12, md: 4 }}>
              <Fade in timeout={600}>
                <Card
                  sx={{
                    ...cardStyle,
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  {/* Header Background */}
                  <Box
                    sx={{
                      background:
                        "linear-gradient(135deg, #52AC8C 0%, #3D8B6F 100%)",
                      width: "100%",
                      height: "120px",
                      position: "absolute",
                      top: 0,
                      left: 0,
                    }}
                  />
                  {/* Patient Avatar & Info */}
                  <Box
                    sx={{ textAlign: "center", position: "relative", pt: 2 }}
                  >
                    <Box
                      sx={{
                        width: "fit-content",
                        position: "relative",
                        mx: "auto",
                      }}
                    >
                      <Avatar
                        src={appoinDetails?.data?.patientImage}
                        sx={{
                          width: 120,
                          height: 120,
                          border: "4px solid white",
                          boxShadow: "0 4px 16px rgba(82, 172, 140, 0.3)",
                        }}
                      >
                        {appoinDetails?.data?.patientName?.charAt(0) || "P"}
                      </Avatar>
                      <CheckCircleIcon
                        sx={{
                          color: "primary.main",
                          fontSize: 32,
                          position: "absolute",
                          bottom: "4px",
                          right: "8px",
                          backgroundColor: "white",
                          borderRadius: "50%",
                        }}
                      />
                    </Box>
                    <Typography
                      mt={2}
                      variant="h4"
                      fontWeight="700"
                      color="primary.main"
                    >
                      {appoinDetails?.data?.patientName || "N/A"}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      fontWeight="500"
                      mt={0.5}
                    >
                      ID: #{appoinDetails?.data?.patientId?.slice(-6)}
                    </Typography>
                    <Stack
                      direction="row"
                      spacing={1}
                      mt={2}
                      justifyContent="center"
                      flexWrap="wrap"
                    >
                      <Chip
                        icon={<PersonIcon sx={{ fontSize: 16 }} />}
                        label={`${appoinDetails?.data?.patientAge}y`}
                        size="small"
                        sx={{
                          borderRadius: "8px",
                          fontWeight: 600,
                          bgcolor: "rgba(59, 130, 246, 0.1)",
                          color: "#3B82F6",
                          border: "1px solid #3B82F6",
                        }}
                      />
                      <Chip
                        label={appoinDetails?.data?.patientGender}
                        size="small"
                        sx={{
                          borderRadius: "8px",
                          fontWeight: 600,
                          bgcolor: "rgba(236, 72, 153, 0.1)",
                          color: "#EC4899",
                          border: "1px solid #EC4899",
                          textTransform: "capitalize",
                        }}
                      />
                      {patientDetails?.data?.basicInfo?.bloodType && (
                        <Chip
                          label={patientDetails?.data?.basicInfo?.bloodType}
                          size="small"
                          sx={{
                            borderRadius: "8px",
                            fontWeight: 600,
                            bgcolor: "rgba(139, 92, 246, 0.1)",
                            color: "#8B5CF6",
                            border: "1px solid #8B5CF6",
                          }}
                        />
                      )}
                    </Stack>
                  </Box>
                  <Divider sx={{ my: 3 }} />
                  {/* Contact Information */}
                  <Stack spacing={2}>
                    <Box
                      sx={{
                        backgroundColor: "rgba(82, 172, 140, 0.05)",
                        borderRadius: "12px",
                        p: 2,
                        border: "1px solid rgba(82, 172, 140, 0.2)",
                      }}
                    >
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Box
                          sx={{
                            width: 40,
                            height: 40,
                            borderRadius: "10px",
                            background:
                              "linear-gradient(135deg, #52AC8C 0%, #3D8B6F 100%)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <PhoneIcon sx={{ fontSize: 20, color: "white" }} />
                        </Box>
                        <Box>
                          <Typography
                            variant="caption"
                            color="text.secondary"
                            fontWeight="500"
                          >
                            Phone Number
                          </Typography>
                          <Typography
                            variant="body2"
                            fontWeight="600"
                            color="primary.main"
                          >
                            {appoinDetails?.data?.patientPhone || "N/A"}
                          </Typography>
                        </Box>
                      </Stack>
                    </Box>
                    <Box
                      sx={{
                        backgroundColor: "rgba(82, 172, 140, 0.05)",
                        borderRadius: "12px",
                        p: 2,
                        border: "1px solid rgba(82, 172, 140, 0.2)",
                      }}
                    >
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Box
                          sx={{
                            width: 40,
                            height: 40,
                            borderRadius: "10px",
                            background:
                              "linear-gradient(135deg, #52AC8C 0%, #3D8B6F 100%)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <EmailIcon sx={{ fontSize: 20, color: "white" }} />
                        </Box>
                        <Box>
                          <Typography
                            variant="caption"
                            color="text.secondary"
                            fontWeight="500"
                          >
                            Email Address
                          </Typography>
                          <Typography
                            variant="body2"
                            fontWeight="600"
                            color="primary.main"
                          >
                            {patientDetails?.data?.basicInfo?.email || "N/A"}
                          </Typography>
                        </Box>
                      </Stack>
                    </Box>
                    <Box
                      sx={{
                        backgroundColor: "rgba(82, 172, 140, 0.05)",
                        borderRadius: "12px",
                        p: 2,
                        border: "1px solid rgba(82, 172, 140, 0.2)",
                      }}
                    >
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Box
                          sx={{
                            width: 40,
                            height: 40,
                            borderRadius: "10px",
                            background:
                              "linear-gradient(135deg, #52AC8C 0%, #3D8B6F 100%)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <LocationOnIcon
                            sx={{ fontSize: 20, color: "white" }}
                          />
                        </Box>
                        <Box>
                          <Typography
                            variant="caption"
                            color="text.secondary"
                            fontWeight="500"
                          >
                            Location
                          </Typography>
                          <Typography
                            variant="body2"
                            fontWeight="600"
                            color="primary.main"
                          >
                            New York, NY
                          </Typography>
                        </Box>
                      </Stack>
                    </Box>
                  </Stack>
                </Card>
              </Fade>

              {/* Appointment History */}
              <Paper
                sx={{
                  p: 2,
                  mt: 2,
                  width: "100%",
                  borderRadius: "15px",
                  boxShadow: "0 4px 20px rgba(82, 172, 140, 0.15)",
                  height: "400px",
                  overflowY: "auto",
                  "&::-webkit-scrollbar": {
                    display: "none",
                  },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 2,
                  }}
                >
                  <Typography variant="h6" fontWeight="bold">
                    Appointment History
                  </Typography>
                  <Button size="small" sx={{ color: "primary.main" }}>
                    View All
                  </Button>
                </Box>
                <TableContainer>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell
                          sx={{
                            color: "#898989",
                            fontWeight: 600,
                            fontSize: "11px",
                          }}
                        >
                          DATE
                        </TableCell>
                        <TableCell
                          sx={{
                            color: "#898989",
                            fontWeight: 600,
                            fontSize: "11px",
                          }}
                        >
                          DOCTOR
                        </TableCell>
                        <TableCell
                          sx={{
                            color: "#898989",
                            fontWeight: 600,
                            fontSize: "11px",
                          }}
                        >
                          TYPE
                        </TableCell>
                        <TableCell
                          sx={{
                            color: "#898989",
                            fontWeight: 600,
                            fontSize: "11px",
                          }}
                        >
                          STATUS
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {appointments.map((apt, index) => (
                        <TableRow key={index} hover>
                          <TableCell
                            sx={{
                              fontSize: "10px",
                              fontWeight: "400",
                              padding: "2px 7px ",
                            }}
                          >
                            {apt.date}
                          </TableCell>
                          <TableCell
                            sx={{
                              fontSize: "11px",
                              fontWeight: "500",
                              color: "#898989",
                            }}
                          >
                            {apt.doctor}
                          </TableCell>
                          <TableCell
                            sx={{
                              fontSize: "11px",
                              fontWeight: "500",
                              color: "#898989",
                            }}
                          >
                            {apt.type}
                          </TableCell>
                          <TableCell>
                            <Chip
                              label={apt.status}
                              size="small"
                              sx={{
                                borderRadius: "8px",
                                bgcolor: getStatusColor(apt.status, theme).bg,
                                color: getStatusColor(apt.status, theme).color,
                                fontWeight: 400,
                                fontSize: "8px",
                              }}
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </Grid>

            {/* MIDDLE COLUMN */}
            <Grid size={{ xs: 12, md: 4 }}>
              <Fade in timeout={600}>
                <Stack spacing={3}>
                  {/* Medical Records Card */}
                  <Card sx={cardStyle}>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                      mb={3}
                    >
                      <Stack direction="row" spacing={1.5} alignItems="center">
                        <Box
                          sx={{
                            width: 36,
                            height: 36,
                            borderRadius: "10px",
                            background:
                              "linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <NoteAddIcon sx={{ color: "white", fontSize: 20 }} />
                        </Box>
                        <Typography
                          variant="h6"
                          fontWeight="700"
                          color="primary.main"
                        >
                          Medical Records
                        </Typography>
                      </Stack>
                      <Button
                        onClick={() => setOpenMedicalModal(true)}
                        startIcon={<AddIcon />}
                        sx={{
                          textTransform: "none",
                          color: "primary.main",
                          fontWeight: 600,
                          fontSize: "13px",
                          "&:hover": {
                            backgroundColor: "rgba(82, 172, 140, 0.05)",
                          },
                        }}
                      >
                        Add Record
                      </Button>
                    </Stack>
                    {appoinDetails?.data?.medicalRecord ? (
                      <Box
                        sx={{
                          p: 2.5,
                          background:
                            "linear-gradient(135deg, rgba(139, 92, 246, 0.05) 0%, rgba(139, 92, 246, 0.02) 100%)",
                          border: "1px solid rgba(139, 92, 246, 0.2)",
                          borderRadius: "12px",
                          transition: "all 0.3s ease",
                          "&:hover": {
                            transform: "translateY(-2px)",
                            boxShadow: "0 4px 16px rgba(139, 92, 246, 0.15)",
                          },
                        }}
                      >
                        <Typography
                          variant="body1"
                          fontWeight="700"
                          color="#8B5CF6"
                          mb={0.5}
                        >
                          {appoinDetails?.data?.medicalRecord?.title}
                        </Typography>
                        <Chip
                          label={appoinDetails?.data?.medicalRecord?.recordType}
                          size="small"
                          sx={{
                            height: "20px",
                            fontSize: "11px",
                            fontWeight: 600,
                            backgroundColor: "rgba(139, 92, 246, 0.1)",
                            color: "#8B5CF6",
                            border: "none",
                            textTransform: "capitalize",
                            mt: 0.5,
                          }}
                        />
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          fontWeight="500"
                          display="block"
                          mt={1.5}
                        >
                          Date:{" "}
                          {formatDate(
                            appoinDetails?.data?.medicalRecord?.recordDate
                          )}
                        </Typography>
                      </Box>
                    ) : (
                      <Box
                        sx={{
                          p: 3,
                          textAlign: "center",
                          backgroundColor: "rgba(82, 172, 140, 0.05)",
                          borderRadius: "12px",
                        }}
                      >
                        <Typography variant="body2" color="text.secondary">
                          No medical records added yet
                        </Typography>
                      </Box>
                    )}
                  </Card>

                  {/* Diagnoses */}
                  <Card sx={cardStyle}>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                      mb={3}
                    >
                      <Stack direction="row" spacing={1.5} alignItems="center">
                        <Box
                          sx={{
                            width: 36,
                            height: 36,
                            borderRadius: "10px",
                            background:
                              "linear-gradient(135deg, #52AC8C 0%, #3D8B6F 100%)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <MedicalServicesIcon
                            sx={{ color: "white", fontSize: 20 }}
                          />
                        </Box>
                        <Typography
                          variant="h6"
                          fontWeight="700"
                          color="primary.main"
                        >
                          Current Diagnoses
                        </Typography>
                      </Stack>
                      <Button
                        onClick={() => setOpenDiagnosis(true)}
                        startIcon={<AddIcon />}
                        sx={{
                          textTransform: "none",
                          color: "primary.main",
                          fontWeight: 600,
                          fontSize: "13px",
                          "&:hover": {
                            backgroundColor: "rgba(82, 172, 140, 0.05)",
                          },
                        }}
                      >
                        Add New
                      </Button>
                    </Stack>
                    {appoinDetails?.data?.diagnoses &&
                    appoinDetails?.data?.diagnoses.length > 0 ? (
                      appoinDetails?.data?.diagnoses.map((item, index) => (
                        <Box
                          key={item?.id}
                          sx={{
                            p: 2.5,
                            mb: 2,
                            background:
                              "linear-gradient(135deg, rgba(239, 68, 68, 0.05) 0%, rgba(239, 68, 68, 0.02) 100%)",
                            border: "1px solid rgba(239, 68, 68, 0.2)",
                            borderRadius: "12px",
                            position: "relative",
                            transition: "all 0.3s ease",
                            "&:hover": {
                              transform: "translateY(-2px)",
                              boxShadow: "0 4px 16px rgba(239, 68, 68, 0.15)",
                            },
                          }}
                        >
                          <Stack
                            direction="row"
                            justifyContent="space-between"
                            alignItems="flex-start"
                          >
                            <Box flex={1}>
                              <Typography
                                variant="body1"
                                fontWeight="700"
                                color="error.main"
                                mb={0.5}
                              >
                                {item.description}
                              </Typography>
                              {item.icdCode && (
                                <Chip
                                  label={`ICD: ${item.icdCode}`}
                                  size="small"
                                  sx={{
                                    height: "20px",
                                    fontSize: "11px",
                                    fontWeight: 600,
                                    backgroundColor: "rgba(239, 68, 68, 0.1)",
                                    color: "error.main",
                                    border: "none",
                                    mr: 1,
                                    mt: 0.5,
                                  }}
                                />
                              )}
                              {item.severity && (
                                <Chip
                                  label={item.severity}
                                  size="small"
                                  sx={{
                                    height: "20px",
                                    fontSize: "11px",
                                    fontWeight: 600,
                                    backgroundColor:
                                      item.severity === "High"
                                        ? "rgba(239, 68, 68, 0.2)"
                                        : "rgba(251, 191, 36, 0.2)",
                                    color:
                                      item.severity === "High"
                                        ? "error.main"
                                        : "#F59E0B",
                                    border: "none",
                                    mt: 0.5,
                                    textTransform: "capitalize",
                                  }}
                                />
                              )}
                              <Typography
                                variant="caption"
                                color="text.secondary"
                                fontWeight="500"
                                display="block"
                                mt={1.5}
                              >
                                Diagnosed: {formatDate(item.createdAt)}
                              </Typography>
                            </Box>
                            <Box
                              sx={{
                                width: 32,
                                height: 32,
                                borderRadius: "8px",
                                backgroundColor: "rgba(239, 68, 68, 0.15)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                ml: 2,
                              }}
                            >
                              <Typography
                                sx={{
                                  fontSize: "16px",
                                  fontWeight: "700",
                                  color: "error.main",
                                }}
                              >
                                !
                              </Typography>
                            </Box>
                          </Stack>
                        </Box>
                      ))
                    ) : (
                      <Box
                        sx={{
                          p: 3,
                          textAlign: "center",
                          backgroundColor: "rgba(82, 172, 140, 0.05)",
                          borderRadius: "12px",
                        }}
                      >
                        <Typography variant="body2" color="text.secondary">
                          No diagnoses recorded yet
                        </Typography>
                      </Box>
                    )}
                    <Stack width="100%" alignItems="flex-end" mt={2}>
                      <Button
                        sx={{
                          textTransform: "none",
                          fontSize: "13px",
                          fontWeight: 600,
                          color: "primary.main",
                          "&:hover": {
                            backgroundColor: "rgba(82, 172, 140, 0.05)",
                          },
                        }}
                      >
                        View History
                      </Button>
                    </Stack>
                  </Card>

                  {/* Medical Images */}
                  <Card sx={{ ...cardStyle, mt: 3 }}>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                      mb={3}
                    >
                      <Stack direction="row" spacing={1.5} alignItems="center">
                        <Box
                          sx={{
                            width: 36,
                            height: 36,
                            borderRadius: "10px",
                            background:
                              "linear-gradient(135deg, #52AC8C 0%, #3D8B6F 100%)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <ImageIcon sx={{ color: "white", fontSize: 20 }} />
                        </Box>
                        <Typography
                          variant="h6"
                          fontWeight="700"
                          color="primary.main"
                        >
                          Medical Images
                        </Typography>
                      </Stack>
                      <Button
                        size="small"
                        startIcon={<UploadIcon />}
                        variant="contained"
                        sx={{
                          textTransform: "none",
                          color: "white",
                          background:
                            "linear-gradient(135deg, #52AC8C 0%, #3D8B6F 100%)",
                          fontWeight: 600,
                          fontSize: "13px",
                          px: 2,
                          py: 0.75,
                          borderRadius: "10px",
                          boxShadow: "0 4px 12px rgba(82, 172, 140, 0.3)",
                          "&:hover": {
                            background:
                              "linear-gradient(135deg, #3D8B6F 0%, #2E6B55 100%)",
                            boxShadow: "0 6px 16px rgba(82, 172, 140, 0.4)",
                          },
                        }}
                        onClick={() => navigate("/medicalimaging")}
                      >
                        Upload
                      </Button>
                    </Stack>
                    <Box
                      sx={{
                        display: "grid",
                        gridTemplateColumns:
                          "repeat(auto-fill, minmax(110px, 1fr))",
                        gap: 2,
                      }}
                    >
                      {displayImages?.map((item) => (
                        <Box
                          key={item.id}
                          onClick={() => handleImageClick(item)}
                          sx={{
                            width: "100%",
                            paddingTop: "100%",
                            position: "relative",
                            overflow: "hidden",
                            borderRadius: "12px",
                            cursor: "pointer",
                            transition: "all 0.3s ease",
                            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                            "&:hover": {
                              transform: "scale(1.05)",
                              boxShadow: "0 4px 16px rgba(82, 172, 140, 0.3)",
                            },
                          }}
                        >
                          <img
                            src={item.viewerUrl}
                            alt={item.fileName || item.description}
                            style={{
                              position: "absolute",
                              top: 0,
                              left: 0,
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                          />
                          {item.description && (
                            <Box
                              sx={{
                                position: "absolute",
                                bottom: 0,
                                left: 0,
                                right: 0,
                                background:
                                  "linear-gradient(to top, rgba(0,0,0,0.7), transparent)",
                                color: "white",
                                padding: "8px",
                                fontSize: "10px",
                                fontWeight: 600,
                              }}
                            >
                              {item.description}
                            </Box>
                          )}
                        </Box>
                      ))}
                      <Box
                        onClick={() => navigate("/medicalimaging")}
                        sx={{
                          width: "100%",
                          paddingTop: "100%",
                          position: "relative",
                          borderRadius: "12px",
                          border: "2px dashed rgba(82, 172, 140, 0.3)",
                          backgroundColor: "rgba(82, 172, 140, 0.05)",
                          cursor: "pointer",
                          transition: "all 0.3s ease",
                          "&:hover": {
                            backgroundColor: "rgba(82, 172, 140, 0.1)",
                            borderColor: "rgba(82, 172, 140, 0.5)",
                            transform: "scale(1.05)",
                          },
                        }}
                      >
                        <Box
                          sx={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            textAlign: "center",
                          }}
                        >
                          <AddAPhotoIcon
                            sx={{
                              fontSize: 32,
                              color: "primary.main",
                              mb: 0.5,
                            }}
                          />
                          <Typography
                            variant="caption"
                            sx={{
                              color: "primary.main",
                              fontWeight: 600,
                              display: "block",
                            }}
                          >
                            Add Image
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Card>
                </Stack>
              </Fade>
            </Grid>

            {/* RIGHT COLUMN */}
            <Grid size={{ xs: 12, md: 4 }}>
              <Fade in timeout={700}>
                <Stack spacing={3}>
                  {/**NEXT PATIENT */}
                  <Card sx={cardStyle}>
                    <Typography
                      sx={{
                        color: "text.secondary",
                        fontSize: "12px",
                        fontWeight: "700",
                        letterSpacing: "0.5px",
                        mb: 2,
                      }}
                    >
                      NEXT PATIENT
                    </Typography>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Avatar
                        src="https://i.pravatar.cc/150?img=5"
                        sx={{
                          width: 56,
                          height: 56,
                          border: "3px solid rgba(82, 172, 140, 0.2)",
                        }}
                      />
                      <Box flex={1}>
                        <Typography
                          variant="body1"
                          sx={{
                            fontSize: "15px",
                            fontWeight: "700",
                            color: "primary.main",
                          }}
                        >
                          John Doe
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            fontSize: "13px",
                            fontWeight: "500",
                            color: "text.secondary",
                            mt: 0.5,
                          }}
                        >
                          11:00 AM · Follow-up
                        </Typography>
                      </Box>
                      <IconButton
                        sx={{
                          backgroundColor: "rgba(82, 172, 140, 0.1)",
                          "&:hover": {
                            backgroundColor: "rgba(82, 172, 140, 0.2)",
                          },
                        }}
                      >
                        <ArrowForwardIcon sx={{ color: "primary.main" }} />
                      </IconButton>
                    </Stack>
                  </Card>
                </Stack>
              </Fade>
              {/* Prescriptions */}
              <Card sx={{ ...cardStyle, mt: 3 }}>
                {/* Header */}
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  mb={3}
                >
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <Box
                      sx={{
                        width: 36,
                        height: 36,
                        borderRadius: "10px",
                        background:
                          "linear-gradient(135deg, #10B981 0%, #059669 100%)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <LinkIcon sx={{ color: "white", fontSize: 20 }} />
                    </Box>
                    <Typography
                      variant="h6"
                      fontWeight="700"
                      color="primary.main"
                    >
                      Prescriptions
                    </Typography>
                  </Stack>
                  <Button
                    onClick={() => setopenAddPrescription(true)}
                    startIcon={<AddIcon />}
                    sx={{
                      textTransform: "none",
                      color: "#10B981",
                      fontWeight: 600,
                      fontSize: "13px",
                      "&:hover": {
                        backgroundColor: "rgba(16, 185, 129, 0.05)",
                      },
                    }}
                  >
                    Add New
                  </Button>
                </Stack>
                {/* Table Header */}
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "2fr 1fr 2fr 1fr",
                    gap: 2,
                    pb: 2,
                    borderBottom: "2px solid rgba(82, 172, 140, 0.1)",
                  }}
                >
                  <Typography fontWeight={600} fontSize="11px" color="#898989">
                    MEDICATION
                  </Typography>
                  <Typography fontWeight={600} fontSize="11px" color="#898989">
                    DOSAGE
                  </Typography>
                  <Typography fontWeight={600} fontSize="11px" color="#898989">
                    FREQUENCY
                  </Typography>
                  <Typography fontWeight={600} fontSize="11px" color="#898989">
                    STATUS
                  </Typography>
                </Box>
                {/* Rows */}
                <Stack spacing={0} mt={2}>
                  {appoinDetails?.data?.prescriptions?.map((prescription) =>
                    prescription?.medications?.map((item, index) => (
                      <Box
                        key={item.id || index}
                        sx={{
                          display: "grid",
                          gridTemplateColumns: "2fr 1fr 2fr 1fr",
                          gap: 2,
                          alignItems: "center",
                          py: 2,
                          borderBottom: "1px solid rgba(82, 172, 140, 0.05)",
                          transition: "all 0.2s ease",
                          "&:hover": {
                            backgroundColor: "rgba(82, 172, 140, 0.03)",
                            borderRadius: "8px",
                          },
                        }}
                      >
                        <Typography
                          sx={{
                            fontWeight: "400",
                            fontSize: "10px",
                            color: "#000000",
                          }}
                        >
                          {item.drugName}
                        </Typography>
                        <Typography
                          component="span"
                          sx={{
                            fontWeight: "500",
                            fontSize: "11px",
                            color: "#898989",
                          }}
                        >
                          {item.dosage}
                        </Typography>
                        <Typography
                          sx={{
                            fontWeight: "",
                            fontSize: "11px",
                            color: "#898989",
                          }}
                        >
                          {item.frequency}
                        </Typography>
                        <Chip
                          label="Active"
                          size="small"
                          sx={{
                            width: "fit-content",
                            height: "24px",
                            backgroundColor: "rgba(59, 130, 246, 0.1)",
                            color: "#1D4ED8",
                            fontWeight: 600,
                            fontSize: "11px",
                            border: "1px solid #1D4ED8",
                          }}
                        />
                      </Box>
                    ))
                  )}
                </Stack>
                {/* Footer */}
                <Stack width="100%" alignItems="flex-end" mt={3}>
                  <Button
                    sx={{
                      textTransform: "none",
                      fontSize: "13px",
                      fontWeight: 600,
                      color: "#10B981",
                      "&:hover": {
                        backgroundColor: "rgba(16, 185, 129, 0.05)",
                      },
                    }}
                  >
                    View History
                  </Button>
                </Stack>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Stack>
    </>
  );
}
