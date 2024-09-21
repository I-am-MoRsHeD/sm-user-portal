"use client";

import { ReactNode, useEffect } from 'react';
import '../styles/globals.css'
import NavigationContextProvider from '@/components/NavigationContext/NavigationContext';
import MainLayout from '@/components/MainLayout/MainLayout';
import AuthContextProvider from '@/components/AuthContext/AuthContext';



interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {

  return (
    <html data-theme="light">
      <body>
        <AuthContextProvider>
          <NavigationContextProvider>
            <MainLayout>
                {children}
            </MainLayout>
          </NavigationContextProvider>
        </AuthContextProvider>
      </body>
    </html>
  );
};

export default Layout;
