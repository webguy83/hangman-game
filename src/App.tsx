import React from 'react';
import StartScreen from './components/StartScreen/'; // Adjust the import path as necessary
import './App.scss'; // Assuming you have global styles defined in App.scss

const App: React.FC = () => {
  const handleStartClick = () => {
    // Logic to start the game or navigate to the game component
    console.log('Start game clicked');
  };

  const handleHowToPlayClick = () => {
    // Logic to show how to play instructions or navigate to the instructions component
    console.log('How to play clicked');
  };

  return (
    <div className="app">
      <StartScreen
        onStartClick={handleStartClick}
        onHowToPlayClick={handleHowToPlayClick}
      />
    </div>
  );
};

export default App;
