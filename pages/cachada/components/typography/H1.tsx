import React, { CSSProperties, ReactNode } from 'react';

interface HeadingProps {
  children: ReactNode;
  color?: string;
  fontSize?: string;
  fontWeight?: number | string;
}

const H1: React.FC<HeadingProps> = ({ children, color, fontSize, fontWeight }) => {
  const styles: CSSProperties = {
    textAlign: 'center',
    fontFamily: 'Inter',
    fontSize: fontSize || '28px',
    fontStyle: 'normal',
    fontWeight: fontWeight || 650,
    lineHeight: 'normal',
    margin: 0,
    color: color || '#96A0FF',
  };

  return <h1 style={styles}>{children}</h1>;
};

export default H1;
