import React, { CSSProperties, ReactNode } from 'react';

interface TextProps {
  color?: string;
  fontSize?: string;
  fontWeight?: string;
  align?: CSSProperties['textAlign'];
  width?: string;
  children: ReactNode;
}

const Text: React.FC<TextProps> = ({
  color = '#fff',
  fontSize = '12px',
  fontWeight = '400',
  align = 'center',
  width = '100%',
  children,
}) => {
  const styles: CSSProperties = {
    color,
    fontSize,
    fontWeight,
    margin: 'auto',
    textAlign: align,
    width,
  };

  return <p style={styles}>{children}</p>;
};

export default Text;
