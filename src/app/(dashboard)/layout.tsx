"use client"
import MainLayout from '@/components/MainLayout/MainLayout';
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

        </section>

    );
}
