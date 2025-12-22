import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_ENDPOINTS, postRequest } from "../api/apiRequest";

const initialState = {
  loading: false,
  error: null,
  approverList: null,
  email: null,
};

export const userSignup = createAsyncThunk(
  "user/userSignup",
  async (fields) => {
    return await postRequest(API_ENDPOINTS.AUTH.SIGNUP, fields);
  }
);

export const userLogin = createAsyncThunk(
  "user/userLogin",
  async (fields) => {
    return await postRequest(API_ENDPOINTS.AUTH.LOGIN, fields);
  }
);

export const userVerifyOtp = createAsyncThunk(
  "user/userLogin",
  async (fields) => {
    return await postRequest(API_ENDPOINTS.AUTH.VERIFY_OTP, fields);
  }
);

export const userOnboarding = createAsyncThunk(
  "user/userOnboarding",
  async (fields, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/user/onboarding`,
        fields,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data?.status === 200) {
        return response.data;
      } else {
        return rejectWithValue(
          response.data?.message || "Failed register user!"
        );
      }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Something went wrong"
      );
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setOtpEmail: (state, action) => {
      state.email = action.payload;
    },
  }, // or you can delete this line entirely

  extraReducers: (builder) => {
    builder
      .addCase(userSignup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userSignup.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(userSignup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    builder
      .addCase(userOnboarding.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userOnboarding.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(userOnboarding.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setOtpEmail, clearOtpEmail } = userSlice.actions;

export default userSlice.reducer;
