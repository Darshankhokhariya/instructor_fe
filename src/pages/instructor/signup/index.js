"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import Link from "next/link";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import Input from "@/components/common/Input";
import { emailRegex } from "@/components/common/constant";
import { InstructorSignup, setOtpEmail } from "@/redux/slices/userSlice";
import Loader from "@/components/common/Loader";

const initialState = {
  name: "",
  email: "",
  mobile: "",
  password: "",
  cpassword: "",
};

export default function Register() {
  const dispatch = useDispatch();
  const router = useRouter();

  const [fields, setFields] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setloading] = useState(false);

  // ========================
  // HANDLE CHANGE
  // ========================
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "mobile" && !/^\d+$/.test(value)) {
      return; // block non-numeric input
    }
    setFields((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // VALIDATION
  // ========================
  const handleValidation = () => {
    let errors = {};

    if (!fields.name.trim()) {
      errors.name = "Full name is required";
    }

    if (!fields.email.trim()) {
      errors.email = "Email address is required";
    } else if (!emailRegex.test(fields.email)) {
      errors.email = "Enter a valid email address";
    }

    if (!fields.mobile.trim()) {
      errors.mobile = "Mobile number is required";
    } else if (!/^[0-9]{10}$/.test(fields.mobile)) {
      errors.mobile = "Mobile number must be exactly 10 digits";
    }

    if (!fields.password) {
      errors.password = "Password is required";
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#]).{8,}$/.test(
        fields.password
      )
    ) {
      errors.password =
        "Password must be at least 8 characters and include uppercase, lowercase, number & special character";
    }

    if (!fields.cpassword) {
      errors.cpassword = "Confirm password is required";
    } else if (fields.password !== fields.cpassword) {
      errors.cpassword = "Passwords do not match";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // ========================
  // SUBMIT
  // ========================
  const handleSubmit = async (e) => {
    e.preventDefault(); // Enables ENTER key

    if (!handleValidation()) return;

    try {
      const { cpassword, ...payload } = fields;
      payload.role = "instructor";
      setloading(true);
      const res = await dispatch(InstructorSignup(payload)).unwrap();

      if (res?.status === 200) {
        dispatch(setOtpEmail(fields.email));
        toast.success(res.message || "Registration successful");
        router.push("/instructor/otp");
      } else {
        toast.error(res.message || "Registration failed");
      }
      setloading(false);
    } catch (error) {
      toast.error(error?.message || "Something went wrong");
      setloading(false);
    }
  };

  // ========================
  // UI
  // ========================
  return (
    <>
      {loading && <Loader />}
      <div className="h-screen  bg-[#f8fafc] flex items-center justify-center px-4" >
        <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl grid grid-cols-1 md:grid-cols-2 overflow-hidden">

          {/* LEFT – IMAGE / BRAND */}
          <div
            className="relative hidden md:flex flex-col justify-between p-6 text-white bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://img.freepik.com/premium-photo/yoga-picture_1178160-721.jpg')",
            }}
          >
            {/* Overlay */}
            <div className="absolute inset-0 bg-linear-to-br from-[#0f766e]/90 to-[#115e59]/90" />

            {/* Optional soft highlights */}
            <div className="absolute top-[-80px] left-[-80px] w-72 h-72 bg-white/20 rounded-full blur-3xl" />
            <div className="absolute bottom-[-80px] right-[-80px] w-96 h-96 bg-black/20 rounded-full blur-3xl" />

            {/* Content */}
            <div className="relative z-10">
              <h1 className="text-22xl font-serif font-bold tracking-wide">
                Yogalink
              </h1>

              <h2 className="mt-10 text-4xl font-serif leading-tight">
                Turn your yoga <br />
                knowledge into a <br />
                <span className="text-teal-200">professional journey</span>
              </h2>

              <p className="mt-6 text-teal-100 text-lg max-w-md">
                A modern platform for certified instructors to manage classes,
                connect with students, and grow globally.
              </p>
            </div>
          </div>


          {/* RIGHT – FORM */}
          <div className="px-8 py-6 md:px-16 lg:px-20 flex flex-col justify-center">
            <div className="mb-10">
              <h2 className="text-3xl font-semibold text-gray-900">
                Create your account
              </h2>
              <p className="text-gray-500 mt-2">
                Join as a certified yoga instructor
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Full Name"
                name="name"
                value={fields.name}
                onChange={handleChange}
                placeholder="John Doe"
                error={errors.name}
              />

              <Input
                label="Email Address"
                name="email"
                value={fields.email}
                onChange={handleChange}
                placeholder="john@email.com"
                error={errors.email}
              />


              <Input
                label="Mobile Number"
                name="mobile"
                value={fields.mobile}
                onChange={handleChange}
                placeholder="9876543210"
                error={errors.mobile}
              />


              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  label="Password"
                  name="password"
                  value={fields.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  error={errors.password}
                />
                <button
                  type="button"
                  className="absolute right-4 top-[38px] text-gray-400"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </button>

              </div>

              <div className="relative">
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  label="Confirm Password"
                  name="cpassword"
                  value={fields.cpassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  error={errors.cpassword}
                />
                <button
                  type="button"
                  className="absolute right-4 top-[38px] text-gray-400"
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                >
                  {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
                </button>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full cursor-pointer bg-[#0f766e] hover:bg-[#115e59] text-white py-3.5 rounded-xl font-semibold text-lg transition-all shadow-lg hover:shadow-xl"
              >
                Create Account
              </button>
            </form>

            <p className="text-center text-gray-500 mt-8">
              Already have an account?{" "}
              <Link
                disabled={loading}
                href="/instructor/login"
                className="text-[#0f766e] font-semibold hover:underline"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
