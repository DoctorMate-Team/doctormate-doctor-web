import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ========================== overViewSec2 profile ==========================
export const appointmentsDoctor = createAsyncThunk(
  "schedule/appointmentsDoctor", // عدّل الاسم هنا كمان
  async ({ page = 1, limit = 10 }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `https://doctormate.runasp.net/api/appointments/Doctor?page=${page}&limit=${limit}`,
        {
          headers: {
            //Authorization: `Bearer ${token}`, // استخدم token من localStorage
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJlYjQxZjE1OS1hNDEzLTQ4Y2MtMGFiMy0wOGRlMWE1ZTMzYmQiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJEb2N0b3IiLCJlbWFpbCI6InVzZXIwQGV4YW1wbGUuY29tIiwiUGhvbmVOdW1iZXIiOiIwMTExOTc0ODk4IiwiaXNzIjoiRG9jdG9yTWF0ZUFQSSIsImF1ZCI6IkRvY3Rvck1hdGVDbGllbnQifQ.RNpRLwsFvOEyk49QLtUj9HS7EOlqNd6hpSM9RZDl2BQ`, // استخدم token من localStorage
            "Content-Type": "application/json",
          },
        }
      );
      console.log("response.data = ", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "فشل في تحميل المواعيد"
      );
    }
  }
);
export const appointmentsStatus = createAsyncThunk(
  "schudule/appointmentsStatus",
  async ({ status, id }, { rejectWithValue }) => {
    try {
      //const token = localStorage.getItem("token");
      const response = await axios.put(
        `https://doctormate.runasp.net/api/appointments/${id}/status`,
        {
          status: status,
        },
        {
          headers: {
            //Authorization: `Bearer ${token}`,
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJlYjQxZjE1OS1hNDEzLTQ4Y2MtMGFiMy0wOGRlMWE1ZTMzYmQiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJEb2N0b3IiLCJlbWFpbCI6InVzZXIwQGV4YW1wbGUuY29tIiwiUGhvbmVOdW1iZXIiOiIwMTExOTc0ODk4IiwiaXNzIjoiRG9jdG9yTWF0ZUFQSSIsImF1ZCI6IkRvY3Rvck1hdGVDbGllbnQifQ.RNpRLwsFvOEyk49QLtUj9HS7EOlqNd6hpSM9RZDl2BQ`,
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
    selectedPatient: null,
  },
  reducers: {
    setSelectedPatient: (state, action) => {
      state.selectedPatient = action.payload;
    },
    clearSelectedPatient: (state) => {
      state.selectedPatient = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(appointmentsDoctor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(appointmentsDoctor.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(appointmentsDoctor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    builder
      .addCase(appointmentsStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(appointmentsStatus.fulfilled, (state, action) => {
        state.loading = false;

        const updatedId = action.meta.arg.id;
        const newStatus = action.meta.arg.status;

        const appointment = state.data?.data?.appointments?.find(
          (a) => a.id === updatedId
        );

        if (appointment) {
          appointment.status = newStatus;
        }
      })
      .addCase(appointmentsStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export const { setSelectedPatient, clearSelectedPatient } = schudule.actions;
export default schudule.reducer;
