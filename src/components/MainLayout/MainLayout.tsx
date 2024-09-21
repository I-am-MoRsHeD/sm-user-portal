'use client'
import React, { ReactNode, useEffect } from 'react';
import TheSidebar from '../shared/TheSidebar';
import useNavigationContext from '../NavigationContext/useNavigationContext';
import { ToastContainer } from 'react-toastify';
import { redirect } from 'next/navigation';

interface LayoutProps {
    children: ReactNode;
}


const MainLayout = ({ children }: LayoutProps) => {
    const { isNavOpen }: any = useNavigationContext();
    const user = localStorage.getItem('user');
    console.log(user);

    useEffect(() => {
        if (user === null || !user) {
            redirect('/auth/login');
        }
    }, [user]);

    return (
        <div>
            <div className='flex lg:flex-row w-full bg-gradient-to-tl from-cyan-200 to-pink-200 h-auto text-black'>
                <div className={`${isNavOpen ? 'w-[11%] md:w-[17%]' : 'w-0 lg:w-[4%]'} fixed h-full xl:h-[99vh] 2xl:h-[97%] 3xl:h-[72%] 4xl:h-[65vh] bg-white custom-scrollbar duration-500 overflow-hidden`}>
                    <TheSidebar />
                </div>
                <div className={`${isNavOpen ? 'ml-[11%] md:ml-[17%] md:w-full' : 'w-full lg:w-[100%] lg:ml-[4%]'} duration-500 `}>
                    <div className=' py-2 lg:pl-4 pl-2 pr-2'>
                        {children}
                    </div>
                </div>
                <ToastContainer />
            </div>

        </div>
    );
};

export default MainLayout;