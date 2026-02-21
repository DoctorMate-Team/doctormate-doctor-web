# Specialty Selection Implementation

## Overview
Implemented specialty selection in the Complete Profile page, allowing doctors to choose their specialty from the API instead of using a hardcoded value.

## Changes Made

### 1. Redux State Management (`src/redux/auth/authSlice.js`)

#### Added `fetchSpecialties` Async Thunk
```javascript
export const fetchSpecialties = createAsyncThunk(
  "auth/fetchSpecialties",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/Specialties");
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch specialties"
      );
    }
  }
);
```

#### Updated Initial State
- Added `specialties: []` to store fetched specialties
- Added `specialtiesLoading: false` to track loading state

#### Added Extra Reducers
- `fetchSpecialties.pending`: Sets loading state
- `fetchSpecialties.fulfilled`: Stores fetched specialties
- `fetchSpecialties.rejected`: Handles errors

### 2. Complete Profile UI (`src/auth/compeleteProfile.jsx`)

#### Updated Imports
- Added `useEffect` hook
- Added `useSelector` hook
- Imported `fetchSpecialties` action

#### Component Enhancements
1. **Fetch Specialties on Mount**
   ```javascript
   useEffect(() => {
     dispatch(fetchSpecialties());
   }, [dispatch]);
   ```

2. **Get Specialties from Redux**
   ```javascript
   const { specialties, specialtiesLoading } = useSelector((state) => state.auth);
   ```

3. **Updated Form State**
   - Changed `specialtyId: storedUser?.id || ""` to `specialtyId: ""`
   - Now properly uses the selected specialty UUID

4. **Added Specialty Validation**
   ```javascript
   if (!formData.specialtyId?.trim()) {
     newErrors.specialtyId = "Specialty is required";
   }
   ```

5. **Added Specialty Select Field**
   - Displays specialty names in dropdown
   - Shows loading state while fetching
   - Stores specialty UUID in formData
   - Includes error handling and validation

## API Integration

### Endpoint
- **GET** `/api/Specialties`
- **Headers**: `Authorization: Bearer {token}`

### Response Format
```json
{
  "data": [
    {
      "id": "UUID-string",
      "name": "Cardiology",
      "description": "Heart specialists",
      "imageUrl": "https://..."
    }
  ]
}
```

### Complete Profile Request
```json
{
  "specialtyId": "selected-specialty-uuid",
  "qualifications": "...",
  "licenseNumber": "...",
  "consultationFee": 100,
  "address": "...",
  "startWorkingTime": "09:00:00",
  "endWorkingTime": "17:00:00",
  "workingDays": ["Monday", "Tuesday", "Wednesday"]
}
```

## User Experience

1. **On Page Load**: Specialties are automatically fetched from API
2. **Loading State**: Shows "Loading specialties..." while fetching
3. **Selection**: Doctor selects specialty from dropdown showing specialty names
4. **Validation**: Form validates that a specialty is selected before submission
5. **Submission**: Selected specialty UUID is included in the complete profile request

## Features

- ✅ Automatic specialty fetching on component mount
- ✅ Loading indicator during fetch
- ✅ Dropdown shows specialty names (user-friendly)
- ✅ Stores specialty UUID (API requirement)
- ✅ Form validation for required specialty
- ✅ Error handling for failed requests
- ✅ Consistent styling with other form fields

## Testing Checklist

- [ ] Specialties load on page mount
- [ ] Loading state displays correctly
- [ ] Specialty names appear in dropdown
- [ ] Selecting a specialty updates form state
- [ ] Validation shows error when specialty not selected
- [ ] Selected specialtyId (UUID) is sent to API
- [ ] Complete profile submission works with specialty selection
