import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ========================== overViewSec2 profile ==========================
export const getDataDoctor = createAsyncThunk(
  "doctor/getDataDoctor",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "https://doctormate.runasp.net/api/Profile_Management",
        {
          headers: {
            //Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI3MWIyMjVhNi0wYTM1LTQzZTMtY2MxNS0wOGRlMjQ1YTQxMDgiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJEb2N0b3IiLCJlbWFpbCI6ImRyLm1pY2hhZWwuc2FtdWVsbEBleGFtcGxlLmNvbSIsIlBob25lTnVtYmVyIjoiMDExNTQ4ODkzMjEiLCJpc3MiOiJEb2N0b3JNYXRlQVBJIiwiYXVkIjoiRG9jdG9yTWF0ZUNsaWVudCJ9.0FuqScF9iW-pwimXn7fu4wIUNeZbsYE5JY9FRpmtl8Q`,
            Authorization: `Bearer ${token}`,
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
export const getPatient = createAsyncThunk(
  "doctor/getPatient",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "https://doctormate.runasp.net/api/doctor/patients?page=1&limit=10",
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
      return rejectWithValue(
        error.response?.data || "فشل في استكمال بيانات الحساب"
      );
    }
  }
);
// export const getRateDoctor = createAsyncThunk(
//   "doctor/getRateDoctor",
//   async (_, { rejectWithValue }) => {
//     try {
//       //const token = localStorage.getItem("token");
//       const response = await axios.get(
//         "https://doctormate.runasp.net/api/doctor-reviews/D2FE8C66-BF12-413B-AFD0-C094776214F9",
//         {
//           headers: {
//             Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJlYjQxZjE1OS1hNDEzLTQ4Y2MtMGFiMy0wOGRlMWE1ZTMzYmQiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJEb2N0b3IiLCJlbWFpbCI6InVzZXIwQGV4YW1wbGUuY29tIiwiUGhvbmVOdW1iZXIiOiIwMTExOTc0ODk4IiwiaXNzIjoiRG9jdG9yTWF0ZUFQSSIsImF1ZCI6IkRvY3Rvck1hdGVDbGllbnQifQ.RNpRLwsFvOEyk49QLtUj9HS7EOlqNd6hpSM9RZDl2BQ`,
//           },
//         }
//       );
//       console.log("response.data = ", response.data);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data || "فشل في استكمال بيانات الحساب"
//       );
//     }
//   }
// );
// ========================== Slice ==========================
const doctor = createSlice({
  name: "doctor",
  initialState: {
    user: null,
    // rate: null,
    data: null,
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    // fetch user
    builder
      .addCase(getDataDoctor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDataDoctor.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(getDataDoctor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    // fetch patients
    builder
      .addCase(getPatient.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPatient.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getPatient.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    // fetch patients
    // builder
    //   .addCase(getRateDoctor.pending, (state) => {
    //     state.loading = true;
    //     state.error = null;
    //   })
    //   .addCase(getRateDoctor.fulfilled, (state, action) => {
    //     state.loading = false;
    //     state.data = action.payload;
    //   })
    //   .addCase(getRateDoctor.rejected, (state, action) => {
    //     state.loading = false;
    //     state.error = action.payload;
    //   });
  },
});
export default doctor.reducer;
