"use client";
import { emailRegex } from "@/components/common/constant";
import Input from "@/components/common/Input";
import { setOtpEmail, userSignup } from "@/redux/slices/userSlice";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { useDispatch } from "react-redux";

const initialState = {
    name: "",
    email: "",
    mobile: "",
    password: "",
    cpassword: ""
};

export default function Register() {

    const dispatch = useDispatch();
    const router = useRouter();

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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

    const handleValidation = () => {
        let flag = true;
        let errors = {};

        const requiredFields = ["name", "email", "mobile", "password", "cpassword"];

        requiredFields.forEach((field) => {
            if (!fields[field] || fields[field].trim() === "") {
                flag = false;
                errors[field] = "This field is required!";
            }
        });

        // Mobile validation (10 digits only)
        if (fields.mobile && !/^[0-9]{10}$/.test(fields.mobile)) {
            flag = false;
            errors.mobile = "Mobile number must be exactly 10 digits!";
        }

        // Email validation
        if (fields.email && !emailRegex.test(fields.email)) {
            flag = false;
            errors.email = "Please enter a valid email!";
        }

        // Password match validation ✅ FIXED
        if (
            fields.password &&
            fields.cpassword &&
            fields.password !== fields.cpassword
        ) {
            flag = false;
            errors.cpassword = "Password and confirm password do not match!";
        }

        setErrors(errors);
        return flag;
    };

    const handleClear = () => {
        setErrors({});
        setFields(initialState);
        router.push("/otp");
        dispatch(setOtpEmail(fields?.email));
    };

    console.log('initialState', initialState)

    /* if success redirect on /instructor/onboarding */
    const handleSubmit = async () => {
        const response = await handleValidation();
        if (response) {
            const obj = fields;
            delete obj.cpassword;
            obj.role = "instructor";
            await dispatch(userSignup(obj))
                .unwrap()
                .then((res) => {
                    if (res.status === 200) {
                        handleClear();
                        toast.success(res.message || `User register succesfully!`)
                    } else {
                        toast.error(res.message || `User not register !`)
                    }
                }).catch((err) => {
                    toast.error(err || "Something went wrong");
                });
        }
    };

    return (
        <div className="min-h-screen from-stone-50 to-stone-200 flex items-center justify-center p-4 md:p-8 font-sans">

            <div className="bg-white rounded-3xl border border-gray-400/20 drop-shadow-2xl w-full max-w-6xl flex flex-col md:flex-row overflow-hidden">

                {/* LEFT SECTION */}
                <div className="hidden md:flex md:w-1/2 bg-primary relative items-center justify-center p-12 text-white overflow-hidden">
                    <div className="absolute -top-20 -left-20 w-64 h-64 bg-primary rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-blob"></div>
                    <div className="absolute -bottom-24 -right-20 w-80 h-80 bg-primary rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-blob animation-delay-2000"></div>

                    <div className="relative z-10 text-left">
                        <div className="text-3xl font-serif font-bold mb-8 tracking-wide">
                            <span className="text-black">Yoga</span>link
                        </div>

                        <h2 className="text-4xl font-serif font-medium leading-tight mb-4">
                            Begin your journey <br /> as an instructor.
                        </h2>

                        <p className="text-teal-100 text-lg font-light max-w-sm">
                            Share your wisdom, inspire students, and grow your yoga community with Yogalink.
                        </p>
                    </div>
                </div>

                {/* RIGHT SECTION – FORM */}
                <div className="w-full md:w-1/2 bg-white flex flex-col justify-center px-8 py-12 md:px-16 lg:px-24">

                    <div className="mb-10">
                        <h2 className="text-3xl font-serif font-semibold text-stone-800 mb-2">
                            Create Your Account
                        </h2>
                        <p className="text-stone-500">Join as a certified Yoga Instructor.</p>
                    </div>

                    <div className="space-y-6">
                        {/* Name */}
                        <div>
                            <Input
                                label="Full Name"
                                name="name"
                                value={fields.name || ""}
                                placeholder="Enter full name"
                                onChange={handleChange}
                                required
                            />
                            {
                                errors?.name && <span className="text-red-500">{errors?.name}</span>
                            }
                            {/* <input
                                type="text"
                                className="w-full bg-stone-50 border border-stone-200 text-stone-800 rounded-xl px-4 py-3 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all"
                                placeholder="John Doe"
                            /> */}
                        </div>

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

                        {/* Phone */}
                        <div>
                            <Input
                                type="number"
                                label="Phone Number"
                                name="mobile"
                                value={fields.mobile}
                                placeholder="Enter phone number"
                                onChange={handleChange}
                                required
                            />
                            {
                                errors?.mobile && <span className="text-red-500">{errors?.mobile}</span>
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
                                className="cursor-pointer absolute right-4 top-[35px] text-stone-400 hover:text-teal-600"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
                            </button>
                        </div>

                        {/* Confirm Password */}
                        <div className="relative">
                            <Input
                                type={showConfirmPassword ? "text" : "password"}
                                label="Confirm Password"
                                name="cpassword"
                                value={fields.cpassword}
                                placeholder="Enter confirm password"
                                onChange={handleChange}
                                required
                            />
                            {
                                errors?.cpassword && <span className="text-red-500">{errors?.cpassword}</span>
                            }
                            <button
                                type="button"
                                className="absolute right-4 top-[35px] text-stone-400 hover:text-teal-600"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                                {showConfirmPassword ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
                            </button>
                        </div>


                        {/* Register Button */}
                        <div className="block">
                            <button
                                type="button"
                                onClick={handleSubmit}
                                className="cursor-pointer w-full bg-primary hover:bg-primary/90 text-white py-3.5 rounded-xl font-semibold text-lg shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
                            >
                                Create Account
                            </button>
                        </div>
                    </div>

                    {/* Divider */}
                    {/* <div className="my-8 flex items-center">
                        <div className="flex-grow border-t border-stone-200"></div>
                        <span className="flex-shrink mx-4 text-stone-400 text-sm">or continue with</span>
                        <div className="flex-grow border-t border-stone-200"></div>
                    </div> */}

                    {/* Google Sign Up */}
                    {/* <button
                        type="button"
                        className="w-full flex items-center justify-center gap-3 bg-white border-2 border-stone-200 text-stone-700 hover:bg-stone-50 hover:border-stone-300 py-3 rounded-xl font-medium transition-all"
                    >
                        <FaGoogle className="text-red-500" size={20} />
                        <span>Sign up with Google</span>
                    </button> */}

                    {/* Footer Link */}
                    <div className="text-center text-stone-500 mt-12">
                        Already have an account?{" "}
                        <Link href="/login" className="text-primary font-bold hover:underline">
                            Sign In
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
