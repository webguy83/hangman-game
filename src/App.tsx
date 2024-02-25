import React, { useState } from 'react';
import StartScreen from './components/StartScreen/'; // Adjust the import path as necessary
import './App.scss'; // Assuming you have global styles defined in App.scss
import Dialog from './components/Dialog';

const App: React.FC = () => {
  const [showDialog, setShowDialog] = useState(false);
  const handleStartClick = () => {
    setShowDialog(true);
  };

  const handleHowToPlayClick = () => {
    // Logic to show how to play instructions or navigate to the instructions component
    console.log('How to play clicked');
  };

  return (
    <div className='app'>
      {showDialog && <Dialog titleText='You Lose' isOpen={showDialog} onRequestClose={() => setShowDialog(false)} />}
      <StartScreen onStartClick={handleStartClick} onHowToPlayClick={handleHowToPlayClick} />
    </div>
  );
};

export default App;
