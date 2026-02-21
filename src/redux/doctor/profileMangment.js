import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ========================== overViewSec2 profile ==========================
export const profileManagement = createAsyncThunk(
  "profile/profileManagement",
  async (form, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("fullName", form.fullName);
      formData.append("phoneNumber", form.phone);
      formData.append("Specialty", form.speciality);
      formData.append("address", form.address);
      formData.append("ConsultationFee", form.consultationFee);
      formData.append("workingTime", form.workingTime);
      if (form.profilePhoto instanceof File) {
        formData.append("imageFile", form.profilePhoto);
      }
      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }
      const token = localStorage.getItem("token");
      const response = await axios.put(
        "https://doctormate.runasp.net/api/Profile_Management/update",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            //Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJlYjQxZjE1OS1hNDEzLTQ4Y2MtMGFiMy0wOGRlMWE1ZTMzYmQiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJEb2N0b3IiLCJlbWFpbCI6InVzZXIwQGV4YW1wbGUuY29tIiwiUGhvbmVOdW1iZXIiOiIwMTExOTc0ODk4IiwiaXNzIjoiRG9jdG9yTWF0ZUFQSSIsImF1ZCI6IkRvY3Rvck1hdGVDbGllbnQifQ.RNpRLwsFvOEyk49QLtUj9HS7EOlqNd6hpSM9RZDl2BQ`,
          },
        }
      );
      console.log("response.data = ", response.data);
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
