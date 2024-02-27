import React from 'react';
import './Header.scss';
import HeaderButton from '../HeaderButton';
import howToPlayImg from '../../../assets/images/how-to-play.png';
import pickACategoryImg from '../../../assets/images/pick_category.png';

interface HeaderProps {
  goBack: () => void;
  headerTxt: 'How To Play' | 'Pick a Category';
}

const Header: React.FC<HeaderProps> = ({ goBack, headerTxt }) => {
  return (
    <header className='header'>
      <HeaderButton onClick={goBack} icon='back' />
      {headerTxt === 'How To Play' && <img src={howToPlayImg} alt={headerTxt} />}
      {headerTxt === 'Pick a Category' && <img src={pickACategoryImg} alt={headerTxt} />}
      <div className='header-extra-cell'></div>
    </header>
  );
};

export default Header;
