import React from 'react';
import './LetterBox.scss';

interface LetterBoxProps {
  letter: string;
  isRevealed: boolean;
}

const LetterBox: React.FC<LetterBoxProps> = ({ letter, isRevealed }) => {
  // Apply 'revealed' class if the letter is revealed, and 'space' if the letter is a space
  const classNames = ['letter-box', isRevealed ? 'revealed' : '', letter === ' ' ? 'space' : ''].join(' ').trim();

  return <div className={classNames}>{isRevealed ? letter : ''}</div>;
};
export default LetterBox;
