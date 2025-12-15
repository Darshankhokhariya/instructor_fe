"use client";
import { emailRegex } from "@/components/common/constant";
import Input from "@/components/common/Input";
import { userLogin } from "@/redux/slices/userSlice";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { useDispatch } from "react-redux";

const initialState = {
    email: "",
    password: "",
};

export default function Login() {

    const dispatch = useDispatch();
    const router = useRouter();

    const [showPassword, setShowPassword] = useState(false);
    const [fields, setFields] = useState(initialState);
    const [errors, setErrors] = useState({});

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFields((prevState) => ({
            ...prevState,
            [name]: value
        }));
        if (value) {
            setErrors((prevError) => ({ ...prevError, [name]: "" }))
        }
    };

    const handleClear = () => {
        setErrors({});
        setFields(initialState);
        router.push("/instructor/onboarding");
    };

    const handleValidation = async () => {

        let flag = true;
        let errors = {};

        const requiredFields = ["email", "password"];

        requiredFields.forEach((field) => {
            if (!fields[field] || fields[field].trim() === "") {
                flag = false;
                errors[field] = "This field is required!";
            }
        });

        if (fields.email && !emailRegex.test(fields.email)) {
            flag = false;
            errors.email = "Please enter valid email!";
        }

        setErrors(errors);
        return flag;
    };

    const handleSubmit = async () => {
        const response = await handleValidation();
        if (response) {
            await dispatch(userLogin(fields))
                .unwrap()
                .then((res) => {
                    if (res.status === 200) {
                        handleClear();
                        toast.success(res.message || `User login succesfully!`)
                    } else {
                        toast.error(res.message || `User not login!`)
                    }
                }).catch((err) => {
                    toast.error(err || "Something went wrong");
                });
        }
    };

    return (
        // Outer Container: Changed to a soft gradient background
        <div className="min-h-screen from-stone-50 to-stone-200 flex items-center justify-center p-4 md:p-8 font-sans">

            {/* Main Card: Increased roundedness, softer shadow */}
            <div className="bg-white rounded-3xl border border-gray-400/20 drop-shadow-2xl w-full max-w-6xl flex flex-col md:flex-row overflow-hidden">

                {/* LEFT SECTION – Brand & Inspiration */}
                {/* Changed background to a calming green/teal. Added text overlay. */}
                <div className="hidden md:flex md:w-1/2 bg-primary relative items-center justify-center p-12 text-white overflow-hidden">
                    {/* Decor shape */}
                    <div className="absolute -top-20 -left-20 w-64 h-64 bg-primary rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-blob"></div>
                    <div className="absolute -bottom-24 -right-20 w-80 h-80 bg-primary rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-blob animation-delay-2000"></div>

                    <div className="relative z-10 text-left">
                        {/* Replace with a white version of your logo */}
                        {/* <img src="/logo.png" alt="Logo" className="h-12 mb-8" /> */}
                        {/* Temporary Placeholder Logo if image missing */}
                        <div className="text-3xl font-serif font-bold mb-8 tracking-wide"><span className="text-black">Yoga</span>link</div>

                        <h2 className="text-4xl font-serif font-medium leading-tight mb-4">
                            Find your balance, <br /> guide others.
                        </h2>
                        <p className="text-teal-100 text-lg font-light max-w-sm">
                            Welcome back to your instructor dashboard. Manage classes, connect with students, and grow your practice.
                        </p>
                    </div>
                </div>

                {/* RIGHT SECTION – Form */}
                <div className="w-full md:w-1/2 bg-white flex flex-col justify-center px-8 py-12 md:px-16 lg:px-24">

                    <div className="mb-10">
                        <h2 className="text-3xl font-serif font-semibold text-stone-800 mb-2">Welcome Back</h2>
                        <p className="text-stone-500">Please enter your details to sign in.</p>
                    </div>

                    <div className="space-y-6">
                        {/* Email */}
                        <div>
                            <Input
                                label="Email Address"
                                name="email"
                                value={fields.email}
                                placeholder="Enter email address"
                                onChange={handleChange}
                                required
                            />
                            {
                                errors?.email && <span className="text-red-500">{errors?.email}</span>
                            }
                        </div>

                        {/* Password */}
                        <div className="relative">
                            <Input
                                type={showPassword ? "text" : "password"}
                                label="Password"
                                name="password"
                                value={fields.password}
                                placeholder="Enter Password"
                                onChange={handleChange}
                                required
                            />
                            {
                                errors?.password && <span className="text-red-500">{errors?.password}</span>
                            }
                            <button
                                type="button"
                                className="absolute right-4 top-[35px] text-stone-400 hover:text-teal-600 transition-colors"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                            </button>
                        </div>

                        {/* Options */}
                        <div className="flex items-center justify-between text-sm">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="checkbox" className="w-4 h-4 rounded border-stone-300 text-teal-600 focus:ring-teal-500" />
                                <span className="text-stone-600 select-none">Remember me</span>
                            </label>
                        </div>

                        {/* Login Button */}
                        <div className="block">
                            <button
                                type="button"
                                onClick={handleSubmit}
                                className="cursor-pointer w-full bg-primary hover:bg-primary/90 text-white py-3.5 rounded-xl font-semibold text-lg shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
                            >
                                Sign In
                            </button>
                        </div>
                    </div>


                    {/* Google Login */}
                    {/* <button
                        type="button"
                        className="w-full flex items-center justify-center gap-3 bg-white border-2 border-stone-200 text-stone-700 hover:bg-stone-50 hover:border-stone-300 py-3 rounded-xl font-medium transition-all"
                    >
                        <FaGoogle className="text-red-500" size={20} />
                        <span>Sign in with Google</span>
                    </button> */}

                    {/* Footer Link */}
                    <div className="text-center text-stone-500 mt-12">
                        Don’t have an account?{" "}
                        <Link href="/signup" className="block">
                            <div className="text-primary font-bold hover:underline">
                                Create an Account
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div >
    );
}