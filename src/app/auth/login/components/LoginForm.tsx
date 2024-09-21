"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import SocialLogin from "./SocialLogin";
import useAxiosSecure from "@/components/hooks/useAxiosSecure";

import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from "react-toastify";
import { redirect, useRouter } from "next/navigation";
import useAuthContext from "@/components/AuthContext/useAuthContext";


interface FormData {
  email: string;
  password: string;
}

const LoginForm = () => {
  const [error, setError] = useState('');
  const { user, setUser }: any = useAuthContext();
  const axiosInstance = useAxiosSecure();
  const router = useRouter();

  console.log(user);

  const { register, handleSubmit, formState: { errors }} = useForm<FormData>();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (data: FormData) => {

    const userInfo = {
      email: data.email,
      password: data.password,
    }

    const res = await axiosInstance.post('/auth/login', userInfo);
    console.log(res);
    if (res.status === 200) {

      const userData = res?.data?.data?.data;
      setUser(userData);

      toast("You have successfully logged in");
      router.push('/user/dashboard');
    }
    else if(res.status === 403) {
      setError("Invalid email or password");
    }
  };

  console.log(error)

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
              // pattern: {
              //   value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
              //   message: "Custom error: Enter a valid email address",
              // },
            })}
            className={`border border-gray-300 text-gray-900 text-sm rounded-xl block w-full p-2.5 dark:border-gray-600 focus:outline-none bg-white mt-1 ${error ? "border-red-500" : "border-gray-300"
              }`}
            placeholder="name@gmail.com"
          />
          {error && (
            <p className="text-red-500 text-xs mt-1">{error}</p>
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
                minLength: 6,
              })}
              className={`border border-gray-300 text-gray-900 text-sm rounded-xl block w-full p-2.5 dark:border-gray-600 focus:outline-none bg-white mt-1 ${error ? "border-red-500" : "border-gray-300"
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
          {error && (
            <p className="text-red-500 text-xs mt-1">{error}</p>
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
        <div className="">
          <button
            type="submit"
            className="w-full md:px-4 py-2.5 bg-[#723EEB] text-white text-xs rounded-3xl hover:bg-[#6129e6] duration-500"
          >
            Login
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
