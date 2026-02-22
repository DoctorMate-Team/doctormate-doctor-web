import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/auth/authSlice";
import LogoutIcon from "@mui/icons-material/Logout";

/**
 * Example Logout Button Component
 * You can use this in your navbar or settings page
 * 
 * Usage:
 * import LogoutButton from "../components/LogoutButton";
 * <LogoutButton />
 */
const LogoutButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Dispatch the logout action to clear auth state and localStorage
    dispatch(logout());
    
    // Navigate to login page
    navigate("/logIn");
    
    // Optional: Show a success message
    // alert("Logged out successfully");
  };

  return (
    <Button
      variant="outlined"
      color="error"
      startIcon={<LogoutIcon />}
      onClick={handleLogout}
      sx={{
        textTransform: "none",
        borderRadius: 2,
      }}
    >
      Logout
    </Button>
  );
};

export default LogoutButton;
