import React, { CSSProperties, ReactNode } from 'react';

interface ImageSectionProps {
  imageUrl: string;
}

const ImageSection: React.FC<ImageSectionProps> = ({ imageUrl }) => {
  const sectionStyles: CSSProperties = {
    position: 'relative',
    width: '100%',
    overflow: 'hidden',
  };

  const beforeStyles: CSSProperties = {
    content: "''",
    display: 'block',
    paddingTop: '75%',
  };

  const divStyles: CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `url('${imageUrl}') center/contain no-repeat`,
  };

  return (
    <section style={sectionStyles}>
      <div style={beforeStyles}></div>
      <div style={divStyles}></div>
    </section>
  );
};

export default ImageSection;
