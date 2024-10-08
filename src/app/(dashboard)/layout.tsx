"use client"
import MainLayout from '@/components/MainLayout/MainLayout';
import { Toaster } from 'react-hot-toast';
import '.././../styles/globals.css';

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <section>
            <MainLayout>
                {children}
            </MainLayout>
            <Toaster />
        </section>

    );
}
