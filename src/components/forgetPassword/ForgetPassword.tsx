import Link from 'next/link';
import React from 'react';
import useNavigationContext from '../NavigationContext/useNavigationContext';

const ForgetPassword = () => {
    const { setOpenForgetPassword }: any = useNavigationContext();
    return (
        <div className='bg-white p-5 h-72 w-[550px] rounded-xl'>
            <h1 className=" font-semibold">Forgot Password?</h1>
            <form className='space-y-8 mt-5'>
                <div className='flex flex-col space-y-3'>
                    <label className='text-xs'>Enter your email and we'll send you a link to reset your password.</label>
                    <input
                        type="email"
                        name=""
                        id=""
                        className='border border-gray-300 py-2 px-4 rounded-xl'
                        placeholder='name@gmail.com'
                    />
                </div>
                <div className="">
                    <button
                        type="submit"
                        className="w-full md:px-4 py-2.5 bg-[#723EEB] text-white text-xs rounded-3xl hover:bg-[#6129e6] duration-500"
                    >
                        Send Link
                    </button>
                </div>
                <div className="text-center flex justify-center mb-4 items-center gap-1">
                    <div className="text-black text-sm flex justify-center items-center">
                        Already Have An Account?
                        <div
                            onClick={() => setOpenForgetPassword(false)}
                            className="text-end text-[#723EEB] text-sm font-medium cursor-pointer ml-1"
                        >
                            Login Now
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default ForgetPassword;