import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ========================== overViewSec2 profile ==========================
export const appointmentsPatient = createAsyncThunk(
  "schudule/appointmentsPatient",
  async (_, { rejectWithValue }) => {
    try {
      //const token = localStorage.getItem("token");
      const response = await axios.get(
        "https://doctormate.runasp.net/api/appointments/patient",
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJiMGU4MzI3YS0yMWZmLTQ5MGItNjcyNC0wOGRlMjU3NDdhOTAiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJQYXRpZW50IiwiZW1haWwiOiJTYXdzYW4xNzExMS5JYnJhaGltZUBleGFtcGxlLmNvbSIsIlBob25lTnVtYmVyIjoiMDE3NzIxMDcxNzEiLCJpc3MiOiJEb2N0b3JNYXRlQVBJIiwiYXVkIjoiRG9jdG9yTWF0ZUNsaWVudCJ9.PMHGi3eOJaYdnD5l7RofQXaAYaRWPizaUQA2vtpZgq4`,
            "Content-Type": "application/json",
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
const schudule = createSlice({
  name: "schedule",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(appointmentsPatient.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(appointmentsPatient.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(appointmentsPatient.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export default schudule.reducer;
