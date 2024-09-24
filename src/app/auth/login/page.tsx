import Image from 'next/image';
import { BackToHome } from './components';
import LoginForm from './components/LoginForm';

const page = () => {
  return (
    <div className='bg-gradient-to-r from-pink-200 to-blue-200 min-h-screen w-full flex items-center justify-center'>
      <div className='px-2 lg:px-4 sm:container'>
        <div className='lg:flex items-center justify-center lg:pt-16'>
          <div className='relative lg:block xl:mr-5'>
            <div className=''>
            {/* <BackToHome /> */}

            </div>
            <div className='hidden lg:block -mt-20'>
              <Image
                src="/auth/login_bg.png"
                width={489}
                height={463}
                alt="Picture of the author"
                

              />
            </div>
          </div>
          <div className='grid justify-items-center '>
            
            {/* <div
              className="w-[550px] h-[417px] bg-white rounded-[10px] shadow-lg flex items-center justify-center"
              style={{ boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.1)" }}
            > */}
            <LoginForm /> 
            </div>
          </div>
        </div>
      </div>
    // </div>
  );
}

export default page
