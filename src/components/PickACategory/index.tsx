import React from 'react';
import './PickACategory.scss';
import Header from '../common/Header';

interface PickACategoryProps {
  goBack: () => void;
  onCategorySelected: () => void;
}

const PickACategory: React.FC<PickACategoryProps> = ({ goBack }) => {
  return (
    <div className='pick-a-category'>
      <Header goBack={goBack} headerTxt='Pick a Category' />
      {/* <div className='how-to-play-container'>
        <Step number='01' title='CHOOSE A CATEGORY' description='First, choose a word category, like animals or movies. The computer then randomly selects a secret word from that topic and shows you blanks for each letter of the word.' />
        <Step number='02' title='GUESS LETTERS' description="Take turns guessing letters. The computer fills in the relevant blank spaces if your guess is correct. If it's wrong, you lose some health, which empties after eight incorrect guesses." />
        <Step number='03' title='WIN OR LOSE' description='You win by guessing all the letters in the word before your health runs out. If the health bar empties before you guess the word, you lose.' />
      </div> */}
    </div>
  );
};

export default PickACategory;
