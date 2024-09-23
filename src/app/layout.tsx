"use client";

import { ReactNode, useEffect } from 'react';
import '../styles/globals.css'
import NavigationContextProvider from '@/components/NavigationContext/NavigationContext';
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

            {children}
          </NavigationContextProvider>

        </AuthContextProvider>
      </body>
    </html>
  );
};

export default Layout;
