import React, { CSSProperties } from 'react';

interface SpacerProps {
  x?: number;
  y?: number;
}

const Spacer: React.FC<SpacerProps> = ({ x = 0, y = 20 }) => {
  const styles: CSSProperties = {
    padding: `${y}px ${x}px`,
  };

  return <div style={styles} />;
};

export default Spacer;
