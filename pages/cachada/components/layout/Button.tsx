import React, { CSSProperties } from 'react';

interface CustomButtonProps {
  label?: string;
  color?: string;
  background?: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  label = 'Button',
  color = '#FFF',
  background = 'linear-gradient(74deg, #FD269A 4.49%, #FF9D88 114.81%)',
}) => {
  const buttonStyles: CSSProperties = {
    width: '100%',
    color: color,
    textAlign: 'center',
    fontFamily: 'Inter',
    fontSize: '15px',
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 'normal',
    paddingTop: '16px',
    paddingBottom: '16px',
    borderRadius: '4px',
    border: '1px solid rgba(255, 255, 255, 0.50)',
    background: background,
  };

  return <button style={buttonStyles}>{label}</button>;
};

export default CustomButton;
