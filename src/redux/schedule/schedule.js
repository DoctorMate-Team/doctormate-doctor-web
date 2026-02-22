import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";

// ========================== overViewSec2 profile ==========================
export const appointmentsDoctor = createAsyncThunk(
  "schedule/appointmentsDoctor", // عدّل الاسم هنا كمان
  async ({ page = 1, limit = 10 }, { rejectWithValue }) => {
    try {
      const response = await api.get(
        `/appointments/Doctor?page=${page}&limit=${limit}`
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
      const response = await api.put(
        `/appointments/${id}/status`,
        {
          status: status,
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
