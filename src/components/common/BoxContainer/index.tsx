import React from 'react';
import './BoxContainer.scss';
import logo from '../../../assets/images/logo.svg';
import win from '../../../assets/images/win.png';
import lose from '../../../assets/images/lose.png';
import paused from '../../../assets/images/paused.png';
import { DialogState } from '../../../types';

interface BoxContainerProps {
  children: React.ReactNode;
  titleText?: DialogState | null;
}

const BoxContainer: React.FC<BoxContainerProps> = ({ children, titleText }) => {
  const renderTitle = () => {
    let elm: React.ReactNode = <img src={logo} alt='The Hangman Game' />;

    if (titleText === 'You Win') {
      elm = <img src={win} alt='title' />;
    } else if (titleText === 'You Lose') {
      elm = <img src={lose} alt='title' />;
    } else if (titleText === 'Paused') {
      elm = <img src={paused} alt='title' />;
    }
    return <div className='box-title'>{elm}</div>;
  };

  return (
    <div className='box-container'>
      {renderTitle()}
      {children}
    </div>
  );
};

export default BoxContainer;
