import Image from 'next/image';
import logo from '../../../public/SidebarLogo.png';


const SideLogo = () => {
    return (
        <div className='px-5 py-3 lg:w-[75%] w-[100%]'>
            <Image src={logo} className='w-[100%]' alt='notfound' />
        </div>
    );
};

export default SideLogo;