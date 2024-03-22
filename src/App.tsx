import React, { useEffect, useState } from 'react';
import StartScreen from './components/StartScreen/';
import './App.scss';
import HowToPlay from './components/HowToPlay';
import PickCategory from './components/PickACategory';
import { GameState } from './constants/GameState';
import MainGame from './components/MainGame';
import { CategoryName } from './types';
import { useTransition, animated } from 'react-spring';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(GameState.Start);
  const [categoryName, setCategoryName] = useState<CategoryName>('Movies');

  const transitions = useTransition(gameState, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: { duration: 300 }, // Customize the transition duration
  });

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

  return transitions((styles, item) => (
    <animated.div style={styles} className="app">
      {item === GameState.Start && <StartScreen onStartClick={handleStartClick} onHowToPlayClick={handleHowToPlayClick} />}
      {item === GameState.HowToPlay && <HowToPlay goBack={goBackToStart} />}
      {item === GameState.PickCategory && <PickCategory goBack={goBackToStart} setCategoryName={setCategoryName} setGameState={setGameState} />}
      {item === GameState.MainGame && <MainGame categoryName={categoryName} onQuitGame={goBackToStart} onNewCategory={handleStartClick} />}
      {/* Render other components based on gameState */}
    </animated.div>
  ));
};

export default App;
