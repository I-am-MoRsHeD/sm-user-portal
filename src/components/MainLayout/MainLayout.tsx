import React, { ReactNode } from 'react';
import TheSidebar from '../shared/TheSidebar';
import useNavigationContext from '../NavigationContext/useNavigationContext';


interface LayoutProps {
    children: ReactNode;
  }
  

const MainLayout = ({children}: LayoutProps) => {
    const { isNavOpen }: any = useNavigationContext();

    return (
        <div className='flex lg:flex-row w-full bg-gradient-to-tl from-cyan-200 to-pink-200 h-auto'>
            <div className={`${isNavOpen ? 'w-[11%] md:w-[17%]' : 'w-0 lg:w-[4%]'} fixed h-full xl:h-[99vh] 2xl:h-[97%] 3xl:h-[72%] 4xl:h-[65vh] bg-white custom-scrollbar duration-500 overflow-hidden`}>
                <TheSidebar />
            </div>
            <div className={`${isNavOpen ? 'ml-[11%] md:ml-[17%] md:w-full' : 'w-full lg:w-[100%] lg:ml-[4%]'} duration-500 `}>
                <div className=' py-2 lg:pl-4 pl-2 pr-2'>
                    {children}
                </div>
            </div >
        </div>
    );
};

export default MainLayout;