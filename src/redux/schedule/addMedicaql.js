import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";

// ========================== overViewSec2 profile ==========================
export const addmedical = createAsyncThunk(
  "Medical/addmedical",
  async (
    { title, description, recordType, patientId },
    { rejectWithValue }
  ) => {
    try {
      console.log("title: ", title);
      console.log("description: ", description);
      console.log("recordType: ", recordType);
      const response = await api.post(
        "/records",
        {
          title,
          description,
          recordType,
          patientId,
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "حدث خطأ");
    }
  }
);
// ========================== Slice ==========================
const medical = createSlice({
  name: "medical",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(addmedical.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addmedical.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(addmedical.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export default medical.reducer;
