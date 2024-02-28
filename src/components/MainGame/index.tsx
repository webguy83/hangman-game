import React, { useState } from 'react';
import './MainGame.scss';
import LetterButton from '../common/LetterButton';

interface MainGameProps {
  categoryName: string;
  selectedWord: string;
}

const MainGame: React.FC<MainGameProps> = ({ categoryName, selectedWord }) => {
  // State to keep track of guessed letters
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);

  // Convert selectedWord into an array of characters and map to JSX
  const wordLetters = selectedWord
    .toUpperCase()
    .split('')
    .map((letter, index) => (
      <div className='letter-box' key={index}>
        {guessedLetters.includes(letter) ? letter : ''}
      </div>
    ));

  // Function to handle letter button click
  const handleLetterClick = (letter: string) => {
    if (!guessedLetters.includes(letter)) {
      setGuessedLetters([...guessedLetters, letter]);
    }
    // Add additional logic for correct or incorrect guess here
  };

  // Generate on-screen keyboard
  const letters = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));
  const letterButtons = letters.map((letter) => <LetterButton key={letter} letter={letter} onLetterClick={handleLetterClick} disabled={guessedLetters.includes(letter)} />);

  return (
    <div className='main-game'>
      <header className='category-header'>{categoryName}</header>
      <div className='word-container'>{wordLetters}</div>
      <div className='keyboard-container'>{letterButtons}</div>
    </div>
  );
};

export default MainGame;
