import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ========================== overViewSec2 profile ==========================
export const patientsList = createAsyncThunk(
  "patients/patientsList",
  async (_, { rejectWithValue }) => {
    try {
      //const token = localStorage.getItem("token");
      const response = await axios.get(
        "https://doctormate.runasp.net/api/doctor/patients",
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJlYjQxZjE1OS1hNDEzLTQ4Y2MtMGFiMy0wOGRlMWE1ZTMzYmQiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJEb2N0b3IiLCJlbWFpbCI6InVzZXIwQGV4YW1wbGUuY29tIiwiUGhvbmVOdW1iZXIiOiIwMTExOTc0ODk4IiwiaXNzIjoiRG9jdG9yTWF0ZUFQSSIsImF1ZCI6IkRvY3Rvck1hdGVDbGllbnQifQ.RNpRLwsFvOEyk49QLtUj9HS7EOlqNd6hpSM9RZDl2BQ`,
          },
        }
      );
      console.log("response.data = ", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "فشل في استكمال بيانات الحساب"
      );
    }
  }
);

// ========================== Slice ==========================
const patients = createSlice({
  name: "patients",
  initialState: {
    patients: {},
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    // fetch user
    builder
      .addCase(patientsList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(patientsList.fulfilled, (state, action) => {
        state.loading = false;
        state.patients = action.payload;
      })
      .addCase(patientsList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export default patients.reducer;
