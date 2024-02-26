import React from 'react';
import './Button.scss';

interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  theme: 'blue' | 'pink'; // Define the possible themes
}

const Button: React.FC<ButtonProps> = ({ children, onClick, theme }) => {
  const themeClass = `button-${theme}`;
  return (
    <button type='button' className={`button ${themeClass}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
