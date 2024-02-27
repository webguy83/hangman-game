import React from 'react';
import './Header.scss';
import HeaderButton from '../HeaderButton';
import howToPlayImg from '../../../assets/images/how-to-play.png';

interface HeaderProps {
  onClose: () => void;
  headerTxt: 'How To Play' | 'Pick a Category';
}

const Header: React.FC<HeaderProps> = ({ onClose, headerTxt }) => {
  return (
    <header className='header'>
      <HeaderButton onClick={onClose} icon='back' />
      <img src={howToPlayImg} alt={headerTxt} />
      <div className='header-extra-cell'></div>
    </header>
  );
};

export default Header;
