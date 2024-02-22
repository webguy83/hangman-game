import React from 'react';
import './Button.scss'; // Import the SCSS stylesheet

interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  theme: 'blue' | 'pink'; // Define the possible themes
}

const Button: React.FC<ButtonProps> = ({ children, onClick, theme }) => {
  const themeClass = `button-${theme}`; // Constructs a string like 'button-blue' or 'button-pink'
  return (
    <button type='button' className={`button ${themeClass}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
