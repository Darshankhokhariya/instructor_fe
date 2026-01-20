import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import onboardingReducer from "./slices/onboardingSlice";
import userOnboardingReducer from "./slices/userOnboardingSlice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        onboarding: onboardingReducer,
        userOnboarding: userOnboardingReducer,
    },
});
