import Image from 'next/image';
import { BackToHome } from './components';
import LoginForm from './components/LoginForm';

const page = () => {
  return (
    <div className='bg-gradient-to-r from-pink-200 to-blue-200 min-h-screen w-full flex items-center justify-center'>
      <div className='px-2 lg:px-4 sm:container'>
        <div className='lg:flex items-center justify-center gap-5'>
          <div className='relative lg:block'>
            <div className='hidden lg:block h-full mt-3'>
              <Image
                src="/auth/login_bg.png"
                width={530}
                height={460}
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
