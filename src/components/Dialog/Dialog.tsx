import React from 'react';
import BoxContainer from '../common/BoxContainer'; // Adjust the path as necessary

interface DialogProps {
  onContinueClick: () => void;
  onNewCategoryClick: () => void;
  onQuitClick: () => void;
}

const Dialog: React.FC<DialogProps> = ({ onContinueClick, onNewCategoryClick, onQuitClick }) => {
  return (
    <BoxContainer title='Paused'>
      {/* Buttons specific to Dialog */}
      <button type='button' className='button-common continue-button' onClick={onContinueClick}>
        Continue
      </button>
      <button type='button' className='button-common new-category-button' onClick={onNewCategoryClick}>
        New Category
      </button>
      <button type='button' className='button-common quit-button' onClick={onQuitClick}>
        Quit Game
      </button>
    </BoxContainer>
  );
};

export default Dialog;
