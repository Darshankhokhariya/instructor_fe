import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    loading: false,
    error: null,
    approverList: null,
};

export const userSignup = createAsyncThunk(
    "user/userSignup",
    async (fields, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/api/user/signup`,
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
                return rejectWithValue(response.data?.message || "Failed register user!");
            }
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Something went wrong");
        }
    }
);

export const userLogin = createAsyncThunk(
    "user/userLogin",
    async (fields, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/api/user/userLogin`,
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
                return rejectWithValue(response.data?.message || "Failed login user!");
            }
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Something went wrong");
        }
    }
);
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {}, // or you can delete this line entirely

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
    },
});

export default userSlice.reducer;
