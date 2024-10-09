"use client";
import useAxiosSecure from "@/components/hooks/useAxiosSecure";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import SocialLogin from "./SocialLogin";

import useAuthContext from "@/components/AuthContext/useAuthContext";
import useNavigationContext from "@/components/NavigationContext/useNavigationContext";
import LoadingSpinner from "@/components/common/Loading/LoadingSpinner";
import Cookies from 'js-cookie';
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";



interface FormData {
  email: string;
  password: string;
}

const LoginForm = () => {
  const { setOpenForgetPassword }: any = useNavigationContext();
  const [serverError, setServerError] = useState('');
  const { user, setUser, loading, setLoading }: any = useAuthContext();
  const axiosInstance = useAxiosSecure();
  const router = useRouter();
  // const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (data: FormData) => {

    const userInfo = {
      email: data.email,
      password: data.password,
    }

    setServerError('');
    setLoading(true);
    try {
      const res = await axiosInstance.post('/auth/login', userInfo);

      if (res.status === 200) {
        const userData = res?.data?.data?.data;
        setUser(userData);

        const { accessToken, refreshToken } = res?.data?.data;
        Cookies.set('accessToken', accessToken);
        Cookies.set('refreshToken', refreshToken);

        router.push('/user/dashboard');
        toast.success("You have successfully logged in");
        setLoading(false)

        // window.location.href = '/user/dashboard';

        // router.push('/user/dashboard');
        // router.replace('/user/dashboard');

        // router.prefetch('/user/dashboard');

      }
    } catch (error: any) {
      setLoading(false);
      toast.error("There is something error");
      if (error.response && error.response.status === 403) {
        setServerError("Invalid email or password");
      }
      else if (error.response.status === 404) {
        setServerError("Invalid email or password");
      }
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg px-5 lg:px-6 py-5 my-10 lg-my-0 max-w-xl w-full">
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
            className={`border border-gray-300 text-gray-900 text-sm rounded-xl block w-full p-2.5 dark:border-gray-600 focus:outline-none bg-white mt-1`}
            placeholder="name@gmail.com"
          />
          {/* {error && (
            <p className="text-red-500 text-xs mt-1">{error}</p>
          )} */}
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
              className={`border border-gray-300 text-gray-900 text-sm rounded-xl block w-full p-2.5 dark:border-gray-600 focus:outline-none bg-white mt-1`}
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

          {/* Display server-side error if email/password is wrong */}
          {serverError && (
            <p className="text-red-500 text-xs mt-1">{serverError}</p>
          )}

          <div className="flex justify-end">
            <Link href={'/auth/forget-password'}>
              <p className="text-end text-[#723EEB] text-xs font-medium cursor-pointer py-4">
                Forget Password?
              </p>
            </Link>
          </div>
        </div>

        {/* Login Button */}
        <div className="">
          <button
            type="submit"
            className="w-full md:px-4 py-2.5 bg-[#723EEB] text-white text-xs rounded-3xl hover:bg-[#6129e6] duration-500"
          >
            {
              loading ? <LoadingSpinner className="h-4 w-4" /> : 'Login'
            }
            {/* Login */}
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
