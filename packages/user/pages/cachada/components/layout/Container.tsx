import React, { CSSProperties, ReactNode } from 'react';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

interface ContainerProps {
  children?: ReactNode;
  backgroundColor?: string;
  color?: string;
}

const Container: React.FC<ContainerProps> = ({
  backgroundColor = '#321e4c',
  color = '#ffffff',
  children,
}) => {
  const styles: CSSProperties = {
    backgroundColor,
    boxShadow: '0 0 10px rgba(255, 255, 255, 0.2)',
    color,
    margin: 'auto',
    maxWidth: '480px', // Remover depois
    minHeight: '100vh',
  };

  return (
    <main className={inter.className} style={styles}>
      {children}
    </main>
  );
};

export default Container;
