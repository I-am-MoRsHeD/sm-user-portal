'use client'
import Image from 'next/image';
import { ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';
import useAuthContext from '../AuthContext/useAuthContext';
import useNavigationContext from '../NavigationContext/useNavigationContext';
import TheSidebar from '../shared/TheSidebar';

interface LayoutProps {
    children: ReactNode;
}


const MainLayout = ({ children }: LayoutProps) => {
    const { loading }: any = useAuthContext();
    const { isNavOpen }: any = useNavigationContext();
    const user = typeof window !== "undefined" ? localStorage.getItem('user') : null;

    if (loading) {
        return <div className="flex justify-center items-center h-[100vh]">
            <Image src={'/loader.gif'} width={20} height={20} alt='Loader' />
        </div>
    };

    return (
        <div>
            {/* <div className='flex lg:flex-row w-full bg-gradient-to-tl from-cyan-200 to-pink-200 h-auto text-black'>
                <div className={`${isNavOpen ? 'w-[11%] xxs:w-[7%] sm:w-[6%] md:w-[16%] 2xl:w-60' : 'w-0 lg:w-[4%]'} fixed h-full xl:h-[100vh] bg-white custom-scrollbar duration-500 overflow-hidden`}>
                    <TheSidebar />
                </div>
                <div className={`${isNavOpen ? 'ml-[11%] xxs:ml-[7%] sm:ml-[6%] md:ml-[16%] 2xl:ml-60 w-full' : 'w-full lg:w-[100%] lg:ml-[4%]'} duration-500 custom-scrollbar`}>
                    <div className=' py-2 lg:pl-4 pl-2 pr-2'>
                        {children}
                    </div>
                </div>
            </div> */}
            <div className='flex w-full bg-gradient-to-tl from-cyan-200 to-pink-200 h-auto text-black'>
                {/* Sidebar */}
                <div
                    className={`h-screen bg-white transition-all duration-300 ease-in-out overflow-auto ${isNavOpen
                        ? 'w-[12%] md:w-[20%] lg:w-[18%] xl:w-[15%] 5xl:w-[10%] translate-x-0'
                        : 'w-[0] lg:w-[5%] 5xl:w-[3%] translate-x-[-100%] md:translate-x-0'
                        }`}
                >
                    <TheSidebar />
                </div>

                {/* Main content */}
                <div
                    className={`h-screen transition-all duration-300 ease-in-out ${isNavOpen
                        ? 'w-[88%] md:w-[80%] lg:w-[82%] xl:w-[85%] 5xl:w-[90%]'
                        : 'w-[100%] lg:w-[95%] 5xl:w-[97%]'
                        }`}
                >
                    <div className='h-full custom-scrollbar overflow-y-auto overflow-x-hidden py-2 lg:pl-4 pl-2 pr-2'>
                        {children}
                    </div>
                </div>

                <Toaster />
            </div>

            {/* <div className='grid grid-cols-20 w-full bg-gradient-to-tl from-cyan-200 to-pink-200 h-auto text-black'>
               
                {isNavOpen && (
                    <div className={`h-screen col-span-2 xxs:col-span-2 md:col-span-4 lg:col-span-3 5xl:col-span-2 mx-auto w-full bg-white transition-all duration-300 ease-in-out overflow-auto`}>
                        <TheSidebar />
                    </div>
                )}

                
                <div className={`h-screen ${isNavOpen ? 'col-span-18 xxs:col-span-18 md:col-span-16 lg:col-span-17 5xl:col-span-18' : 'col-span-1'} transition-all duration-300 ease-in-out w-full`}>
                    <div className='h-full custom-scrollbar overflow-y-auto overflow-x-hidden py-2 lg:pl-4 pl-2 pr-2 '>
                        {children}
                    </div>
                </div>

                <Toaster />
            </div> */}

        </div>
    );
};

export default MainLayout;

