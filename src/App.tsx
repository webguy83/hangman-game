import React, { useState } from 'react';
import StartScreen from './components/StartScreen/'; // Adjust the import path as necessary
import './App.scss'; // Assuming you have global styles defined in App.scss
import Dialog from './components/Dialog';
import win from './assets/images/win.png';

const App: React.FC = () => {
  const [showDialog, setShowDialog] = useState(true);
  const handleStartClick = () => {
    // Logic to start the game or navigate to the game component
    console.log('Start game clicked');
  };

  const handleHowToPlayClick = () => {
    // Logic to show how to play instructions or navigate to the instructions component
    console.log('How to play clicked');
  };

  return (
    <div className='app'>
      {showDialog && <Dialog title={win} />}
      <StartScreen onStartClick={handleStartClick} onHowToPlayClick={handleHowToPlayClick} />
    </div>
  );
};

export default App;
