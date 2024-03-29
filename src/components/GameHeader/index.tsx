import React from 'react';
import './GameHeader.scss';
import HeaderButton from '../common/HeaderButton';
import heartImg from '../../assets/images/icon-heart.svg';
import HealthBar from '../common/HealthBar';

interface GameHeaderProps {
  category: string;
  health: number;
  maxHealth: number;
  onMenuClick: () => void;
}

const GameHeader: React.FC<GameHeaderProps> = ({ category, health, maxHealth, onMenuClick }) => {
  return (
    <header className='game-header'>
      <HeaderButton
        icon='menu'
        onClick={onMenuClick}
      />
      <h1 className='category'>{category}</h1>
      <HealthBar health={health} maxHealth={maxHealth} />
      <img src={heartImg} aria-hidden='true' alt='heart' className='health-icon' />
    </header>
  );
};

export default GameHeader;
