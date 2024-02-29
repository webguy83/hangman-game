import React from 'react';
import './LetterBox.scss';

interface LetterBoxProps {
  letter: string;
  isRevealed: boolean;
}

const LetterBox: React.FC<LetterBoxProps> = ({ letter, isRevealed }) => {
  return <div className={`letter-box ${isRevealed ? 'revealed' : ''}`}>{isRevealed ? letter : ''}</div>;
};

export default LetterBox;
