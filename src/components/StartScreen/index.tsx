import React from 'react';
import BoxContainer from '../common/BoxContainer'; // Adjust the path as necessary
import './StartScreen.scss'; // Import the SCSS stylesheet
import logo from '../../assets/images/logo.svg';
import playIcon from '../../assets/images/icon-play.svg';
import Button from '../common/Button';

interface StartScreenProps {
  onStartClick: () => void;
  onHowToPlayClick: () => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStartClick, onHowToPlayClick }) => {
  return (
    <div className='containerStartScreen'>
      <BoxContainer title={<img src={logo} alt='The Hangman Game' />}>
        {/* Logo and buttons specific to StartScreen */}
        <button type='button' className='start-button' onClick={onStartClick}>
          <img src={playIcon} alt='Play Icon' />
        </button>
        <div className='common-buttons'>
          <Button theme='blue' onClick={onHowToPlayClick}>
            How To Play
          </Button>
        </div>
      </BoxContainer>
    </div>
  );
};

export default StartScreen;
