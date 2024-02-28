import React from 'react';
import './LetterButton.scss';

interface LetterButtonProps {
  letter: string;
  onLetterClick: (letter: string) => void;
  disabled: boolean;
}

const LetterButton: React.FC<LetterButtonProps> = ({ letter, onLetterClick, disabled }) => {
  return (
    <button type='button' className='letter-button' onClick={() => onLetterClick(letter)} disabled={disabled}>
      {letter}
    </button>
  );
};

export default LetterButton;
