import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addPrescriptions = createAsyncThunk(
  "prescriptions/addPrescriptions",
  async ({ diagnosisId, medications }, { rejectWithValue }) => {
    try {
      //const token = localStorage.getItem("token");
      console.log("diagnosisId: ",diagnosisId);
      console.log("medications: ",medications);
      const response = await axios.post(
        "https://doctormate.runasp.net/api/prescriptions",
        {
          diagnosisId,
          medications,
        },
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJlYjQxZjE1OS1hNDEzLTQ4Y2MtMGFiMy0wOGRlMWE1ZTMzYmQiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJEb2N0b3IiLCJlbWFpbCI6InVzZXIwQGV4YW1wbGUuY29tIiwiUGhvbmVOdW1iZXIiOiIwMTExOTc0ODk4IiwiaXNzIjoiRG9jdG9yTWF0ZUFQSSIsImF1ZCI6IkRvY3Rvck1hdGVDbGllbnQifQ.RNpRLwsFvOEyk49QLtUj9HS7EOlqNd6hpSM9RZDl2BQ`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "حدث خطأ");
    }
  }
);

const prescriptions = createSlice({
  name: "prescriptions",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },

  extraReducers: (builder) => {
    builder
      .addCase(addPrescriptions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addPrescriptions.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(addPrescriptions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export default prescriptions.reducer;
