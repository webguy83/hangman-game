import React, { useEffect, useState } from 'react';
import './MainGame.scss';
import LetterButton from '../common/LetterButton';
import LetterBox from '../common/LetterBox';
import GameHeader from '../GameHeader';
import Dialog from '../Dialog';
import { CategoryName, GameOutcome } from '../../types';
import { useCategorySelection } from '../../hooks/useCategorySelection';
import { GameState } from '../../constants/GameState';

interface MainGameProps {
  categoryName: CategoryName;
  onQuitGame: () => void;
  onNewCategory: () => void;
}

const MainGame: React.FC<MainGameProps> = ({ categoryName, onQuitGame, onNewCategory }) => {
  const maxTries = 8;
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [incorrectTries, setIncorrectTries] = useState<number>(0);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [modalContentVisible, setModalContentVisible] = useState(true);
  const [gameOutcome, setGameOutcome] = useState<GameOutcome>(GameOutcome.None);
  const [selectedWord, setSelectedWord] = useState<string>('');
  const [isInitialWordSet, setIsInitialWordSet] = useState(false);
  const { selectRandomWord } = useCategorySelection();

  useEffect(() => {
    if (!isInitialWordSet) {
      const [_, word] = selectRandomWord(categoryName);
      setSelectedWord(word);
      setIsInitialWordSet(true); // Mark that the initial word is now set
    }
  }, [categoryName, isInitialWordSet, selectRandomWord]);

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

  const handlePlayAgain = () => {
    if (gameOutcome === GameOutcome.Win) {
      const [_, word] = selectRandomWord(categoryName);
      setSelectedWord(word);
    }
    // No need to handle the loss case explicitly if we're keeping the word the same
    setGameOutcome(GameOutcome.None);
    resetGameState();
  };

  const resetGameState = () => {
    setGuessedLetters([]);
    setIncorrectTries(0);
    setModalIsOpen(false)
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
            ? () => setModalIsOpen(false)
            : handlePlayAgain
        }
      />
    </div>
  );
};

export default MainGame;
