import React, { CSSProperties, ReactNode } from 'react';

interface ImageBgProps {
  imageUrl?: string;
  children?: ReactNode;
}

const ImageBgWrapper: React.FC<ImageBgProps> = ({ imageUrl, children }) => {
  const divStyles: CSSProperties = {
    paddingBottom: '250px',
    position: 'relative',
    background: imageUrl || "url('/image-3.svg')",
    backgroundSize: 'cover',
    backgroundPosition: 'bottom',
    backgroundRepeat: 'no-repeat',
  };

  return <div style={divStyles}>{children}</div>;
};

export default ImageBgWrapper;
