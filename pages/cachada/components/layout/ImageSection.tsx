import React, { CSSProperties, ReactNode } from 'react';

interface ImageSectionProps {
  imageUrl?: string;
}

const ImageSection: React.FC<ImageSectionProps> = ({ imageUrl = '/intro_gif.gif' }) => {
  const sectionStyles: CSSProperties = {
    overflow: 'hidden',
    position: 'relative',
    width: '100%',
  };

  const beforeStyles: CSSProperties = {
    content: "''",
    display: 'block',
    paddingTop: '75%',
  };

  const divStyles: CSSProperties = {
    background: `url('${imageUrl}') center/contain no-repeat`,
    inset: 0,
    position: 'absolute',
  };

  return (
    <section style={sectionStyles}>
      <div style={beforeStyles}></div>
      <div style={divStyles}></div>
    </section>
  );
};

export default ImageSection;
