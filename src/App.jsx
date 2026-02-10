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
import Dashboard from "./pages/dashboard";
import Patients from "./pages/patients";
import HelpSupport from "./pages/h&s";
import DoctorProfile from "./pages/doctors";
import Settings from "./pages/settings";
import Schedule from "./pages/Schedule";
import Dicom from "./pages/dicom";
import Reports from "./pages/reports";
import Message from "./pages/message";
import { Routes, Route } from "react-router-dom";
import ImageViwer from "./pages/imageViwer";
import PatientList from "./pages/PatientList";
import OverView from "./pages/overView";
function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
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
        <Route path="/dicom" element={<Dicom />} />
        <Route path="/dicom/imageViwer" element={<ImageViwer />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/doctorprofile" element={<DoctorProfile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/helpsupport" element={<HelpSupport />} />
        <Route path="/message" element={<Message />} />
        <Route path="/overview" element={<OverView />} />
      </Routes>
    </ThemeProvider>
  );
}
export default App;