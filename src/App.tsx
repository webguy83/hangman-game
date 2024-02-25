import React, { useState } from 'react';
import StartScreen from './components/StartScreen/';
import './App.scss';
import HowToPlay from './components/HowToPlay';

const App: React.FC = () => {
  const [showDialog, setShowDialog] = useState(false);
  const [showHowToPlay, setShowHowToPlay] = useState(false);
  const handleStartClick = () => {};

  const handleHowToPlayClick = () => {
    setShowHowToPlay(true);
  };

  const handleCloseHowToPlay = () => {
    // Close the HowToPlay component
    setShowHowToPlay(false);
  };

  return <div className='app'>{showHowToPlay ? <HowToPlay onClose={handleCloseHowToPlay} /> : <StartScreen onStartClick={handleStartClick} onHowToPlayClick={handleHowToPlayClick} />}</div>;
};

export default App;
