import React from 'react';

import RegistrationForm from '@/components/auth/RegistrationForm';
import Image from 'next/image';
import { BackToHome } from '../login/components';

const Page = () => {
    return (
        <div className="bg-gradient-to-r from-pink-200 to-blue-200 min-h-screen w-full">
            <div className="container mx-auto px-4">
                <div className="lg:flex items-center justify-center gap-10 pt-16">
                    <div className="hidden lg:block">
                        {/* BackToHome component */}
                        <BackToHome />
                        
                        {/* Registration Background Image */}
                        <div className="relative">
                            <Image
                                src="/auth/register_bg.png"
                                width={500}
                                height={500}
                                alt="Registration background image"
                                className="object-contain"
                            />
                        </div>
                    </div>

                    {/* Registration Form Section */}
                    <div className="w-full lg:w-[50%]">
                        <RegistrationForm />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;
