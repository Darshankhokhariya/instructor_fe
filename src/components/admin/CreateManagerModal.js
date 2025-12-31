import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaTimes } from "react-icons/fa";
import {
  createManager,
  editManager,
  selectCreateManagerLoading,
} from "@/redux/slices/managerSlice";
import { toast } from "react-hot-toast";
import Input from "@/components/common/Input";
import PhoneInput from "@/components/common/PhoneInput";

export default function CreateManagerModal({
  isOpen,
  onClose,
  onSubmit,
  manager,
  managerId,
}) {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectCreateManagerLoading);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
    role: "manager",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.mobile.trim()) {
      newErrors.mobile = "Mobile number is required";
    } else {
      // Extract just the phone number part (after the country code)
      const phoneNumber = formData.mobile.split(" ")[1] || "";
      if (!phoneNumber || phoneNumber.length < 9) {
        newErrors.mobile = "Please enter a valid mobile number";
      }
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Extract just the mobile number (without country code) for API
      const mobileNumber = formData.mobile.split(" ")[1] || formData.mobile;

      const managerData = {
        name: formData.name,
        email: formData.email,
        mobile: mobileNumber,
        role: "manager",
      };

      if (managerId) {
        managerData.id = managerId;
      }
      
      try {
        let result;
        if (managerId) {
          // 👉 EDIT MANAGER
          result = await dispatch(
            editManager({ id: managerId, fields: managerData })
          ).unwrap();
        } else {
          // 👉 CREATE MANAGER
          result = await dispatch(createManager(managerData)).unwrap();
        }

        if (result?.status === 200) {
          toast.success(
            result?.message ||
              (managerId
                ? "Manager updated successfully!"
                : "Manager created successfully!")
          );
        }

        // callback (update parent/local state)
        if (onSubmit) {
          onSubmit(managerData);
        }

        handleClose();
      } catch (error) {
        toast.error(
          error?.message ||
            (managerId
              ? "Failed to update manager"
              : "Failed to create manager")
        );
      }
    }
  };

  const handleClose = () => {
    setFormData({
      name: "",
      email: "",
      mobile: "",
      password: "",
      confirmPassword: "",
      role: "manager",
    });
    setErrors({});
    onClose();
  };

  useEffect(() => {
    if (manager && isOpen) {
      setFormData((prev) => ({
        ...prev,
        name: manager?.name,
        email: manager?.email,
      }));
    }
  }, [manager, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl transform transition-all animate-slideUp">
        {/* Header */}
        <div className="relative p-6 border-b border-gray-200 bg-gradient-to-r from-teal-500 to-teal-600 rounded-t-2xl">
          <h2 className="text-2xl font-bold text-white">
            {manager ? "Edit Manager" : "Create New Manager"}
          </h2>
          <p className="text-teal-50 text-sm mt-1">
            {manager
              ? "Edit manager to the system"
              : "Add a new manager to the system"}
          </p>
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 text-white hover:bg-white/20 rounded-lg transition-colors cursor-pointer"
          >
            <FaTimes size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Name Field */}
          <Input
            label="Full Name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter full name"
            required={true}
            error={errors.name}
          />

          {/* Email Field */}
          <Input
            label="Email Address"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="manager@example.com"
            required={true}
            error={errors.email}
          />

          {/* Mobile Field */}
          <PhoneInput
            label="Mobile Number"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            placeholder="Enter mobile number"
            required={true}
          />
          {errors.mobile && (
            <p className="text-red-500 text-xs mt-1">{errors.mobile}</p>
          )}

          {/* Password Field */}
          <Input
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter password"
            required={true}
            error={errors.password}
          />

          {/* Confirm Password Field */}
          <Input
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm password"
            required={true}
            error={errors.confirmPassword}
          />

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              disabled={isLoading}
              className={`flex-1 cursor-pointer px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className={`flex-1 px-4 cursor-pointer py-2.5 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-lg hover:from-teal-600 hover:to-teal-700 transition-all shadow-lg shadow-teal-200 font-medium flex items-center justify-center gap-2 ${
                isLoading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Creating...
                </>
              ) : (
                <>{manager ? "Edit Manager" : "Create Manager"}</>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
