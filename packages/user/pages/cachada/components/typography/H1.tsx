import React, { CSSProperties, ReactNode } from 'react';
import { galaxieCopernicus } from '../../fonts/fonts';

interface HeadingProps {
  color?: string;
  fontSize?: string;
  fontWeight?: number | string;
  children: ReactNode;
}

const H1: React.FC<HeadingProps> = ({
  color = '#96A0FF',
  fontSize = '28px',
  fontWeight = '700',
  children,
}) => {
  const styles: CSSProperties = {
    color,
    fontSize,
    fontWeight,
    margin: 0,
    textAlign: 'center',
  };

  return (
    <h1 className={galaxieCopernicus.className} style={styles}>
      {children}
    </h1>
  );
};

export default H1;
