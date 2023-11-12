import React, { CSSProperties, ReactNode } from 'react';

interface ParaProps {
  children: ReactNode;
  margin?: string;
  color?: string;
}

export const Para: React.FC<ParaProps> = ({ children, margin, color }) => {
  const styles: CSSProperties = {
    margin: margin || '14px 0',
    color: color || '#eeedf1',
  };

  return <p style={styles}>{children}</p>;
};

export default Para;
