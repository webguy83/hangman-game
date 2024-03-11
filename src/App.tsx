import React, { useEffect, useState } from 'react';
import StartScreen from './components/StartScreen/';
import './App.scss';
import HowToPlay from './components/HowToPlay';
import PickCategory from './components/PickACategory';
import { GameState } from './constants/GameState';
import MainGame from './components/MainGame';
import { useCategorySelection } from './hooks/useCategorySelection';
import { CategoryName, GameOutcome } from './types';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(GameState.MainGame);
  const [categoryName, setCategoryName] = useState<CategoryName>('Movies');
  const [selectedWord, setSelectedWord] = useState<string>('Interstellar');
  const [gameOutcome, setGameOutcome] = useState<GameOutcome>(GameOutcome.None);
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
    if (gameOutcome === GameOutcome.Win) {
      // Select a new word only if the user won the last game
      const [name, word] = selectRandomWord(categoryName);
      handleCategorySelected(name, word);
    } else if (gameOutcome === GameOutcome.Lose) {
      // Keep the same word if the user lost
      setGameState(GameState.MainGame);
    }
    // Reset game outcome for the new game
    setGameOutcome(GameOutcome.None);
  };

  const handleCategorySelected = (selectedCategory: CategoryName, word: string) => {
    setCategoryName(selectedCategory);
    setSelectedWord(word);
    setGameState(GameState.MainGame);
  };

  const renderComponent = () => {
    switch (gameState) {
      case GameState.Start:
        return <StartScreen onStartClick={handleStartClick} onHowToPlayClick={handleHowToPlayClick} />;
      case GameState.HowToPlay:
        return <HowToPlay goBack={goBackToStart} />;
      case GameState.PickCategory:
        return <PickCategory onCategorySelected={handleCategorySelected} goBack={goBackToStart} />;
      case GameState.MainGame:
        return <MainGame categoryName={categoryName} selectedWord={selectedWord} onQuitGame={goBackToStart} onNewCategory={handleStartClick} onPlayAgain={handlePlayAgain} setGameOutcome={setGameOutcome} gameOutcome={gameOutcome} />;
      default:
        return null;
    }
  };

  return (
    <div className='app'>
      <TransitionGroup component={null}>
        <CSSTransition key={gameState} timeout={300} classNames='fade'>
          {renderComponent()}
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
};

export default App;
