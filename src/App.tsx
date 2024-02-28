import React, { useEffect, useState } from 'react';
import StartScreen from './components/StartScreen/';
import './App.scss';
import HowToPlay from './components/HowToPlay';
import PickCategory from './components/PickACategory';
import { GameState } from './constants/GameState';
import MainGame from './components/MainGame';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(GameState.MainGame);
  const [categoryName, setCategoryName] = useState<string>('Testing');
  const [selectedWord, setSelectedWord] = useState<string>('Hazzah');

  useEffect(() => {
    if (gameState === GameState.Start) {
      document.body.classList.remove('body-gradient');
    } else {
      document.body.classList.add('body-gradient');
    }
    return () => {
      document.body.classList.remove('body-gradient');
    };
  }, [gameState]);

  const handleStartClick = () => {
    setGameState(GameState.PickCategory);
  };

  const handleHowToPlayClick = () => {
    setGameState(GameState.HowToPlay);
  };

  const goBackToStart = () => {
    setGameState(GameState.Start);
  };

  const handleCategorySelected = (selectedCategory: string, word: string) => {
    setCategoryName(selectedCategory);
    setSelectedWord(word);
    setGameState(GameState.MainGame);
  };

  return (
    <div className='app'>
      {gameState === GameState.Start && <StartScreen onStartClick={handleStartClick} onHowToPlayClick={handleHowToPlayClick} />}
      {gameState === GameState.HowToPlay && <HowToPlay goBack={goBackToStart} />}
      {gameState === GameState.PickCategory && <PickCategory onCategorySelected={handleCategorySelected} goBack={goBackToStart} />}
      {gameState === GameState.MainGame && <MainGame categoryName={categoryName} selectedWord={selectedWord} />}
    </div>
  );
};

export default App;
