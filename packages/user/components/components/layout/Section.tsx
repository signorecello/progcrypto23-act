import React, { CSSProperties, ReactNode } from 'react';

interface SectionProps {
  children: ReactNode;
  paddingRight?: string;
  paddingLeft?: string;
}

const Section: React.FC<SectionProps> = ({
  children,
  paddingRight = '20px',
  paddingLeft = '20px',
}) => {
  const styles: CSSProperties = {
    paddingRight: paddingRight,
    paddingLeft: paddingLeft,
  };

  return <section style={styles}>{children}</section>;
};

export default Section;
