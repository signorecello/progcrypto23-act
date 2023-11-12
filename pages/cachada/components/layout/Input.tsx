import React, { CSSProperties, ChangeEvent } from 'react';

interface InputProps {
  placeholder: string;
  color?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  value?: string;
}

const Input: React.FC<InputProps> = ({ placeholder, color, onChange, value }) => {
  const styles: CSSProperties = {
    color: color || '#514167',
    textAlign: 'left',
    fontFamily: 'Inter',
    fontSize: '15px',
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: 'normal',
    padding: '16px',
    borderRadius: '4px',
    border: '1px solid #dadedf',
    background: '#fff',
  };

  return <input onChange={onChange} style={styles} type="text" placeholder={placeholder} />;
};

export default Input;
