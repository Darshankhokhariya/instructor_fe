import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {
  API_ENDPOINTS,
  getRequest,
  postRequest,
  putRequest,
} from "../api/apiRequest";

const initialState = {
  getUsers: false,
  error: null,
  approverList: null,
  email: null,
  users: {
    loading: false,
    data: null,
  },
  managers: {
    loading: false,
    data: null,
  },
  loading: {
    approve: false,
    sheduleInterview: false,
    createManager: false,
  },
  user: null,
};

export const userSignup = createAsyncThunk(
  "user/userSignup",
  async (fields) => {
    return await postRequest(API_ENDPOINTS.AUTH.SIGNUP, fields);
  }
);

export const userLogin = createAsyncThunk("user/userLogin", async (fields) => {
  return await postRequest(API_ENDPOINTS.AUTH.LOGIN, fields);
});

export const userVerifyOtp = createAsyncThunk(
  "user/userLogin",
  async (fields) => {
    return await postRequest(API_ENDPOINTS.AUTH.VERIFY_OTP, fields);
  }
);

export const changeUserStatus = createAsyncThunk(
  "admin/changeUserStatus",
  async (fields) => {
    return await postRequest(API_ENDPOINTS.ADMIN.CHANGE_STATUS, fields);
  }
);

export const getUsers = createAsyncThunk(
  "user/getUsers",
  async ({ page, limit }) => {
    return await getRequest(API_ENDPOINTS.USER.GET_USERS(page, limit));
  }
);

export const getSingleUser = createAsyncThunk(
  "user/getSingleUser",
  async (id) => {
    return await getRequest(API_ENDPOINTS.USER.GET_SINGLE_USERS(id));
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

export const sheduleInterview = createAsyncThunk(
  "admin/sheduleInterview",
  async (fields) => {
    return await putRequest(API_ENDPOINTS.ADMIN.SHEDULE_INTERVIEW, fields);
  }
);

export const createManager = createAsyncThunk(
  "admin/createManager",
  async (fields) => {
    return await postRequest(API_ENDPOINTS.ADMIN.ADMIN_SIGNUP, fields);
  }
);

export const editManager = createAsyncThunk(
  "admin/editManager",
  async (fields) => {
    return await putRequest(API_ENDPOINTS.ADMIN.EDIT_MANAGER, fields);
  }
);

export const getManagers = createAsyncThunk(
  "admin/getManagers",
  async ({ page, limit, role = "manager" }) => {
    return await getRequest(
      API_ENDPOINTS.ADMIN.GET_MANAGERS_BY_ROLE(page, limit, role)
    );
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
    builder
      .addCase(getUsers.pending, (state) => {
        state.users.loading = true;
        state.error = null;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.users.loading = false;
        state.users.data = action.payload?.data?.data ?? [];
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.users.loading = false;
        state.error = action.payload;
      });
    builder
      .addCase(changeUserStatus.pending, (state) => {
        state.loading.approve = true;
        state.error = null;
      })
      .addCase(changeUserStatus.fulfilled, (state, action) => {
        state.loading.approve = false;
        // state.users.data = action.payload?.data?.data ?? [];
      })
      .addCase(changeUserStatus.rejected, (state, action) => {
        state.loading.approve = false;
        state.error = action.payload;
      });
    builder
      .addCase(getSingleUser.pending, (state) => {
        state.loading.approve = true;
        state.error = null;
      })
      .addCase(getSingleUser.fulfilled, (state, action) => {
        state.loading.approve = false;
        state.user = action.payload.data.data;
      })
      .addCase(getSingleUser.rejected, (state, action) => {
        state.loading.approve = false;
        state.error = action.payload;
      });
    builder
      .addCase(sheduleInterview.pending, (state) => {
        state.loading.approve = true;
        state.error = null;
      })
      .addCase(sheduleInterview.fulfilled, (state, action) => {
        state.loading.sheduleInterview = false;
      })
      .addCase(sheduleInterview.rejected, (state, action) => {
        state.loading.approve = false;
        state.error = action.payload;
      });
    builder
      .addCase(createManager.pending, (state) => {
        state.loading.createManager = true;
        state.error = null;
      })
      .addCase(createManager.fulfilled, (state, action) => {
        state.loading.createManager = false;
      })
      .addCase(createManager.rejected, (state, action) => {
        state.loading.createManager = false;
        state.error = action.payload;
      });
    builder
      .addCase(getManagers.pending, (state) => {
        state.managers.loading = true;
        state.error = null;
      })
      .addCase(getManagers.fulfilled, (state, action) => {
        state.managers.loading = false;
        state.managers.data = action.payload?.data?.data ?? [];
      })
      .addCase(getManagers.rejected, (state, action) => {
        state.managers.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setOtpEmail, clearOtpEmail } = userSlice.actions;
export const selectUsers = (state) => state.user.users;
export const selectManagers = (state) => state.user.managers;
export const selectStatusLoading = (state) => state.user.loading.approve;
export const selectScheduleLoading = (state) =>
  state.user.loading.sheduleInterview;
export const selectCreateManagerLoading = (state) =>
  state.user.loading.createManager;
export const selectUser = (state) => state.user.user;

export default userSlice.reducer;
