//import { useState } from "react";
import "./App.css";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./theme";
import LogIn from "./auth/logIn";
import SignUp from "./auth/signUp";
import ForgetPass from "./auth/forgetPass";
import Otp from "./auth/Otp";
import ResetPass from "./auth/resetPass";
import ComPro from "./auth/compeleteProfile";
import Dashboard from "./pages/dashboard/dashboard";
import Patients from "./pages/patients/patients";
import HelpSupport from "./pages/help/h&s";
import DoctorProfile from "./pages/doctorsProfile/doctors";
import Settings from "./pages/settings/settings";
import Schedule from "./pages/schedule/Schedule";
import Dicom from "./pages/dicom/dicom";
import Reports from "./pages/reports/reports";
import Message from "./pages/message/message";
import { Routes, Route } from "react-router-dom";
import ImageViwer from "./pages/imageViwer/imageViwer";
import PatientList from "./pages/pathientList/PatientList";
import OverView from "./pages/overView/overView";
import BasicModal from "./pages/schedule/Modal/MedicalModal";
import AddPrescription from "./pages/schedule/Modal/prescriptionModal";
import AddDiagnosis from "./pages/schedule/Modal/diagnosis";
import AppointmentsDetails from "./pages/schedule/appoinmantDetals";
import Details1 from "./pages/schedule/details1";
import MedicalImaging from "./pages/schedule/uploadImage";
import AppointmentScheduleTable from "./pages/schedule/timeLineAppomint";
function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* <BasicModal /> */}
      {/* <AddPrescription /> 
      <AddDiagnosis />*/}

      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/logIn" element={<LogIn />} />
        <Route path="/compeleteprofile" element={<ComPro />} />
        <Route path="/logIn/forgetpass/otp/resetpass" element={<ResetPass />} />
        <Route path="/logIn/forgetpass" element={<ForgetPass />} />
        <Route path="/logIn/forgetpass/otp" element={<Otp />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/patients" element={<Patients />} />
        <Route path="/patients/patientlist" element={<PatientList />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/schedule/appointmentsdetails/details" element={<Details1 />} />
        <Route path="/medicalimaging" element={<MedicalImaging />} />
        <Route path="/schedule/appointmentsdetails" element={<AppointmentsDetails />} />
        <Route path="/dicom" element={<Dicom />} />
        <Route path="/dicom/imageViwer" element={<ImageViwer />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/doctorprofile" element={<DoctorProfile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/helpsupport" element={<HelpSupport />} />
        <Route path="/message" element={<Message />} />
        <Route path="/overview" element={<OverView />} />
        <Route
          path="/AppointmentTimeline"
          element={<AppointmentScheduleTable />}
        />
      </Routes>
    </ThemeProvider>
  );
}
export default App;
