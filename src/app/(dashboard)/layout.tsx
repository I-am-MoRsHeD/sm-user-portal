"use client"
import MainLayout from '@/components/MainLayout/MainLayout';
import KYCProvider from '@/context/useKyc';
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

            </section>
        </KYCProvider>

    );
}
