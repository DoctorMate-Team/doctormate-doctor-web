import {
  Container,
  Stack,
  Box,
  Typography,
  TextField,
  Button,
  Divider,
} from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { signIn } from "../redux/auth/authSlice";
import { Link } from "react-router";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router";
import { forgotPass, setForgotPasswordEmail } from "../redux/auth/authSlice";
export default function LogIn() {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  useEffect(() => {
    if (error) {
      alert(error);
    }
  }, [error]);
  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };
  // → Handle login click
  const handleLogin = () => {
    if (!email && !password) {
      alert("Please enter email and password");
      return;
    }
    if (!password) {
      alert("Please enter password");
      return;
    }
    if (!email) {
      alert("Please enter email");
      return;
    }
    if (!isValidEmail(email)) {
      alert("Please enter a valid email");
      return;
    }
    dispatch(signIn({ emailOrPhone: email, password }))
      .unwrap()
      .then((response) => {
        if (response.data.user.isVerified == false) {
          dispatch(
            setForgotPasswordEmail({
              email: email,
              forgotPass: false,
            })
          );
          dispatch(forgotPass({ email, isForgetPass: false }));
          navigate("/logIn/forgetpass/otp");
        } else if (response.data.user.isCompletedProfile == false) {
          navigate("/compeleteprofile");
        } else {
          navigate("/");
        }
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
      {/* LEFT SIDE DESIGN */}
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
            height: "100vh",
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
              color: "#FFFFFF",
            }}
          >
            People pay the doctor for his trouble, for his kindness they still
            remain in his debt
          </Typography>
        </Box>
      </Box>

      {/* RIGHT SIDE FORM */}
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
              fontSize: { xs: "24px", md: "34px" },
              color: "primary.main",
            }}
          >
            Log in
          </Typography>

          {/* Email */}
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{
              width: "90%",
              marginTop: "20px",
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

          {/* Password */}
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{
              width: "90%",
              marginTop: "20px",
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
          <Stack
            direction={"row"}
            sx={{
              width: "90%",
              justifyContent: "space-between",
              alignItems: "center",
              margin: "20px 0",
            }}
          >
            <FormControlLabel
              control={
                <Checkbox
                  sx={{ "& .MuiSvgIcon-root": { color: "primary.main" } }}
                />
              }
              sx={{ color: "#555555" }}
              label="Remember me"
            />
            <Link to="/logIn/forgetpass" style={{ textDecoration: "none" }}>
              <Typography
                sx={{
                  fontWeight: "600",
                  fontSize: { xs: "12px", md: "15px" },
                  color: "primary.main",
                  cursor: "pointer",
                }}
              >
                Forget password?
              </Typography>
            </Link>
          </Stack>

          {/* LOGIN BUTTON */}
          <Button
            variant="contained"
            onClick={handleLogin}
            disabled={loading}
            sx={{
              backgroundColor: "primary.main",
              fontSize: "19px",
              fontWeight: "400",
              width: "90%",
              color: "white",
              textTransform: "none",
            }}
          >
            {loading ? (
              <CircularProgress size={24} sx={{ color: "white" }} />
            ) : (
              "Login"
            )}
          </Button>

          {/* Divider */}
          <Stack
            direction="row"
            alignItems="center"
            spacing={2}
            sx={{ width: "90%", marginY: 3 }}
          >
            <Divider sx={{ flexGrow: 1 }} />
            <Typography
              sx={{
                fontSize: { xs: "12px", md: "22px" },
                fontWeight: 400,
                color: "primary.main",
              }}
            >
              Or
            </Typography>
            <Divider sx={{ flexGrow: 1 }} />
          </Stack>

          {/* Social Login */}
          <Stack direction={"row"} spacing={1} sx={{ width: "90%" }}>
            <Button variant="outlined" sx={{ width: "49%" }}>
              FaceBook
            </Button>
            <Button variant="outlined" sx={{ width: "49%" }}>
              Google
            </Button>
          </Stack>

          <Typography
            sx={{
              fontSize: { xs: "12px", md: "22px" },
              fontWeight: "300",
              marginTop: "20px",
            }}
          >
            Don't have an account?{" "}
            <Link to="/signUp" style={{ textDecoration: "none" }}>
              <span style={{ color: "#52AC8C", cursor: "pointer" }}>
                New Account
              </span>
            </Link>
          </Typography>
        </Stack>
      </Box>
    </Stack>
  );
}
