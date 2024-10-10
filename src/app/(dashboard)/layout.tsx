"use client"
import MainLayout from '@/components/MainLayout/MainLayout';
import '.././../styles/globals.css';
import { Toaster } from 'react-hot-toast'
import KYCProvider from '@/context/useKyc';

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
                <Toaster />
            </section>
        </KYCProvider>

    );
}
