import React, { CSSProperties, ReactNode } from 'react';

interface ImageBgProps {
  imageUrl?: string;
  children?: ReactNode;
}
const ImageBgWrapper: React.FC<ImageBgProps> = ({
  imageUrl = "url('/mountain-background.svg')",
  children,
}) => {
  const divStyles: CSSProperties = {
    background: `${imageUrl} bottom/cover no-repeat`,
    paddingBottom: '250px',
    position: 'relative',
  };

  return <div style={divStyles}>{children}</div>;
};

export default ImageBgWrapper;
