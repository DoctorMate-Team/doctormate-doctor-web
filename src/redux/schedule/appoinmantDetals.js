import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const getPatientDetals = createAsyncThunk(
  "patientdet/getPatientDetals",
  async ({ id }, { rejectWithValue }) => {
    try {
      //const token = localStorage.getItem("token");
      console.log("id: ", id);
      const response = await axios.get(
        `https://doctormate.runasp.net/api/doctor/patients/${id}/details`,
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJlYjQxZjE1OS1hNDEzLTQ4Y2MtMGFiMy0wOGRlMWE1ZTMzYmQiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJEb2N0b3IiLCJlbWFpbCI6InVzZXIwQGV4YW1wbGUuY29tIiwiUGhvbmVOdW1iZXIiOiIwMTExOTc0ODk4IiwiaXNzIjoiRG9jdG9yTWF0ZUFQSSIsImF1ZCI6IkRvY3Rvck1hdGVDbGllbnQifQ.RNpRLwsFvOEyk49QLtUj9HS7EOlqNd6hpSM9RZDl2BQ`,
          },
        }
      );
      console.log("response.data: ", response.data.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "حدث خطأ");
    }
  }
);
export const getAppDetById = createAsyncThunk(
  "patientdet/getAppDetById",
  async ({ id }, { rejectWithValue }) => {
      console.log(" getAppDetById id: ", id);
    try {
      //const token = localStorage.getItem("token");
      const response = await axios.get(
        // `https://doctormate.runasp.net/api/appointments/${id}/details`,
        `https://doctormate.runasp.net/api/appointments/${id}/details`,
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJlYjQxZjE1OS1hNDEzLTQ4Y2MtMGFiMy0wOGRlMWE1ZTMzYmQiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJEb2N0b3IiLCJlbWFpbCI6InVzZXIwQGV4YW1wbGUuY29tIiwiUGhvbmVOdW1iZXIiOiIwMTExOTc0ODk4IiwiaXNzIjoiRG9jdG9yTWF0ZUFQSSIsImF1ZCI6IkRvY3Rvck1hdGVDbGllbnQifQ.RNpRLwsFvOEyk49QLtUj9HS7EOlqNd6hpSM9RZDl2BQ`,
          },
        }
      );
      console.log("response.data: ", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "حدث خطأ");
    }
  }
);
const patientdet = createSlice({
  name: "patientdet",
  initialState: {
    datapatient: null,
    dataApp: null,
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPatientDetals.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPatientDetals.fulfilled, (state, action) => {
        state.loading = false;
        state.datapatient = action.payload;
      })
      .addCase(getPatientDetals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    builder
      .addCase(getAppDetById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAppDetById.fulfilled, (state, action) => {
        state.loading = false;
        state.dataApp = action.payload;
      })
      .addCase(getAppDetById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export default patientdet.reducer;
