import React, { CSSProperties } from 'react';

interface SpacerProps {
  y?: number;
}

const Spacer: React.FC<SpacerProps> = ({ y = 20 }) => {
  const styles: CSSProperties = {
    padding: `${y}px 0px`,
  };

  return <div style={styles} />;
};

export default Spacer;
