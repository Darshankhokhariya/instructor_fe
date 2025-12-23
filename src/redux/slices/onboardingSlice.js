import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_ENDPOINTS, getRequest, postRequest } from "../api/apiRequest";

const initialState = {
  loading: {
    stepOne: false,
    stepTwo: false,
    stepThree: false,
    stepFour: false,
    stepFive: false,
    stepSixth: false,
    stepSeven: false,
    stepEight: false,
    userOnboarding: false,
    getOnboardingStep: false,
    getOnboardingStepData: false,
  },
  onboardingStep: null,
  onboardingStepData: null,
  error: null,
  approverList: null,
  email: null,
};

export const onboardingStepOne = createAsyncThunk(
  "onboarding/stepOne",
  async (fields) => {
    return await postRequest(API_ENDPOINTS.ONBOARDING.STEP_ONE, fields);
  }
);

export const onboardingStepTwo = createAsyncThunk(
  "onboarding/stepTwo",
  async (fields) => {
    return await postRequest(API_ENDPOINTS.ONBOARDING.STEP_TWO, fields);
  }
);

export const onboardingStepThree = createAsyncThunk(
  "onboarding/onboardingStepThree",
  async (fields) => {
    return await postRequest(API_ENDPOINTS.ONBOARDING.STEP_THREE, fields);
  }
);

export const onboardingStepFour = createAsyncThunk(
  "onboarding/onboardingStepFour",
  async (fields) => {
    return await postRequest(API_ENDPOINTS.ONBOARDING.STEP_FOUR, fields);
  }
);

export const onboardingStepFive = createAsyncThunk(
  "onboarding/onboardingStepFive",
  async (fields) => {
    return await postRequest(API_ENDPOINTS.ONBOARDING.STEP_FIVE, fields);
  }
);

export const onboardingStepSixth = createAsyncThunk(
  "onboarding/onboardingStepSixth",
  async (fields) => {
    return await postRequest(API_ENDPOINTS.ONBOARDING.STEP_SIXTH, fields);
  }
);

export const onboardingStepSeven = createAsyncThunk(
  "onboarding/onboardingStepSeven",
  async (fields) => {
    return await postRequest(API_ENDPOINTS.ONBOARDING.STEP_SEVEN, fields);
  }
);

export const onboardingStepEight = createAsyncThunk(
  "onboarding/onboardingStepEight",
  async (fields) => {
    return await postRequest(API_ENDPOINTS.ONBOARDING.STEP_EIGHT, fields);
  }
);

export const getOnboardingStep = createAsyncThunk(
  "onboarding/getOnboardingStep",
  async () => {
    return await getRequest(API_ENDPOINTS.ONBOARDING.GET_STEP);
  }
);

export const getOnboardingStepData = createAsyncThunk(
  "onboarding/getOnboardingStepData",
  async (step) => {
    return await getRequest(API_ENDPOINTS.ONBOARDING.GET_STEP_DATA(step));
  }
);

const onboardingSlice = createSlice({
  name: "onboarding",
  initialState,
  reducers: {}, // or you can delete this line entirely

  extraReducers: (builder) => {
    builder
      .addCase(onboardingStepOne.pending, (state) => {
        state.loading.stepOne = true;
        state.error = null;
      })
      .addCase(onboardingStepOne.fulfilled, (state, action) => {
        state.loading.stepOne = false;
      })
      .addCase(onboardingStepOne.rejected, (state, action) => {
        state.loading.stepOne = false;
        state.error = action.payload;
      });
    builder
      .addCase(onboardingStepTwo.pending, (state) => {
        state.loading.stepTwo = true;
        state.error = null;
      })
      .addCase(onboardingStepTwo.fulfilled, (state, action) => {
        state.loading.stepTwo = false;
      })
      .addCase(onboardingStepTwo.rejected, (state, action) => {
        state.loading.stepTwo = false;
        state.error = action.payload;
      });
    builder
      .addCase(onboardingStepThree.pending, (state) => {
        state.loading.stepThree = true;
        state.error = null;
      })
      .addCase(onboardingStepThree.fulfilled, (state, action) => {
        state.loading.stepThree = false;
      })
      .addCase(onboardingStepThree.rejected, (state, action) => {
        state.loading.stepThree = false;
        state.error = action.payload;
      });
    builder
      .addCase(onboardingStepFour.pending, (state) => {
        state.loading.stepFour = true;
        state.error = null;
      })
      .addCase(onboardingStepFour.fulfilled, (state, action) => {
        state.loading.stepFour = false;
      })
      .addCase(onboardingStepFour.rejected, (state, action) => {
        state.loading.stepFour = false;
        state.error = action.payload;
      });
    builder
      .addCase(onboardingStepFive.pending, (state) => {
        state.loading.stepFive = true;
        state.error = null;
      })
      .addCase(onboardingStepFive.fulfilled, (state, action) => {
        state.loading.stepFive = false;
      })
      .addCase(onboardingStepFive.rejected, (state, action) => {
        state.loading.stepFive = false;
        state.error = action.payload;
      });
    builder
      .addCase(onboardingStepSixth.pending, (state) => {
        state.loading.stepSixth = true;
        state.error = null;
      })
      .addCase(onboardingStepSixth.fulfilled, (state, action) => {
        state.loading.stepSixth = false;
      })
      .addCase(onboardingStepSixth.rejected, (state, action) => {
        state.loading.stepSixth = false;
        state.error = action.payload;
      });
    builder
      .addCase(onboardingStepSeven.pending, (state) => {
        state.loading.stepSeven = true;
        state.error = null;
      })
      .addCase(onboardingStepSeven.fulfilled, (state, action) => {
        state.loading.stepSeven = false;
      })
      .addCase(onboardingStepSeven.rejected, (state, action) => {
        state.loading.stepSeven = false;
        state.error = action.payload;
      });
    builder
      .addCase(onboardingStepEight.pending, (state) => {
        state.loading.stepEight = true;
        state.error = null;
      })
      .addCase(onboardingStepEight.fulfilled, (state, action) => {
        state.loading.stepEight = false;
      })
      .addCase(onboardingStepEight.rejected, (state, action) => {
        state.loading.stepEight = false;
        state.error = action.payload;
      });
    builder
      .addCase(getOnboardingStep.pending, (state) => {
        state.loading.getOnboardingStep = true;
        state.error = null;
      })
      .addCase(getOnboardingStep.fulfilled, (state, action) => {
        state.loading.getOnboardingStep = false;
        state.onboardingStep = action.payload.data;
      })
      .addCase(getOnboardingStep.rejected, (state, action) => {
        state.loading.getOnboardingStep = false;
        state.error = action.payload;
      });
    builder
      .addCase(getOnboardingStepData.pending, (state) => {
        state.loading.onboardingStepData = true;
        state.error = null;
      })
      .addCase(getOnboardingStepData.fulfilled, (state, action) => {
        state.loading.getOnboardingStepData = false;
        state.onboardingStepData = action.payload.data;
      })
      .addCase(getOnboardingStepData.rejected, (state, action) => {
        state.loading.getOnboardingStepData = false;
        state.error = action.payload;
      });
  },
});
export const selectOnboardingStep = (state) => state.onboarding.onboardingStep;
export const selectOnboardingStepData = (state) =>
  state.onboarding.onboardingStepData;

export default onboardingSlice.reducer;
