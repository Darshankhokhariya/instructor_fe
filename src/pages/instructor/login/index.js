"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import Link from "next/link";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Input from "@/components/common/Input";
import { emailRegex } from "@/components/common/constant";
import { InstructorLogin } from "@/redux/slices/userSlice";

const initialState = {
  email: "",
  password: "",
};

export default function Login() {
  const dispatch = useDispatch();
  const router = useRouter();

  const [fields, setFields] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState(false);

  /* ---------------------- Handlers ---------------------- */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFields((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    let temp = {};
    let valid = true;

    if (!fields.email.trim()) {
      temp.email = "Email is required";
      valid = false;
    } else if (!emailRegex.test(fields.email)) {
      temp.email = "Enter a valid email address";
      valid = false;
    }

    if (!fields.password.trim()) {
      temp.password = "Password is required";
      valid = false;
    }

    setErrors(temp);
    return valid;
  };

  const handleSubmit = async () => {
    setTouched(true);

    if (!validate()) return;

    setLoading(true);

    try {
      const res = await dispatch(InstructorLogin(fields)).unwrap();

      // ✅ API safety check
      if (res?.status !== 200) {
        toast.error(res?.message || "Login failed");
        return;
      }

      // ✅ Store data
      localStorage.setItem("token", res?.data?.token);
      localStorage.setItem("role", res?.data?.role);
      localStorage.setItem("email", fields?.email);

      // ✅ Not verified → OTP
      if (res?.data?.isVerified === 0) {
        router.push("/instructor/otp");
        return;
      }

      // ✅ Onboarding check
      if (
        res?.data?.isVerified === 1 &&
        !res?.data?.is_onboarding_completed
      ) {
        if (res?.data?.role === "instructor") {
          router.push("/instructor/onboarding");
        } else if (res?.data?.role === "manager") {
          router.push("/manager/dashboard");
        } else if (res?.data?.role === "admin") {
          router.push("/admin/dashboard");
        } else {
          router.push("/onboarding");
        }

        toast.success(res?.message || "Login successful");
        return;
      }

      // ✅ Fully onboarded → Home
      router.push("/instructor/verification");
      toast.success(res?.message || "Login successful");

      // optional
      // handleClear();

    } catch (err) {
      toast.error(
        err?.message || err || "Invalid email or password"
      );
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-stone-50 to-stone-200 p-4 md:p-8">
      <div className="w-full max-w-6xl bg-white rounded-3xl border border-gray-200 shadow-2xl overflow-hidden flex flex-col md:flex-row">

        {/* LEFT BRAND SECTION */}
        <div
          className="hidden md:flex md:w-1/2 p-12 text-white relative bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://img.freepik.com/premium-photo/yoga-picture_1178160-721.jpg')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#0f766e]/90 to-[#115e59]/90" />

          <div className="relative z-10">
            <h1 className="text-3xl font-serif font-bold tracking-wide mb-10">
              Yogalink
            </h1>

            <h2 className="text-4xl font-serif leading-tight mb-4">
              Find your balance,
              <br /> guide others.
            </h2>

            <p className="text-teal-100 text-lg max-w-md">
              Manage classes, connect with students, and grow your yoga career
              globally.
            </p>
          </div>
        </div>

        {/* RIGHT FORM SECTION */}
        <div className="w-full md:w-1/2 px-8 py-12 md:px-16 lg:px-24 flex flex-col justify-center">
          <div className="mb-10">
            <h2 className="text-3xl font-serif font-semibold text-stone-800">
              Welcome Back
            </h2>
            <p className="text-stone-500 mt-1">
              Enter your credentials to continue
            </p>
          </div>

          <form
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleSubmit();
              }
            }}
            className="space-y-6"
          >
            {/* Email */}
            <div>
              <Input
                label="Email Address"
                name="email"
                value={fields.email}
                placeholder="Enter email"
                onChange={handleChange}
                required
              />
              {touched && errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                label="Password"
                name="password"
                value={fields.password}
                placeholder="Enter password"
                onChange={handleChange}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-[38px] text-stone-400 hover:text-teal-600"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
              {touched && errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            {/* Button */}
            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className={`w-full py-3.5 rounded-xl font-semibold text-lg text-white transition-all
                ${loading
                  ? "bg-primary/70 cursor-not-allowed"
                  : "bg-primary hover:bg-primary/90 hover:-translate-y-0.5"
                }`}
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          {/* Footer */}
          <div className="text-center mt-10 text-stone-500">
            Don’t have an account?
            <Link
              href="/instructor/signup"
              className="block mt-1 font-semibold text-primary hover:underline"
            >
              Create an account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
