import { userVerifyOtp } from "@/redux/slices/userSlice";
import Link from "next/link";
import { useRouter } from "next/router";
import React, {
  useState,
  useRef,
  useCallback,
  useMemo,
  useEffect,
} from "react";
import toast from "react-hot-toast";
// Reusing icons you imported previously
import { BiChevronLeft, BiLock, BiTime, BiCheckCircle } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";

// Mock Component Imports (assumed from your environment)
// const Input = ({ value, onChange, ...props }) => <input value={value} onChange={onChange} {...props} className="w-full p-2 border rounded" />;
const Input = ({ className, error, ...props }) => (
  <input
    {...props}
    className={`w-full p-3 border rounded-xl shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-teal-500 ${
      error ? "border-red-500 ring-red-100" : "border-slate-300"
    } ${className}`}
  />
);

const BiChevronLeftIcon = BiChevronLeft;
const BiLockIcon = BiLock;

const OtpVerification = ({ phoneNumber = "+91 12345 67890" }) => {
  const OTP_LENGTH = 6;
  const initialOtpState = useMemo(() => Array(OTP_LENGTH).fill(""), []);
  const [otp, setOtp] = useState(initialOtpState);
  const [status, setStatus] = useState("pending"); // 'pending', 'verifying', 'success', 'error'
  const [countdown, setCountdown] = useState(60);
  const [error, setError] = useState("");
  const inputRefs = useRef([]);
  const router = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const email = useSelector((state) => state.user.email);

  console.log("email", email);
  // --- Core OTP Handling Logic ---

  const handleChange = useCallback(
    (e, index) => {
      const value = e.target.value;
      const newOtp = [...otp];
      let nextIndex = index;

      setError("");

      if (value.length === 1) {
        // Handle single digit input
        newOtp[index] = value;
        setOtp(newOtp);
        nextIndex = index < OTP_LENGTH - 1 ? index + 1 : index;
      } else if (value.length > 1) {
        // Handle pasting: paste all digits and move focus to the last one
        const pastedCode = value.slice(0, OTP_LENGTH - index).split("");
        pastedCode.forEach((digit, i) => {
          if (index + i < OTP_LENGTH) {
            newOtp[index + i] = digit;
          }
        });
        setOtp(newOtp);
        nextIndex = Math.min(index + pastedCode.length, OTP_LENGTH - 1);
      } else if (value.length === 0) {
        // Handle deletion (clearing the current field)
        newOtp[index] = "";
        setOtp(newOtp);
        // Don't auto-focus back on clear unless handled by the keyDown handler
      }

      // Auto-focus logic
      if (nextIndex !== index && inputRefs.current[nextIndex]) {
        inputRefs.current[nextIndex].focus();
      } else if (
        index === OTP_LENGTH - 1 &&
        newOtp.join("").length === OTP_LENGTH
      ) {
        // If it's the last digit and the full OTP is entered, trigger verification
        inputRefs.current[index].blur();
        // handleSubmit(newOtp.join('')); // Could auto-submit here
      }
    },
    [otp]
  );

  const handleKeyDown = useCallback(
    (e, index) => {
      // Auto-focus previous field on Backspace if current field is empty
      if (e.key === "Backspace" && otp[index] === "" && index > 0) {
        e.preventDefault();
        inputRefs.current[index - 1].focus();
      }
    },
    [otp]
  );

  // --- Countdown Timer Effect ---

  useEffect(() => {
    if (countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [countdown]);

  // --- Submission Function ---

  const handleSubmit = useCallback(async () => {
    const fullOtp = otp.join("");
    if (fullOtp.length !== OTP_LENGTH) {
      setError(`Please enter the full ${OTP_LENGTH}-digit code.`);
      return;
    }

    setStatus("verifying");
    setError("");
    console.log("Verifying OTP:", fullOtp);

    const obj = {
      otp: fullOtp,
      email,
    };
    setLoading(true);
    await dispatch(userVerifyOtp(obj))
      .unwrap()
      .then((res) => {
        if (res.status === 200) {
          toast.success(res.message || `OTP verified successfully!`);
          router.push("/login");
          setLoading(false);
        } else {
          toast.error(res.message || `Something went wrong!`);
          setLoading(false);
        }
      })
      .catch((err) => {
        toast.error(err || "Something went wrong");
        setLoading(false);
      });
  }, [otp, initialOtpState]);

  const handleResend = useCallback(() => {
    if (countdown === 0) {
      console.log("Resending OTP...");
      setCountdown(60); // Reset timer
      setStatus("pending");
      setOtp(initialOtpState);
      setError("");
      // Mock Resend API Call
    }
  }, [countdown, initialOtpState]);

  // Determine button state and text
  const isButtonDisabled =
    otp.join("").length !== OTP_LENGTH ||
    status === "verifying" ||
    status === "success";

  // Conditional rendering for success state
  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center p-10 text-center h-[400px]">
        <div className="w-20 h-20 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center mb-6 shadow-lg animate-in zoom-in-50">
          <BiCheckCircle size={36} />
        </div>
        <h2 className="text-2xl font-bold text-teal-800 mb-2">
          Verification Complete!
        </h2>
        <p className="text-slate-500 max-w-sm">
          Your identity has been successfully verified. Redirecting you to the
          next step...
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center p-6 md:p-10 w-full max-w-md mx-auto bg-white rounded-2xl shadow-xl border border-slate-100">
      {/* Header */}
      <div className="w-full mb-8 text-center">
        <div className="w-12 h-12 mx-auto bg-teal-50 text-teal-600 rounded-full flex items-center justify-center mb-4 border border-teal-100">
          <BiLockIcon size={24} />
        </div>
        <h2 className="text-2xl font-bold text-slate-800">Verify Your Phone</h2>
        <p className="text-sm text-slate-500 mt-2">
          A 6-digit code has been sent to your email address{" "}
          {/* <span className="font-semibold text-teal-600">{phoneNumber}</span>. */}
        </p>
      </div>

      {/* OTP Input Field */}
      <div className="w-full flex justify-center space-x-2 mb-6">
        {otp.map((digit, index) => (
          <Input
            key={index}
            type="tel"
            maxLength="1"
            value={digit}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            ref={(el) => (inputRefs.current[index] = el)}
            className={`text-center text-xl font-mono h-12 w-12 border-2 ${
              error ? "border-red-500" : "focus:border-teal-600"
            } transition-colors duration-200`}
            autoFocus={index === 0}
            required
          />
        ))}
      </div>

      {/* Error Message */}
      {error && (
        <div className="w-full p-3 mb-4 text-sm text-red-700 bg-red-100 rounded-lg border border-red-200 animate-in fade-in">
          {error}
        </div>
      )}

      {/* Verification Button */}
      <button
        onClick={handleSubmit}
        disabled={isButtonDisabled}
        className={`w-full py-3 rounded-xl font-bold transition-all duration-300 shadow-md ${
          isButtonDisabled
            ? "bg-primary text-white cursor-not-allowed"
            : "bg-primary text-white hover:bg-primary/90 hover:shadow-lg"
        }`}
      >
        {loading ? "Verifying..." : "Verify OTP"}
      </button>

      {/* Resend Logic */}
      <div className="mt-6 w-full text-center text-sm text-slate-600 flex items-center justify-center gap-1">
        <BiTime size={16} className="text-slate-400" />
        {countdown > 0 ? (
          <span>
            Resend in{" "}
            <span className="font-bold text-teal-600">{countdown}s</span>
          </span>
        ) : (
          <button
            onClick={handleResend}
            className="text-teal-600 font-semibold hover:text-teal-700 disabled:opacity-50"
            disabled={status === "verifying"}
          >
            Resend Code
          </button>
        )}
      </div>
    </div>
  );
};

// Wrapper component to match your file structure and show usage
const OtpVerificationPage = () => {
  return (
    <div className="h-screen w-full bg-slate-50 flex flex-col items-center justify-center p-4">
      <OtpVerification />
      {/* Simple footer for context */}
      <Link
        href="/login"
        className="flex items-center mt-6 text-slate-500 hover:text-teal-600 transition-colors"
      >
        <BiChevronLeftIcon className="w-4 h-4 mr-1" /> Back to Login
      </Link>
    </div>
  );
};

export default OtpVerificationPage;
