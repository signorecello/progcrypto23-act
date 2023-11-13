import React, { CSSProperties } from 'react';
import { useRouter } from 'next/router';

interface CustomButtonProps {
  label?: string;
  color?: string;
  background?: string;
  onClick?: () => void;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  label = 'Button',
  color = '#FFF',
  background = 'linear-gradient(74deg, #FD269A 4.49%, #FF9D88 114.81%)',
  onClick,
}) => {
  const router = useRouter();

  const buttonStyles: CSSProperties = {
    background,
    border: '1px solid rgba(255, 255, 255, 0.50)',
    borderRadius: '4px',
    color,
    fontFamily: 'inherit',
    fontSize: '15px',
    fontWeight: '600',
    paddingBottom: '16px',
    paddingTop: '16px',
    textAlign: 'center',
    width: '100%',
  };

  return (
    <button
      type="button"
      style={buttonStyles}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default CustomButton;
