import { Stack, Box, Typography, TextField, Button } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useSelector, useDispatch } from "react-redux";
import {
  forgotPass,
  clearAuthError,
  setForgotPasswordEmail,
} from "../redux/auth/authSlice";
import { useState, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";
export default function ForgetPass() {
  const [email, setEmail] = useState("");
  const [error01, setError] = useState("");
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };
  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearAuthError());
    }
  }, [error, dispatch]);
  const handleSendCode = () => {
    if (!email) {
      setError("Please enter your email");
      return;
    }

    if (!isValidEmail(email)) {
      setError("Please enter a valid email");
      return;
    }
    dispatch(
      setForgotPasswordEmail({
        email: email,
        forgotPass: true,
      })
    );
    dispatch(forgotPass({ email: email, isForgetPass: true }))
      .unwrap()
      .then(() => {
        navigate("/logIn/forgetpass/otp");
      });
  };

  return (
    <Stack
      spacing={4}
      sx={{
        height: "100vh",
        flexDirection: { xs: "column", md: "row" },
        justifyContent: { xs: "center", md: "space-between" },
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          height: "100%",
          width: "40%",
          display: { xs: "none", md: "block" },
          position: "relative",
        }}
      >
        <img
          src="/assets/auth/Group 1.png"
          alt=""
          style={{
            position: "absolute",
            zIndex: "1",
            right: "0",
            top: "96px",
            width: "85%",
            height: "70%",
          }}
        />
        <Box
          sx={{
            height: "100%",
            width: "80%",
            padding: "0 20px 20px",
            backgroundColor: "primary.main",
            display: "flex",
            alignItems: "end",
            justifyContent: "center",
          }}
        >
          <Typography
            sx={{
              fontWeight: "400",
              fontSize: "20px",
              textAlign: "center",
              color: "white",
            }}
          >
            People pay the doctor for his trouble, for his kindness they still
            remain in his debt
          </Typography>
        </Box>
      </Box>
      <Box sx={{ width: { xs: "100%", md: "60%" } }}>
        <Stack
          direction={"column"}
          sx={{
            width: { xs: "100%", md: "70%" },
            justifyContent: "center",
            alignItems: "center",
            margin: "0 auto",
          }}
        >
          <img
            src="/assets/auth/H-Logo 1.png"
            alt=""
            style={{ width: "98px", height: "86px" }}
          />
          <Typography
            sx={{
              fontWeight: "500",
              fontSize: { xs: "20px", md: "34px" },
              color: "primary.main",
            }}
          >
            Forgot your password ?
          </Typography>
          <Typography
            sx={{
              color: "#929292",
              fontSize: { xs: "12px", md: "15px" },
              fontWeight: "400",
              textAlign: "center",
            }}
          >
            Enter your email and we'll send a 6-digit verification code
            instantly.
          </Typography>
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError("");
            }}
            error={Boolean(error01)}
            helperText={error01}
            sx={{
              width: "90%",
              margin: "20px 0",
              "& .MuiOutlinedInput-root": {
                borderRadius: "10px",
                backgroundColor: "#F0F2F6",
              },
              "& .MuiInputBase-input": {
                fontSize: "19px",
                fontWeight: 300,
              },
            }}
          />
          <Button
            variant="contained"
            onClick={handleSendCode}
            disabled={loading}
            sx={{
              backgroundColor: "primary.main",
              fontSize: "19px",
              fontWeight: "400",
              width: "90%",
              color: "white",
              textTransform: "none",
              height: "48px",
            }}
          >
            {loading ? (
              <CircularProgress size={24} sx={{ color: "white" }} />
            ) : (
              "Send code"
            )}
          </Button>

          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"start"}
            sx={{ width: "90%" }}
            marginTop={"20px"}
          >
            <FormControlLabel
              control={
                <Checkbox
                  sx={{
                    "& .MuiSvgIcon-root": {
                      color: "primary.main",
                      borderColor: "primary.main",
                      borderRadius: "20px",
                    },
                  }}
                />
              }
              sx={{
                color: "#555555",
                fontSize: "15px",
                fontWeight: "600",
                margin: "0",
              }}
            />
            <Typography
              sx={{
                fontSize: { xs: "10px", md: "12px" },
                fontWeight: "400",
                width: "90%",
              }}
            >
              By Creating an account , you agree to our{" "}
              <span style={{ color: "#52AC8C", cursor: "pointer" }}>
                Terms of Service
              </span>{" "}
              and{" "}
              <span style={{ color: "#52AC8C", cursor: "pointer" }}>
                Privacy Policy
              </span>
            </Typography>
          </Stack>
        </Stack>
      </Box>
    </Stack>
  );
}
