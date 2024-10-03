'use client'
import useAxiosSecure from '@/components/hooks/useAxiosSecure';
import axios from 'axios';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { LiaEyeSlashSolid, LiaEyeSolid } from 'react-icons/lia';
import Swal from 'sweetalert2';

interface FormData {
    newPassword: string;
    confirmNewPassword: string;
};

const Page = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();
    const [newPassword, setNewPassword] = useState(false);
    const [confirmNewPassword, setConfirmNewPassword] = useState(false);
    const axiosInstance = useAxiosSecure();
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get('token');

    const onSubmit = async (data: FormData) => {
        const password = data.newPassword;
        const confirmPassword = data.confirmNewPassword;

        const changedPasswordInfo = {
            password,
        };

        try {
            if (password !== confirmPassword) {
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "New Password doesn't match",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
            else {
                const res = await axios.post(`https://diasporex-api.vercel.app/api/v1/auth/reset-password?token=${token}`, changedPasswordInfo);
                if (res?.status === 200) {
                    reset();

                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Password has been reseted",
                        showConfirmButton: false,
                        timer: 2000
                    });
                    router.push('/auth/login');
                }
            }
        } catch (error : any) {
            console.log(error);
        }
    }

    return (
        <div className='flex items-center bg-gradient-to-r from-pink-200 to-blue-200 min-h-screen w-full  justify-center'>
            <div className='px-4 max-w-[1200px] mx-auto p-5 bg-white rounded'>
                <h1 className="font-semibold ">Reset Your Password</h1>
                <div className='mt-5 w-[550px] rounded-xl'>
                    <form onSubmit={handleSubmit(onSubmit)} className='space-y-3'>

                        {/* New Password Field */}
                        <div className="mb-3">
                            <label className="">Enter New Password</label>
                            <div className="relative">
                                <input
                                    type={newPassword ? 'text' : 'password'}
                                    {...register("newPassword", {
                                        required: "New Password is required",
                                        minLength: 8,
                                        maxLength: 15,
                                        pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/
                                    })}
                                    className={`w-full mt-1 px-3 py-1 border border-gray-400 rounded-full focus:outline-none `}
                                    placeholder="Type Here...."
                                />
                                <button
                                    type="button"
                                    onClick={() => setNewPassword(!newPassword)}
                                    className="absolute top-3 right-4 text-[11px]"
                                >
                                    {newPassword ? <LiaEyeSolid className='text-base' /> : <LiaEyeSlashSolid className='text-base' />}
                                </button>
                            </div>
                            {errors.newPassword && (
                                <p className="text-red-500 text-xs">{errors.newPassword.message}</p>
                            )}
                            {errors.newPassword?.type === 'minLength' && (
                                <p className="text-red-500 text-xs">Password must be at least 8 characters</p>
                            )}
                            {errors.newPassword?.type == "maxLength" && (
                                <span className='text-red-600 text-xs -mt-5'>Password must be maximum 15 characters</span>
                            )}
                            {errors.newPassword?.type == "pattern" && (
                                <span className='text-red-600 text-xs -mt-5'>Password must have atleast one uppercase,one lowercase and one special character</span>
                            )}
                        </div>
                        {/* Confirm New Password Field */}
                        <div className="mb-3">
                            <label className="">Confirm New Password</label>
                            <div className="relative">
                                <input
                                    type={confirmNewPassword ? 'text' : 'password'}
                                    {...register("confirmNewPassword", {
                                        required: "Password is required",
                                        minLength: 8,
                                        maxLength: 15,
                                        pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/
                                    })}
                                    className={`w-full mt-1 px-3 py-1 border border-gray-400 rounded-full focus:outline-none `}
                                    placeholder="Type Here...."
                                />
                                <button
                                    type="button"
                                    onClick={() => setConfirmNewPassword(!confirmNewPassword)}
                                    className="absolute top-3 right-4 text-[11px]"
                                >
                                    {confirmNewPassword ? <LiaEyeSolid className='text-base' /> : <LiaEyeSlashSolid className='text-base' />}
                                </button>
                            </div>

                            {errors.confirmNewPassword?.type === 'required' && (
                                <p className="text-red-500 text-xs">{errors.confirmNewPassword.message}</p>
                            )}
                            {errors.confirmNewPassword?.type === 'minLength' && (
                                <p className="text-red-500 text-xs">Password must be at least 8 numbers</p>
                            )}
                            {errors.confirmNewPassword?.type == "maxLength" && (
                                <span className='text-red-600 text-xs -mt-5'>Password must be maximum 15 characters</span>
                            )}
                            {errors.confirmNewPassword?.type == "pattern" && (
                                <span className='text-red-600 text-xs -mt-5'>Password must have atleast one uppercase,one lowercase and one special character</span>
                            )}
                        </div>
                        <div className="w-full mx-auto py-3">
                            <button
                                type="submit"
                                className="w-full bg-[#723EEB] text-white p-2 rounded text-[10px]">
                                Confirm
                            </button>
                        </div>
                    </form>
                </div>
                <div className="text-center flex justify-center mb-4 items-center gap-1">
                    <div className="text-black text-sm flex justify-center items-center">
                        Already Have An Account?
                        <Link
                            href="/auth/login"
                            className="text-end text-[#723EEB] text-sm font-medium cursor-pointer ml-1"
                        >
                            Login
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;