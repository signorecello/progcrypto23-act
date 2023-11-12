import React, { CSSProperties } from 'react';
import { useRouter } from 'next/router';

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
      onClick={() => {
        router.pathname === '/cachada/phone-1' ? router.push('/cachada/phone-2') : router.back();
      }}
      style={buttonStyles}
    >
      {label}
    </button>
  );
};

export default CustomButton;
