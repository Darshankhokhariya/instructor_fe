import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_ENDPOINTS, getRequest, postRequest } from "../api/apiRequest";

const initialState = {
    loading: {
        stepOne: false,
        stepTwo: false,
        stepThree: false,
        stepFour: false,
        stepFive: false,
        stepSix: false,
        getOnboardingStep: false,
        getOnboardingStepData: false,
    },
    onboardingStep: null,
    onboardingStepData: null,
    error: null,
};

// User Onboarding Step 1 - Profile
export const userOnboardingStepOne = createAsyncThunk(
    "userOnboarding/stepOne",
    async (fields) => {
        return await postRequest(API_ENDPOINTS.USER_ONBOARDING.STEP_ONE, fields);
    }
);

// User Onboarding Step 2 - Health
export const userOnboardingStepTwo = createAsyncThunk(
    "userOnboarding/stepTwo",
    async (fields) => {
        return await postRequest(API_ENDPOINTS.USER_ONBOARDING.STEP_TWO, fields);
    }
);

// User Onboarding Step 3 - Fitness
export const userOnboardingStepThree = createAsyncThunk(
    "userOnboarding/stepThree",
    async (fields) => {
        return await postRequest(API_ENDPOINTS.USER_ONBOARDING.STEP_THREE, fields);
    }
);

// User Onboarding Step 4 - Lifestyle
export const userOnboardingStepFour = createAsyncThunk(
    "userOnboarding/stepFour",
    async (fields) => {
        return await postRequest(API_ENDPOINTS.USER_ONBOARDING.STEP_FOUR, fields);
    }
);

// User Onboarding Step 5 - Diet
export const userOnboardingStepFive = createAsyncThunk(
    "userOnboarding/stepFive",
    async (fields) => {
        return await postRequest(API_ENDPOINTS.USER_ONBOARDING.STEP_FIVE, fields);
    }
);

// User Onboarding Step 6 - Preferences
export const userOnboardingStepSix = createAsyncThunk(
    "userOnboarding/stepSix",
    async (fields) => {
        return await postRequest(API_ENDPOINTS.USER_ONBOARDING.STEP_SIX, fields);
    }
);

// Get current onboarding step
export const getUserOnboardingStep = createAsyncThunk(
    "userOnboarding/getOnboardingStep",
    async () => {
        return await getRequest(API_ENDPOINTS.USER_ONBOARDING.GET_STEP);
    }
);

// Get onboarding step data
export const getUserOnboardingStepData = createAsyncThunk(
    "userOnboarding/getOnboardingStepData",
    async (step) => {
        return await getRequest(API_ENDPOINTS.USER_ONBOARDING.GET_STEP_DATA(step));
    }
);

const userOnboardingSlice = createSlice({
    name: "userOnboarding",
    initialState,
    reducers: {},

    extraReducers: (builder) => {
        builder
            // Step One
            .addCase(userOnboardingStepOne.pending, (state) => {
                state.loading.stepOne = true;
                state.error = null;
            })
            .addCase(userOnboardingStepOne.fulfilled, (state, action) => {
                state.loading.stepOne = false;
            })
            .addCase(userOnboardingStepOne.rejected, (state, action) => {
                state.loading.stepOne = false;
                state.error = action.payload;
            })

            // Step Two
            .addCase(userOnboardingStepTwo.pending, (state) => {
                state.loading.stepTwo = true;
                state.error = null;
            })
            .addCase(userOnboardingStepTwo.fulfilled, (state, action) => {
                state.loading.stepTwo = false;
            })
            .addCase(userOnboardingStepTwo.rejected, (state, action) => {
                state.loading.stepTwo = false;
                state.error = action.payload;
            })

            // Step Three
            .addCase(userOnboardingStepThree.pending, (state) => {
                state.loading.stepThree = true;
                state.error = null;
            })
            .addCase(userOnboardingStepThree.fulfilled, (state, action) => {
                state.loading.stepThree = false;
            })
            .addCase(userOnboardingStepThree.rejected, (state, action) => {
                state.loading.stepThree = false;
                state.error = action.payload;
            })

            // Step Four
            .addCase(userOnboardingStepFour.pending, (state) => {
                state.loading.stepFour = true;
                state.error = null;
            })
            .addCase(userOnboardingStepFour.fulfilled, (state, action) => {
                state.loading.stepFour = false;
            })
            .addCase(userOnboardingStepFour.rejected, (state, action) => {
                state.loading.stepFour = false;
                state.error = action.payload;
            })

            // Step Five
            .addCase(userOnboardingStepFive.pending, (state) => {
                state.loading.stepFive = true;
                state.error = null;
            })
            .addCase(userOnboardingStepFive.fulfilled, (state, action) => {
                state.loading.stepFive = false;
            })
            .addCase(userOnboardingStepFive.rejected, (state, action) => {
                state.loading.stepFive = false;
                state.error = action.payload;
            })

            // Step Six
            .addCase(userOnboardingStepSix.pending, (state) => {
                state.loading.stepSix = true;
                state.error = null;
            })
            .addCase(userOnboardingStepSix.fulfilled, (state, action) => {
                state.loading.stepSix = false;
            })
            .addCase(userOnboardingStepSix.rejected, (state, action) => {
                state.loading.stepSix = false;
                state.error = action.payload;
            })

            // Get Onboarding Step
            .addCase(getUserOnboardingStep.pending, (state) => {
                state.loading.getOnboardingStep = true;
                state.error = null;
            })
            .addCase(getUserOnboardingStep.fulfilled, (state, action) => {
                state.loading.getOnboardingStep = false;
                state.onboardingStep = action.payload.data;
            })
            .addCase(getUserOnboardingStep.rejected, (state, action) => {
                state.loading.getOnboardingStep = false;
                state.error = action.payload;
            })

            // Get Onboarding Step Data
            .addCase(getUserOnboardingStepData.pending, (state) => {
                state.loading.getOnboardingStepData = true;
                state.error = null;
            })
            .addCase(getUserOnboardingStepData.fulfilled, (state, action) => {
                state.loading.getOnboardingStepData = false;
                state.onboardingStepData = action.payload.data;
            })
            .addCase(getUserOnboardingStepData.rejected, (state, action) => {
                state.loading.getOnboardingStepData = false;
                state.error = action.payload;
            });
    },
});

// Selectors
export const selectUserOnboardingStep = (state) => state.userOnboarding.onboardingStep;
export const selectUserOnboardingStepData = (state) => state.userOnboarding.onboardingStepData;
export const selectUserOnboardingLoading = (state) => state.userOnboarding.loading;

export default userOnboardingSlice.reducer;
