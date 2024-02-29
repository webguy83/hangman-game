import React, { useState, useEffect, useRef } from 'react';
import './MainGame.scss';
import LetterButton from '../common/LetterButton';
import LetterBox from '../common/LetterBox';

interface MainGameProps {
  categoryName: string;
  selectedWord: string;
}

const MainGame: React.FC<MainGameProps> = ({ categoryName, selectedWord }) => {
  // State to keep track of guessed letters
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);

  const wordContainerRef = useRef<HTMLDivElement>(null);
  const [lastWordIndexPerRow, setLastWordIndexPerRow] = useState<number[]>([]);

  useEffect(() => {
    const updateLastWordIndices = () => {
      const container = wordContainerRef.current;
      if (container) {
        // Check if container is not null
        let lastTopOffset = 0;
        let indices: number[] = []; // Define indices as number array

        Array.from(container.children as HTMLCollectionOf<HTMLElement>).forEach((wordElement, index) => {
          if (wordElement.offsetTop !== lastTopOffset) {
            // This is the first word of a new line
            lastTopOffset = wordElement.offsetTop;
            // Add the index of the last word of the previous line
            if (index > 0) indices.push(index - 1);
          }
          // Add the last word of the last line
          if (index === container.children.length - 1) indices.push(index);
        });

        setLastWordIndexPerRow(indices);
      }
    };

    // Call it on mount and whenever the words might have reflowed
    updateLastWordIndices();
    window.addEventListener('resize', updateLastWordIndices);

    return () => {
      window.removeEventListener('resize', updateLastWordIndices);
    };
  }, [selectedWord]);

  // Function to handle letter button click
  const handleLetterClick = (letter: string) => {
    if (!guessedLetters.includes(letter)) {
      setGuessedLetters((prevGuessedLetters) => [...prevGuessedLetters, letter]);
    }
    // Add additional logic for correct or incorrect guess here
  };

  // Generate on-screen keyboard
  const letters = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));
  const letterButtons = letters.map((letter) => <LetterButton key={letter} letter={letter} onLetterClick={handleLetterClick} disabled={guessedLetters.includes(letter)} />);

  return (
    <div className='main-game'>
      <header className='category-header'>{categoryName}</header>
      <div className='word-container' ref={wordContainerRef}>
        {selectedWord
          .toUpperCase()
          .split(' ')
          .map((word, wordIndex) => (
            <div className={`word ${lastWordIndexPerRow.includes(wordIndex) ? 'last-in-row' : ''}`} key={wordIndex}>
              {word.split('').map((letter, letterIndex) => (
                <LetterBox key={`${wordIndex}-${letterIndex}`} letter={letter} isRevealed={guessedLetters.includes(letter)} />
              ))}
            </div>
          ))}
      </div>
      <div className='keyboard-container'>{letterButtons}</div>
    </div>
  );
};

export default MainGame;
