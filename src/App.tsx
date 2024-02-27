import React, { useState } from 'react';
import StartScreen from './components/StartScreen/';
import './App.scss';
import HowToPlay from './components/HowToPlay';
import PickCategory from './components/PickACategory';
import { GameState } from './constants/GameState';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(GameState.Start);

  const handleStartClick = () => {
    setGameState(GameState.PickCategory);
  };

  const handleHowToPlayClick = () => {
    setGameState(GameState.HowToPlay);
  };

  const goBackToStart = () => {
    setGameState(GameState.Start);
  };

  const handleCategorySelected = () => {
    // Replace with logic to determine which category is selected
    setGameState(GameState.MainGame);
  };

  return (
    <div className='app'>
      {gameState === GameState.Start && <StartScreen onStartClick={handleStartClick} onHowToPlayClick={handleHowToPlayClick} />}
      {gameState === GameState.HowToPlay && <HowToPlay goBack={goBackToStart} />}
      {gameState === GameState.PickCategory && <PickCategory onCategorySelected={handleCategorySelected} goBack={goBackToStart} />}
      {/* {gameState === GameState.MainGame && <MainGame />} */}
    </div>
  );
};

export default App;
