import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ========================== overViewSec2 profile ==========================
export const addDiagnoses = createAsyncThunk(
  "Diagnoses/adddiagnoses",
  async (
    { medicalRecordId, appointmentId, description, icdCode, severity },
    { rejectWithValue }
  ) => {
    try {
      //const token = localStorage.getItem("token");
      console.log("medicalRecordId: ", medicalRecordId);
      console.log("appointmentId: ", appointmentId);
      console.log("icdCode: ", icdCode);
      console.log("description: ", description);
      console.log("severity: ", severity);
      const response = await axios.post(
        "https://doctormate.runasp.net/api/diagnoses",
        {
          medicalRecordId,
          appointmentId,
          description,
          icdCode,
          severity,
        },
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJlYjQxZjE1OS1hNDEzLTQ4Y2MtMGFiMy0wOGRlMWE1ZTMzYmQiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJEb2N0b3IiLCJlbWFpbCI6InVzZXIwQGV4YW1wbGUuY29tIiwiUGhvbmVOdW1iZXIiOiIwMTExOTc0ODk4IiwiaXNzIjoiRG9jdG9yTWF0ZUFQSSIsImF1ZCI6IkRvY3Rvck1hdGVDbGllbnQifQ.RNpRLwsFvOEyk49QLtUj9HS7EOlqNd6hpSM9RZDl2BQ`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("response.data: ", response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response?.data || "حدث خطأ");
    }
  }
);
// ========================== Slice ==========================
const diagnoses = createSlice({
  name: "diagnoses",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(addDiagnoses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addDiagnoses.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(addDiagnoses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export default diagnoses.reducer;
