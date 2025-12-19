import React, { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="h-screen w-full bg-maia-base text-maia-dark flex flex-col font-sans overflow-hidden">
        <main className="flex-1 relative z-10 overflow-hidden flex flex-col">
            {children}
        </main>
    </div>
  );
};