import React, { CSSProperties, ChangeEvent } from 'react';

interface InputProps {
  placeholder: string;
  color?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({ placeholder, color = '#514167', onChange }) => {
  const styles: CSSProperties = {
    background: '#fff',
    border: '1px solid #dadedf',
    borderRadius: '4px',
    color,
    fontFamily: 'inherit',
    padding: '16px',
    textAlign: 'left',
  };

  return (
    <input
      type="text"
      onChange={onChange}
      style={styles}
      placeholder={placeholder}
      maxLength={50}
    />
  );
};

export default Input;
