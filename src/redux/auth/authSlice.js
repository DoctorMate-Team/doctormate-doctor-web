import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ========================== signIn thunk ==========================
export const signIn = createAsyncThunk(
  "auth/signIn",
  async ({ emailOrPhone, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://doctormate.runasp.net/api/Login",
        { emailOrPhone, password }
      );
      const { token, user } = response.data.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);
// ========================== forgot pass thunk ==========================
export const forgotPass = createAsyncThunk(
  "auth/forgotpass",
  async ({ email, isForgetPass }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://doctormate.runasp.net/api/Otp/send",
        { email, isForgetPass }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// ========================== signUp thunk ==========================
export const signUp = createAsyncThunk(
  "auth/signUp",
  async (
    { fullName, email, phoneNumber, role, password },
    { rejectWithValue }
  ) => {
    try {
      console.log("fullName = ", fullName);
      console.log("email = ", email);
      console.log("phoneNumber = ", phoneNumber);
      console.log("role = ", role);
      console.log("password = ", password);

      const response = await axios.post(
        "https://doctormate.runasp.net/api/Register",
        { email, phoneNumber, password, role, fullName }
      );
      console.log("response.data = ", response.data);
      const { token, user } = response.data.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// ========================== verify OTP ==========================
export const verfyOtp = createAsyncThunk(
  "auth/verfyOtp",
  async ({ email, otp, isForgetPass }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://doctormate.runasp.net/api/Otp/verify",
        { email, otpCode: otp, isForgetPass }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// ========================== resetPass thunk ==========================
export const resetPass = createAsyncThunk(
  "auth/logoutUser",
  async ({ email, password, confirmPassword }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://doctormate.runasp.net/api/PasswordReset/reset-password",
        { email, newPassword: password, confirmPassword }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// ========================== completeProfile profile ==========================
export const completeProfile = createAsyncThunk(
  "user/completeProfile",
  async (profileData, { rejectWithValue }) => {
    console.log("profileData = ", profileData);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "https://doctormate.runasp.net/api/CompleteProfile/complete",
        profileData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "فشل في استكمال بيانات الحساب"
      );
    }
  }
);

// ========================== Slice ==========================
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: false,
    error: null,
    forgotPasswordEmail: {
      email: "",
      forgotPass: false,
    },
  },
  reducers: {
    clearAuthError: (state) => {
      state.error = "";
    },
    setForgotPasswordEmail: (state, action) => {
      state.forgotPasswordEmail = action.payload;
    },
    clearForgotPasswordEmail: (state) => {
      state.forgotPasswordEmail = {
        email: "",
        forgotPass: false,
      };
    },
  },
  extraReducers: (builder) => {
    // signIn
    builder
      .addCase(signIn.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    // forgot pass
    builder
      .addCase(forgotPass.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(forgotPass.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.forgotPasswordEmail = action.meta.arg;
      })
      .addCase(forgotPass.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // signUp
    builder
      .addCase(signUp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // verifyOtp
    builder
      .addCase(verfyOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verfyOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;

        const userData = action.payload.data;
        if (userData?.accessToken) {
          localStorage.setItem("accessToken", userData.accessToken);
        }
        if (userData?.refreshToken) {
          localStorage.setItem("refreshToken", userData.refreshToken);
        }
      })
      .addCase(verfyOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // resetPass
    builder
      .addCase(resetPass.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPass.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
      })
      .addCase(resetPass.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // fetch user
    builder
      .addCase(completeProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(completeProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(completeProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export const {
  clearAuthError,
  setForgotPasswordEmail,
  clearForgotPasswordEmail,
} = authSlice.actions;
export default authSlice.reducer;
