"use client"
import MainLayout from '@/components/MainLayout/MainLayout';
import '.././../styles/globals.css';
import { Toaster } from 'react-hot-toast'

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
