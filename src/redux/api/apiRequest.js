import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const postRequest = async (url, data) => {
  try {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;

    const response = await api.post(url, data, {
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });

    if (response.data?.status === 200) {
      return response.data;
    }

    return new Error(response.data?.message || "Request failed");
  } catch (error) {
    throw new Error(
      error.response?.data?.message || error.message || "Something went wrong"
    );
  }
};

export const putRequest = async (url, data) => {
  try {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;

    const response = await api.put(url, data, {
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });

    if (response.data?.status === 200) {
      return response.data;
    }

    return new Error(response.data?.message || "Request failed");
  } catch (error) {
    throw new Error(
      error.response?.data?.message || error.message || "Something went wrong"
    );
  }
};

export const getRequest = async (url, params = {}) => {
  try {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;

    const response = await api.get(url, {
      params,
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });

    return response;
  } catch (error) {
    throw error;
  }
};

// API endpoints configuration
export const API_ENDPOINTS = {
  // Auth
  AUTH: {
    LOGIN: "/user/userLogin",
    SIGNUP: "/user/signup",
    VERIFY_OTP: "/user/otpVerify",
  },

  USER: {
    GET_USERS: (page, limit) => `/user/getAllUsers?page=${page}&limit=${limit}`,
    GET_SINGLE_USERS: (id) => `/user/getSingleUsers?id=${id}`,
  },
  
  ADMIN: {
    CHANGE_STATUS: `/admin/approveInstructor`,
    SHEDULE_INTERVIEW: `/admin/editScheduleLink`,
  },

  ONBOARDING: {
    GET_STEP: `/onBoarding/getStep`,
    GET_STEP_DATA: (step) => `/onBoarding/getStepData?step=${step}`,
    STEP_ONE: `/onBoarding/step1`,
    STEP_TWO: `/onBoarding/step2`,
    STEP_THREE: `/onBoarding/step3`,
    STEP_FOUR: `/onBoarding/step4`,
    STEP_FIVE: `/onBoarding/step5`,
    STEP_SIXTH: `/onBoarding/step6`,
    STEP_SEVEN: `/onBoarding/step7`,
    STEP_EIGHT: `/onBoarding/step8`,
  },
};
