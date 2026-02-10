import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ========================== overViewSec2 profile ==========================
export const overViewSec2 = createAsyncThunk(
  "overView/overViewSec2",
  async (_, { rejectWithValue }) => {
    try {
      //const token = localStorage.getItem("token");
      const response = await axios.get(
        "https://doctormate.runasp.net/api/admin/dashboard/overview",
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjVkODFiMi0yNjU3LTQ1OTItOTFkMy0xZWNjYTg3NzkwZDgiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBZG1pbiIsImVtYWlsIjoiYWhtZWQuYWRtaW5AZG9jdG9ybWF0ZS5jb20iLCJQaG9uZU51bWJlciI6IisyMDEyMzQ1Njc4OTAiLCJpc3MiOiJEb2N0b3JNYXRlQVBJIiwiYXVkIjoiRG9jdG9yTWF0ZUNsaWVudCJ9.ej2zuoVW9rt4JNLAnDKTD7VK6f6VqkdOUmkqHxWzEkU`,
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
const overView = createSlice({
  name: "overView",
  initialState: {
    user: null,
    loading: false,
    error: null,
    // forgotPasswordEmail: {
    //   email: "",
    //   forgotPass: false,
    // },
  },
  //   reducers: {
  //     clearAuthError: (state) => {
  //       state.error = "";
  //     },
  //     setForgotPasswordEmail: (state, action) => {
  //       state.forgotPasswordEmail = action.payload;
  //     },
  //     clearForgotPasswordEmail: (state) => {
  //       state.forgotPasswordEmail = {
  //         email: "",
  //         forgotPass: false,
  //       };
  //     },
  //   },
  extraReducers: (builder) => {
    // fetch user
    builder
      .addCase(overViewSec2.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(overViewSec2.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(overViewSec2.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
// export const {
//   clearAuthError,
//   setForgotPasswordEmail,
//   clearForgotPasswordEmail,
// } = authSlice.actions;
export default overView.reducer;
