import React, { CSSProperties, ReactNode } from 'react';

interface Heading2Props {
  children: ReactNode;
  color?: string;
}

const Heading2: React.FC<Heading2Props> = ({ children, color }) => {
  const styles: CSSProperties = {
    textAlign: 'center',
    fontFamily: 'Inter',
    fontSize: '22px',
    fontStyle: 'normal',
    fontWeight: 700,
    lineHeight: 'normal',
    margin: 0,
    color: color || '#fff',
  };

  return <h2 style={styles}>{children}</h2>;
};

export default Heading2;
