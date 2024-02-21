import React from 'react';
import BoxContainer from '../common/BoxContainer'; // Adjust the path as necessary
import './StartScreen.scss'; // Import the SCSS stylesheet
import logo from "../../assets/images/logo.svg";

interface StartScreenProps {
  onStartClick: () => void;
  onHowToPlayClick: () => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStartClick, onHowToPlayClick }) => {
  return (
    <BoxContainer>
      {/* Logo and buttons specific to StartScreen */}
      <img src={logo} alt="The Hangman Game" className="logo" />
      <button type='button' className="button-common start-button" onClick={onStartClick}>
        Play
      </button>
      <button type='button' className="button-common how-to-play-button" onClick={onHowToPlayClick}>
        How to Play
      </button>
    </BoxContainer>
  );
};

export default StartScreen;
