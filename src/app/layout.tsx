"use client";

import { ReactNode, useEffect } from 'react';
import '../styles/globals.css'
import NavigationContextProvider from '@/components/NavigationContext/NavigationContext';
import AuthContextProvider from '@/components/AuthContext/AuthContext';
import { SessionProvider } from 'next-auth/react';



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

              {children}

            </NavigationContextProvider>
          </AuthContextProvider>
        </SessionProvider>
      </body>
    </html>
  );
};

export default Layout;
