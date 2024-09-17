"use client";

import { ReactNode } from 'react';
import '../styles/globals.css'
import NavigationContextProvider from '@/components/NavigationContext/NavigationContext';
import MainLayout from '@/components/MainLayout/MainLayout';


interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {

  return (
    <html data-theme="light">
      <body>
        <NavigationContextProvider>
          <MainLayout>
            {children}
          </MainLayout>
        </NavigationContextProvider>
      </body>
    </html>
  );
};

export default Layout;
