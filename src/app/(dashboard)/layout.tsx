"use client"
import MainLayout from '@/components/MainLayout/MainLayout';
import KYCProvider from '@/context/useKyc';
import { Toaster } from 'react-hot-toast';
import '.././../styles/globals.css';

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <KYCProvider>
            <section>
                <MainLayout>
                    {children}
                </MainLayout>
                <Toaster
                    position="top-center"
                    // reverseOrder={true}
                    toastOptions={{
                        style: {
                            border: '1px solid #723eeb',
                            padding: '0.725rem',
                            color: '#5A5278',
                        },
                        iconTheme: {
                            primary: '#723eeb',
                            secondary: '#FFFAEE',
                        },
                    }}
                />
            </section>
        </KYCProvider>

    );
}
