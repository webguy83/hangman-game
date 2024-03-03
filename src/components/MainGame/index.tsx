import React, { useEffect, useRef, useState } from 'react';
import './MainGame.scss';
import LetterButton from '../common/LetterButton';
import LetterBox from '../common/LetterBox';
import GameHeader from '../GameHeader';
import Dialog from '../Dialog';
import { DialogState } from '../../types';

interface MainGameProps {
  categoryName: string;
  selectedWord: string;
  onQuitGame: () => void;
  onPlayAgain: () => void;
  onNewCategory: () => void;
}

const MainGame: React.FC<MainGameProps> = ({ categoryName, selectedWord, onQuitGame, onNewCategory, onPlayAgain }) => {
  const maxTries = 8;
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [incorrectTries, setIncorrectTries] = useState<number>(0);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [gameState, setGameState] = useState<DialogState | null>(null);

  // Call this function when the game is won or lost
  const handleGameEnd = (didWin: boolean) => {
    setGameState(didWin ? 'You Win' : 'You Lose');
    setModalIsOpen(true);
  };

  // Call this function when the hamburger menu is clicked
  const togglePause = () => {
    setGameState('Paused');
    setModalIsOpen(true);
  };

  // Function to update game state on incorrect guess
  const handleIncorrectGuess = () => {
    setIncorrectTries((prevIncorrectTries) => {
      const newTries = prevIncorrectTries + 1;
      if (newTries >= maxTries) {
        handleGameEnd(false); // Player loses
      }
      return newTries;
    });
  };

  // Helper function to check for a win
  const checkForWin = (guessed: string[]) => {
    return selectedWord
      .toUpperCase()
      .split('')
      .filter((letter) => letter !== ' ')
      .every((letter) => guessed.includes(letter));
  };

  // Function to update game state on correct guess
  const handleCorrectGuess = (guessed: string[]) => {
    if (checkForWin(guessed)) {
      handleGameEnd(true); // Player wins
    }
  };

  // Handler for when a letter is clicked
  const handleLetterClick = (letter: string) => {
    if (!guessedLetters.includes(letter)) {
      const newGuessedLetters = [...guessedLetters, letter];
      setGuessedLetters(newGuessedLetters);

      if (selectedWord.toUpperCase().includes(letter)) {
        // Correct guess
        handleCorrectGuess(newGuessedLetters);
      } else {
        // Incorrect guess
        handleIncorrectGuess();
      }
    }
  };

  // Generate on-screen keyboard
  const letters = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));
  const letterButtons = letters.map((letter) => <LetterButton key={letter} letter={letter} onLetterClick={handleLetterClick} disabled={guessedLetters.includes(letter)} />);
  const health = ((maxTries - incorrectTries) / maxTries) * 100;

  return (
    <div className='main-game'>
      <GameHeader category={categoryName} health={health} maxHealth={100} onMenuClick={togglePause} />
      <div className='word-container'>
        {selectedWord
          .toUpperCase()
          .split(' ')
          .map((word, wordIndex) => (
            <div className='word' key={wordIndex}>
              {word.split('').map((letter, letterIndex) => (
                <LetterBox key={`${wordIndex}-${letterIndex}`} letter={letter} isRevealed={guessedLetters.includes(letter)} />
              ))}
            </div>
          ))}
      </div>
      <div className='keyboard-container'>{letterButtons}</div>
      <Dialog
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        titleText={gameState}
        onQuit={onQuitGame}
        onNewCategory={onNewCategory}
        onPlayAgainOrContinue={
          gameState === 'Paused'
            ? () => setModalIsOpen(false)
            : () => {
                onPlayAgain();
                setModalIsOpen(false);
                setGuessedLetters([]);
                setIncorrectTries(0);
              }
        }
      />
    </div>
  );
};

export default MainGame;
