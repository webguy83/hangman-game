import React, { useEffect, useState } from 'react';
import StartScreen from './components/StartScreen/';
import './App.scss';
import HowToPlay from './components/HowToPlay';
import PickCategory from './components/PickACategory';
import { GameState } from './constants/GameState';
import MainGame from './components/MainGame';
import { useCategorySelection } from './hooks/useCategorySelection';
import { CategoryName } from './types';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(GameState.Start);
  const [categoryName, setCategoryName] = useState<CategoryName>('Countries');
  const [selectedWord, setSelectedWord] = useState<string>('San Jose Sharks');
  const { selectRandomWord } = useCategorySelection();

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

  const handlePlayAgain = () => {
    const [name, word] = selectRandomWord(categoryName);
    handleCategorySelected(name, word);
  };

  const handleCategorySelected = (selectedCategory: CategoryName, word: string) => {
    setCategoryName(selectedCategory);
    setSelectedWord(word);
    setGameState(GameState.MainGame);
  };

  return (
    <div className='app'>
      {gameState === GameState.Start && <StartScreen onStartClick={handleStartClick} onHowToPlayClick={handleHowToPlayClick} />}
      {gameState === GameState.HowToPlay && <HowToPlay goBack={goBackToStart} />}
      {gameState === GameState.PickCategory && <PickCategory onCategorySelected={handleCategorySelected} goBack={goBackToStart} />}
      {gameState === GameState.MainGame && <MainGame categoryName={categoryName} selectedWord={selectedWord} onQuitGame={goBackToStart} onNewCategory={handleStartClick} onPlayAgain={handlePlayAgain} />}
    </div>
  );
};

export default App;
