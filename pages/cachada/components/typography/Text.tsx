import React, { CSSProperties, ReactNode } from 'react';

interface TextProps {
  children: ReactNode;
  fontSize?: string;
  color?: string;
  fontWeight?: string;
  align?: CSSProperties['textAlign'];
  width?: string;
}

const Text: React.FC<TextProps> = ({ children, fontSize, color, fontWeight, align, width }) => {
  const styles: CSSProperties = {
    fontSize: fontSize || '12px',
    color: color || '#fff',
    fontWeight: fontWeight || '400',
    textAlign: align || 'center',
    width: width || '100%',
    margin: 'auto',
  };

  return <p style={styles}>{children}</p>;
};

export default Text;
