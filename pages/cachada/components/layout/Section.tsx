import React, { CSSProperties, ReactNode } from 'react';

interface SectionProps {
  children: ReactNode;
  paddingRight?: string;
  paddingLeft?: string;
  // paddingBottom?: string;
  // padding?: string;
}

const Section: React.FC<SectionProps> = ({
  children,
  paddingRight,
  paddingLeft,
  // paddingBottom,
  // padding,
}) => {
  const styles: CSSProperties = {
    paddingRight: paddingRight || '20px',
    paddingLeft: paddingLeft || '20px',
    // paddingBottom,
    // padding,
  };

  return <section style={styles}>{children}</section>;
};

export default Section;
