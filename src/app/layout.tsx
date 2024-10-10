"use client";
import { ReactNode } from 'react';
import '../styles/globals.css'
import NavigationContextProvider from '@/components/NavigationContext/NavigationContext';
import AuthContextProvider from '@/components/AuthContext/AuthContext';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from 'next-auth/react';

const queryClient = new QueryClient();

interface LayoutProps {
  children: ReactNode;
}
const Layout = ({ children }: LayoutProps) => {

  return (
    <html data-theme="light">
      <body>
        <SessionProvider>
          <AuthContextProvider>
            <NavigationContextProvider>

              <QueryClientProvider client={queryClient}>
                {children}
              </QueryClientProvider>

            </NavigationContextProvider>
          </AuthContextProvider>
        </SessionProvider>
      </body>
    </html>
  );
};

export default Layout;
