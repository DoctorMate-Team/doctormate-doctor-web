# Authentication System Documentation

## Overview
This application now has a complete authentication system with:
- ✅ Token storage in localStorage
- ✅ Automatic token injection in all API requests
- ✅ Protected routes for authenticated users
- ✅ Auto-redirect on token expiration (401 errors)
- ✅ User state persistence across page refreshes

## Key Files Created/Updated

### 1. **API Utility** (`src/utils/api.js`)
- Axios instance with base URL configuration
- Request interceptor: Automatically adds token to all requests
- Response interceptor: Handles 401 errors and redirects to login

### 2. **Auth Helpers** (`src/utils/authHelpers.js`)
Utility functions for authentication:
```javascript
import { getCurrentUser, getToken, isAuthenticated } from '../utils/authHelpers';

const user = getCurrentUser();    // Get current user object
const token = getToken();          // Get auth token
const isAuth = isAuthenticated();  // Check if user is logged in
```

### 3. **Protected Route Component** (`src/components/ProtectedRoute.jsx`)
Wraps routes that require authentication. Automatically:
- Redirects to login if no token
- Redirects to OTP if user not verified
- Redirects to complete profile if profile not completed

### 4. **Logout Button Component** (`src/components/LogoutButton.jsx`)
Example component showing how to implement logout functionality.

### 5. **Updated Redux Auth Slice** (`src/redux/auth/authSlice.js`)
New features:
- `logout()` action - Clears token and user data
- `setUser()` action - Updates user in state and localStorage
- State initialized from localStorage on app load

## How to Use

### Making API Requests

**Before (manual token handling):**
```javascript
import axios from 'axios';

const token = localStorage.getItem("token");
const response = await axios.get(
  "https://doctormate.runasp.net/api/doctor/patients",
  {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
);
```

**After (automatic token handling):**
```javascript
import api from '../utils/api';

const response = await api.get("/doctor/patients");
// Token is automatically included!
```

### Implementing Logout

```javascript
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/auth/authSlice";

function MyComponent() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/logIn");
  };

  return <button onClick={handleLogout}>Logout</button>;
}
```

### Protecting Routes

Routes are already protected in `App.jsx`. All dashboard routes require authentication:

```javascript
<Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
<Route path="/patients" element={<ProtectedRoute><Patients /></ProtectedRoute>} />
// etc...
```

### Getting Current User Info

```javascript
import { getCurrentUser, getUserRole } from '../utils/authHelpers';

function MyComponent() {
  const user = getCurrentUser();
  const role = getUserRole();

  return (
    <div>
      <p>Welcome, {user?.fullName}</p>
      <p>Role: {role}</p>
    </div>
  );
}
```

### Using Redux Auth State

```javascript
import { useSelector } from 'react-redux';

function MyComponent() {
  const { user, token, loading, error } = useSelector(state => state.auth);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return <div>Welcome, {user?.fullName}</div>;
}
```

## Authentication Flow

1. **Login/Signup**: User credentials sent to API
2. **Token Received**: Token and user data saved to:
   - Redux state
   - localStorage (persists across refreshes)
3. **Protected Routes**: Component checks for token/user
4. **API Requests**: Token automatically attached via interceptor
5. **Token Expiry**: 401 error triggers auto-logout and redirect
6. **Logout**: Clears all auth data and redirects to login

## Updated Redux Files

All Redux slice files now use the `api` utility instead of axios:
- ✅ `redux/auth/authSlice.js`
- ✅ `redux/overViews/overView.js`
- ✅ `redux/schedule/schedule.js`
- ✅ `redux/schedule/appoinmantDetals.js`
- ✅ `redux/schedule/addDiagnoses.js`
- ✅ `redux/schedule/addMedicaql.js`
- ✅ `redux/schedule/addpresipration.js`
- ✅ `redux/doctor/doctor.js`
- ✅ `redux/doctor/profileMangment.js`
- ✅ `redux/patientList/patientList.js`

## Security Features

- 🔒 Token stored securely in localStorage
- 🔒 Automatic logout on token expiration
- 🔒 Protected routes prevent unauthorized access
- 🔒 Centralized API configuration
- 🔒 Automatic token refresh on page reload

## Next Steps (Optional Enhancements)

1. **Token Refresh**: Implement refresh token logic
2. **Remember Me**: Add option to persist login longer
3. **Loading States**: Add global loading indicator for auth checks
4. **Error Handling**: Implement toast notifications for errors
5. **Session Timeout**: Add idle timeout detection

## Troubleshooting

**Issue**: Token not being sent with requests
- Check that you're using `import api from '../utils/api'` instead of axios

**Issue**: Redirecting to login on every refresh
- Clear localStorage and login again
- Check browser console for errors in user data parsing

**Issue**: Protected routes not working
- Ensure user data in localStorage is valid JSON
- Check that `isVerified` and `isCompletedProfile` fields exist

## Example: Adding New API Calls

```javascript
// src/redux/myFeature/mySlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";

export const fetchMyData = createAsyncThunk(
  "myFeature/fetchMyData",
  async (params, { rejectWithValue }) => {
    try {
      // Token is automatically included
      const response = await api.get("/my-endpoint");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error occurred");
    }
  }
);

// POST request example
export const createMyData = createAsyncThunk(
  "myFeature/createMyData",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post("/my-endpoint", data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error occurred");
    }
  }
);
```

---

**That's it!** Your authentication system is fully set up and ready to use. 🎉
