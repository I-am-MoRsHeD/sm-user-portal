"use client";
import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { SocialLogin } from "@/app/auth/login/components";

interface FormData {
  fullName: string;
  email: string;
  password: string;
}

const RegistrationForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false); // State for checkbox

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log(data);
    // Handle registration logic here
  };

  // Toggle the checkbox state
  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg px-6 py-6 w-full">
      <h3 className="text-base font-semibold text-[#000000]">Register</h3>

      <form className="space-y-7" onSubmit={handleSubmit(onSubmit)}>
        {/* Full Name Field */}
        <div className="mt-7">
          <input
            type="text"
            {...register("fullName", {
              required: "Name is required",
            })}
            className={`border border-gray-300 text-gray-900 focus:outline-none text-xs rounded-full block w-full py-2.5 px-4 dark:border-gray-600 bg-white mt-1 ${
              errors.fullName ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter Full Name"
          />
          {errors.fullName && (
            <span className="text-red-500 text-xs mt-1">
              {errors.fullName.message}
            </span>
          )}
        </div>

        {/* Email Field */}
        <div>
          <input
            type="text"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value:
                  /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                message: "Enter a valid email address",
              },
            })}
            className={`border border-gray-300 text-gray-900 focus:outline-none text-xs rounded-full block w-full py-2.5 px-4 dark:border-gray-600 bg-white mt-1 ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter Email Address"
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password Fields */}
        <div className="flex flex-col lg:flex-row gap-5 w-full">
          <div className="w-full">
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
                className={`border border-gray-300 text-gray-900 focus:outline-none text-xs rounded-full block w-full py-2.5 px-4 dark:border-gray-600 bg-white mt-1 ${
                  errors.password ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter Password..."
              />
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="w-full">
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
                className={`border border-gray-300 text-gray-900 focus:outline-none text-xs rounded-full block w-full py-2.5 px-4 dark:border-gray-600 bg-white mt-1 ${
                  errors.password ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Re-enter Password..."
              />
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
        </div>

        <div className="border-[1.5px] border-[#723EEB] w-full p-2 rounded-full">
          <h4 className="text-[#723EEB] text-xs px-2">
            You Are Referred By Abdul Karim
          </h4>
        </div>

        {/* Terms & Conditions Checkbox */}
        <div className="flex items-center text-sm justify-center text-black">
          <div onClick={toggleCheckbox} className="cursor-pointer flex items-center mr-2">
            {isChecked ? (
              // Checked SVG
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="0.25"
                  y="0.25"
                  width="17.5"
                  height="17.5"
                  rx="6.75"
                  fill="#723EEB"
                />
                <rect
                  x="0.25"
                  y="0.25"
                  width="17.5"
                  height="17.5"
                  rx="6.75"
                  stroke="#723EEB"
                  strokeWidth="0.5"
                />
                <path
                  d="M5 9L7.5 11.5L13 6"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : (
              // Unchecked SVG
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="0.25"
                  y="0.25"
                  width="17.5"
                  height="17.5"
                  rx="6.75"
                  fill="black"
                  fillOpacity="0.3"
                />
                <rect
                  x="0.25"
                  y="0.25"
                  width="17.5"
                  height="17.5"
                  rx="6.75"
                  stroke="#AAA9A9"
                  strokeWidth="0.5"
                />
              </svg>
            )}
          </div>
          <span>
            I have agreed with{" "}
            <Link href="/terms" className="underline ml-1 text-[#723EEB]">
             Terms Of Use & Privacy Policy
            </Link>{" "}
            {" "}
            
            </span>
            </div>

        {/* Registration Button */}
        <div className="">
             <Link href="/dashboard" passHref>
              <button
              type="submit"
              className="w-full md:px-4 py-2.5 bg-[#723EEB] text-white text-xs rounded-3xl hover:bg-[#6129e6] duration-500">
                Register
                </button>
                </Link>
                </div>


        <SocialLogin />
      </form>
    </div>
  );
};

export default RegistrationForm;
