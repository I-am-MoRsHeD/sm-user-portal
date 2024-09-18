"use client";
import { Minus } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image'
import React from 'react';
import { usePathname } from 'next/navigation';

const SocialLogin = () => {
    const route = usePathname();
    return (
        <>
            <div className='flex flex-col items-center -mt-2'>
                <div className='flex justify-between items-center mb-4 overflow-hidden'>
                    <hr className='w-20 sm:w-32 md:36 lg:w-44 xl:w-52 h-px my-8 bg-black border-0 ' />
                    <span className='mx-2 text-second-1000 w-24 flex text-xs font-medium ml-5'>
                        {route === '/auth/login'
                            ? 'Or Register with'
                            : 'Or Login with'}
                    </span>
                    <hr className='w-20 sm:w-32 md:36 lg:w-44 xl:w-52 h-px my-8 bg-black border-0 ' />
                </div>
                <button className='border border-[#FF3D00] w-full flex justify-center py-2 -mt-5'>
                    <div className='flex items-center '>
                        <div className='w-6 h-6'>
                            <Image
                                src="/auth/google_logo.png"
                                width={500}
                                height={500}
                                alt="Picture of the author"
                            />
                        </div>
                        <p className='text-[#FF3D00] text-xs font-medium ml-2'>
                            Login with Google
                        </p>
                    </div>
                </button>
            </div>
            {route === '/auth/login' ? (
                <div className='text-center mt-4 flex justify-center items-center gap-1'>
                    <Minus className='' />
                    <div className='text-black text-sm flex justify-center items-center'>
                        Do not have an account?{' '}
                        <Link
                            href='/auth/registration'
                            className='text-end text-[#723EEB] text-sm font-medium cursor-pointer ml-1'
                        >
                            Register
                        </Link>
                    </div>
                    <Minus className='' />
                </div>
            ) : (
                <div className='text-center mt-4 flex justify-center items-center gap-1'>
                    <Minus className='' />
                    <div className='text-black text-sm flex justify-center items-center'>
                        Already Have An Account?
                        <Link
                            href='/auth/login'
                            className='text-end text-[#723EEB] text-sm font-medium cursor-pointer ml-1'
                        >
                            Login
                        </Link>
                    </div>
                    <Minus className='' />
                </div>
            )}
        </>
    );
};

export default SocialLogin;
