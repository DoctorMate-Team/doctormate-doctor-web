import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";
export const getPatientDetals = createAsyncThunk(
  "patientdet/getPatientDetals",
  async ({ id }, { rejectWithValue }) => {
    try {
      console.log("id: ", id);
      const response = await api.get(
        `/doctor/patients/${id}/details`
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
      const response = await api.get(
        // `https://doctormate.runasp.net/api/appointments/${id}/details`,
        `/appointments/${id}/details`
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
