"use client";
import AuthContextProvider from '@/components/AuthContext/AuthContext';
import NavigationContextProvider from '@/components/NavigationContext/NavigationContext';
import LoaderWithLottie from '@/components/common/loader/LoaderWithLottie';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from 'next-auth/react';
import { ReactNode, useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import '../styles/globals.css';

const queryClient = new QueryClient();

interface LayoutProps {
  children: ReactNode;
}
const Layout = ({ children }: LayoutProps) => {
  const [initialLoading, setInitialLoading] = useState(true);


  useEffect(() => {
    const hasVisited = sessionStorage.getItem('hasVisited');

    if (!hasVisited) {
      setInitialLoading(true);

      setTimeout(() => {
        setInitialLoading(false);
        sessionStorage.setItem('hasVisited', 'true');
      }, 2000);
    } else {
      setInitialLoading(false);
    }
  }, []);

  // If the page is still loading, show a loader
  if (initialLoading) {
    return (
      <html>
        <head>
          <link rel="icon" href="/favicon/favicon.ico" sizes="any" />
          <title>Diasporex - User</title>
        </head>
        <body>
          <div className='h-screen w-screen bg-gradient-to-tl from-cyan-200 to-pink-200 flex justify-center items-center'>
            <LoaderWithLottie />
          </div>
        </body>
      </html>
    )
  }

  return (
    <html data-theme="light" suppressHydrationWarning={true}>
      <head>
        <link rel="icon" href="/favicon/favicon.ico" sizes="any" />
        <title>Diasporex - User</title>
      </head>
      <body>
        <SessionProvider>
          <AuthContextProvider>
            <NavigationContextProvider>

              <QueryClientProvider client={queryClient}>
                {children}
                <Toaster
                  position="top-center"
                  // reverseOrder={true}
                  toastOptions={{
                    style: {
                      padding: '0.725rem',
                      color: '#5A5278',
                    },
                    success: {
                      style: {
                        // border: '1px solid #723eeb',
                      },
                      iconTheme: {
                        primary: '#723eeb',
                        secondary: '#fff',
                      },
                    },
                    error: {
                      style: {
                        // border: '1px solid #dc3545',
                        color: '#dc3545',
                      },
                      iconTheme: {
                        primary: '#dc3545',
                        secondary: '#fff',
                      },
                    },
                    iconTheme: {
                      primary: '#723eeb',
                      secondary: '#FFFAEE',
                    },
                  }}
                />
              </QueryClientProvider>

            </NavigationContextProvider>
          </AuthContextProvider>
        </SessionProvider>
      </body>
    </html>
  );
};

export default Layout;
