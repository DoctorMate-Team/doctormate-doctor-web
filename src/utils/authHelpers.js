/**
 * Authentication Helper Functions
 * Use these functions throughout your application for auth-related tasks
 */

// Get the current user from localStorage
export const getCurrentUser = () => {
  try {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error("Error parsing user data:", error);
    return null;
  }
};

// Get the current token
export const getToken = () => {
  return localStorage.getItem("token");
};

// Check if user is authenticated
export const isAuthenticated = () => {
  const token = getToken();
  const user = getCurrentUser();
  return !!(token && user);
};

// Get user role
export const getUserRole = () => {
  const user = getCurrentUser();
  return user?.role || null;
};

// Get user ID
export const getUserId = () => {
  const user = getCurrentUser();
  return user?.id || null;
};

// Check if user profile is completed
export const isProfileCompleted = () => {
  const user = getCurrentUser();
  return user?.isCompletedProfile === true;
};

// Check if user is verified
export const isUserVerified = () => {
  const user = getCurrentUser();
  return user?.isVerified === true;
};

export default {
  getCurrentUser,
  getToken,
  isAuthenticated,
  getUserRole,
  getUserId,
  isProfileCompleted,
  isUserVerified,
};
