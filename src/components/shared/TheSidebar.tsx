import useNavigationContext from '../NavigationContext/useNavigationContext';
import SideMenuList from '../sidebar/SideMenuList';
import SideLogo from './SideLogo';

const TheSidebar = () => {
    const { isNavOpen, toggleNavigation }: any = useNavigationContext();


    // md:w-40 w-[2.85rem],w-[2.85rem]
    // w-44 xl:w-60, w-[3.5rem]
    return (
        <div>
            {/* responsive */}
            <div className={` duration-300 ease-in-out overflow-y-auto w-full ${isNavOpen ? "translate-x-0 " : ""} h-full  lg:hidden`} >
                <div className='w-full'>
                    <div className='flex justify-center items-center w-full pt-3'>
                        {
                            isNavOpen ? <SideLogo /> : null
                        }
                    </div>
                    <div className={`${isNavOpen ? 'mt-3 mb-3' : 'h-[100vh] flex flex-col items-center justify-center'} h-[81vh] overflow-y-auto duration-300`}>
                        <SideMenuList isNavOpen={isNavOpen}
                            toggleNavigation={toggleNavigation} />
                    </div>
                </div>
            </div>
            {/* desktop */}
            <div className={` duration-300  ease-in-out overflow-y-auto ${isNavOpen ? "translate-x-0" : ""} hidden lg:block`}>
                <div className=''>
                    <div className={`p-2 flex flex-row justify-center items-center`}>
                        {
                            isNavOpen ? <SideLogo /> : null
                        }
                    </div>
                    <div className={`${isNavOpen ? 'mt-3 mb-3' : 'h-[100vh] flex flex-col items-center justify-center'} h-[81vh] overflow-y-auto duration-300`}>
                        <SideMenuList isNavOpen={isNavOpen}
                            toggleNavigation={toggleNavigation} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TheSidebar;