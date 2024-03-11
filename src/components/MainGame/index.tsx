import React, { useState } from 'react';
import './MainGame.scss';
import LetterButton from '../common/LetterButton';
import LetterBox from '../common/LetterBox';
import GameHeader from '../GameHeader';
import Dialog from '../Dialog';
import { GameOutcome } from '../../types';

interface MainGameProps {
  categoryName: string;
  selectedWord: string;
  onQuitGame: () => void;
  onPlayAgain: () => void;
  onNewCategory: () => void;
  setGameOutcome: (outcome: GameOutcome) => void;
  gameOutcome: GameOutcome;
}

const MainGame: React.FC<MainGameProps> = ({ categoryName, selectedWord, onQuitGame, onNewCategory, onPlayAgain, setGameOutcome, gameOutcome }) => {
  const maxTries = 8;
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [incorrectTries, setIncorrectTries] = useState<number>(0);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [modalContentVisible, setModalContentVisible] = useState(true);

  // Call this function when the game is won or lost
  const handleGameEnd = (didWin: boolean) => {
    setModalIsOpen(true);
    setGameOutcome(didWin ? GameOutcome.Win : GameOutcome.Lose);
  };

  // Call this function when the hamburger menu is clicked
  const togglePause = () => {
    setGameOutcome(GameOutcome.Paused);
    setModalIsOpen(true);
  };

  const onNewCategoryClick = () => {
    handleRequestClose();
    onNewCategory();
  };

  const onQuitGameClick = () => {
    handleRequestClose();
    onQuitGame();
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

  const handleRequestClose = () => {
    setModalContentVisible(false); // First, hide the modal content
    setTimeout(() => {
      setModalIsOpen(false); // Then close the modal after the timeout
      setModalContentVisible(true); // Reset the content visibility for the next opening
    }, 300); // This should match your CSS transition duration
  };

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
        onRequestClose={handleRequestClose}
        titleText={gameOutcome}
        onQuit={onQuitGameClick}
        onNewCategory={onNewCategoryClick}
        modalContentVisible={modalContentVisible}
        onPlayAgainOrContinue={
          gameOutcome === 'Paused'
            ? handleRequestClose
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
