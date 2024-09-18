import Image from 'next/image';
import { BackToHome } from './components';
import LoginForm from './components/LoginForm';

const page = () => {
  return (
    <div className='bg-gradient-to-r from-pink-200 to-blue-200 min-h-screen w-full'>
      <div className='px-4 sm:container  '>
        <div className='lg:flex items-center justify-center pt-16'>
          <div className='xl:mr-48'>
            <BackToHome />
            <div className='hidden lg:block  '>
              <Image
                src="/auth/login_bg.png"
                width={500}
                height={500}
                alt="Picture of the author"
              />
            </div>
          </div>
          <div className='grid justify-items-center '>
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
}

export default page
