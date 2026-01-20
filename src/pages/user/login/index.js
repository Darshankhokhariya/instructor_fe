"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import Link from "next/link";
import toast from "react-hot-toast";
import {
    LuEye,
    LuEyeOff,
    LuFlower2,
    LuArrowRight,
} from "react-icons/lu";
import { BiLoader } from "react-icons/bi";
import { GrGoogle } from "react-icons/gr";
import Input from "@/components/common/Input";
import { emailRegex } from "@/components/common/constant";
import { UserLogin } from "@/redux/slices/userSlice";

export default function Login() {
    const dispatch = useDispatch();
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState(false);

    const validate = () => {
        const newErrors = {};
        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = "Enter a valid email address";
        }

        if (!formData.password.trim()) {
            newErrors.password = "Password is required";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setTouched(true);

        if (!validate()) return;
        setLoading(true);
        try {
            const res = await dispatch(UserLogin(formData)).unwrap();
            if (res?.status !== 200) {
                toast.error(res?.message || "Login failed");
                return;
            }
            console.log('res', res)
            localStorage.setItem("token", res?.data?.token);
            localStorage.setItem("email", formData?.email);
            router.push("/user/onboarding");
            toast.success(res?.message || "Login successful");

        } catch (err) {
            toast.error(
                err?.message || err || "Invalid email or password"
            );
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-emerald-100 p-4 relative overflow-hidden">
            {/* Ambient background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute -top-32 -right-32 w-96 h-96 bg-primary-200/30 rounded-full blur-3xl" />
                <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-primary-300/20 rounded-full blur-3xl" />
            </div>

            <div className="relative w-full max-w-md">
                {/* Card */}
                <div className="bg-white/90 backdrop-blur rounded-3xl shadow-2xl border border-slate-100 p-8">
                    <div className="text-center mb-8">
                        <Link href="/" className="inline-flex items-center gap-2">
                            <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/30">
                                <LuFlower2 className="text-white text-2xl" />
                            </div>
                            <span className="text-3xl font-bold text-slate-900">YogaLink</span>
                        </Link>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                        {/* Email */}
                        <div>
                            <Input
                                label="Email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter your email"
                            />
                            {touched && errors.email && (
                                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                            )}
                        </div>

                        {/* Password */}
                        <div className="relative">
                            <Input
                                label="Password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="••••••••"
                            />
                            <button
                                type="button"
                                aria-label="Toggle password visibility"
                                onClick={() => setShowPassword((s) => !s)}
                                className="absolute right-4 top-9 text-slate-400 hover:text-slate-600"
                            >
                                {showPassword ? <LuEyeOff /> : <LuEye />}
                            </button>
                            {touched && errors.password && (
                                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                            )}
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full mt-4 flex items-center justify-center gap-2 py-4 rounded-xl bg-primary hover:bg-primary/80 text-white font-bold shadow-lg shadow-emerald-500/30 transition disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {loading ? <BiLoader className="animate-spin" /> : <>Sign In <LuArrowRight /></>}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center"><div className="w-full border-t" /></div>
                    </div>

                    {/* Social */}
                    <div className="flex pt-4">
                        <button className="py-3 rounded-xl border bg-slate-50 hover:bg-slate-100 transition font-semibold w-full flex justify-center items-center gap-3"><GrGoogle /> Google</button>
                    </div>

                    {/* Signup */}
                    <p className="mt-6 text-center text-slate-600">
                        New to YogaLink?{" "}
                        <Link href="/user/signup" className="font-semibold text-primary hover:underline">Create account</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
