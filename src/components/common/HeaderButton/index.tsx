import React from 'react';
import './HeaderButton.scss';
import back from '../../../assets/images/icon-back.svg';
import menu from '../../../assets/images/icon-menu.svg';

interface ButtonProps {
  icon: 'back' | 'menu';
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ icon, onClick }) => {
  return (
    <button type='button' className='header-button' onClick={onClick}>
      {icon === 'back' && <img src={back} alt='back btn' />}
      {icon === 'menu' && <img src={menu} alt='back btn' />}
    </button>
  );
};

export default Button;
