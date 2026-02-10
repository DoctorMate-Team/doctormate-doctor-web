import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ========================== overViewSec2 profile ==========================
export const profileManagement = createAsyncThunk(
  "profile/profileManagement",
  async (form, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("fullName", form.fullName);
      // formData.append("Email", form.email);
      formData.append("phoneNumber", form.phone);
      formData.append("Specialty", form.speciality);
      formData.append("address", form.address);
      formData.append("ConsultationFee", form.consultationFee);
      formData.append("workingTime", form.workingTime);
      if (form.profilePhoto instanceof File) {
        formData.append("imageFile", form.profilePhoto);
      }
      const response = await axios.put(
        "https://doctormate.runasp.net/api/Profile_Management/update",
        formData,
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJiMGU4MzI3YS0yMWZmLTQ5MGItNjcyNC0wOGRlMjU3NDdhOTAiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJQYXRpZW50IiwiZW1haWwiOiJTYXdzYW4xNzExMS5JYnJhaGltZUBleGFtcGxlLmNvbSIsIlBob25lTnVtYmVyIjoiMDE3NzIxMDcxNzEiLCJpc3MiOiJEb2N0b3JNYXRlQVBJIiwiYXVkIjoiRG9jdG9yTWF0ZUNsaWVudCJ9.PMHGi3eOJaYdnD5l7RofQXaAYaRWPizaUQA2vtpZgq4`,
          },
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Server Error");
    }
  }
);

// ========================== Slice ==========================
const profile = createSlice({
  name: "profile",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(profileManagement.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(profileManagement.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(profileManagement.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export default profile.reducer;
