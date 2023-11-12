import React, { CSSProperties, ReactNode } from 'react';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

interface ContainerProps {
  children?: ReactNode;
  bgColor?: string;
  textColor?: string;
}

const Container: React.FC<ContainerProps> = ({ children, textColor, bgColor }) => {
  const styles: CSSProperties = {
    backgroundColor: bgColor || '#321e4c',
    color: textColor || '#ffffff',
    minHeight: '100vh',
    boxShadow: '0 0 10px rgba(255, 255, 255, 0.2)', //Remover isto depois
    maxWidth: '480px', // Remover depois
    margin: 'auto',
  };

  return (
    <main className={inter.className} style={styles}>
      {children}
    </main>
  );
};

export default Container;
