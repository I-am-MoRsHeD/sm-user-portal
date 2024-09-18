"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import SocialLogin from "./SocialLogin";

interface FormData {
  email: string;
  password: string;
}

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = (data: FormData) => {
    console.log(data);
    // Handle login logic here
  };

  return (
    <div className="bg-white rounded-xl shadow-lg px-6 py-6 max-w-xl w-full">
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Email Field */}
        <div className="mb-4">
          <label className="text-black text-sm font-medium">Email</label>
          <input
            type="text"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                message: "Enter a valid email address",
              },
            })}
            className={`border border-gray-300 text-gray-900 text-sm rounded-xl block w-full p-2.5 dark:border-gray-600 bg-white mt-1 ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="name@gmail.com"
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password Field */}
        <div className="mb-0">
          <label className="text-black text-sm font-medium">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long",
                },
              })}
              className={`border border-gray-300 text-gray-900 text-sm rounded-xl block w-full p-2.5 dark:border-gray-600 bg-white mt-1 ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="**************"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute top-3 right-4 text-xl"
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">
              {errors.password.message}
            </p>
          )}
          <div className="flex justify-end">
            <a href="/forgot-password">
              <p className="text-end text-[#723EEB] text-xs font-medium cursor-pointer py-4">
                Forgot Password?
              </p>
            </a>
          </div>
        </div>

        {/* Login Button */}
        <div className="mb-4">
          <button
            type="submit"
            className="w-full md:px-4 py-2.5 bg-[#723EEB] text-white text-xs rounded-3xl hover:bg-[#6129e6] duration-500"
          >
            <a href="/dashboard">Login</a>
          </button>
        </div>
      </form>

      {/* Social Login */}
      <div>
        <SocialLogin />
      </div>
    </div>
  );
};

export default LoginForm;
